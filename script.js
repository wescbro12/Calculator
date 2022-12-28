// creating a calculator class
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// display functions
const inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

const inputDecimal = (dot) => {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
};

const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// actual calulation function

const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

// this is to reset the calulator
const resetCalc = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

// this is to update the display as buttons are clicked
const updateDisplay = () => {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
}

updateDisplay();

// adding event listeners to the buttons
const keys = document.querySelector('.cal-keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    // The switch statment will allow for flow control of the operations
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case 'clear':
            resetCalc();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
})