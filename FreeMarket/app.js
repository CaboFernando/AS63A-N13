const Cliente = require("./modules/clientes");
const Endereco = require("./modules/enderecos");
const MetodoPagamento = require("./modules/metodoPagamentos");
const Pedido = require("./modules/pedidos");
const Produto = require("./modules/produtos");

async function testarInsercao() {
    //endereco
    //produto
    //metodoPagamento
    //pedido
    //cliente

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

testarInsercao();