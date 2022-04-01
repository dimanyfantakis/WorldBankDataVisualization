import React from 'react';

const MeasurementSelectField = ({ measurement, measurements, axisLabel, setMeasurement }) => {
    return ( 
        <div className="form">
            <label>{axisLabel}</label>
            <select
                value={measurement}
                onChange={(e) => setMeasurement(e.target.value)}
            >
                {Array.isArray(measurements)
                    ? measurements.filter(measurement => measurement.COLUMN_NAME !== 'country_id' && measurement.COLUMN_NAME !== 'year_id').map((val, key) => {
                        return (
                            <option key={key} value = {val.COLUMN_NAME}>{val.COLUMN_NAME.replace(/_/g, ' ')}</option>
                        );
                    })
                : null};
            </select>
        </div>
     );
}
 
export default MeasurementSelectField;