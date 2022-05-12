import React from "react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2"
import { Line } from "react-chartjs-2"
import Chart from 'chart.js/auto'
import Moment from 'react-moment'

function BarChart({ohlc, chartOne}) {
    
    return (
        <>
            {chartOne ? 
            <Line 
             data={{
                labels: chartOne.results.map(stock => {
                    let unix = stock.t
                    let date = new Date(unix);
                    let timestamp = date.toLocaleString();  
                    return timestamp;
                }),
                datasets: [
                    {
                        label: chartOne.ticker,
                        data: chartOne.results.map((stock) =>(stock[ohlc])),
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
                 maintainAspectRatio: true,
                 scales: {
                     yAxes:[{
                         ticks: {
                             beginAtZero: true,
                         }
                     }]
                 }
             }}
           /> : ""}
           
        </>
    )
}
export default BarChart;