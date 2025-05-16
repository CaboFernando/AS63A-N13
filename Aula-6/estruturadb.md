Tabela 1
    cd.createCollection("clientes")
    db.clientes.insertOne({
        nome: "",
        email: "",
        telefone: "",
        documento: "",
        idEndereco: ObjectId(),
        idMetodoPagamento: ObjectId(),
        isAtivo: true
    })

    Clientes
        id
        nome
        email
        telefone
        documento
        idEndereco
        idMetodoPagamento
        isAtivo

Tabela 2
    cd.createCollection("enderecos")
    db.enderecos.insertOne({
        rua
        numero
        cep
        logradouro
        isAtivo
    })

    Enderecos
        id
        rua
        numero
        cep
        logradouro
        isAtivo

Tabela 3
    cd.createCollection("metodoPagamentos")
    db.metodoPagamentos.insertOne({
        tipo
        dados
        isAtivo
    })

    MetodoPagamentos
        id
        tipo
        dados
        isAtivo

Tabela 4
    cd.createCollection("pedidos")
    db.pedidos.insertOne({
        dataCompra
        dataEntrega
        idProduto
        status
        isAtivo
    })    

    Pedidos
        id
        dataCompra
        dataEntrega
        idProduto
        status
        isAtivo

Tabela 5
    cd.createCollection("produtos")
    db.produtos.insertOne({
        nome
        descricao
        condicao
        isActivo
    })
    
    Produtos
        id
        nome
        descricao
        condicao
        isActivo
