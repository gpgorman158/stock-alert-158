import React, {useState, useEffect}  from "react";

import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";


function Footer({onSubscribe}) {
    
    function handleSubscribe(){
        onSubscribe()
    }
    
    return (
        
        <div className="footer">
            <div className="footer-subscribe">
                Subscribe for weekly email updates on the latest market trends
            </div>
            <button onClick={handleSubscribe}>Subscribe!</button>
            <div className="footer-bottom">
                <div className="footer-left"></div>
                <div className="footer-right"></div>
            </div>

        </div>
        
    )
}
export default Footer;