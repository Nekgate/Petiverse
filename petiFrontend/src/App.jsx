import React from "react";
import Landing from "./pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup/Signup";
import Almost from "./pages/auth/almostDone/Almost";
import Success from "./pages/auth/successSignup/SuccessSignup";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import CheckEmail from "./pages/auth/checkEmail/Check";
import ResetPassword from "./pages/auth/resetPassword/Resetpass";
import ResetSuccess from "./pages/auth/resetSuccess/ResetSuccess";
import Login from "./pages/auth/login/Login";

function App() {
  return <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/almostDone" element={<Almost />} />
          <Route path="/successSignup" element={<Success />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/checkEmail" element={<CheckEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/resetSuccess" element={<ResetSuccess />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>;
}

export default App;
