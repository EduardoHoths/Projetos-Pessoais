import React from "react";
import { LogicalContext } from "./logic/LogicalStorage";

const Display = () => {
    const { numDisplay, operator } = React.useContext(LogicalContext);

    return (
        <div className="display">
            <small>{operator}</small>
            <h1>{numDisplay}</h1>
        </div>
    );
};

export default Display;
