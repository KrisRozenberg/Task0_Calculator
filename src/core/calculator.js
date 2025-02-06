// regex: 
// positive number with e+- (extra large or extra small one)
// OR 
// negative number with e+-
// OR
// positive number
// OR
// negative number
const numberRegex = /(\d+(\.\d+)?e[+-]\d+)|\(-\d+(\.\d+)?e[+-]\d+\)|(\d+(\.\d*)?)|\(-(\d+(\.\d*)?)\)/g;

let numbers;
let operators;

function getNumberOperatorsArrays(numericExpression) {
    numbers = numericExpression
        .match(numberRegex)
        .map(n => {
            if (n.indexOf('(') !== -1) return Number(n.slice(1, -1));
            else return Number(n);
        });
    operators = numericExpression.replace(numberRegex, '').split('');
}

export function calculateExpression(numericExpression) {
    getNumberOperatorsArrays(numericExpression);

    for (let i = 0; i < numbers.length - 1; i++) {
        if (isOperatorPrioritized(operators[i])) {
            if (operators[i] === '/' && numbers[i] === 0 && numbers[i+1] === 0) return 'NaN';
            if (operators[i] === '/' && numbers[i+1] === 0) return 'Infinity';
            if (operators[i] === '%' && numbers[i+1] === 0) return 'NaN';

            numbers[i+1] = getBasicOperationResult(numbers[i], numbers[i+1], operators[i]);

            numbers[i] = undefined;
            operators[i] = undefined;
        }
    }

    numbers = numbers.filter(n => n !== undefined);
    operators = operators.filter(o => o !== undefined);

    for (let i = 0; i < numbers.length - 1; i++) {
        numbers[i+1] = getBasicOperationResult(numbers[i], numbers[i+1], operators[i]);
    }

    return numbers[numbers.length - 1];
}

function isOperatorPrioritized(operator) {
    return operator === 'x' ||
        operator === '/' ||
        operator === '%';
}

function getBasicOperationResult(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
    }
}