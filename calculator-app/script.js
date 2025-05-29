let display = document.getElementById("display");

function appendValue(val) {
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/'];

  // Prevent multiple operators in a row
  if (operators.includes(val) && operators.includes(lastChar)) {
    display.value = display.value.slice(0, -1) + val;
  } else {
    display.value += val;
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Safer alternative to eval
    display.value = Function('"use strict";return (' + display.value + ')')();
  } catch {
    display.value = "Error";
  }
}
