import React, {useState, useEffect}  from "react";
import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

function Extra() {
    const [allTickers, setAllTickers] = useState(null)
    const [databaseTickers, setDatabaseTickers] = useState(null)
    const [lowRange, setLowRange] = useState("")
    const [highRange, setHighRange] = useState("")
    const [aboveList, setAboveList] = useState(null)
    const [belowList, setBelowList] = useState(null)
    const [middleList, setMiddleList] = useState(null)
    const [intervalId, setIntervalId] = useState(0);
    const [tickerIndex, setTickerIndex] = useState(0)
    
    function handlePull(){
        fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP')
        .then(resp => resp.json())
        .then(allTickersJson => {
            setAllTickers(allTickersJson.tickers)
            console.log(allTickersJson.tickers)
        })
    }
    function handleDatabasePull (){
        fetch(`/stocks`).then((r) => {
            if (r.ok) {
              r.json().then((databaseJson) => {
                console.log(databaseJson)
                setDatabaseTickers(databaseJson)
                
              });
            }
        });
    }

    //adds all listed tickers in stock market API into my database, only ticker though
    let i = 0;
    useEffect(() => {
        if(allTickers){
                    
                    const interval = setInterval(() => {
                        fetch("/stocks", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ticker: allTickers[i].ticker}),
                        }).then(resp => resp.json())
                        .then(tickerJson => 
                        console.log(tickerJson)) 
                        i++;
                    }, 500)
                    
                    return () => clearInterval(interval)
        }
    }, [allTickers]);

    let x = 0;
    function handleSICInfo(){
        if(databaseTickers){
            const interval = setInterval(() => {
                fetch(`https://api.polygon.io/v3/reference/tickers/${databaseTickers[x].ticker}?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP`)           
                .then(resp => resp.json())
                .then(tickerJson => {
                    console.log(tickerJson)
                    fetch(`/stocks/${x+1}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ sic_description: `${tickerJson.results.sic_description}`, sic_code: `${tickerJson.results.sic_code}` })
                    }).then(resp => resp.json())
                    .then(sicJson => {
                        console.log(sicJson)
                        x++})
                })
             
                
            }, 500)
            
            return () => clearInterval(interval)
        }

    }
    
    function handleListByPrice(e){
        e.preventDefault()
        if(lowRange && highRange){
            const middleList = allTickers.filter( ticker => ticker.day.o >= lowRange && ticker.day.o <= highRange)
            setMiddleList(middleList)
            setAboveList(null)
            setBelowList(null)
        }
        else if( lowRange && highRange === ""){
            const aboveList = allTickers.filter( ticker => ticker.day.o >= lowRange)
            setAboveList(aboveList)
            setBelowList(null)
            setMiddleList(null)
        }
        else if( lowRange === "" && highRange){
            const belowList = allTickers.filter( ticker => ticker.day.o <= highRange)
            setBelowList(belowList)
            setAboveList(null)
            setMiddleList(null)
        }
        setLowRange("")
        setHighRange("")
    }

    return (
    <>
        <div className="extra">
            <div className="extra-text">
                Press this button to load all stocks basic info
            </div>
            <button onClick={handlePull}>Pull list of Stocks - API</button>
        </div>
        <div className="extra">
            <div className="extra-text">
                Press this button to pull basic stock info from database 
            </div>
            <button onClick={handleDatabasePull}>Pull from Database</button>
        </div>
        <div className="extra">
            <div className="extra-text">
                Add all tickers symbols into database once first button is pushed
                
            </div>
            <button onClick={handleSICInfo}>Push SIC Database</button>
        </div>
        <div className="list-stocks-low-high">
            <form onSubmit={handleListByPrice}>
                <label htmlFor="low">Low Value:</label>
                <input
                    type="number"
                    id="low"
                    value={lowRange}
                    onChange={(e) => setLowRange(e.target.value)}
                />
                <br></br>
                <label htmlFor="high">High Value:</label>
                <input
                    type="number"
                    id="high"
                    value={highRange}
                    onChange={(e) => setHighRange(e.target.value)}
                />
                <br></br>
                <button variant="fill" color="primary" type="submit">
                    Stocks By Price
                </button>
            </form>
            <div>Above
                <div>
                    {aboveList ? aboveList.map( stock => <div className="stock-table"><a href={`/explore/${stock.ticker}`}>{stock.ticker}</a> - ${stock.day.o} </div>) : "Not the current sort"}
                </div>
            </div>
            <div>Below
                <div>
                {belowList ? belowList.map( stock => <div className="stock-table"><a href={`/explore/${stock.ticker}`}>{stock.ticker}</a> - ${stock.day.o} </div>) : "Not the current sort"}
                </div>
            </div>
            <div>Between
                <div>
                {middleList ? middleList.map( stock => <div className="stock-table"><a href={`/explore/${stock.ticker}`}>{stock.ticker}</a> - ${stock.day.o} </div>) : "Not the current sort"}
                </div>
            </div>
        </div>
    </>
        
    )
}
export default Extra;