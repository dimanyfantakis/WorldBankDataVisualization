import React, { useDebugValue } from "react";
import axios from "axios";
import { useState } from "react";
import useFetch from "../utils/useFetch";
import ScatterChart from "../components/charts/ScatterChart";
import MultiRangeSlider from "../components/slider/MultiRangeSlider";
import MeasurementSelectField from "../components/forms/MeasurementSelectField";
import CountrySelectField from "../components/forms/CountrySelectField";
import YearGroup from "../components/forms/YearGroupField";

const ScatterChartPage = () => {
    const [measurementX, setMeasurementX] = useState('');
    const [measurementY, setMeasurementY] = useState('');
    const [country, setCountry] = useState('');
    const [scatterChartDataX, setScatterChartDataX] = useState({});
    const [scatterChartDataY, setScatterChartDataY] = useState({});
    const [dataSubmittedX, setDataSubmittedX] = useState(false);
    const [dataSubmittedY, setDataSubmittedY] = useState(false);
    const [dataYearGroup, setDataYearGroup] = useState('1');
    const [minSliderValue, setMinSliderValue] = useState(1960);
    const [maxSliderValue, setMaxSliderValue] = useState(2020);

    const { data: measurements } = useFetch('http://localhost:3001/getMeasurements');
    const { data: countries } = useFetch('http://localhost:3001/getCountries');
    const yearOptions = [ '1', '5' ,'10']

    const handleSliderInput = (e) => {
        setMinSliderValue(e.minValue);
        setMaxSliderValue(e.maxValue);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3001/getMeasurement', {
            params: {
                measurementName: measurementX,
                countryName: country,
                minYear: minSliderValue,
                maxYear: maxSliderValue,
                yearGroup: dataYearGroup
            }
        })
        .then((response) => {
            setScatterChartDataX(response.data);
        })
        .then(() => {
            setDataSubmittedX(true);
        })
        .catch(e => {
            console.log(e);
        });

        axios.get('http://localhost:3001/getMeasurement', {
            params: {
                measurementName: measurementY,
                countryName: country,
                minYear: minSliderValue,
                maxYear: maxSliderValue,
                yearGroup: dataYearGroup
            }
        })
        .then((response) => {
            setScatterChartDataY(response.data);
        })
        .then(() => {
            setDataSubmittedY(true);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const renderScatterChart = () => {
        if (dataSubmittedX && dataSubmittedY) {
            return (
                <ScatterChart chartData={ 
                    scatterChartDataX.map( (v, i) => ({'x': v, 'y': scatterChartDataY[i]}))
                 }
                    options= {{
                        titleXAxis: measurementX.replace(/_/g, ' '),
                        titleYAxis: measurementY.replace(/_/g, ' ')   
                    }}
                 />
            );
        }
    }

    return ( 
        <div className="chart">
            <div className="form">
                <h1>Scatter Chart Page</h1>
                <form onSubmit={handleSubmit}>
                    <MeasurementSelectField measurement={measurementX} measurements={measurements} axisLabel='Measurement X Axis' setMeasurement={setMeasurementX}/>
                    
                    <MeasurementSelectField measurement={measurementY} measurements={measurements} axisLabel='Measurement Y Axis' setMeasurement={setMeasurementY}/>
                     
                    <CountrySelectField country={country} countries={countries} setCountry={setCountry}/>

                    <YearGroup yearOptions={yearOptions} dataYearGroup={dataYearGroup} setDataYearGroup={setDataYearGroup}/>
                     
                    <button>Show Chart</button>
                </form>
                <div className="slider">
                    <MultiRangeSlider min={1960} max={2020} step={1} ruler={false} label={true} preventWheel={false} minValue={minSliderValue} maxValue={maxSliderValue} onInput={(e) => {
                            handleSliderInput(e);
                        }}
                    />
                </div>
            </div>
            <div className="barChart">
                {renderScatterChart()}
            </div>
        </div>
     );
}
 
export default ScatterChartPage;