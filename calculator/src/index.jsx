import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LogicalStorage } from "./components/logic/LogicalStorage";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <LogicalStorage>
            <App />
        </LogicalStorage>
    </React.StrictMode>
);
