import React from "react";
import BarChart from "./BarChart"
import MultiBar from "./MultiBar"
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useParams, useRouteMatch, useSearchParams } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

function TickerDetails({stock, user, onAddStock}) {
    const [chartOne, setChartOne] = useState(null)
    const [chartTwo, setChartTwo] = useState(null)
    const [newStock, setNewStock] = useState(null)
    const [relatedStocks, setRelatedStocks] = useState(null)
    const [news, setNews] = useState(null)
    const [databaseTicker, setDatabaseTicker] = useState("")
    const [timeFreq, setTimeFreq] = useState("hour")
    const [tickerList, setTickerList] = useState({})
    const [ohlc, setOhlc] = useState("c")
    const [startDate, setStartDate] = useState("2022-04-01")
    const [endDate, setEndDate] = useState("2022-04-15")
    const api_key = "?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP"
    const { ticker } = useParams();

    function handleDropDown (e){
        setTimeFreq(e.target.value)
    }
    function handleOhlc (e){
        setOhlc(e.target.value)
    }
    function handleDateStart (e){
        setStartDate(e.target.value)
    }
    function handleDateEnd (e){
        setEndDate(e.target.value)
    }
    function handleNewsClick (){
        fetch(`https://api.polygon.io/v2/reference/news?ticker=${ticker}&apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP`).then((r) => {
                if (r.ok) {
                  r.json().then((newsJson) => {
                    setNews(newsJson)
                    
                  });
                }
            });
        
    }

    function handleFavorite (){
        if(user){
            if(databaseTicker === ticker){ 
                if(!user.stocks.find(stock => stock.ticker === ticker)){
                    console.log("success")
                    fetch(`/stocks/${ticker}`)
                    .then(resp => resp.json())
                    .then(tickerJson => {
                        fetch("/stock_joins", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({user_id: user.id, stock_id: tickerJson.id}),
                        }).then(resp => resp.json())
                        .then(joinJson => {
                                console.log(joinJson)
                                onAddStock()
                                alert('Stock added to favorites')})       
                        })
                }
                else{
                    alert("Stock is already in your favorited list")
                }
            }
                    
            else {
                if(!user.stocks.find(stock => stock.ticker === ticker)){ //if the stock doesn't match an existing stock in database, create and join stock and match to user
                    fetch("/stocks", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ticker: ticker, sic_code: newStock.results.sic_code, sic_description: newStock.results.sic_description}),
                    }).then(resp => resp.json())
                    .then(tickerJson => {
                        console.log(tickerJson)
                        setDatabaseTicker(tickerJson)
                        fetch("/stock_joins", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({user_id: user.id, stock_id: tickerJson.id}),
                        }).then(resp => resp.json())
                        .then(joinJson => {
                                console.log(joinJson)
                                onAddStock()
                                alert('Stock created and added to favorites')
                        })
                        })
                }
                else{
                    alert("Stock is already in your favorited list")
                }
            }
        }

        else{
            alert("please login first")
        }
    }

    useEffect(() => {
        if(ticker !== false){
            fetch(`/stocks/${ticker}`).then((r) => {
                if (r.ok) {
                  r.json().then((databaseTickerJson) => {
                    setDatabaseTicker(databaseTickerJson.ticker)
                    console.log(databaseTickerJson.ticker)
                  });
                }
            });
        }
        }, [ticker]);

        

    useEffect(() => {
        if(ticker !== ""){
            fetch(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP`).then((r) => {
                if (r.ok) {
                  r.json().then((stockJson) => {
                    setNewStock(stockJson)
                  });
                }
            });
            fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/${timeFreq}/${startDate}/${endDate}?adjusted=true&sort=asc&limit=50000&apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP`).then((r) => {
                if (r.ok) {
                  r.json().then((chartJson) => {
                    setChartOne(chartJson)
                    setChartTwo(chartJson)
                  });
                }
            });
        }
        else{
            alert("need valid ticker")
        }
      }, [ticker, timeFreq, endDate, startDate]);

    useEffect(() => {
        if(ticker !== ""){
            fetch(`/stocks`).then((r) => {
                if (r.ok) {
                    r.json().then((databaseStocksJson) => {
                        setRelatedStocks(databaseStocksJson)
                        console.log(databaseStocksJson)
                    });
                }
            });
        }
    }, [ticker]);
    
    let relatedStocksOnly = relatedStocks && newStock ? relatedStocks.filter(stock => Number(stock.sic_code) === Number(newStock.results.sic_code) && stock.ticker !== ticker ) : null
    let newsList = news ? news.results.map(article => {
        return(<>
            <h3>{article.title}</h3>
            <div><b>Author: {article.author}</b></div>
            <div>Tickers Mentioned: {article.tickers[0]},{article.tickers[1]},{article.tickers[2]},{article.tickers[3]}</div>
            <a href={article.article_url}>{article.article_url}</a>
            </>)}
        ): ""
    return (
        
        <div className="stock-details"> 
           
            <div className="general-stock-info">
                <h1>{newStock ? newStock.results.name: ""}</h1>
                
                {/* <img src={newStock ? newStock.results.branding.icon_url + api_key: ""}/> */}
                {newStock && newStock.results.branding ? <img className="stock-logo" src={newStock.results.branding.logo_url + api_key} alt={newStock.results.ticker}/> : <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="placeholder"/>}
                <p>{newStock ? `Ticker: ${newStock.results.ticker}`: ""}</p>
                <p>{newStock ? newStock.results.description: ""}</p>
                <p>{newStock && newStock.results.market_cap ? `Market Cap: ${newStock.results.market_cap.toLocaleString('en-US')}`: ""}</p>
                <p>{newStock && newStock.results.total_employees ? `Employees: ${newStock.results.total_employees.toLocaleString('en-US')}`: ""}</p>
                <p>{newStock ? `Industry: ${newStock.results.sic_description}`: ""}</p>
                <p>{newStock ? <a href={newStock.results.homepage_url}>{newStock.results.homepage_url}</a> : ""}</p>
                <button onClick={handleFavorite}>Add to Favories</button>
                <div className="related-stocks-label">Related Stocks</div>
                <div className="related-stocks">
                    {relatedStocksOnly && relatedStocksOnly.length > 0 ? relatedStocksOnly.map(stock => <div>Ticker: <a href={`/explore/${stock.ticker}`}>{stock.ticker}</a></div>): ""}
                </div>
                <div className="current-stock-news">
                    <div className="news-header">Latest {ticker} News</div>
                    <button onClick={handleNewsClick}>Load News for Ticker</button>
                    <div className="news-list">{newsList ? newsList : ""}</div>
                </div>
                
                
            </div>
            <div className="stock-detail-charts">
                <div className="dropdown">
                    <label>
                        Update Time Interval
                        <select value={timeFreq} onChange={handleDropDown}>
                            <option value="minute">minute</option>
                            <option value="hour">hour</option>
                            <option value="day">day</option>
                            <option value="week">week</option>
                            <option value="month">month</option>
                        </select>
                    </label>
                    <label>
                        Select OHLC Value
                        <select value={ohlc} onChange={handleOhlc}>
                            <option value="o">Open</option>
                            <option value="h">High</option>
                            <option value="l">Low</option>
                            <option value="c">Close</option>
                        </select>
                    </label>
                    <label htmlFor="start">Start Date:</label>
                    <input type="date" id="start" name="trip-start" onChange={handleDateStart} value={startDate} min="2020-01-01" max="2022-5-04"></input>
                    <label htmlFor="start">End Date:</label>
                    <input type="date" id="start" name="trip-start" onChange={handleDateEnd} value={endDate} min="2020-01-01" max="2022-5-04"></input>
                </div>
                <BarChart chartOne={chartOne} ohlc={ohlc}/>
                <MultiBar chartTwo={chartTwo}/>
            </div>
            
            
        </div>
        
    )
}
export default TickerDetails;