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

let num1, operator, num2

