import React from 'react';
 const CountrySelectField = ( { country, countries, setCountry}) => {
     return ( 
         <div className="form">
             <label>Country</label>
             <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            >
                {Array.isArray(countries)
                    ? countries.map((val, key) => {
                        return (
                            <option key={key} value = {val.country_name}>{val.country_name}</option>
                        );
                    })
                : null};
            </select>
         </div>
      );
 }
  
 export default CountrySelectField;