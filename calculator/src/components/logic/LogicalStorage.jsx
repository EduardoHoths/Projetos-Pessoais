import React from "react";

export const LogicalContext = React.createContext();

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["+", "-", "*", "/"];

export const LogicalStorage = ({ children }) => {
    const [num, setNum] = React.useState(0);
    const [oldNum, setOldNum] = React.useState(null);
    const [numDisplay, setNumDisplay] = React.useState("");
    const [operator, setOperator] = React.useState(null);
    const [result, setResult] = React.useState(false);

    React.useEffect(() => {
        if (num.toString().includes(".")) {
            if (num.toString().length >= 10) {
                setNumDisplay(Number(num).toFixed(8).replace(".", ","));
            } else {
                setNumDisplay(num.toString().replace(".", ","));
            }
        } else {
            setNumDisplay(num);
        }
    }, [num]);

    function handleNumber({ target }) {
        if (num.toString().length === 13 && !result) {
            return;
        }

        if (operator && result && !oldNum) {
            setOldNum(num);
            setNum(target.innerText);
            return;
        }

        if (result && !operator) {
            setNum(target.innerText);
            setResult(false);
            return;
        }
        if (num === 0 || num === "0") {
            setNum(target.innerText);
        } else {
            setNum(num + target.innerText);
        }
    }
    function operatorInput({ target }) {
        if (operator && num !== 0) {
            calculate("");
            setOperator(target.innerText);
            return;
        }
        setOperator(target.innerText);
        setNum(0);

        if (oldNum === null) {
            setOldNum(num);
        }
    }

    function allClear() {
        setNum(0);
        setOldNum(null);
        setOperator(null);
        setResult(false);
    }

    function backspace() {
        if (num === 0) {
            return;
        }
        if (num.toString().length === 1) {
            setNum(0);
            setResult(false);
            return;
        }
        setNum(num.toString().slice(0, -1));
    }
    function percentage() {
        if (operator === "+") {
            setNum(parseFloat(oldNum) + (parseFloat(num) / 100) * parseFloat(oldNum));
        }
        if (operator === "-") {
            setNum(parseFloat(oldNum) - (parseFloat(num) / 100) * parseFloat(oldNum));
        }
        if (operator === "x") {
            setNum(parseFloat(oldNum) * (parseFloat(num) / 100) );
        }
        if (operator === "/") {
            setNum(parseFloat(oldNum) / (parseFloat(num) / 100));
        }
        setOperator(null);
        setOldNum(null);
        setResult(true)
    }

    function decimal() {
        if (num.toString().includes(".")) {
            return;
        }
        setNum(num + ".");
    }
    function calculate({ target }) {
        if (oldNum === null) {
            return;
        }
        if (operator === "+") {
            setNum((parseFloat(oldNum) + parseFloat(num)).toString());
            setOldNum(null);
        }
        if (operator === "-") {
            setNum((parseFloat(oldNum) - parseFloat(num)).toString());
            setOldNum(null);
        }
        if (operator === "x") {
            setNum((parseFloat(oldNum) * parseFloat(num)).toString());
            setOldNum(null);
        }
        if (operator === "/") {
            setNum((parseFloat(oldNum) / parseFloat(num)).toString());
            setOldNum(null);
        }

        setResult(true);

        if (target && target.innerText === "=") {
            setOperator(null);
        }
    }

    window.onkeydown = ({ key }) => {
        if (numbers.includes(key)) {
            handleNumber({ target: { innerText: key } });
            return;
        }
        if (operators.includes(key)) {
            operatorInput({ target: { innerText: key } });
            return;
        }
        if (key === ",") {
            decimal();
            return;
        }
        if (key === "Backspace") {
            backspace();
            return;
        }
        if (key === "Delete") {
            allClear();
            return;
        }
        if (key === "=") {
            calculate({ target: { innerText: key } });
            return;
        }
        if (key === "%") {
            percentage();
            return;
        }
    };

    return (
        <LogicalContext.Provider
            value={{
                numDisplay,
                operator,
                allClear,
                backspace,
                percentage,
                handleNumber,
                calculate,
                decimal,
                operatorInput,
            }}
        >
            {children}
        </LogicalContext.Provider>
    );
};
