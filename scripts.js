const operatorButtons = document.querySelectorAll('[data-button-type="operator"]');
const numberButtons = document.querySelectorAll('[data-button-type="number"]');
const allClearButton = document.querySelector('[data-button-type="all-clear"]');
const deleteButton = document.querySelector('[data-button-type="delete"]');
const sumButton = document.querySelector('[data-button-type="sum"]');
const previousOperand = document.querySelector('[data-element-type="previous-operand"]');
const currentOperand = document.querySelector('[data-element-type="current-operand"]');

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;

        this.allClear();
    }

    appendNumber(number) {
        if (this.currentOperand === '0' && number === '0') {
            return;

        }
        this.currentOperand = this.currentOperand === null ? number : this.currentOperand + number;
        this.displayResult();
    }

    chooseOperator(operator) {
        this.previousOperand = this.previousOperand === null ? this.currentOperand : this.calculate();
        this.operator = operator;
        this.currentOperand = null;

        this.displayResult();
    }

    calculate() {
        if (this.currentOperand === '') {
            return;
        }

        const currentNumber = parseFloat(this.currentOperand);
        const previousNumber = parseFloat(this.previousOperand);
        let result;

        switch (this.operator) {
            case '+':
                result = currentNumber + previousNumber;
                break;
            case '-':
                result = previousNumber - currentNumber;
                break;
            case '÷':
                result = previousNumber / currentNumber;
                break;
            case '*':
                result = previousNumber * currentNumber;
                break;
            default:
                result = currentNumber;
        }

        return result.toString();
    };

    sum() {
        this.currentOperand = this.calculate();
        this.previousOperand = null;
        this.operator = null;
        this.displayResult();
    }

    delete() {
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
        this.displayResult();
    }

    allClear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = null;
        this.displayResult();
    }

    displayResult() {
        this.currentOperandElement.innerText = this.currentOperand ? this.currentOperand : '';
        this.previousOperandElement.innerText = this.previousOperand ? this.previousOperand + ' ' + this.operator : '';
    }
}

const calculator = new Calculator(previousOperand, currentOperand);

allClearButton.addEventListener('click', () => {
    calculator.allClear();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
});

sumButton.addEventListener('click', () => {
    calculator.sum();
});

operatorButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        calculator.chooseOperator(e.target.innerText);
    })
});

numberButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        calculator.appendNumber(e.target.innerText);
    })
});