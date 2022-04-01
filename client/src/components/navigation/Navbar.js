import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>World Bank Visualizer</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/scatterChart" style={{ 
                    color: "white",
                    backgroundColor: '#330175',
                    borderRadius: '8px'
                 }}>ScatterChart</Link>
                 <Link to="/barChart" style={{ 
                    color: "white",
                    backgroundColor: '#330175',
                    borderRadius: '8px'
                 }}>BarChartPage</Link>
                 <Link to="/lineChart" style={{ 
                    color: "white",
                    backgroundColor: '#330175',
                    borderRadius: '8px'
                 }}>LineChartPage</Link>
            </div>
        </nav>
     );
}
 
export default Navbar;