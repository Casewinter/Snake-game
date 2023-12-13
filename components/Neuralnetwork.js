class level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount)
        this.outputs = new Array(outputCount)
        this.biases = new Array(outputCount)
        this.weights = []

        //Para cada neuronio de entrada
        //Vamos conectar com cada um de saida
        inputCount.forEach(element => {
            this.weights[element] = new Array(outputCount)
        });

        //Gerando um cerebro aleaotorio
        level.#randomize(this)
    }

    //static permite a serialização do método
    static #randomize(level){
        level.inputs.forEach((i, indexInput) => {
            level.outputs.forEach((o, indexOutput) => {
                //Vamos definir o valor entre menos um  e um
                //Valores de peso negativo, evitam a ativa de um neuronio  indesejado
                level.weights[indexInput][indexOutput] = Math.random() * 2 - 1
            })
        })
        
        level.biases.forEach((b, index) => {
            level.biases[index] = Math.random() * 2 -1
        })  
    }

    static feedForward(givenInputs, level){
        //Passando para cada neuronio de entrada um valor do sensor
        level.inputs.forEach((i, index) =>  {
            level.inputs[index] = givenInputs[index]
        })

        //para calcular a ativação de um neuronio
        //percorremos cada entrada, multiplicando peso por valor passado
        //e somamos o resultado individual de cada um
        //Se a soma for maior que a o limite (biases), ele é ativado
        level.outputs.forEach((o, indexOutput) => {
            let sum = 0 
            level.inputs.forEach((i, indexInput) =>  {
                sum += level.inputs[indexInput] * level.weights[indexInput][indexOutput]
            })

            if(sum > level.biases[indexOutput]){
                level.outputs[indexOutput] = 1
            } else {
                level.outputs[indexOutput] = 0
            }
        })
        return level.outputs
    }
}