// 1
let nome = "Carlos Fernando Dos Santos";

// 2
var idade = 25;

// 3
var idade = 29; 

// 4
// let nome = "Não consigo redeclarar"; // VAI DAR ERRO!

// 5
let msg = "Olá, mundo!";
alert(msg);

// 6
console.log(nome);

// 7
let nota = 6;
console.log(nota >= 7 ? "Tu passou na média" : "Tu não passou na média"); 

// 8
let numero = 4;
if (numero % 2 === 0)
    console.log("Par");
else
    console.log("Ímpar");

// 9
let first = 10;
let second = 20;
console.log(first + second);

// 10
function multiplicar(num1, num2){
    return num1 * num2;
}
console.log(multiplicar(10, 11));

// 11
async function esperar1s() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Pronto");
}
esperar1s();

// 12
let x = 10;
x += 5;
console.log(x);

// 13
function permission(num){
    if(num >= 18)
        console.log("Acesso permitido");
    else
        console.log("Acesso negado");
}
permission(20);

// 14
function isPositive(num){
    return num >= 0 ? "Positivo" : "Negativo";
}
console.log(isPositive(-2));

// 15
var nomes = ["João", "Maria", "José"];
console.log(nomes[1]); 

// 16
nomes.push("Emmanuel");

// 17
nomes.shift();

// 18
var pessoa = {
    nome: 'Carlos Fernando Dos Santos',
    idade: 29
};

// 19
console.log(pessoa.idade);

// 20
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// 21
function hello(nome){
    console.log(`Olá, ${nome}`);
}
hello("Carlos");

// 22
function criarPromiseSucessoComAtraso() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Sucesso");
        }, 2000);
    });
}
criarPromiseSucessoComAtraso().then(console.log);

// 23
setTimeout(() => {
    console.log("Tempo esgotado");
}, 3000);

// 24
function welcome(logado){
    if (logado)
        console.log("Bem-vindo!");
}
welcome(true);

// 25
function verify(nome){
    console.log(typeof nome);        
}
verify("Carlos");

// 26
function question(){
    let nome = prompt("Qual é o seu nome?");
    alert(`Olá, ${nome}!`);
}

// 27
console.log(`Meu nome é ${pessoa.nome} e tenho ${pessoa.idade} anos.`);

// 28
const naoMuda = 100;
// naoMuda = 20; // VAI DAR ERRO!

//29
let usuario = "admin";
let senha = "123";

if (usuario === "admin" && senha === "123") {
    console.log("Acesso liberado");
} else {
    console.log("Acesso negado");
}

//30
function verificarIdade(idade) {
    return idade >= 18 ? "maior de idade" : "menor de idade";
}

console.log(verificarIdade(20));









