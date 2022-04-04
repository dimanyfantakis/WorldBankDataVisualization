import React from 'react';

const YearGroup = ( {yearOptions, dataYearGroup, setDataYearGroup}) => {
    return ( 
        <div className="form">
            <label>Group data by number of years</label>
                <select
                    value={dataYearGroup}
                    onChange={(e) => setDataYearGroup(e.target.value)}
                >   
                    { yearOptions.map( (val, key) => {
                        return(
                            <option key={key} value = {val}>{val}</option>
                        );
                    }) 
                    }
                </select>
        </div>
     );
}
 
export default YearGroup;