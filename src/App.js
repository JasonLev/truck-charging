import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Dashboard from './components/Dashboard'
import Map from './components/Map'
import Confirmation from './components/Confirmation'
import MapTraffic from './components/MapTraffic'
import Welcome from './components/Welcome'


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/confirm">
            <Confirmation />
          </Route>
          <Route path="/map_traffic">
            <Map />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}