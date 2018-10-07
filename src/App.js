import React, { Component, Fragment } from 'react';
import './App.css';
import StationSelector from './StationSelector.js';
import RouteDisplay from './RouteDisplay.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {lines: [], lineMap: {}, stations: [], stationMap: {}, sourceStation: null, destStation: null, trips: []}
  }

  componentDidMount() {
    //Fetch Lines
      var url = `${process.env.REACT_APP_API_URL}/route.aspx?cmd=routes&json=y&key=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
      .then((response) => {
          return response.json();
      }).then((json) => {
        this.setState({routes: json.root.routes.route});
        // Add each route into the map
        var lineMap = {};
        for(var i=0; i<json.root.routes.route.length; i++) {
          var currentRoute = json.root.routes.route[i];
          lineMap[currentRoute.routeID] = currentRoute;
        }
        this.setState({lineMap: lineMap});
      }).catch(e => {
        console.log(e)
      })
    //Fetch Stations
      var url = `${process.env.REACT_APP_API_URL}/stn.aspx?cmd=stns&json=y&key=${process.env.REACT_APP_API_KEY}`;
      fetch(url)
      .then((response) => {
          return response.json();
      }).then((json) => {
        this.setState({stations: json.root.stations.station});
        // Add each station into the map
        var stationMap = {};
        for(var i=0; i<json.root.stations.station.length; i++) {
          var currentStation = json.root.stations.station[i];
          stationMap[currentStation.abbr] = currentStation;
        }
        this.setState({stationMap: stationMap});
      }).catch(e => {
        console.log(e)
      })
  }

  onSelectChangeSource(event) {
    this.setState({sourceStation: event.target.value}, () => {
      this.calculateRoute();
    })
  }

  onSelectChangeTarget(event) {
    this.setState({destStation: event.target.value}, () => {
      this.calculateRoute();
    })
  }

  calculateRoute() {
    if (this.state.sourceStation == null || this.state.destStation == null) {
      return;
    }
    var url = `${process.env.REACT_APP_API_URL}/sched.aspx?cmd=depart&orig=${this.state.sourceStation}&dest=${this.state.destStation}&a=4&json=y&key=${process.env.REACT_APP_API_KEY}`;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((json) => {
      this.setState({trips: json.root.schedule.request.trip});
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">

        <StationSelector onChangeHandler={this.onSelectChangeSource.bind(this)} stations={this.state.stations} label="Depart From"/>
        <StationSelector onChangeHandler={this.onSelectChangeTarget.bind(this)} stations={this.state.stations} label="Arrive At"/>

        <RouteDisplay stations={this.state.stations} trips={this.state.trips} lineMap={this.state.lineMap} stationMap={this.state.stationMap}/>
        </div>
      </div>
    );
  }
}

export default App;
