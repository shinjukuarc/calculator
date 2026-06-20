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
    if (operator==='+') {add(num1,num2)}
    if (operator==='-') {subtract(num1,num2)}
    if (operator==='*') {multiply(num1,num2)}
    if (operator==='/') {divide(num1,num2)}
}

let num1='', operator='', num2=''

function appendToCalc(input,display) {
    display.textContent+=input
}

//main code here

const backSpace = document.querySelector('#backspace') 
const clear = document.querySelector('#clear')
const equal = document.querySelector('#equal')
const operators = document.querySelectorAll('.operator')
const numbers = document.querySelectorAll('.num')
const calculator = document.querySelector('.calc')
const screen = document.querySelector('.screen')

let stage=1

numbers.forEach(element=> {
    element.addEventListener('click', ()=> {
        if (stage===1 || stage===3) {
            appendToCalc(element.textContent, screen);
            (stage===1) ? num1+=element.textContent : num2+=element.textContent
        }
    })
})
operators.forEach(element=> {
    element.addEventListener('click', ()=> {
        if (stage===1) {
            appendToCalc(element.textContent, screen)
            stage=3
            operator=element.textContent
        }
    })
})
backSpace.addEventListener('click', (e)=> {
    if (stage===3 && num2!=='') {
        num2=num2.slice(0,-1)
    } else if (stage===3 && num2==='') {
        operator=''
        stage=1
    } else if (stage===1) {
        num1=num1.slice(0,-1)
    }
    screen.textContent=num1+operator+num2
})