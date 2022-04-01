import React from "react";
import { XYPlot,
    MarkSeries,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines
 } from 'react-vis';
 import 'react-vis/dist/style.css';

const ScatterChartD3 = ({ chartData, options }) => {

    return (
        <XYPlot 
            width={1000}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title= {options.titleXAxis} tickTotal= {10} tickSize={1} tickPadding={0}/>
            <YAxis title= {options.titleYAxis} tickTotal= {10} tickSize={1} tickPadding={0} position={'start'}/>
            <MarkSeries
                className="mark-series-example"
                strokeWidth={2}
                opacity="0.8"
                color="#330175"
                sizeRange={[5, 15]}
                data= {chartData}
            />
        </XYPlot>
      );
    }   

export default ScatterChartD3;