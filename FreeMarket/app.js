const Cliente = require("./modules/clientes");
const Endereco = require("./modules/enderecos");
const MetodoPagamento = require("./modules/metodoPagamentos");
const Pedido = require("./modules/pedidos");
const Produto = require("./modules/produtos");

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
    const enderecos = await endereco.listar();
    const produtos = await produto.listar();
    const metodosPagamento = await metodoPagamento.listar();
    const pedidos = await pedido.listar();
    const clientes = await cliente.listar();

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
    const { enderecos, produtos, metodosPagamento, pedidos, clientes } = await testarListar();

    if (enderecos.length > 0) {
        const e = enderecos[0];
        e.cidade = "Cidade Atualizada";
        await e.atualizar();
    }

    if (produtos.length > 0) {
        const p = produtos[0];
        p.preco += 10;
        await p.atualizar();
    }

    if (metodosPagamento.length > 0) {
        const mp = metodosPagamento[0];
        mp.tipo = "Atualizado";
        await mp.atualizar();
    }

    if (pedidos.length > 0) {
        const ped = pedidos[0];
        ped.status = "Entregue";
        await ped.atualizar();
    }

    if (clientes.length > 0) {
        const c = clientes[0];
        c.telefone = "99999-8888";
        await c.atualizar();
    }
}


//testarInsercao();
//testarListar();
//testarObterPorId();
//testarRemoverPorId();
testarAtualizacao();