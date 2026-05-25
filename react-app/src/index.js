import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>Hello All</h1>
      <h2>Welcome</h2>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
