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
    const { enderecos, produtos, metodosPagamento, pedidos, clientes } = await testarListar();

    if (enderecos.length > 0) {
        const e = enderecos[1];
        e.cidade = "Cidade Atualizada";
        await e.atualizar();
    }

    if (produtos.length > 0) {
        const p = produtos[1];
        p.preco += 10;
        await p.atualizar();
    }

    if (metodosPagamento.length > 0) {
        const mp = metodosPagamento[1];
        mp.tipo = "Atualizado";
        await mp.atualizar();
    }

    if (pedidos.length > 0) {
        const ped = pedidos[1];
        ped.status = "Entregue";
        await ped.atualizar();
    }

    if (clientes.length > 0) {
        const c = clientes[1];
        c.telefone = "99999-8888";
        await c.atualizar();
    }
}


//testarInsercao();
testarListar();
//testarObterPorId();
//testarAtualizacao();
//testarRemoverPorId();