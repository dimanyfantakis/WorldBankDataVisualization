import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="not_found">
            <h2>Oops</h2>
            <p>Page cannot be found</p>
            <Link to="/">Return to the homepage</Link>
        </div>
     );
}
 
export default NotFound;