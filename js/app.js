let currentInput = '';
let expression = [];
let displayText = '0';
let lastCalculated = false;

function appendToDisplay(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (lastCalculated) {
            expression = [parseFloat(currentInput)];
            lastCalculated = false;
        } else if (currentInput !== '') {
            expression.push(parseFloat(currentInput)); 
        } else if (expression.length > 0) {
            expression[expression.length - 1] = value; 
            displayText = expression.join(' ') + ' ';
            updateDisplay();
            return;
        }
        expression.push(value);
        currentInput = '';
        displayText = expression.join(' ') + ' ';
    } else if (value === '.' && currentInput.includes('.')) {
        return;
    } else {
        if (lastCalculated) {
            expression = [];
            currentInput = '';
            lastCalculated = false;
        }
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        displayText = expression.join(' ') + (expression.length > 0 ? ' ' : '') + currentInput;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    expression = [];
    displayText = '0';
    lastCalculated = false;
    updateDisplay();
}

function calculate() {
    if (currentInput === '' || expression.length === 0) return;

    try {
        expression.push(parseFloat(currentInput));
        let result = expression[0];

        for (let i = 1; i < expression.length; i += 2) {
            const operator = expression[i];
            const num2 = expression[i + 1];
            switch (operator) {
                case '+':
                    result += num2;
                    break;
                case '-':
                    result -= num2;
                    break;
                case '*':
                    result *= num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        alert("Cannot divide by zero!");
                        clearDisplay();
                        return;
                    }
                    result /= num2;
                    break;
            }
        }

        result = Math.round(result * 1000000) / 1000000;
        currentInput = result.toString();
        expression = [result];
        displayText = currentInput;
        lastCalculated = true;
        updateDisplay();
    } catch (error) {
        alert("Invalid calculation!");
        clearDisplay();
    }
}

function updateDisplay() {
    document.getElementById('display').textContent = displayText || '0';
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});