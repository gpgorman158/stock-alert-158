import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";


function Signin({ user, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    let allLogin;
    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      fetch("/login_back", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => setUser(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
      history.push("/")
    }
    if (!user){
        allLogin = 
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                id="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                // autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button variant="fill" color="primary" type="submit">
                {isLoading ? "Loading..." : "Login"}
            </button>
        </form>
    }
    else {
        allLogin = "You are already logged in"
    }

    return (
        <div className="login-form">Log In To Your Account
            {allLogin}
        </div>
    );
}
export default Signin;