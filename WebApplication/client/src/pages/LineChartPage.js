import React, { useDebugValue } from "react";
import axios from "axios";
import { useState } from "react";
import useFetch from "../utils/useFetch";
import LineChart from "../components/charts/LineChart";
import MultiRangeSlider from "../components/slider/MultiRangeSlider";
import MeasurementSelectField from "../components/forms/MeasurementSelectField";
import CountrySelectField from "../components/forms/CountrySelectField";
import YearGroup from "../components/forms/YearGroupField";

const LineChartPage = () => {
    const [measurementXAxis, setMeasurementX] = useState('');
    const [comparativeMeasurements, setComparativeMeasurements] = useState([]);
    const [country, setCountry] = useState('');
    const [lineChartData, setLineChartData] = useState({});
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [comparisonsCounter, setComparisonsCounter] = useState(0);
    const [dataYearGroup, setDataYearGroup] = useState('1');
    const [minSliderValue, setMinSliderValue] = useState(1960);
    const [maxSliderValue, setMaxSliderValue] = useState(2020);

    const { data: measurements } = useFetch('http://localhost:3001/getMeasurements');
    const { data: years } = useFetch('http://localhost:3001/getYears');
    const { data: countries } = useFetch('http://localhost:3001/getCountries');
    const lineColors = ['rgba(28, 102, 244, 0.8)', 'rgba(39, 245, 127, 0.8)', 'rgba(245, 97, 39, 0.8)',
        'rgba(245, 217, 39, 0.8)', 'rgba(245, 39, 243, 0.8)']
    const yearOptions = [ '1', '5', '10']

    const handleSliderInput = (e) => {
        setMinSliderValue(e.minValue);
        setMaxSliderValue(e.maxValue);
    };  

    const getYears = () => {
        let selectedYears = years.filter(year => year.year >= minSliderValue && year.year <= maxSliderValue).map((value) => value.year);
        let yearGroups = [];
        while (selectedYears.length) {
            yearGroups.push(selectedYears.splice(0, dataYearGroup));
        }
        return yearGroups.map(group => group[0]);
    }
    
    const handleSubmit = (e) => {
        setComparativeMeasurements([measurementXAxis.replace(/_/g, ' ')]);
        e.preventDefault();
        axios.get('http://localhost:3001/getMeasurement', {
            params: {
                measurementName: measurementXAxis,
                countryName: country,
                minYear: minSliderValue,
                maxYear: maxSliderValue,
                yearGroup: dataYearGroup
            }
        })
        .then((response) => {
            setLineChartData({
                labels: getYears(),
                datasets: [{
                    label: country,
                    data: response.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1
                }]
            });
        })
        .then(() => {
            setComparisonsCounter(0);
            setDataSubmitted(true);
        })
        .catch(e => {
            console.log(e);
        });
        
    }

    const renderLineChart = () => {
        if (dataSubmitted) {
            return (
                <LineChart chartData = { lineChartData } title = {comparativeMeasurements.join(', ')} />
            );
        }
    }

    const handleAdd = (e) => {
        let comparativeMeasurementsCopy = comparativeMeasurements.slice();
        comparativeMeasurementsCopy.push(measurementXAxis.replace(/_/g, ' '));
        setComparativeMeasurements(comparativeMeasurementsCopy);
        setComparisonsCounter(comparisonsCounter + 1);
        if (comparisonsCounter >= 4) {
            return;
        }
        axios.get('http://localhost:3001/getMeasurement', {
            params: {
                measurementName: measurementXAxis,
                countryName: country,
                minYear: minSliderValue,
                maxYear: maxSliderValue,
                yearGroup: dataYearGroup
            }
        })
        .then((response) => {
            let lineChartDataCopy = lineChartData.datasets.slice();
            lineChartDataCopy.push({
                label: country,
                data: response.data,
                backgroundColor: lineColors[comparisonsCounter],
                borderColor: lineColors[comparisonsCounter],
                borderWidth: 1
            });
            const newData = { ...lineChartData, datasets: lineChartDataCopy};
            setLineChartData(newData);
        })
        .catch(e => {
            console.log(e);
        });
    }

    return ( 
        <div className="chart">
            <div className="form">
                <h1>Line Chart Page</h1>
                <form onSubmit={handleSubmit}>
                    <MeasurementSelectField measurement={measurementXAxis} measurements={measurements} axisLabel='Measurement X Axis' setMeasurement={setMeasurementX}/>

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
                {renderLineChart()}
                    {dataSubmitted && 
                        <div className="form">                
                            <CountrySelectField country={country} countries={countries} setCountry={setCountry}/>

                            <MeasurementSelectField measurement={measurementXAxis} measurements={measurements} axisLabel='Measurement X Axis' setMeasurement={setMeasurementX}/>
                            
                            <button onClick={() => handleAdd()}>Add Country</button>
                        </div>
                    }
            </div>
        </div>
     );
}
 
export default LineChartPage;
