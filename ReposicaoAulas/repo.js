// 1. Crie um objeto chamado `aluno` com as propriedades: `nome`, `idade` e `curso`.
let aluno = {
    nome: "Carlos",
    idade: 22,
    curso: "Ciência da Computação"
  };
  
  // 2. Adicione uma nova propriedade chamada `matriculado` ao objeto `aluno`, com valor `true`.
  aluno.matriculado = true;
  
  // 3. Altere o valor da propriedade `curso` para "Engenharia".
  aluno.curso = "Engenharia";
  
  // 4. Remova a propriedade `idade` do objeto `aluno`.
  delete aluno.idade;
  
  // 5. Acesse o valor da propriedade `nome` do objeto `aluno` e armazene em uma variável chamada `nomeAluno`.
  let nomeAluno = aluno.nome;
  
  // 6. Crie uma array chamada `alunos`, contendo 3 objetos com as propriedades: `nome` e `nota`.
  let alunos = [
    { nome: "Ana", nota: 8.5 },
    { nome: "Bruno", nota: 6.0 },
    { nome: "Clara", nota: 9.0 }
  ];
  
  // 7. Usando `map`, crie um novo array com apenas os nomes dos alunos do array `alunos`.
  let nomesAlunos = alunos.map(a => a.nome);
  
  // 8. Use `filter` para retornar os alunos com nota maior ou igual a 7.
  let aprovados = alunos.filter(a => a.nota >= 7);
  
  // 9. Converta o objeto `aluno` para uma string JSON.
  let alunoJSON = JSON.stringify(aluno);
  
  // 10. Converta a string JSON anterior de volta para objeto.
  let alunoObj = JSON.parse(alunoJSON);
  
  // 11. Crie um objeto `livro` com as propriedades: `titulo`, `autor`, `anoPublicacao`, e dentro dele, um objeto `editora` com `nome` e `cidade`.
  let livro = {
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    anoPublicacao: 1954,
    editora: {
      nome: "HarperCollins",
      cidade: "Londres"
    }
  };
  
  // 12. Acesse o nome da editora do objeto `livro`.
  let nomeEditora = livro.editora.nome;
  
  // 13. Faça uma função chamada `listarPropriedades(obj)` que receba um objeto e retorne um array com os nomes das propriedades.
  function listarPropriedades(obj) {
    return Object.keys(obj);
  }
  
  // 14. Crie uma função chamada `atualizarObjeto(obj, chave, valor)` que atualize dinamicamente uma propriedade de um objeto.
  function atualizarObjeto(obj, chave, valor) {
    obj[chave] = valor;
  }
  
  // 15. Escreva uma função chamada `removerPropriedade(obj, chave)` que remova uma propriedade de um objeto.
  function removerPropriedade(obj, chave) {
    delete obj[chave];
  }
  