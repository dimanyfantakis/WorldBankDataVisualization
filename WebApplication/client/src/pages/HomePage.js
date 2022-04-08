import React, { createContext } from 'react';
import homePage from './../assets/worldbankdata.png';

const Home = () => {
    return (
        <div className="home">
            <h1>Home Page</h1>
            <div className="homePageImg">
                <img
                img src={homePage} alt="cur"
                height={400}
                width={850}
                style={{
                    verticalAlign: "center"
                  }}
            />
            </div>
        </div>
    );
}

export default Home;
