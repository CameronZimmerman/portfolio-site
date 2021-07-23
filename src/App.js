import React from "react";
import "./App.css";

import Interactive from "./Interactive/Interactive";

export default function App() {
  return (
    <>
      <h1 className="name-heading">
        🌳CAMERON ZIMMERMAN🌳
      </h1>
      <div className="main-content">
        <Interactive />
      </div>
      <footer>
        <h3 style={{textAlign: "center"}}>
          Controls:
          <br/>
          Arrow Keys for movement
          <br/>
          Hold Shift for speed boost
          <br/>
          click to enable sound
        </h3>
      </footer>
    </>
  );
}
