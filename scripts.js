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
        if ((this.currentOperand === '0' && number === '0') || (this.currentOperand.includes('.') && number === '.')) {
            return;

        }
        this.currentOperand = this.currentOperand === '' ? number : this.currentOperand + number;
    }

    chooseOperator(operator) {
        this.previousOperand = this.previousOperand === '' ? this.currentOperand : this.calculate();
        this.operator = operator;
        this.currentOperand = '';
    }

    calculate() {
        const currentNumber = parseFloat(this.currentOperand);
        const previousNumber = parseFloat(this.previousOperand);

        if (isNaN(currentNumber) || isNaN(previousNumber)) return '';
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
        this.previousOperand = '';
        this.operator = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.substring(0, this.currentOperand.length - 1);
    }

    allClear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = null;
    }

    getFormattedNumber(number) {
        const parts = number.split('.');
        const firstPart = parts[0];
        const secondPart = parts[1] ? parts[1] : '';
        if (!firstPart || firstPart === '0') {
            return number;
        } else {
            return parseFloat(firstPart).toLocaleString('en') + '.' + secondPart;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand ? this.getFormattedNumber(this.currentOperand) : '';
        this.previousOperandElement.innerText = this.previousOperand ? this.previousOperand + ' ' + this.operator : '';
    }
}

const calculator = new Calculator(previousOperand, currentOperand);

allClearButton.addEventListener('click', () => {
    calculator.allClear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

sumButton.addEventListener('click', () => {
    calculator.sum();
    calculator.updateDisplay();
});

operatorButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        calculator.chooseOperator(e.target.innerText);
        calculator.updateDisplay();
    })
});

numberButtons.forEach(item => {
    item.addEventListener('click', (e) => {
        calculator.appendNumber(e.target.innerText);
        calculator.updateDisplay();
    })
});