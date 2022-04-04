import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData, title }) => {
    return (
        <Line data={ chartData }
        height = { 400 }
        width = { 800 }
        options = {
            {
            plugins: {
                title: {
                    display: true,
                    text: title,
                    padding: {
                        top: 10,
                        bottom: 30
                    },
                    font: {
                        size: 18
                    },
                    color: '#330175'
                }
            }
        }
        }
    />
    );
}
 
export default LineChart;
