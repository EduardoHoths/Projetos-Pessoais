import React from "react";
import { LogicalContext } from "./logic/LogicalStorage";

const ButtonsPanel = () => {
    const {
        allClear,
        backspace,
        percentage,
        operatorInput,
        handleNumber,
        decimal,
        calculate,
    } = React.useContext(LogicalContext);
    return (
        <div>
            <button className="gray" onClick={allClear}>
                AC
            </button>
            <button className="gray" onClick={backspace}>
                C
            </button>
            <button className="gray" onClick={percentage}>
                %
            </button>
            <button className="orange" onClick={operatorInput}>
                /
            </button>

            <button onClick={handleNumber}>7</button>
            <button onClick={handleNumber}>8</button>
            <button onClick={handleNumber}>9</button>
            <button className="orange" onClick={operatorInput}>
                x
            </button>

            <button onClick={handleNumber}>4</button>
            <button onClick={handleNumber}>5</button>
            <button onClick={handleNumber}>6</button>
            <button className="orange" onClick={operatorInput}>
                -
            </button>

            <button onClick={handleNumber}>1</button>
            <button onClick={handleNumber}>2</button>
            <button onClick={handleNumber}>3</button>
            <button className="orange" onClick={operatorInput}>
                +
            </button>

            <button onClick={handleNumber} className="bigger">
                0
            </button>
            <button onClick={decimal}>,</button>
            <button onClick={calculate}>=</button>
        </div>
    );
};

export default ButtonsPanel;
