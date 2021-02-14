"use strict";

// VARIABLES

// Result text
const result = document.querySelector("#res");
// All number buttons
const btnsNum = document.querySelectorAll(".buttonClass");
// All operation buttons
const btnsOperations = document.querySelectorAll(".operations");
// Clear, delete & equal buttons
const [btnClr, btnDel, btnEql] = document.querySelectorAll(".displayClass");
// Decimal point button
const decimal = document.getElementById("btnDot");

let operator = null;
let num1 = 0;
let num2 = 0;
let resetScreen = false;

// EVENT LISTENERS

// Clear results after clicking clear button
btnClr.onclick = () => {
  result.textContent = "";
  num1 = 0;
  num2 = 0;
  operator = null;
};

decimal.addEventListener("click", enterDecimal);

btnsNum.forEach((btn) => (btn.onclick = display));

// Evaluate when the proper expression is inputted
btnsOperations.forEach((btn) => btn.addEventListener("click", setOperator));

btnEql.addEventListener("click", evaluate);

btnDel.addEventListener("click", deleteNum);

// FUNCTIONS

// Functions for each of the operations
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  if (b === 0) return "ERROR!";
  return a / b;
}

function power(a, b) {
  return a ** b;
}

// Disable & enable the decimal button
function enterDecimal() {
  // limit the use of decimal point to 1
  if (resetScreen) clearScreen();
  if (result.textContent === "") result.textContent = "0";
  if (result.textContent.includes(".")) return;
  result.textContent += ".";
}

// Function to display the input data
function display(e) {
  if (resetScreen) clearScreen();

  const btn = e.target || e.srcElement;

  // Limit the input size
  if (result.textContent.length >= 15) return;

  result.textContent += btn.textContent;
}

// Operate function with 2 numbers & an operator to display the operations on calc display
function operate(operator, num1, num2) {
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "sub":
      return sub(num1, num2);
    case "mul":
      return mul(num1, num2);
    case "div":
      return div(num1, num2);
    case "power":
      return power(num1, num2);
  }
}

function clearScreen() {
  result.textContent = "";
  resetScreen = false;
}

function deleteNum() {
  result.textContent = result.textContent.slice(0, -1);
}

// Store the 1st number & operator
function setOperator() {
  if (operator !== null) evaluate();

  operator = this.id;
  num1 = +result.textContent;
  resetScreen = true;
}

// Store the 2nd number & call operate
function evaluate() {
  if (operator === null || resetScreen) return;

  num2 = +result.textContent;
  result.textContent =
    Math.round((operate(operator, num1, num2) + Number.EPSILON) * 100) / 100;
  operator = null;
}

// add keybord support
window.addEventListener("keydown", function (e) {
  // if integer or . then input
  // if +,-,/,^,* then call operate with them
  // if backsapce then call clear
  // if = call evaluate
});
// add a active selector to buttons
