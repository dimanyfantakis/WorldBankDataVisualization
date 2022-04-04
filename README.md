# World Bank Data Visualization
A Web Application that visualizes data from [WorldBank](https://data.worldbank.org/)

## Description

A Web Application developed using a NodeJS backend and a ReactJS frontend that connects to a MySQL database populated with data regarding countries measurements from WorldBank and runs dynamic queries to visualize data

## Getting Started


### Backend Server

* [NodeJS](https://nodejs.org/en/)

### Frontend Client

* [ReactJS](https://reactjs.org/)

### Charts
* [ChartJS](https://www.chartjs.org/)
* [React-Vis](https://github.com/uber/react-vis)


### Usage

* Navigate to the folder WebApplication of cloned repository via a terminal and run
```
npm install
```
* Navigate to the folder server of the folder WebApplication and run
```
npm install
```
* Navigate to the folder client of the folder WebApplication and run
```
npm install
```
* To run the server navigate to the server folder and run
```
node app.js
```
* To run the client navigate to the server folder and run
```
npm start
```

## Authors

Dimitris Anyfantakis


## Version History

* v.0.0 [2022 April]
    * Tranformation Loading and Backup scripts
    * Web Application that uses BarCharts/LineCharts/ScatterCharts to visualize data
    * BarCharts/LineCharts comparing up to 5 countries measurements
    * Slider to filter the range of years
    * Group data by 5/10 years
