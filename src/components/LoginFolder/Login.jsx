import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
import './Login.css' 

const Login = () => {
  console.log(supabase);

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [register, setRegister] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = { username, password };
    if (register) {
      body.email = email;
    }
    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        console.log(res.data);
        navigate("/")
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {register ? (
        <div className="register">
          <h1>Register</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account?{" "}
            <button onClick={() => setRegister(false)}>Login</button>
          </p>
        </div>
      ) : (
        <div className="login">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account?{" "}
            <button onClick={() => setRegister(true)}>Register</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
