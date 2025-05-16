const Cliente = require("./modules/clientes");
const Endereco = require("./modules/enderecos");
const MetodoPagamento = require("./modules/metodoPagamentos");
const Pedido = require("./modules/pedidos");
const Produto = require("./modules/produtos");

async function testarInsercao() {
    const user = new Usuario("Monique", "monique@example.com");

    await user.inserir();
}

testarInsercao();