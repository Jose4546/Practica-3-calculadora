let screen = document.getElementById('screen');
let currentInput = '0';
let currentOperator = null;
let prevValue = null;

function appendToScreen(value) {
    if (currentInput === '0' || currentInput === '-0') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateScreen();
}

function appendOperator(operator) {
    currentOperator = operator;
    prevValue = parseFloat(currentInput);
    currentInput = '0';
    updateScreen();
}

function calculateUnary(operation) {
    const input = parseFloat(currentInput);
    switch (operation) {
        case 'inverso':
            currentInput = (1 / input).toString();
            break;
        case 'cuadrado':
            currentInput = (input ** 2).toString();
            break;
        case 'raizCuadrada':
            currentInput = (Math.sqrt(input)).toString();
            break;
        case 'residuo':
            if (prevValue !== null) {
                currentInput = residuo(prevValue, input).toString();
            }
            break;
        default:
            break;
    }
    updateScreen();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateScreen();
    }
}

function calculateResult() {
    if (currentOperator && prevValue !== null) {
        const currentValue = parseFloat(currentInput);
        switch (currentOperator) {
            case '+':
                currentInput = suma(prevValue, currentValue);
                break;
            case '-':
                currentInput = (prevValue - currentValue).toString();
                break;
            case '*':
                currentInput = (prevValue * currentValue).toString();
                break;
            case '/':
                if (currentValue !== 0) {
                    currentInput = (prevValue / currentValue).toString();
                } else {
                    currentInput = 'Error';
                }
                break;
            default:
                break;
        }
        currentOperator = null;
        prevValue = null;
        updateScreen();
    }
}

function limpiar() {
    currentInput = '0';
    currentOperator = null;
    prevValue = null;
    updateScreen();
}

function updateScreen() {
    screen.textContent = currentInput;
}

function calculate(event) {
    if (event.target.tagName === 'BUTTON') {
        const buttonText = event.target.textContent;
        switch (buttonText) {
            case 'C':
                limpiar();
                break;
            case '=':
                calculateResult();
                break;
            case '⌫':
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    currentInput = '0';
                }
                updateScreen();
                break;
            default:
                break;
        }
    }
}

// Función de suma
const suma = (a, b) => a + b;

// Función de residuo
const residuo = (a, b) => a % b;
