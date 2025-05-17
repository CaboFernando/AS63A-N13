const Cliente = require("./modules/clientes");
const Endereco = require("./modules/enderecos");
const MetodoPagamento = require("./modules/metodoPagamentos");
const Pedido = require("./modules/pedidos");
const Produto = require("./modules/produtos");

async function testarInsercao() {    
    const endereco = new Endereco();
    const produto = new Produto();
    const metodoPagamento = new MetodoPagamento();
    const pedido = new Pedido();
    const cliente = new Cliente();

    await endereco.inserir();
    await produto.inserir();
    await metodoPagamento.inserir();
    await pedido.inserir();
    await cliente.inserir();
}

async function testarListar() {    
    const endereco = new Endereco();
    const produto = new Produto();
    const metodoPagamento = new MetodoPagamento();
    const pedido = new Pedido();
    const cliente = new Cliente();

    await endereco.listar();
    await produto.listar();
    await metodoPagamento.listar();
    await pedido.listar();
    await cliente.listar();
}

async function testarAtualizacao() {    
    const endereco = new Endereco();
    const produto = new Produto();
    const metodoPagamento = new MetodoPagamento();
    const pedido = new Pedido();
    const cliente = new Cliente();

    await endereco.atualizar();
    await produto.atualizar();
    await metodoPagamento.atualizar();
    await pedido.atualizar();
    await cliente.atualizar();
}

//testarInsercao();
testarListar();
//testarAtualizacao();