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

btnClr.addEventListener("click", clear);

decimal.addEventListener("click", enterDecimal);

btnsNum.forEach((btn) => (btn.onclick = display));

btnsOperations.forEach((btn) =>
  btn.addEventListener("click", storeOperator.bind(this, btn.textContent))
);

btnEql.addEventListener("click", evaluate);

btnDel.addEventListener("click", deleteNum);

window.addEventListener("keydown", keyboardSupport);

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

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return sub(num1, num2);
    case "*":
      return mul(num1, num2);
    case "/":
      return div(num1, num2);
    case "^":
      return power(num1, num2);
  }
}

// Function to display the input data
function display(e) {
  if (resetScreen) clearScreen();

  const btn = e.target || e.srcElement;

  // Limit the input size
  if (result.textContent.length >= 15) return;

  result.textContent += btn.textContent;
}

// Disable & enable the decimal button
function enterDecimal() {
  // limit the use of decimal point to 1
  if (resetScreen) clearScreen();
  if (result.textContent === "") result.textContent = "0";
  if (result.textContent.includes(".")) return;
  result.textContent += ".";
}

// Store the 1st number & operator
function storeOperator(op) {
  if (operator !== null) evaluate();

  operator = op;
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

// This is for AC button
function clear() {
  result.textContent = "";
  num1 = 0;
  num2 = 0;
  operator = null;
}

// This is for clearing screen in between calculations
function clearScreen() {
  result.textContent = "";
  resetScreen = false;
}

function deleteNum() {
  result.textContent = result.textContent.slice(0, -1);
}

// add keybord support
function keyboardSupport(e) {
  if (resetScreen) clearScreen();
  // if integer or . then input
  if (e.key >= 0 && e.key <= 9) {
    result.textContent += e.key;
  }
  // if +,-,/,^,* then call operate with them
  if ("+-/*^".includes(e.key)) {
    storeOperator(e.key);
  }
  // if backsapce then call clear
  if (e.key === "Backspace") {
    deleteNum();
  }
  // if = call evaluate
  if (e.key === "=" || e.key == "Enter") {
    evaluate();
  }
  // if . call enterDecimal
  if (e.key === ".") {
    enterDecimal();
  }
  // If esc call
  if (e.key === "Escape") {
    clear();
  }
}
