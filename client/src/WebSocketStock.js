import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";



import { client, w3cwebsocket as W3CWebSocket } from "websocket";

import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";

const ws = new WebSocket('wss://delayed.polygon.io/stocks')
const APIKEY = process.env.POLY_API_KEY || 'Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP'


// .replace(/["]+/g, )
function WebSocketStock({ticker}) {
  const [wsStocks, setWsStocks] = useState({})
  const [randomWsStock, setRandomWsStock] = useState({})
  
  const defaultStock = ticker ? ticker : "AAPL"

console.log((ticker))
  useEffect(() => {
    // const interval = setInterval(() => {
    fetch('https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=Mjklp2ow_hsSIwEGLIN_mjakIdlE2mKP')
    .then(resp => resp.json())
    .then(tickerJson => {
        // setAllStickers(tickerJson.tickers)
        setRandomWsStock(tickerJson.tickers[Math.floor(Math.random() * 4000)])
        console.log(tickerJson)})
    // }, 10000);
    // return () => clearInterval(interval);
    
    }, []);
    console.log(randomWsStock.ticker)
    // randomWsStock !== {} ? randomWsStock.ticker : 
    useEffect(() => {
        if (randomWsStock.ticker !== {}){
            ws.onopen = () => {
                console.log("connected")
            ws.send(`{"action":"auth","params":"${APIKEY}"}`)
            
            }
            ws.onmessage = ({data}) => {
                ws.send(`{"action":"subscribe","params":"A.${defaultStock}"`)
                const [message] = JSON.parse(data);
                console.log(data)
                console.log(ws)
                switch (message.ev) {
                    case "AM":
                        console.log(message)
                        setWsStocks(message)
                        break;
                    case "A":
                        setWsStocks(message)
                        break;
                    default:
                        console.log("Default case");
                }
            }
            ws.onclose = () => console.log("closed")      
        }
        else{
            console.log("if statement for blank data successful")
        }
    }, [defaultStock]);

    let stockChange = wsStocks ? ((wsStocks.c - wsStocks.op)/wsStocks.op).toFixed(3) : ""
    console.log(stockChange)

    return (
        <>
            <div className="ws-scroll">
                {wsStocks ? <h2 className={stockChange > 0 ? "ws-stock-info-positive" : "ws-stock-info-negative"}>{wsStocks.sym} Change: {stockChange}%</h2> : ""}
            </div>
        </>
    )
}
export default WebSocketStock;