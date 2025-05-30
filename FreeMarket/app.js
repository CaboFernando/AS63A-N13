const readline = require("readline");

const Cliente = require("./models/clientes");
const Endereco = require("./models/enderecos");
const MetodoPagamento = require("./models/metodoPagamentos");
const Pedido = require("./models/pedidos");
const Produto = require("./models/produtos");

const endereco = new Endereco();
const produto = new Produto();
const metodoPagamento = new MetodoPagamento();
const pedido = new Pedido();
const cliente = new Cliente();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntar(pergunta) {
    return new Promise((resolve) => rl.question(pergunta, resolve));
}

async function inserirComInput() {
    console.log("\n--- Inserindo novo cliente ---");

    try {
        const rua = await perguntar("Rua: ");
        const numero = await perguntar("Número: ");
        const cep = await perguntar("CEP (formato 12345-678): ");
        const logradouro = await perguntar("Logradouro: ");
        const end = new Endereco(rua, numero, cep, logradouro, true);
        const enderecoId = await end.inserir();

        const nomeProduto = await perguntar("Nome do produto: ");
        const descricaoProduto = await perguntar("Descrição: ");
        const condicaoProduto = await perguntar("Condição (novo/usado/recondicionado): ");
        const prod = new Produto(nomeProduto, descricaoProduto, condicaoProduto, true);
        const produtoId = await prod.inserir();

        const tipoPagamento = await perguntar("Tipo de pagamento (Crédito/Débito/PIX): ");
        const dadosPagamento = await perguntar("Dados do pagamento: ");
        const met = new MetodoPagamento(tipoPagamento, dadosPagamento, "ativo", true);
        const metodoPagamentoId = await met.inserir();

        const dataCompra = new Date();
        const dataEntrega = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const ped = new Pedido(dataCompra, dataEntrega, produtoId, metodoPagamentoId, "processando", true);
        const pedidoId = await ped.inserir();

        const nomeCliente = await perguntar("Nome: ");
        const emailCliente = await perguntar("Email: ");
        const telefoneCliente = await perguntar("Telefone: ");
        const documentoCliente = await perguntar("Documento: ");
        const cli = new Cliente(nomeCliente, emailCliente, telefoneCliente, documentoCliente, pedidoId, enderecoId, true);
        await cli.inserir();

        console.log("Cliente inserido com sucesso!\n");
    } catch (error) {
        console.error("Erro durante a inserção: " + error.message + "\n");
    }
}

async function atualizarClienteComInput() {
    console.log("\n--- Atualizando cliente ---");
    try {
        const clientes = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));
        if (clientes.length === 0) {
            console.log("Nenhum cliente encontrado para atualizar.\n");
            return;
        }

        console.log("Clientes disponíveis:");
        clientes.forEach((c, i) => {
            console.log(`${i + 1}. ${c.nome} (${c._id})`);
        });

        const indexStr = await perguntar("Escolha o número do cliente para atualizar: ");
        const index = parseInt(indexStr) - 1;

        if (isNaN(index) || index < 0 || index >= clientes.length) {
            console.log("Seleção de cliente inválida.\n");
            return;
        }

        const c = clientes[index];

        const nome = await perguntar(`Nome (${c.nome}): `) || c.nome;
        const email = await perguntar(`Email (${c.email}): `) || c.email;
        const telefone = await perguntar(`Telefone (${c.telefone}): `) || c.telefone;
        const documento = await perguntar(`Documento (${c.documento}): `) || c.documento;

        const novosDados = {
            nome,
            email,
            telefone,
            documento,
            idPedido: c.idPedido,
            idEndereco: c.idEndereco,
            isAtivo: true
        };

        await cliente.atualizarCliente({ _id: c._id }, novosDados);
        console.log("Cliente atualizado com sucesso!\n");
    } catch (error) {
        console.error("Erro durante a atualização do cliente: " + error.message + "\n");
    }
}

