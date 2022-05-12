import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup( {onSignup} ) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [subscription, setSubscription] = useState(false)
    const history = useHistory()

    function handleSignup(){
        const user = {
            name,
            email,
            phone,
            password,
            password_confirmation: confirmPassword,
            subscription
        }
        fetch("/sign_up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then(resp => resp.json())
        .then(userJson => {
            onSignup(userJson)
            
        })
    }
    return (
        <div className="signup">
            <div>
                <img src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg" alt="Profile logo"/>
            </div>
            <form onSubmit={handleSignup}>
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br></br>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="text"
                    id="phone"
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    // autoComplete="current-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <br></br>
                <button variant="fill" color="primary" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    )
}
export default Signup;