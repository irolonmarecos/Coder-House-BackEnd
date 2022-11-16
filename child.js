function calcular(cant) {
    let Nums = []
    let objNum = {}
    for (let i=0 ; i <= cant; i++) {
        Nums.push(Math.floor(Math.random()*1000+1))
    }


    for (const i of Nums) {
        objNum[i]
            ? objNum[i]++
            : objNum[i] = 1

    }

    return objNum
}
console.log(calcular(3));


process.on("message", (msg) => {
    console.log(msg);
    const suma = calcular(msg);
    process.send(suma); // Del hijo hacia el padre
})