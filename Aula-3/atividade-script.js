// Carlos Fernando Dos Santos
// RA 1692984

// 1. Declare uma variável usando "let" com o nome "nome" e atribua a ela seu nome.
let nome = "Carlos Fernando Dos Santos";

// 2 Declare uma variável "idade" com valor 25 usando "var".
var idade = 25;

// 3 Tente redeclarar a variável "idade" usando "var" com outro valor.
var idade = 29; 

// 4 Tente redeclarar uma variável "nome" com "let" no mesmo escopo. O que acontece?
// let nome = "Não consigo redeclarar"; // VAI DAR ERRO!

// 5 Escreva um código que exiba "Olá, mundo!" usando alert()
let msg = "Olá, mundo!";
alert(msg);

// 6 Crie um script que exiba seu nome no console usando console.log().
console.log(nome);

// 7 Escreva uma estrutura condicional que verifique se uma variável "nota" é maior ou igual a 7.
let nota = 6;
console.log(nota >= 7 ? "Tu passou na média" : "Tu não passou na média"); 

// 8 Crie uma estrutura if/else que exiba "Par" se o número for par e "Ímpar" caso contrário
let numero = 4;
if (numero % 2 === 0)
    console.log("Par");
else
    console.log("Ímpar");

// 9 Declare duas variáveis e some seus valores, exibindo o resultado com console.log().
let first = 10;
let second = 20;
console.log(first + second);

// 10 Crie uma função que receba dois números e retorne a multiplicação deles.
function multiplicar(num1, num2){
    return num1 * num2;
}
console.log(multiplicar(10, 11));

// 11 Implemente uma função que use async/await e aguarde 1 segundo antes de mostrar "Pronto".
async function esperar1s() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Pronto");
}
esperar1s();

// 12 Declare uma variável "x" com valor 10 e incremente seu valor em 5
let x = 10;
x += 5;
console.log(x);

// 13 Escreva um código que exiba "Acesso permitido" se a idade for maior ou igual a 18.
function permission(num){
    if(num >= 18)
        console.log("Acesso permitido");
    else
        console.log("Acesso negado");
}
permission(20);

// 14 Utilize o operador ternário para verificar se um número é positivo ou negativo.
function isPositive(num){
    return num >= 0 ? "Positivo" : "Negativo";
}
console.log(isPositive(-2));

// 15 Crie um array com 3 nomes e exiba o segundo nome
var nomes = ["João", "Maria", "José"];
console.log(nomes[1]); 

// 16 Adicione um nome ao final de um array usando push()
nomes.push("Emmanuel");

// 17 Remova o primeiro elemento de um array usando shift().
nomes.shift();

// 18 Declare um objeto com as propriedades nome e idade.
var pessoa = {
    nome: 'Carlos Fernando Dos Santos',
    idade: 29
};

// 19 Acesse a propriedade "idade" de um objeto e exiba no console.
console.log(pessoa.idade);

// 20 Crie um loop for que conte de 1 a 5 e exiba os números.
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// 21 Crie uma função que exiba "Olá, [nome]" no console.
function hello(nome){
    console.log(`Olá, ${nome}`);
}
hello("Carlos");

// 22 Implemente uma Promise que resolve com "Sucesso" após 2 segundos
function criarPromiseSucessoComAtraso() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Sucesso");
        }, 2000);
    });
}
criarPromiseSucessoComAtraso().then(console.log);

// 23 Utilize setTimeout para exibir "Tempo esgotado" após 3 segundos.
setTimeout(() => {
    console.log("Tempo esgotado");
}, 3000);

// 24 Crie um script que exiba "Bem-vindo!" somente se uma variável "logado" for true
function welcome(logado){
    if (logado)
        console.log("Bem-vindo!");
}
welcome(true);

// 25 Use typeof para verificar o tipo de uma variável "nome"
function verify(nome){
    console.log(typeof nome);        
}
verify("Carlos");

// 26 Crie um script que pergunte ao usuário o nome com prompt() e exiba com alert()
function question(){
    let nome = prompt("Qual é o seu nome?");
    alert(`Olá, ${nome}!`);
}

// 27 Use template string para exibir "Meu nome é [nome] e tenho [idade] anos".
console.log(`Meu nome é ${pessoa.nome} e tenho ${pessoa.idade} anos.`);

// 28 Declare uma constante com valor 100 e tente alterá-la
const naoMuda = 100;
// naoMuda = 20; // VAI DAR ERRO!

//29 Crie um código que simule login: se usuário for "admin" e senha "123", exiba "Acesso liberado".
let usuario = "admin";
let senha = "123";

if (usuario === "admin" && senha === "123") {
    console.log("Acesso liberado");
} else {
    console.log("Acesso negado");
}

//30 Crie uma função que receba idade e retorne "maior de idade" ou "menor de idade".
function verificarIdade(idade) {
    return idade >= 18 ? "maior de idade" : "menor de idade";
}

console.log(verificarIdade(20));









