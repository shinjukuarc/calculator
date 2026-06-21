function add(a,b) {
    return a+b
}
function subtract(a,b) {
    return a-b
}
function multiply(a,b) {
    return a*b
}
function divide(a,b) {
    return a/b
}

function operate(num1, operator, num2) {
    if (operator==='+') {return add(num1,num2)}
    if (operator==='−') {return subtract(num1,num2)}
    if (operator==='×') {return multiply(num1,num2)}
    if (operator==='÷') {return divide(num1,num2)}
}

let num1='', operator='', num2=''

function appendToCalc(input,display) {
    display.textContent+=input
}

function maxLength(num) {
    return (num<=8)
}
function undefinedOrNaN(num) {
    return (num==='undefined' || num==='NaN')
}
function undefinedAndNaN(num) {
    return (num!=='undefined' && num!=='NaN')
}

function clearAll() {
    screen.textContent=''
    num1='', operator='', num2=''
    stage=1
    result=''
}
function signChange(num) {
    if (+num>0) {
        return '-'+num
    } else if (+num<0) {
        return num.slice(1)
    } else {
        return num
    }
}
function addDigitToNumber(num, digit) {
    if (digit === '.' && num.includes('.')) return num;

    if (digit === '.' && num === '') return '0.';

    if (num === '0' && digit === '0') return '0';

    if (num === '0' && digit !== '.') return digit;

    return num + digit;
}
function formatResult(num) {
    return Number(num.toPrecision(12)).toString();
}
function convertKey(key) {
    if (key==='-') return '−'
    if (key==='/') return '÷'
    if (key==='*') return '×'
    if (key==='+') return key
}

//main code here

const backSpace = document.querySelector('#backspace') 
const clear = document.querySelector('#clear')
const equal = document.querySelector('#equal')
const operators = document.querySelectorAll('.operator')
const numbers = document.querySelectorAll('.num')
const calculator = document.querySelector('.calc')
const screen = document.querySelector('.screen')
const sign = document.querySelector('.sign')
const all = document.querySelectorAll('*')

let stage=1
let result

numbers.forEach(element=> {
    element.addEventListener('click', ()=> {
        let digit=element.textContent
        if (undefinedOrNaN(num1)) {
            screen.textContent=''
            num1='', num2=''
        }
        if (stage===1 && maxLength(num1.length)) {
            appendToCalc(digit,screen)
            num1=addDigitToNumber(num1,digit)
        }
        if (stage===2 && maxLength(num2.length)) {
            appendToCalc(digit,screen)
            num2=addDigitToNumber(num2,digit)
        }
        screen.textContent=num1+operator+num2
        screen.scrollLeft = screen.scrollWidth
    })
})
operators.forEach(element=> {
    element.addEventListener('click', ()=> {
        let digit=element.textContent
        if ((stage===1 && num1!=='') && (undefinedAndNaN(num1))) {
            appendToCalc(digit, screen)
            stage=2
            operator=digit
            screen.scrollLeft = screen.scrollWidth
        }
    })
})
backSpace.addEventListener('click', (e)=> {
    if (stage===2 && num2!=='') {
        num2=num2.slice(0,-1)
    } else if (stage===2 && num2==='') {
        operator=''
        stage=1
    } else if (stage===1 && (undefinedAndNaN(num1) && num1!=='Infinity')) {
        num1=num1.slice(0,-1)
    } else if (undefinedOrNaN(num1)) {
        num1=''
    }
    screen.textContent=num1+operator+num2
    screen.scrollLeft = screen.scrollWidth
})
equal.addEventListener('click', ()=> {
    if (num1!=='' && operator!=='' && num2!=='') {
        result=operate(+num1,operator,+num2)
        result=formatResult(result)
        num1=`${result}`
        if (operator==='÷' && num2==='0') {
            result='undefined'
            num1=`${result}`
        }
        screen.textContent=result
        screen.scrollLeft = 0
        result=''
        stage=1
        operator='', num2=''
    }
})
clear.addEventListener('click', ()=> {
    clearAll()
})
sign.addEventListener('click', ()=> {
    if (stage===1) {
        num1=signChange(num1)
    } else if (stage===2) {
        num2=signChange(num2)
    }
    screen.textContent = num1 + operator + num2
    screen.scrollLeft = 0
})

//Keyboard support

document.addEventListener('keydown', (e)=> {
    let key=e.key
    numbers.forEach(element=> {
        if (element.textContent===key) {
            element.click()
        }
    })
    operators.forEach(element=> {
        if (element.textContent===convertKey(key)) {
            element.click()
        }
    })
    if (key==='Backspace') {
        backSpace.click()
    } else if (key==='Enter') {
        equal.click()
    } else if (key==='Escape') {
        clear.click()
    }
})