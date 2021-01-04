"use strict";

// Result element
const result = document.getElementById("res");
// All buttons except clear & equal
const inputBtns = document.querySelectorAll(".buttonClass");
// Clear & equal buttons
const [btnClr, btnEql] = document.querySelectorAll(".operationsClass");

// Function to display data on result element
const action = function (e) {
  const btn = e.target || e.srcElement;

  result.textContent += btn.innerHTML;
};

// Loop over input buttons to display data on result
inputBtns.forEach((btn) => (btn.onclick = action));

// Clear results after clicking clear button
btnClr.onclick = () => (result.textContent = "");

// Evaluate result of expression & display it
btnEql.onclick = function () {
  try {
    result.innerHTML = eval(result.innerHTML);
  } catch (err) {
    alert("Please enter a valid expression!");
  }
};
