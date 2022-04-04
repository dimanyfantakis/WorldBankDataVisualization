import React, { useDebugValue } from "react";
import axios from "axios";
import { useState } from "react";
import useFetch from "../utils/useFetch";
import BarChart from "../components/charts/BarChart";
import MultiRangeSlider from "../components/slider/MultiRangeSlider";
import MeasurementSelectField from "../components/forms/MeasurementSelectField";
import CountrySelectField from "../components/forms/CountrySelectField";
import YearGroup from "../components/forms/YearGroupField";

const BarChartPage = () => {
    const [measurementXAxis, setMeasurementX] = useState('');
    const [country, setCountry] = useState('');
    const [barChartData, setBarChartData] = useState({});
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [comparisonsCounter, setComparisonsCounter] = useState(0);
    const [dataYearGroup, setDataYearGroup] = useState('1');
    const [minSliderValue, setMinSliderValue] = useState(1960);
    const [maxSliderValue, setMaxSliderValue] = useState(2020);

    const { data: measurements } = useFetch('http://localhost:3001/getMeasurements');
    const { data: years } = useFetch('http://localhost:3001/getYears');
    const { data: countries } = useFetch('http://localhost:3001/getCountries');
    const barColors = ['rgba(28, 102, 244, 0.8)', 'rgba(39, 245, 127, 0.8)', 'rgba(245, 97, 39, 0.8)',
    'rgba(245, 217, 39, 0.8)', 'rgba(245, 39, 243, 0.8)']
    const yearOptions = [ '1', '5' ,'10']
    
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
            setBarChartData(
                {
                labels: getYears(),
                datasets: [{
                    label: country,
                    data: response.data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: "black",
                    borderWidth: 1
                }]
                }
            );
        })
        .then(() => {
            setComparisonsCounter(0);
            setDataSubmitted(true);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const renderBarChart = () => {
        if (dataSubmitted) {
            return (
                <BarChart chartData={barChartData} title = {measurementXAxis.replace(/_/g, ' ')}/>
            );
        }
    }

    const handleAdd = (e) => {
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
            let chartDataCopy = barChartData.datasets.slice();
            chartDataCopy.push({
                label: country,
                data: response.data,
                backgroundColor: barColors[comparisonsCounter],
                borderColor: "black",
                borderWidth: 1
            });
            const newData = { ...barChartData, datasets: chartDataCopy};
            setBarChartData(newData);
        })
        .catch(e => {
            console.log(e);
        });
    }

    return ( 
        <div className="chart">
            <div className="form">
                <h1>Bar Chart Page</h1>
                <form onSubmit={handleSubmit}>
                    <MeasurementSelectField measurement={measurementXAxis} measurements={measurements} axisLabel='Measurement X Axis' setMeasurement={setMeasurementX}/>

                    <CountrySelectField country = {country} countries={countries} setCountry={setCountry}/>

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
                {renderBarChart()}
                {dataSubmitted && 
                        <div className="form">
                            <CountrySelectField country={country} countries={countries} setCountry={setCountry}/>
                            
                            <button onClick={() => handleAdd()}>Add Country</button>
                        </div>
                    }
            </div>
        </div>
     );
}
 
export default BarChartPage;