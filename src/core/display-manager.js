import { calculateExpression } from './calculator'

const inputValue = document.getElementById('inputValue');
const lastNumberRegex = /(\d+(\.\d*)?)|\(-(\d+(\.\d*)?)\)$/g;
const lastNumberWithoutParenthesesRegex = /(\d+(\.\d*)?)$/g;
let isResultShownFlag = false;

export function calculate() {
    if (
        inputValue.value === 'Infinity' ||
        inputValue.value === 'NaN'
    ) return;

    inputValue.value = calculateExpression(inputValue.value);
    isResultShownFlag = true;
    inputValue.scrollLeft = 0;
}

export function clearInput() {
    inputValue.value = '0';
}

export function mutateInputValue(buttonValue) {
    switch (buttonValue) {
        case '.':
            addPoint();
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
        case '%': 
            addOperator(buttonValue);
            break;
        case '+/-': 
            changeSign();
            break;
        default: 
            addNumber(buttonValue);
    }

    // stick scrollbar to the right to see the end of the input
    inputValue.scrollLeft = inputValue.scrollWidth - inputValue.clientWidth;
}

function addPoint() {
    const lastChar = inputValue.value.slice(-1);

    if (lastChar === '.' || lastChar === ')') return;
    
    // after '=' change result to '0.'
    else if (isResultShownFlag) {
        inputValue.value = '0.';
        isResultShownFlag = false;
        return;
    }
    else if (inputValue.value === '0') {
        inputValue.value += '.';
        return;
    }
    // after operator add '0.'
    else if (isOperatorSign(lastChar)) {
        inputValue.value += '0.';
    }
    //check if it's the first point for the number
    else {
        const numbers = inputValue.value.match(lastNumberWithoutParenthesesRegex);
        if (!numbers[numbers.length - 1].includes('.')) {
            inputValue.value += '.';
        }
    }
}

//negative number is shown ONLY in format '(-number)'
function changeSign() {
    if (inputValue.value === '0') return;
    // after '=' block changing operation for 'Infinity' & 'NaN' value
    if (isResultShownFlag && 
        (inputValue.value === 'Infinity' || inputValue.value === 'NaN')
    ) return;

    // normalize negative number show after '='
    if (isResultShownFlag && inputValue.value.slice(0, 1) === '-') {
        inputValue.value = inputValue.value.slice(1);
        return;
    }

    const lastChar = inputValue.value.slice(-1);

    // block changing operation for operators
    if (isOperatorSign(lastChar)) return;

    //get last number in input value
    const numbers = inputValue.value.match(lastNumberRegex);
    let targetNumber = numbers[numbers.length - 1];

    // block changing operation for '0' value
    if (targetNumber === '0') return;

    const targetLength = targetNumber.length;
    if (targetNumber.includes(')')) {
        targetNumber = targetNumber.slice(2, -1);
    }
    else {
        targetNumber = `(-${targetNumber})`;
    }

    inputValue.value = inputValue.value.slice(0, -targetLength) + targetNumber;

    if (isResultShownFlag) isResultShownFlag = false;
}

function addOperator(buttonValue) {
    // after '=' block adding operator for 'Infinity' & 'NaN' value
    if (isResultShownFlag && 
        (inputValue.value === 'Infinity' || inputValue.value === 'NaN')
    ) return;
    const lastChar = inputValue.value.slice(-1);

    // prevent doubling operators
    if (lastChar === buttonValue) return;
    
    // change-operator logic
    if (isOperatorSign(lastChar)) {
        inputValue.value = inputValue.value.slice(0, -1) + buttonValue;
        return;
    }

    // normalize negative number show after '='
    if (isResultShownFlag && inputValue.value.slice(0, 1) === '-') {
        inputValue.value = `(${inputValue.value})`;
    }
    inputValue.value += buttonValue;

    if (isResultShownFlag) isResultShownFlag = false;
}

function addNumber(buttonValue) {
    // after '=' change result to typed number
    if (isResultShownFlag) {
        isResultShownFlag = false;
        inputValue.value = buttonValue;
        return;
    }
    if (inputValue.value === '0') {
        inputValue.value = buttonValue;
        return;
    }
    // prevent adding right after negative number
    if (inputValue.value.slice(-1) === ')') return;

    inputValue.value += buttonValue;
}

function isOperatorSign(value) {
    return value === '+' || 
        value === '-' || 
        value === 'x' || 
        value === '/' || 
        value === '%';
}