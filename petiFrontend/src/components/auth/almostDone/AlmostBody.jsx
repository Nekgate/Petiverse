import React, { useState } from "react";
import "../../../components/auth/almostDone/AlmostBody.css";
import { Link } from "react-router-dom";

function AlmostBody() {

    const [formData, setFormData] = useState({
      phoneNumber: "",
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

  return <div className="almost-background">
      <div className="almost-inner">
        <div className="almost-left">
          <img src="/images/allpet1.png" alt="Logo" />
        </div>
        <div className="almost-right">
          <h1>Almost Done!</h1>
          <p>Input the 4 digit number that has been sent to your email.</p>
          <form onSubmit={handleSubmit} className="all-form">
            <div className="all-form-in">
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="4-digit Number" required />
            </div>
            <Link to="/successSignup" className="btn-almost">
              Proceed
            </Link>
          </form>
        </div>
      </div>
    </div>;
}

export default AlmostBody