async function removerEntidadeComInput() {
    console.log("\n--- Remover entidade ---");
    try {
        console.log("Selecione o tipo de entidade para remover:");
        console.log("1. Cliente");
        console.log("2. Pedido");
        console.log("3. Produto");
        console.log("4. Endereço");
        console.log("5. Método de Pagamento");
        const tipoOpcao = await perguntar("Escolha uma opção: ");

        let lista, instancia, removerFn, nomeTipo;

        switch (tipoOpcao) {
            case "1":
                lista = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));
                instancia = cliente;
                removerFn = cliente.removerPorId;
                nomeTipo = "Cliente";
                break;
            case "2":
                lista = (await pedido.listar()).map(p => Object.assign(new Pedido(), p));
                instancia = pedido;
                removerFn = pedido.removerPorId;
                nomeTipo = "Pedido";
                break;
            case "3":
                lista = (await produto.listar()).map(p => Object.assign(new Produto(), p));
                instancia = produto;
                removerFn = produto.removerPorId;
                nomeTipo = "Produto";
                break;
            case "4":
                lista = (await endereco.listar()).map(e => Object.assign(new Endereco(), e));
                instancia = endereco;
                removerFn = endereco.removerPorId;
                nomeTipo = "Endereço";
                break;
            case "5":
                lista = (await metodoPagamento.listar()).map(m => Object.assign(new MetodoPagamento(), m));
                instancia = metodoPagamento;
                removerFn = metodoPagamento.removerPorId;
                nomeTipo = "Método de Pagamento";
                break;
            default:
                console.log("Opção de tipo inválida.\n");
                return;
        }

        if (lista.length === 0) {
            console.log(`Nenhum(a) ${nomeTipo} encontrado(a) para remoção.\n`);
            return;
        }

        console.log(`${nomeTipo}s disponíveis para remoção:`);
        lista.forEach((item, i) => {
            let displayInfo = `ID: ${item._id}`;
            if (nomeTipo === "Cliente") displayInfo += `, Nome: ${item.nome}, Email: ${item.email}`;
            if (nomeTipo === "Produto") displayInfo += `, Nome: ${item.nome}, Condição: ${item.condicao}`;
            if (nomeTipo === "Endereço") displayInfo += `, Rua: ${item.rua}, CEP: ${item.cep}`;
            if (nomeTipo === "Método de Pagamento") displayInfo += `, Tipo: ${item.tipo}`;
            console.log(`${i + 1}. ${displayInfo}`);
        });

        const indexStr = await perguntar(`Escolha o número do(a) ${nomeTipo} para remover: `);
        const index = parseInt(indexStr) - 1;

        if (isNaN(index) || index < 0 || index >= lista.length) {
            console.log("Seleção de item inválida.\n");
            return;
        }

        const itemSelecionado = lista[index];
        await removerFn.call(instancia, itemSelecionado._id);
        console.log(`${nomeTipo} removido(a) com sucesso.\n`);
    } catch (error) {
        console.error("Erro durante a remoção: " + error.message + "\n");
    }
}

async function listarTodos() {
    console.log("\n--- Listando todos os registros ---");
    try {
        const enderecos = (await endereco.listar()).map(e => Object.assign(new Endereco(), e));
        const produtos = (await produto.listar()).map(p => Object.assign(new Produto(), p));
        const metodos = (await metodoPagamento.listar()).map(m => Object.assign(new MetodoPagamento(), m));
        const pedidos = (await pedido.listar()).map(p => Object.assign(new Pedido(), p));
        const clientes = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));

        console.log("\n--- Clientes ---");
        if (clientes.length > 0) {
            clientes.forEach(c => console.log(`ID: ${c._id}, Nome: ${c.nome}, Email: ${c.email}, Telefone: ${c.telefone}, Documento: ${c.documento}, Pedido: ${c.pedido ? c.pedido._id : 'N/A'}, Endereço: ${c.endereco ? c.endereco._id : 'N/A'}`));
        } else {
            console.log("Nenhum cliente cadastrado.");
        }

        console.log("\n--- Endereços ---");
        if (enderecos.length > 0) {
            enderecos.forEach(e => console.log(`ID: ${e._id}, Rua: ${e.rua}, Número: ${e.numero}, CEP: ${e.cep}, Logradouro: ${e.logradouro}`));
        } else {
            console.log("Nenhum endereço cadastrado.");
        }

        console.log("\n--- Produtos ---");
        if (produtos.length > 0) {
            produtos.forEach(p => console.log(`ID: ${p._id}, Nome: ${p.nome}, Descrição: ${p.descricao}, Condição: ${p.condicao}`));
        } else {
            console.log("Nenhum produto cadastrado.");
        }

        console.log("\n--- Pedidos ---");
        if (pedidos.length > 0) {
            pedidos.forEach(p => console.log(`ID: ${p._id}, Data Compra: ${p.dataCompra.toISOString()}, Data Entrega: ${p.dataEntrega.toISOString()}, Produto: ${p.produto ? p.produto._id : 'N/A'}, Método Pgto: ${p.metodoPagamento ? p.metodoPagamento._id : 'N/A'}, Status: ${p.status}`));
        } else {
            console.log("Nenhum pedido cadastrado.");
        }

        console.log("\n--- Métodos de Pagamento ---");
        if (metodos.length > 0) {
            metodos.forEach(m => console.log(`ID: ${m._id}, Tipo: ${m.tipo}, Dados: ${m.dados}, Status: ${m.status}`));
        } else {
            console.log("Nenhum método de pagamento cadastrado.");
        }
        console.log();
    } catch (error) {
        console.error("Erro ao listar registros: " + error.message + "\n");
    }
}

async function menu() {
    while (true) {
        console.log("==== MENU PRINCIPAL ====");
        console.log("1. Inserir novo cliente (com todas as entidades relacionadas)");
        console.log("2. Atualizar cliente");
        console.log("3. Remover entidade (cliente, pedido, produto, endereco, metodo)");
        console.log("4. Listar todos os registros");
        console.log("5. Sair\n");

        const opcao = await perguntar("Escolha uma opção: ");
        switch (opcao) {
            case "1":
                await inserirComInput();
                break;
            case "2":
                await atualizarClienteComInput();
                break;
            case "3":
                await removerEntidadeComInput();
                break;
            case "4":
                await listarTodos();
                break;
            case "5":
                console.log("Encerrando...");
                rl.close();
                process.exit();
                break;
            default:
                console.log("Opção inválida. Por favor, tente novamente.\n");
        }
    }
}

menu();