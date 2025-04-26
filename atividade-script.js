//1

let nome = "Carlos Fernando Dos Santos";

//2

var idade = 25;

// 3

var idade = 29;

//4

//let nome = "Não consigo redeclarar";

//5

let msg = "Olá Mundo!"

alert(msg);

//6

console.log(nome);

//7

let nota = 6;

alerte(nota >= 7 ? "Tu passou na média" : "Tu não passou na média")

//8


if(nota % 2)
    console.log("Par");
else
    console.log("Ímpar");

//9

let first = 10;
let second = 20;

console.log(first + second);

//10

function soma(num1, num2){
    return num1 + num2;
}

soma(10,11);

//11

async function esperar1s() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Pronto");
  }
  
  esperar1s();

//12

let x = 10;

for (let index = 0; index < 11; index++) {
    x += 5;
}

//13

function permission(num){
    if(num >= 18)
        console.log("Acesso Permitido")
}

permission(20);

//14

function isPositive(num){
    return num >= 0 ? "Positivo" : "Negativo";
}

isPositive(-2);

//15

var nomes = ["João", "Maria", "José"];

console.log(nome[1]);


//16

nomes.push("Emmanuel");

//17

nomes.shift();

//18

var pessoa = {
    nome : 'Carlos Fernando Dos Santos',
    idade : 29
}

//19

console.log(pessoa.idade);

//20

for (let index = 0; index < 5; index++) {
    console.log(index+1);
}

//21

function hello(nome){
    console.log(`Olá, ${nome}`);
}

hello("Carlos");

//22

function criarPromiseSucessoComAtraso() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Sucesso");
      }, 2000);
    });
  }

// 23

setTimeout(function() {
    console.log("Tempo esgotado");
  }, 3000);

//24

function wellcome(logado){
    if(logado)
        alert("Bem vindo!")
}

wellcome(true);

//25

function verify(nome){
    console.log(typeof nome);        
}

verify(20);

//26

function question(){
    let nome = prompt("Qual é o seu nome?");

    console.log(`Olá, ${nome}!`);
}

question();

//27

console.log(`Meu nome é ${pessoa.nome} e tenho ${pessoa.idade} anos.`)

//28

const naoMuda = 100;

naoMuda = 20;

//29









