
+---------------------+
|     Clientes        |
+---------------------+
| id                 |
| nome               |
| email              |
| telefone           |
| documento          |
| idPedido           | ---> Pedidos.id (Array)
| idEndereco         | ---> Enderecos.id (Array)
| isAtivo            |
+---------------------+


+---------------------+
|     Enderecos       |
+---------------------+
| id                 |
| rua                |
| numero             |
| cep                |
| logradouro         |
| isAtivo            |
+---------------------+


+-----------------------------+
|   MetodosPagamentos         |
+-----------------------------+
| id                          |
| tipo                        |
| dados                       |
| status                      |
| isAtivo                     |
+-----------------------------+


+---------------------+
|      Pedidos        |
+---------------------+
| id                 |
| dataCompra         |
| dataEntrega        |
| idProduto          | ---> Produtos.id
| idMetodoPagamento  | ---> MetodosPagamentos.id
| status             |
| isAtivo            |
+---------------------+


+---------------------+
|      Produtos       |
+---------------------+
| id                 |
| nome               |
| descricao          |
| condicao           |
| isAtivo            |
+---------------------+
