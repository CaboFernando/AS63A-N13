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

    const rua = await perguntar("Rua: ");
    const numero = await perguntar("Número: ");
    const cep = await perguntar("CEP: ");
    const bairro = await perguntar("Bairro: ");
    const end = new Endereco(rua, numero, cep, bairro, true);
    const enderecoId = await end.inserir();

    const nomeProduto = await perguntar("Nome do produto: ");
    const descricaoProduto = await perguntar("Descrição: ");
    const condicaoProduto = await perguntar("Condição (novo/usado): ");
    const prod = new Produto(nomeProduto, descricaoProduto, condicaoProduto, true);
    const produtoId = await prod.inserir();

    const tipoPagamento = await perguntar("Tipo de pagamento: ");
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
}

async function atualizarClienteComInput() {
    console.log("\n--- Atualizando cliente ---");
    const clientes = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));
    if (clientes.length === 0) return console.log("Nenhum cliente encontrado.");

    clientes.forEach((c, i) => {
        console.log(`${i + 1}. ${c.nome} (${c._id})`);
    });

    const index = parseInt(await perguntar("Escolha o número do cliente: ")) - 1;
    const c = clientes[index];
    if (!c) return console.log("Cliente inválido.");

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
}

async function removerEntidadeComInput() {
    console.log("\n--- Remover entidade ---");
    const tipo = await perguntar("Tipo (cliente, pedido, produto, endereco, metodo): ");

    let lista, instancia, removerFn;

    switch (tipo.toLowerCase()) {
        case "cliente":
            lista = await cliente.listar();
            instancia = cliente;
            removerFn = cliente.removerPorId;
            break;
        case "pedido":
            lista = await pedido.listar();
            instancia = pedido;
            removerFn = pedido.removerPorId;
            break;
        case "produto":
            lista = await produto.listar();
            instancia = produto;
            removerFn = produto.removerPorId;
            break;
        case "endereco":
            lista = await endereco.listar();
            instancia = endereco;
            removerFn = endereco.removerPorId;
            break;
        case "metodo":
            lista = await metodoPagamento.listar();
            instancia = metodoPagamento;
            removerFn = metodoPagamento.removerPorId;
            break;
        default:
            console.log("Tipo inválido.\n");
            return;
    }

    if (!lista.length) return console.log("Nenhum item encontrado.");

    lista.forEach((item, i) => console.log(`${i + 1}. ID: ${item._id}`));
    const index = parseInt(await perguntar("Escolha o número do item para remover: ")) - 1;

    const itemSelecionado = lista[index];
    if (!itemSelecionado) return console.log("Item inválido.");

    await removerFn.call(instancia, itemSelecionado._id);
    console.log("Removido com sucesso.\n");
}

async function listarTodos() {
    console.log("\n--- Listando registros ---");

    const enderecos = await endereco.listar();
    const produtos = await produto.listar();
    const metodos = await metodoPagamento.listar();
    const pedidos = await pedido.listar();
    const clientes = await cliente.listar();

    console.log("\nClientes:", clientes);
    console.log("\nEndereços:", enderecos);
    console.log("\nProdutos:", produtos);
    console.log("\nPedidos:", pedidos);
    console.log("\nMétodos de Pagamento:", metodos);
    console.log();
}

async function menu() {
    while (true) {
        console.log("==== MENU PRINCIPAL ====");
        console.log("1. Inserir novo cliente");
        console.log("2. Atualizar cliente");
        console.log("3. Remover entidade");
        console.log("4. Listar todos");
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
                console.log("Opção inválida.\n");
        }
    }
}

menu();