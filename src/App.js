import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {lines: [], lineMap: {}, stations: null, station_count: 0, sourceStation: null, destStation: null, trips: []}
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
          console.log(`${currentRoute.routeID} = ${currentRoute.name}`)
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
        this.setState({stations: json.root.stations.station, station_count: json.root.stations.station.length});
      }).catch(e => {
        console.log(e)
      })
  }

  onSelectChangeSource(event) {
    console.log('Switched station to ' + event.target.value);
    this.setState({sourceStation: event.target.value}, () => {
      this.calculateRoute();
    })
  }

  onSelectChangeTarget(event) {
    console.log('Switched station to ' + event.target.value);
    this.setState({destStation: event.target.value}, () => {
      this.calculateRoute();
    })
  }

  calculateRoute() {
    if (this.state.sourceStation == null || this.state.destStation == null) {
      console.log('nope')
      return;
    }
    var url = `${process.env.REACT_APP_API_URL}/sched.aspx?cmd=depart&orig=${this.state.sourceStation}&dest=${this.state.destStation}&b=0&json=y&key=${process.env.REACT_APP_API_KEY}`;
    fetch(url)
    .then((response) => {
        return response.json();
    }).then((json) => {
      this.setState({trips: json.root.schedule.request.trip});
      console.log(this.state.trips)
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">

        {/* Need to make this into a component and propogate the state up */}
        <div className="row justify-content-md-center">
           <div className="col-md-3 sad">
           <h2>Depart From</h2>
           <select className="form-control" onChange={this.onSelectChangeSource.bind(this)}>
           {this.state.station_count > 0 && (
               this.state.stations.map(function(currentStation,index){
                  return <option value={currentStation.abbr} key={index}>{currentStation.name}</option>;
               })
           )}
          </select>
           </div>
         </div>

         {/* Need to make this into a component and propogate the state up */}
         <div className="row justify-content-md-center">
            <div className="col-md-3 sad">
            <h2>Arrive At</h2>
            <select className="form-control" onChange={this.onSelectChangeTarget.bind(this)}>
            {this.state.station_count > 0 && (
                this.state.stations.map(function(currentStation,index){
                   return <option value={currentStation.abbr} key={index}>{currentStation.name}</option>;
                })
            )}
           </select>
            </div>
          </div>


          {/* Route Planner */}
          <div className="row justify-content-md-center">
             <div className="col-md-3 sad">
             <h2>Route Options</h2>

             <table className="table table-striped">
             <tbody>

            {/* Route List */}
            {this.state.trips.length > 0 && (
                this.state.trips.map((currentRoute,index) => {
                  var rows = [];
                  for(var i=0; i<currentRoute.leg.length; i++) {
                    var currentLine = this.state.lineMap[currentRoute.leg[i]['@line']]
                    console.log('color ' + currentLine.hexcolor)
                    rows.push(
                      <tr>
                        <td style={{backgroundColor: currentLine.hexcolor}}>{currentRoute.leg[i]['@origin']} =></td>
                        <td style={{backgroundColor: currentLine.hexcolor}}>{currentRoute.leg[i]['@destination']}</td>
                      </tr>
                    )
                  }
                  console.log('there are ')
                   return (
                     <Fragment key={currentRoute['@destTimeMin']}>
                     <tr>
                       <th>Arrive around {currentRoute['@destTimeMin']}</th>
                       <th>Fare: ${currentRoute['@fare']}</th>
                     </tr>
                     {rows}
                     </Fragment>
                   );
                })
            )}


             </tbody>
             </table>

             </div>
           </div>
        </div>
      </div>
    );
  }
}

export default App;
