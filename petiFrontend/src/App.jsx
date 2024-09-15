import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";


function App() {
  return <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>;
}

export default App;
