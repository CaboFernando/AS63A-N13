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

async function testarInsercao() {
    await endereco.inserir();
    await produto.inserir();
    await metodoPagamento.inserir();
    await pedido.inserir();
    await cliente.inserir();
}

async function testarListar() {
    const enderecos = (await endereco.listar()).map(e => Object.assign(new Endereco(), e));
    const produtos = (await produto.listar()).map(p => Object.assign(new Produto(), p));
    const metodosPagamento = (await metodoPagamento.listar()).map(m => Object.assign(new MetodoPagamento(), m));
    const pedidos = (await pedido.listar()).map(p => Object.assign(new Pedido(), p));
    const clientes = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));

    return { enderecos, produtos, metodosPagamento, pedidos, clientes };
}



async function testarObterPorId() {
    const { enderecos, produtos, metodosPagamento, pedidos, clientes } = await testarListar();

    if (enderecos.length > 0) {
        await endereco.obterPorId(enderecos[0]._id);
    }

    if (produtos.length > 0) {
        await produto.obterPorId(produtos[0]._id);
    }

    if (metodosPagamento.length > 0) {
        await metodoPagamento.obterPorId(metodosPagamento[0]._id);
    }

    if (pedidos.length > 0) {
        await pedido.obterPorId(pedidos[0]._id);
    }

    if (clientes.length > 0) {
        await cliente.obterPorId(clientes[0]._id);
    }
}

async function testarRemoverPorId() {
    const { enderecos, produtos, metodosPagamento, pedidos, clientes } = await testarListar();

    if (clientes.length > 0) {
        await cliente.removerPorId(clientes[0]._id);
    }

    if (pedidos.length > 0) {
        await pedido.removerPorId(pedidos[0]._id);
    }

    if (metodosPagamento.length > 0) {
        await metodoPagamento.removerPorId(metodosPagamento[0]._id);
    }

    if (produtos.length > 0) {
        await produto.removerPorId(produtos[0]._id);
    }

    if (enderecos.length > 0) {
        await endereco.removerPorId(enderecos[0]._id);
    }
}

async function testarAtualizacao() {    
    const clientes = (await cliente.listar()).map(c => Object.assign(new Cliente(), c));
    if (clientes.length > 0) {
        const clienteExistente = clientes[0];
        const filtro = { _id: clienteExistente._id };

        const novosDados = {
            nome: "Nome Atualizado",
            email: "clienteatualizado@example.com",
            telefone: "99999-8888",
            documento: "123.456.789-00",
            idPedido: clienteExistente.idPedido,
            idEndereco: clienteExistente.idEndereco,
            isAtivo: true
        };

        await cliente.atualizarCliente(filtro, novosDados);
    }

    const enderecos = (await endereco.listar()).map(e => Object.assign(new Endereco(), e));
    if (enderecos.length > 0) {
        const enderecoExistente = enderecos[0];
        const filtro = { _id: enderecoExistente._id };

        const novosDados = {
            rua: "Rua Atualizada",
            numero: "456",
            cep: "12345-678",
            logradouro: "Logradouro Atualizado",
            bairro: "Bairro Atualizado",
            cidade: "Cidade Atualizada",
            complemento: "Apto 202",
            estado: "SP",
            isAtivo: true
        };

        await endereco.atualizar(filtro, novosDados);
    }

    const metodos = (await metodoPagamento.listar()).map(m => Object.assign(new MetodoPagamento(), m));
    if (metodos.length > 0) {
        const metodoExistente = metodos[0];
        const filtro = { _id: metodoExistente._id };

        const novosDados = {
            tipo: "Crédito",
            dados: "Cartão Visa",
            status: "ativo",
            detalhes: "Parcela única",
            isAtivo: true
        };

        await metodoPagamento.atualizar(filtro, novosDados);
    }

    const pedidos = (await pedido.listar()).map(p => Object.assign(new Pedido(), p));
    if (pedidos.length > 0) {
        const pedidoExistente = pedidos[0];
        const filtro = { _id: pedidoExistente._id };

        const novosDados = {
            dataCompra: new Date(),
            dataEntrega: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            idProduto: pedidoExistente.idProduto,
            idMetodoPagamento: pedidoExistente.idMetodoPagamento,
            idCliente: pedidoExistente.idCliente,
            status: "entregue",
            data: new Date(),
            isAtivo: true
        };

        await pedido.atualizar(filtro, novosDados);
    }

    const produtos = (await produto.listar()).map(p => Object.assign(new Produto(), p));
    if (produtos.length > 0) {
        const produtoExistente = produtos[0];
        const filtro = { _id: produtoExistente._id };

        const novosDados = {
            nome: "Produto Atualizado",
            descricao: "Descrição atualizada do produto",
            condicao: "novo",
            preco: 199.99,
            isAtivo: true
        };

        await produto.atualizar(filtro, novosDados);
    }
}





//testarInsercao();
//testarListar();
//testarObterPorId();
//testarRemoverPorId();
testarAtualizacao();