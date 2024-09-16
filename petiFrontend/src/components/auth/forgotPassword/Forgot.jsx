import React, {useState} from 'react';
import "../../../components/auth/forgotPassword/Forgot.css";
import { Link } from "react-router-dom";

function Forgot() {
  const [formData, setFormData] = useState({
    email: ""
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
  };

  return <div className="forgot-background">
      <div className="forgot-inner">
        <div className="forgot-left">
          <img src="/images/forpet.png" alt="Logo" />
        </div>
        <div className="forgot-right">
          <h1>Forgot Your Password?</h1>
          <p>Enter the email connected to your account.</p>
          <form onSubmit={handleSubmit} className="for-form">
            <div className="for-form-in">
              <input type="email" name="email" value={formData.phoneNumber} onChange={handleChange} placeholder="name@gmail.com" required />
            </div>
            <Link to="/checkEmail" className="btn-forgot">
              Proceed
            </Link>
          </form>
        </div>
      </div>
    </div>;
}

export default Forgot