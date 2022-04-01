import React from 'react';
import Home from './pages/HomePage';
import NotFound from './pages/NotFoundPage';
import Navbar from './components/navigation/Navbar';
import BarChartPage from './pages/BarChartPage';
import LineChartPage from './pages/LineChartPage';
import ScatterChartPage from './pages/ScatterChartPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/barChart">
            <BarChartPage />
          </Route>
          <Route exact path="/lineChart">
            <LineChartPage />
          </Route>
          <Route exact path="/scatterChart">
            <ScatterChartPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
