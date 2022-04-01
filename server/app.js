const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'mysqlpassword',
    database: 'worldbankdb'
});

app.get('/getMeasurements', (req, res) => {
    db.query(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'worldbankdb' AND TABLE_NAME = 'measurements';",
        (err, response) => {
            if (err) {
                throw (err);
            }
            res.send(response);
        }
    );
})

app.get('/getYears', (req, res) => {
    db.query(
        "SELECT year FROM years;",
        (err, response) => {
            if (err) {
                throw err;
            }
            res.send(response);
        }
    );
})

app.get('/getCountries', (req, res) => {
    db.query(
        "SELECT country_name from countries;",
        (err, response) => {
            if (err) {
                throw err;
            }
            res.send(response);
        }
    )
})

app.get('/getMeasurement', (req, res) => {
    let yearsIds = "(";
    db.query(
        "SELECT year_id FROM years WHERE year >= ? AND year <= ?;",
        [req.query.minYear, req.query.maxYear],
        (err, response) => {
            if (err) {
                throw err;
            }
            response.forEach((e) => yearsIds += e.year_id + ", ");
            yearsIds = yearsIds.slice(0, -2);
            yearsIds += ")";
            db.query(
                "SELECT country_id from countries WHERE country_name = ?;",
                req.query.countryName,
                (err, response) => {
                    if (err) {
                        throw(err);
                    }
                    db.query(
                        "SELECT " + req.query.measurementName + " FROM measurements WHERE country_id = " + response[0].country_id + " and year_id IN " + yearsIds + ";",
                        (err, response) => {
                            if (err) {
                                throw(err);
                            }
                            let groups = [];
                            let measurements = response.map((value) => parseInt(value[req.query.measurementName]));
                            while (measurements.length) {
                                groups.push(measurements.splice(0, req.query.yearGroup));
                            }
                            res.send(groups.map(group =>  group.reduce((a, b) => a + b) / group.length));
                        }
                    )
                }
            )
        }
    );
})

app.listen(3001, () => {
    console.log("Server running");
})