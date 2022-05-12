import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";


function Home({favorites}) {
    const [gain, setGain] = useState(null)
    const [lose, setLose] = useState(null)
    const [popular, setPopular] = useState(null)

    useEffect(() => {
        fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP')
        .then(resp => resp.json())
        .then(gainJson => {
            let sixGains = gainJson.tickers.slice(0,6)
            setGain(sixGains)
            })
    }, []);
    useEffect(() => {
        fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/losers?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP')
        .then(resp => resp.json())
        .then(loseJson => {
            let sixLoses = loseJson.tickers.slice(0,6)
            setLose(sixLoses)
            })
    }, []);
    useEffect(() => {
        fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP')
        .then(resp => resp.json())
        .then(popularJson => {
            let volumeArray = popularJson.tickers.map(stock => {
                let stockTicker = stock.ticker 
                let volumeChange = stock.day.v - stock.prevDay.v
                let volumeObject = {ticker: stockTicker, volume: volumeChange}
                return volumeObject;
            })
            let topPopular = volumeArray.sort((a,b)=> b.volume - a.volume) 
            setPopular(topPopular.slice(0,6))
            })
    }, []);
    
    return (
        <div className="block-horizontal">
            <div className="top-changes">
                <span className="home-block-header">Top Daily Gainers/Losers</span><br></br>
                <span className="home-block-header">Gainers</span>
                {/* <div className="gainers"> Gainers */}
                    {gain ? 
                        gain.map(stock => (
                        <div className="stock-table">
                            <p>Ticker: <a href={`/explore/${stock.ticker}`}>{stock.ticker}</a></p>
                            <p>Current Price: ${stock.min.c.toFixed(2)}</p>
                            <p>Daily Percent Change: {stock.todaysChangePerc.toFixed(2)}%</p>
                        </div>
                        ) ): null}
                {/* </div> */}
                <span className="home-block-header">Losers</span>
                {/* <div className="losers"> Losers */}
                    {lose ? 
                        lose.map(stock => (
                        <div className="stock-table">
                            <p>Ticker: <a href={`/explore/${stock.ticker}`}>{stock.ticker}</a></p>
                            <p>Current Price: ${stock.min.c.toFixed(2)}</p>
                            <p>Daily Percent Change: {stock.todaysChangePerc.toFixed(2)}%</p>
                        </div>
                        ) ): null}
                {/* </div> */}
            </div>
            <div className="popular">
                <span className="home-block-header">Popular Stocks by Volume</span>
                {popular ? 
                        popular.map(stock => (
                        <div className="stock-table">
                            <p>Ticker: <a href={`/explore/${stock.ticker}`}>{stock.ticker}</a></p>
                            <p>Volume Increase DoD: {stock.volume.toLocaleString('en-US')}</p>
                        </div>
                ) ): null}
            </div>
            <div id="favorites">
                <span className="home-block-header">Your Favorited Stocks</span>
                
                    {favorites.map(favorite => <p>Ticker: <a href={`/explore/${favorite.ticker}`}>{favorite.ticker}</a></p>)}
                
            </div>
        </div>
    )
}
export default Home;