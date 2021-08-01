const display1 = document.querySelector('.display1');
const display2 = document.querySelector('.display2');
const tempresult = document.querySelector('.tempresult');
const numbers = document.querySelectorAll('.number');
const operation = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.all-clear')
const clearEntity = document.querySelector(".clear-entity")

let display1Num = '';
let display2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
    display2Num += e.target.innerText;
    display2.innerText = display2Num
    })
})

operation.forEach(operation => {
    operation.addEventListener('click', (e) => {
        if(!display2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(display1Num && display2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(display2Num)
        }
        clearVar(operationName)
        lastOperation = operationName
        console.log(result)
    })
})

function clearVar(name = '') {
    display1Num += display2Num + ' ' + name + ' ';
    display1.innerText = display1Num;
    display2.innerText = ''
    display2Num = ''
    tempresult.innerText = result;
}

function mathOperation() {
    if (lastOperation === "X" ) {
        result = parseFloat(result) * parseFloat(display2Num)
    } else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(display2Num)
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(display2Num)
    } else if (lastOperation === '/' ) {
        result = parseFloat(result) / parseFloat(display2Num)
    } else if (lastOperation === '%') {
        result = parseFloat(display2Num / 100)
    }
}

equal.addEventListener('click', (e) => {
    if (!display1Num || !display2Num) return;
    haveDot = false; 
    mathOperation();
    clearVar();
    display2.innerText = result;
    tempresult.innerText = '';
    display2Num = result
    display1Num = '';
})

clear.addEventListener('click', (e) => {
    display1.innerText = '0';
    display2.innerText = '0';
    display1Num = '';
    display2Num = '';
    result = '';
    tempresult.innerText = '0';
})

clearEntity.addEventListener('click', (e) => {
    display2.innerText = '';
    display2Num = '';
})

window.addEventListener('keydown', (e) => {
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.' 
    ){
        clickButton(e.key);
    } else if(
        e.key === "*" ||
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%" 
    ) {
        clickOperation(e.key);
    } else if ( e.key === "*") {
        clickOperation('X')
    } else if (e.key == "Enter" || e.key === "=") {
        clickEqual();
    }

})

function clickButton(key) {
    numbers.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operation.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
} 

function clickEqual() {
    equal.click()
}