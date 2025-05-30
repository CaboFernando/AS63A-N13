const Usuario = require("./usuarios");

async function testarInsercao() {
    const user = new Usuario("Monique", "monique@example.com");

    await user.inserir();

    //await Usuario.atualizar({nome: "Carlos"}, {email: "fer.1972@hotmail.com"});

    //await Usuario.buscar();

    //await Usuario.apagar({nome: "Carlos"}, {email: "fer.1972@hotmail.com"});
}

testarInsercao();