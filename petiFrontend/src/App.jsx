import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter } from "react-router-dom";


function App() {
  return <div>
      <BrowserRouter>
        <Landing to={'/'}/>
      </BrowserRouter>
    </div>;
}

export default App;
