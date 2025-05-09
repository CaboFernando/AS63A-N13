function caculaMedia(numeros){
    if(!Array.isArray(numeros) || numeros.length === 0){
        throw new Error('É necessário fornecer um array com pelo menos um número!');
    }

    const soma = numeros.reduce((acc, num) => acc + num, 0);
    return soma / numeros.length;
}

module.exports = caculaMedia;