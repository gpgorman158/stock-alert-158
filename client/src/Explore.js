import React, {useState, useEffect}  from "react";
import TickerDetails from './TickerDetails'
import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";


function Explore({stock, user, onAddStock}) {
    // const [newStock, setNewStock] = useState(null)
    
    // const { ticker } = useParams();

    // useEffect(() => {
    //     setNewStock(stock)
    // },[stock])
    
    return (
        
            <TickerDetails stock={stock} user={user} onAddStock={onAddStock}/>
        
    )
}
export default Explore;