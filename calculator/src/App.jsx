import React from "react";
import ButtonsPanel from "./components/ButtonsPanel";
import Display from "./components/Display";
import "./styles/style.scss";

function App() {
    return (
        <main>
            <Display />
            <ButtonsPanel />
        </main>
    );
}

export default App;
