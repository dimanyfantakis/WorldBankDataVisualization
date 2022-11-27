<div align="center">
  <h1>World Bank Data Visualization</h1>
  <p>
    A Web Application that visualizes data from WorldBank
  </p>
  
[![Contributors][contributors-shield]][contributors-url]
[![Commits][commits-shield]][commits-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

[**View Demo**][demo-url] · [**Report Bug**][issues-url] · [**Request Feature**][issues-url]

</div>


## About

### Description

A Web Application developed using a NodeJS backend and a ReactJS frontend that connects to a MySQL database, populated with data regarding countries' measurements gathered from [WorldBank][worldbank-url], and runs dynamic queries to visualize them using Line Bar and Scatter charts

### Tech Stack

***Data***

* [![NumPy][NumPy]][NumPy-url]
* [![Pandas][Pandas]][Pandas-url]

***Database***

* [![MySQL][MySQL]][MySQL-url]

***Backend Server***

* [![Node][Node.js]][Node-url]
* [![Nodemon][Nodemon]][Nodemon-url]
* [![Express][Express]][Express-url]

***Frontend Client***

* [![React][React]][React-url]
* [![Axios][Axios]][Axios-url]

***Charts***

* [![ChartJS][ChartJS]][ChartJS-url]
* [React-Vis][React-Vis-url]


## Getting Started

### Requirements

_Clone the repository_
```javascript
git clone https://github.com/dimanyfantakis/WorldBankDataVisualization.git
```

### Installation

_Install NPM packages_

1. Navigate to the folder WebApplication of the cloned repository via a terminal and run
    ```javascript
    npm install
    ```

2. Navigate to the folder 'WebApplication/server' and run
    ```javascript
    npm install
    ```

3. Navigate to the folder 'WebApplication/client' and run
    ```javascript
    npm install
    ```


## Usage

1. To run the server navigate to the 'WebApplication/server' folder and run
    ```javascript
    node app.js
    ```

2. To run the client navigate to the 'WebApplication/client' folder and run
    ```javascript
    npm start
    ```

### Screenshots

***Homepage***

![HomepageScreenshot][HomepageScreenshot-url]

***Barchart page***
![BarChartScreenshot][BarChartScreenshot-url]

***Viewing a barchart***
![BarChartSingleMeasurementScreenshot][BarChartSingleMeasurementScreenshot-url]

***Comparing different countries***
![BarChartMeasurementComparisonScreenshot][BarChartMeasurementComparisonScreenshot-url]


## Authors

Dimitris Anyfantakis


## License

See [License][license-url] for more information regarding the license


## Version History

* v.1.0 [2022 April]
    * Tranformation Loading and Backup scripts
    * NodeJS backend to run the dynamic queries
    * ReactJS frontend to visualize the data
    * BarChart/LineChart comparing up to 5 countries with the same or different measurement
    * ScatterChart that compares 2 different measures 
    * Slider to filter the range of years
    * Group data by 5/10 years


[contributors-shield]: https://img.shields.io/github/contributors/dimanyfantakis/WorldBankDataVisualization
[contributors-url]: https://github.com/dimanyfantakis/WorldBankDataVisualization/graphs/contributors
[commits-shield]: https://img.shields.io/github/last-commit/dimanyfantakis/WorldBankDataVisualization
[commits-url]: https://github.com/dimanyfantakis/WorldBankDataVisualization/commit/main
[worldbank-url]: https://data.worldbank.org/
[license-shield]: https://img.shields.io/github/license/dimanyfantakis/WorldBankDataVisualization
[license-url]: https://https://github.com/dimanyfantakis/WorldBankDataVisualization/blob/main/LICENSE
[issues-shield]: https://img.shields.io/github/issues/dimanyfantakis/WorldBankDataVisualization
[issues-url]: https://github.com/dimanyfantakis/WorldBankDataVisualization/issues/
[demo-url]: https://github.com/dimanyfantakis/WorldBankDataVisualization
[NumPy]: https://img.shields.io/badge/NumPy-000000?style=flat&logo=NumPy&logoColor=########013243
[NumPy-url]: https://numpy.org/
[Pandas]: https://img.shields.io/badge/pandas-000000?style=flat&logo=pandas&logoColor=#########150458
[Pandas-url]: https://pandas.pydata.org/
[MySQL]: https://img.shields.io/badge/MySQL-000000?style=flat&logo=MySQL&logoColor=#######4479A1
[MySQL-url]: https://www.mysql.com/
[Node.js]: https://img.shields.io/badge/Node.js-000000?style=flat&logo=Node.js&logoColor=#339933logoColor=white
[Node-url]: https://nodejs.org/en/
[Nodemon]: https://img.shields.io/badge/Nodemon-000000?style=flat&logo=Nodemon&logoColor=##76D04B
[Nodemon-url]: https://www.npmjs.com/package/nodemon
[Express]: https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=###000000
[Express-url]: https://expressjs.com/
[React]: https://img.shields.io/badge/React-000000?style=flat&logo=React&logoColor=####61DAFB
[React-url]: https://reactjs.org/
[Axios]: https://img.shields.io/badge/Axios-000000?style=flat&logo=Axios&logoColor=#####5A29E4
[Axios-url]: https://axios-http.com/docs/intro
[ChartJS]: https://img.shields.io/badge/Chart-000000?style=flat&logo=Chart.js&logoColor=######FF6384
[ChartJS-url]: https://www.chartjs.org/
[React-Vis-url]: https://github.com/uber/react-vis
[HomepageScreenshot-url]: https://drive.google.com/uc?export=view&id=1flo9WXFYV-2WpjCwwzy0pmxL7G_qhmGt
[BarChartScreenshot-url]: https://drive.google.com/uc?export=view&id=11Sq0FNIctJDkrYyIimvSFhCI7h1rI-ff
[BarChartSingleMeasurementScreenshot-url]: https://drive.google.com/uc?export=view&id=10IETdjVazvJKfQfuAqOzFfUiR_GI4BpZ
[BarChartMeasurementComparisonScreenshot-url]: https://drive.google.com/uc?export=view&id=1sfsXI-D7K-kZphOO2BIJWkVhG5KuPzNR