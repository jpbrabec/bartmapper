import React, { Component, Fragment } from 'react';
import './App.css';
import StationSelector from './StationSelector.js';
import RouteDisplay from './RouteDisplay.js';
import HeaderContainer from './HeaderContainer.js';

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
        this.setState({lineMap: lineMap}, () => {
          this.calculateRoute();
        });
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
        this.setState({stationMap: stationMap}, () => {
          this.calculateRoute();
        });
      }).catch(e => {
        console.log(e)
      })

      //Load localStorage
      if(window.localStorage.getItem('savedOrigin')) {
        console.log('updating state')
        this.setState({sourceStation: window.localStorage.getItem('savedOrigin')}, () => {
          this.calculateRoute();
        });
      };
      if(window.localStorage.getItem('savedDest')) {
        console.log('updating state')
        this.setState({destStation: window.localStorage.getItem('savedDest')}, () => {
          this.calculateRoute();
        });
      };

      //Automatically refresh
      setInterval(this.calculateRoute.bind(this), 2000);

  }

  onSelectChangeSource(event) {
    this.setState({sourceStation: event.target.value}, () => {
      this.calculateRoute();
      window.localStorage.setItem('savedOrigin', this.state.sourceStation);
    })
  }

  onSelectChangeTarget(event) {
    this.setState({destStation: event.target.value}, () => {
      this.calculateRoute();
      window.localStorage.setItem('savedDest', this.state.destStation);
    })
  }

  calculateRoute() {
    if (this.state.sourceStation == null 
        || this.state.destStation == null 
        || this.state.stationMap == null
        || this.state.lineMap == null
        || this.state.trips == null) {
      return;
    }
    var url = `${process.env.REACT_APP_API_URL}/sched.aspx?cmd=depart&orig=${this.state.sourceStation}&dest=${this.state.destStation}&a=4&b=0&json=y&key=${process.env.REACT_APP_API_KEY}`;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((json) => {
      this.setState({trips: json.root.schedule.request.trip}, () => {
        this.calculateRoute();
      });
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <HeaderContainer sourceStation={this.state.sourceStation} destStation={this.state.destStation} onChangeSourceHandler={this.onSelectChangeSource.bind(this)} onChangeDestHandler={this.onSelectChangeTarget.bind(this)} stations={this.state.stations}/>
          <RouteDisplay stations={this.state.stations} trips={this.state.trips} lineMap={this.state.lineMap} stationMap={this.state.stationMap}/>
        </div>
      </div>
    );
  }
}

export default App;
