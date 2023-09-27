

export class EquationGenerator {
    firstVar: number;
    secondVar: number;
    answer: number;
    operation: any;
    constructor(){
        this.firstVar = 0;
        this.secondVar = 0;
        this.answer = 0;
        
        this.#generateNumbers();
        this.generateOperation();
        console.log("what")
    }
    #generateNumbers(){
        this.firstVar = generateRandomInteger(0,10);
        this.secondVar = generateRandomInteger(0,10);
    }

    generateOperation(){
        switch(generateRandomInteger(1,4)){
            case 1:
                this.operation = Operations.Plus;
                this.answer = this.firstVar + this.secondVar;
                break;
            case 2: 
                this.operation = Operations.Minus;
                this.answer = this.firstVar - this.secondVar;
                break;
            case 3:
                this.operation = Operations.Multiply;
                this.answer = this.firstVar * this.secondVar;
                break;
            case 4: 
                this.operation = Operations.Divide;
                this.answer = this.firstVar / this.secondVar;
                break;
        }

        
    }
    getEquation() {
        let equationString = '' + this.firstVar + this.operation+this.secondVar + '=' + this.answer;
        return(equationString);
    }
    getAnswer(){
        return(this.answer);
    }
    generateEquation(){
        this.#generateNumbers();
        this.generateOperation();
        return(this.getEquation());
    }
}

function generateRandomInteger(min: number, max: number){ // Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

    min = Math.ceil(min);
    max = Math.floor(max)+1; //+1 to make max inclusive inclusive
    return Math.floor(Math.random() * (max - min) + min); // The maximum and the minimum are inclusive
      
}

const Operations = {
    Plus: "+",
    Minus: "-",
    Multiply: "x",
    Divide: "/"
}
