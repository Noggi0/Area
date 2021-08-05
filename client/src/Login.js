import './Login.css';
import {
  Link,
  useHistory
} from "react-router-dom";
import React, { useState } from "react";
import Axios from 'axios';
import { Button, Notification } from 'rsuite';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  
  const login = () => {
    if (username.length > 0 && password.length > 0) {
      Axios.post(`http://localhost:8080/login?username=${username}&password=${password}`)
      .then((response) => {
        if (response.status == 200) {
          console.log("Welcome " + username + " !");
          localStorage.setItem('username', username);
          history.push("/home")
        } else {
          Notification.warning({
            title: "Error " + response.headers,
            duration: 5000,
            description: "Error with the login request response: wrong reponse status."
          })
          console.error("Login.js : Error with the login request response: wrong reponse status.");
        }
      });  
    } else {
      Notification.warning({
        title: "Error",
        duration: 5000,
        description: "Error with the login request response: wrong post. Try to register as a valid user."
      })
    }
  }

  return (
    <div className="Login">
      <header className="Login-header">
        <img src="logo.png" className="Login-logo" alt="logo" />
        <p>
          <b className="LoginTitle">Welcome to our Area !</b>
        </p>
        <input
        className="Login-username"
        name="username"
        placeholder="Username"
        maxLength="36"
        onChange={(e) => {
          setUsername(e.target.value);
        }}></input>
        <input
        className="Login-password"
        name="password"
        placeholder="Password"
        maxLength="36"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}></input>

        <Button className="logButton" onClick={login}><b>LogIn</b></Button>

        <Link to="/register" className="LogLink"><b><h6>New user ? Create an account here</h6></b></Link>
      
      </header>
    </div>
  );
}

export default Login;
