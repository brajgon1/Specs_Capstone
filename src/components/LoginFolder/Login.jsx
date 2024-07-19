import React, { useState } from "react";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    }

    return (
        <div>
            <div className="login">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
            </div>

            <div className="register">
                <h2>Register</h2>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login;