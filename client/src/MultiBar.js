import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';


function MultiBar( {chartTwo} ) {

    return (
        <>
            {chartTwo && chartTwo.results ? 
            <Bar 
             data={{
                labels: chartTwo.results.map(stock => {
                    let unix = stock.t
                    let date = new Date(unix);
                    let timestamp = date.toLocaleString();  
                    return timestamp;
                }),
                datasets: [
                    {
                        label: chartTwo.ticker,
                        data: chartTwo.results.map(stock =>(stock.v)),
                        backgroundColor: [
                            'rgb(142, 194, 237)',
                        ],
                        borderColor: [
                            'rgb(23, 40, 78)',
                        ],
                        borderWidth: 1,
                        
                    },
                    
                ],
             }}
             height = {400}
             width = {1200}
             options={{
                chart: {
                    type: 'candlestick',
                    height: 350
                  },
                  title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                  },
                  xaxis: {
                    type: 'datetime'
                  },
                  yaxis: {
                    tooltip: {
                      enabled: true
                    }
                  }
             }}
           /> : ""}
           
        </>
    )
}

export default MultiBar;