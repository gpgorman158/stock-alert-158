import React, {useState, useEffect}  from "react";
import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import emailCode from "./emailCode.js"

function Email() {
    
    function handlePush(){
        Email.send({
            Host: "smtp.gmail.com",
            Username: "gpgorman158@gmail.com",
            Password: "",
            To: 'gpgorman158@gmail.com',
            From: "gpgorman158@gmail.com",
            Subject: "Stock Alert - Welcome",
            Body: "You are signed up for Stock Alert weekly updates!",
          })
            .then(function (message) {
              alert("mail sent successfully")
            });
    }
    
    return (
        
        <div className="email">
            <div className="email-text">
                Press this button to send out an email to subscribed users
            </div>
            <button onClick={handlePush}>Blast!</button>
        </div>
        
    )
}
export default Email;