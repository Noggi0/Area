import './Register.css';
import { Notification } from 'rsuite';
import React, { useState } from "react";
import Axios from 'axios';
import {
    Link
} from "react-router-dom";

function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    if (usernameReg.length > 0 && passwordReg.length > 0) {
      Axios.post(`http://localhost:8080/register?username=${usernameReg}&password=${passwordReg}`)
      .then((response) => {
        if (response.status == 200) {
          Notification.success({
            title: "Success",
            duration: 4000,
            description: "User Registered : " + usernameReg
          })
          console.log("User Registered : " + usernameReg);
        } else {
          Notification.warning({
            title: "Failure",
            duration: 4000,
            description: "Error with the register request response: wrong reponse status " + response.headers
          })
          console.error("Register.js : Error with the register request response: wrong reponse status.");
        }
      });
    }
  }

  return (
    <div className="Register">
      <header className="Register-header">
        <img src="logo.png" className="Register-logo" alt="logo" />
        <p className="Register-Title">
          <b>Register to our Area !</b>
        </p>
        <input 
        className="Register-username" 
        name="username" 
        placeholder="Username" 
        maxLength="36"
        onChange={(e) => {
          setUsernameReg(e.target.value);
        }}></input>
        <input 
        className="Register-password"
        name="password"
        placeholder="Password"
        maxLength="36"
        type="password"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}></input>

        <Link to="/login" className="RegisterLink" onClick={register}><b><h6>Register</h6></b></Link>

      </header>
    </div>
  );
}

export default Register;
