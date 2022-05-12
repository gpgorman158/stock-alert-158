import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";


function Header({onLogout, onSearch, user}) {
    const [search, setSearch] = useState("")
    
    function handleLogout (user){
        fetch("/logout_back", {
            method: "DELETE"}
        )
        onLogout();
    }
    function handleSearch (){
        onSearch(search.toUpperCase())
        setSearch("")

    }
    
    const loginOption = 
    <>
        <div className="login-loggedin">
            { user ? <div>Welcome, <em>{user.name}</em></div> : "" }
        </div>
        <Link to="/profile"><button>Profile</button></Link>
        <br></br>
        <button onClick={handleLogout}>Logout</button>
    </> 
    const loginOptionTwo = 
    <>
        <Link to="/signin"><button>Sign In</button></Link>
        <br></br>
        <Link to="/signup"><button>Sign Up</button></Link>
    </>
    
    return (
        <>
            <div className="header-color">
                <div className="header-inner-color">
                    
                        <NavLink to="/" className="logo"><b>Stock<br></br> Alert</b></NavLink>
                        <div className="search-bar">
                            <input onChange={(e) => setSearch(e.target.value)} qa-component="search-textbox" className="search-bar-input" placeholder="Search Tickers..." value={search}></input>
                            <button onClick={handleSearch}>Submit</button>
                        </div>
                        <div className="header-right">
                            { user ? loginOption : loginOptionTwo }
                        </div>
                    
                </div>
            </div>
        </>
    )
}
export default Header;