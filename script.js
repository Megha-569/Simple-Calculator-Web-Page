// Get the calculator display
let display = document.getElementById("display");


// ========================================
// ADD VALUE
// ========================================

// Add a number or operator to the display
function appendValue(value) {

    display.value += value;
}


// ========================================
// CLEAR DISPLAY
// ========================================

// Clear the complete calculator display
function clearDisplay() {

    display.value = "";
}


// ========================================
// DELETE LAST CHARACTER
// ========================================

// Delete the last entered character
function deleteLast() {

    display.value = display.value.slice(0, -1);
}


// ========================================
// CALCULATE
// ========================================

// Calculate the entered mathematical expression
function calculate() {

    // Check whether the display is empty
    if (display.value === "") {
        return;
    }

    try {

        // Store the expression before calculating
        let expression = display.value;

        // Check division by zero
        if (/\/0(?!\d)/.test(display.value)) {

            display.value = "Cannot divide by 0";

            return;
        }

        // Calculate the mathematical expression
        let result = eval(display.value);

        // Check whether the result is valid
        if (!isFinite(result)) {

            display.value = "Invalid";

        } else {

            // Show the result
            display.value = result;

            // Add calculation to history
            addToHistory(expression, result);
        }

    } catch (error) {

        // Handle invalid expressions
        display.value = "Invalid";
    }
}


// ========================================
// ADD TO HISTORY
// ========================================

// Add a calculation to the history section
function addToHistory(expression, result) {

    // Get the history container
    let historyList = document.getElementById("historyList");

    // Create a new history item
    let historyItem = document.createElement("div");

    // Give the item a CSS class
    historyItem.className = "history-item";

    // Display expression and result
    historyItem.textContent = expression + " = " + result;

    // Add newest calculation at the top
    historyList.prepend(historyItem);
}


// ========================================
// CLEAR HISTORY
// ========================================

// Remove all calculations from history
function clearHistory() {

    document.getElementById("historyList").innerHTML = "";
}


// ========================================
// KEYBOARD SUPPORT
// ========================================

// Allow calculator operations using the keyboard
document.addEventListener("keydown", function(event) {

    // Get the pressed key
    let key = event.key;


    // Numbers and decimal point
    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        appendValue(key);
    }


    // Arithmetic operators
    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        appendValue(key);
    }


    // Enter key calculates the result
    else if (key === "Enter") {

        event.preventDefault();

        calculate();
    }


    // Backspace deletes the last character
    else if (key === "Backspace") {

        event.preventDefault();

        deleteLast();
    }


    // Escape clears the calculator
    else if (key === "Escape") {

        clearDisplay();
    }

})