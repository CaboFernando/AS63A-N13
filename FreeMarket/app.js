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


async function testarAtualizacao() {
    await endereco.atualizar();
    await produto.atualizar();
    await metodoPagamento.atualizar();
    await pedido.atualizar();
    await cliente.atualizar();
}

//testarInsercao();
//testarListar();
testarObterPorId();
//testarAtualizacao();