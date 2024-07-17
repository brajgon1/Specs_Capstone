import React from "react";

const Login = () => {
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
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login;