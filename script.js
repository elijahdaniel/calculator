const btns = document.querySelectorAll('button');
const display = document.querySelector('.print-display');
let equation = "";
let floatingPoint = false;

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add("active");
        if (equation.length < 14) {
            if (e.target.textContent.match(/([0-9.])/)) {
                if (e.target.textContent == "." && floatingPoint === false) {
                    equation += e.target.textContent;
                    display.textContent = equation;
                    floatingPoint = true;
                } else if (e.target.textContent != ".") {
                    equation += e.target.textContent;
                    display.textContent = equation;
                }
            }

            if (e.target.textContent.match(/[\+\-\/\*]/)) {
                equation += e.target.textContent;
                display.textContent = equation;
                floatingPoint = false;
            }

            if (e.target.textContent == "=") {
                if (equation.length === 0) {
                    display.textContent = "";
                } else if ((eval(equation) != "Infinity") && (eval(equation) != "-Infinity") && !Number.isNaN((eval(equation)))) {
                    equation = String(round(eval(equation)));
                    display.textContent = equation;
                } else {
                    equation = "";
                    display.textContent = "Math Error";
                }
            }

            if (e.target.textContent == "clear") {
                equation = "";
                display.textContent = "";
                floatingPoint = false;
            }

            if (e.target.textContent == "back") {
                equation = equation.slice(0, equation.length - 1);
                display.textContent = equation;
            }
        } else {
            alert("Can only process numbers up to 13 digits.");
        }
    });
});

window.addEventListener('keypress', (e) => {
    const btns = document.querySelector(`button[data-key="${e.keyCode}"]`);

    btns.classList.add("active");
    if (equation.length < 14) {
        if (btns.textContent.match(/([0-9.])/)) {

            if (btns.textContent == "." && floatingPoint === false) {
                equation += btns.textContent;
                display.textContent = equation;
                floatingPoint = true;
            } else if (btns.textContent != ".") {
                equation += btns.textContent;
                display.textContent = equation;
            }
        }
        if (btns.textContent.match(/[\+\-\/\*]/)) {
            equation += btns.textContent;
            display.textContent = equation;
            floatingPoint = false;
        }
        if (btns.textContent == "=") {
            if (equation.length == 0) {
                display.textContent = "";
            } else if ((eval(equation) != "Infinity") && (eval(equation) != "-Infinity") && !Number.isNaN((eval(equation)))) {
                equation = String(round(eval(equation)));
                display.textContent = equation;
            } else {
                equation = "";
                display.textContent = "Math Error";
            }
        }
    } else {
        alert("Can only process numbers up to 13 digits.");
    }
});

//Remove active state of buttons
btns.forEach(btn => {
    btn.addEventListener('transitionend', (e) => {
        e.target.classList.remove('active');
    });
});

//Round off to 2 decimal
function round(num) {
    return Math.round(parseFloat((num * Math.pow(10, 2)).toFixed(2))) / Math.pow(10, 2);
}