document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let secondToggle = false;
    let isLogBase = false;
    let lastActionWasCalculate = false;  // Track if last action was calculate
  
    // Function to append input to the display
    window.appendToDisplay = function(input) {
      console.log(`Appending: ${input}`);  // Log what is being appended
      
      // Check if the last action was a calculation
      if (lastActionWasCalculate) {
        // Clear the display if the input is not an operator or special constant
        if (!"+-*/^.e+mod yroot log base".includes(input)) {
          if (input !== Math.PI.toFixed(15) && input !== Math.E.toFixed(15)) {
            display.value = "";
          }
        }
        lastActionWasCalculate = false;  // Reset the flag
      }
  
      // Special handling for constants like π and e
      if (input === Math.PI.toFixed(15) || input === Math.E.toFixed(15)) {
        lastActionWasCalculate = true;
      }
  
      // Clear the display value if it shows an error
      if (display.value === "Error") {
        display.value = "";
      }
  
      // Append the input to the display
      display.value += input;
    };
  
    // Function to clear the display
    window.clearDisplay = function() {
      isLogBase = false;
      display.value = '';
    };
  
    // Function to handle the calculation
    window.calculate = function() {
      display.value = display.value.replaceAll("^", "**");
      display.value = display.value.replaceAll("mod", "%");
      display.value = display.value.replaceAll("exp", "10*");
      // Handle custom yroot operator
      const yrootRegex = /(\d+(\.\d+)?) yroot (\d+(\.\d+)?)/g;
      display.value = display.value.replace(yrootRegex, (match, base, _, root) => {
        return `Math.pow(${base}, 1 / ${root})`;
      });
  
      // Handle custom log base operator
      if (isLogBase) {
        const logBaseRegex = /(\d+(\.\d+)?) log base (\d+(\.\d+)?)/g;
        display.value = display.value.replace(logBaseRegex, (match, value, _, base) => {
          return `Math.log(${value}) / Math.log(${base})`;
        });
        isLogBase = false;  // Reset the log base flag after calculation
      }
  
      try {
        display.value = eval(display.value);
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to handle square root calculation
    window.squareRoot = function() {
      try {
        display.value = Math.sqrt(parseFloat(display.value));
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to delete the last character in the display
    window.deleteLast = function() {
      display.value = display.value.slice(0, -1);
    };
  
    // Function to handle square operation
    window.square = function() {
      try {
        display.value = Math.pow(parseFloat(display.value), 2);
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  // Function to handle plus/minus toggle
window.plusMinus = function() {
    try {
      if (display.value !== "Error") {
        display.value = parseFloat(display.value) * -1;
      }
    } catch (error) {
      display.value = "Error";
    }
  
    lastActionWasCalculate = true;  // Set the flag to true after calculation
  };
  // Function to calculate factorial
window.factorial = function() {
    try {
      let result = 1;
      let number = parseInt(display.value);
      
      // Handle negative numbers
      if (number < 0) {
        display.value = "Error";
        return;
      }
      
      // Calculate factorial
      for (let i = 1; i <= number; i++) {
        result *= i;
      }
      
      // Update display with result
      display.value = result;
    } catch (error) {
      display.value = "Error";
    }
  
    lastActionWasCalculate = true;  // Set the flag to true after calculation
  };
  
    // Function to handle division operation
    window.divide = function() {
      try {
        display.value = 1 / parseFloat(display.value);
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to handle absolute value calculation
    window.abs = function() {
      try {
        display.value = Math.abs(parseFloat(display.value));
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to handle 10^x calculation
    window.tenPower = function() {
      try {
        display.value = Math.pow(10, parseFloat(display.value));
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to handle base-10 logarithm calculation
    window.log = function() {
      try {
        display.value = Math.log10(parseFloat(display.value));
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to handle natural logarithm calculation
    window.ln = function() {
      try {
        display.value = Math.log(parseFloat(display.value));
      } catch (error) {
        display.value = "Error";
      }
  
      lastActionWasCalculate = true;  // Set the flag to true after calculation
    };
  
    // Function to toggle between second functions (x², x³, √x, ³√x, etc.)
    window.toggleSecond = function() {
      secondToggle = !secondToggle;
      document.getElementById('second').classList.toggle('active', secondToggle);
  
      if (secondToggle) {
        document.getElementById('square').innerText = "x³";
        document.getElementById('square').onclick = function() {
          try {
            display.value = Math.pow(parseFloat(display.value), 3);
          } catch (error) {
            display.value = "Error";
          }
          lastActionWasCalculate = true;  // Set the flag to true after calculation
        };
  
        document.getElementById('squareRoot').innerText = "³√x";
        document.getElementById('squareRoot').onclick = function() {
          try {
            display.value = Math.cbrt(parseFloat(display.value));
          } catch (error) {
            display.value = "Error";
          }
          lastActionWasCalculate = true;  // Set the flag to true after calculation
        };
  
        document.getElementById('yRoot').innerText = "y√x";
        document.getElementById('yRoot').onclick = function() {
          appendToDisplay(' yroot ');
          lastActionWasCalculate = false;  // Do not set flag for operators
        };
  
        document.getElementById('tenPower').innerText = "2^x";
        document.getElementById('tenPower').onclick = function() {
          try {
            display.value = Math.pow(2, parseFloat(display.value));
          } catch (error) {
            display.value = "Error";
          }
          lastActionWasCalculate = true;  // Set the flag to true after calculation
        };
  
        document.getElementById('log').innerText = "logy(x)";
        document.getElementById('log').onclick = function() {
          appendToDisplay(' log base ');
          isLogBase = true;
          lastActionWasCalculate = false;  // Do not set flag for operators
        };
  
        document.getElementById('ln').innerText = "e^x";
        document.getElementById('ln').onclick = function() {
          try {
            display.value = Math.exp(parseFloat(display.value));
          } catch (error) {
            display.value = "Error";
          }
          lastActionWasCalculate = true;  // Set the flag to true after calculation
        };
      } else {
        document.getElementById('square').innerText = "x²";
        document.getElementById('square').onclick = function() {
          try {
            display.value = Math.pow(parseFloat(display.value), 2);
          } catch (error) {
            display.value = "Error";
          }
          lastActionWasCalculate = true;  // Set the flag to true after calculation
        };
  
        document.getElementById('squareRoot').innerText = "²√x";
        document.getElementById('squareRoot').onclick = window.squareRoot;
  
        document.getElementById('yRoot').innerText = "x^y";
        document.getElementById('yRoot').onclick = function() {
          appendToDisplay('^');
          lastActionWasCalculate = false;  // Do not set flag for operators
        };
  
        document.getElementById('tenPower').innerText = "10^x";
        document.getElementById('tenPower').onclick = window.tenPower;
  
        document.getElementById('log').innerText = "log";
        document.getElementById('log').onclick = window.log;
  
        document.getElementById('ln').innerText = "ln";
        document.getElementById('ln').onclick = window.ln;
      }
    };
  
    // Theme toggle button functionality
    document.getElementById("btnTheme").addEventListener("click", function() {
      document.documentElement.classList.toggle("dark");
      document.getElementById("btnTheme").innerText = document.documentElement.classList.contains("dark") ? "Light" : "Dark";
    });
  
    console.log("JavaScript Loaded");
});
