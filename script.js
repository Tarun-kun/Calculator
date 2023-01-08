/*-------------------------------------------VARIABLES/ASSIGNING VALUES--------------------------------------------------------------------------------*/
const currentTextData = document.querySelector('[data-current-value]');
const previousTextData = document.querySelector('[data-previous-value]');
const numericals = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

/*-------------------------------------------CLASS--------------------------------------------------------------------------------*/

class Calculator{
    constructor(currentTextHandler, previousTextHandler) {
        this.currentTextHandler = currentTextHandler;
        this.previousTextHandler = previousTextHandler;
        this.clear() 
    }
    clear(){
        this.currentOperator = '';
        this.previousOperator = '';
        this.operation = undefined;
    }
    addValue(number){
        if(number =="." && this.currentOperator.includes("."))return;  //preventing more decimals to be added
        this.currentOperator = this.currentOperator.toString() + number.toString() //making numbers to string to display
    }
    delete(){
      this.currentOperator = this.currentOperator.toString().slice(0,-1) // "Slice " methode works for strings and "Splice" for array
    }
    operator(symbol){
        if(this.currentOperator === '') return
        if (this.previousOperator !== '') {
            this.resultant() //just automation
        }
        this.operation = symbol; //proving value to operators and converting undefined to +,-,*,/ to work with
        this.previousOperator = this.currentOperator ;
        this.currentOperator = '';
    }
    resultant(){
        let result;
        let current = parseFloat(this.currentOperator); //converting sring to numbers for calculation
        let prev = parseFloat(this.previousOperator);   //converting sring to numbers for calculation
        if(isNaN(current) || isNaN(prev)) return;   
        switch (this.operation) { //switchs are better if-else for multiple instances
            case "+":
                result = prev + current
                break
            case "-":
                result = prev - current
                break
            case "*":
                result = prev * current
                break
            case "/":
                result = prev / current
                break
            default:
                return
        }
        this.currentOperator = result;
        this.operation = undefined; //after calculation again making opration value to "undefine" for new set of calculation
        this.previousOperator = "";
    }

    updateDisplay(){
        this.currentTextHandler.innerText = this.currentOperator;
        if (this.operation != null) {
	        this.previousTextHandler.innerText = `${(this.previousOperator)} ${(this.operation)}`; //displaying numbers and operation together 
        } else {
            this.previousTextHandler.innerText = ''
        }
    }
}

let calculator = new Calculator(currentTextData,previousTextData);

/*-------------------------------------------EVENT LISTENERS--------------------------------------------------------------------------------*/

numericals.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.addValue(button.innerText);
        calculator.updateDisplay();
    })
});

allClearButton.addEventListener("click",()=>{
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', ()=>{
  calculator.delete();
  calculator.updateDisplay();
})

operators.forEach(operations_symbols => {
    operations_symbols.addEventListener('click',()=>{
        calculator.operator(operations_symbols.innerText);
        calculator.updateDisplay();
    })
});

equalButton.addEventListener('click',()=>{
    calculator.resultant();
    calculator.updateDisplay();
})