import React, { Component, Fragment } from 'react';
import RouteCard from './RouteCard.js';

class RouteDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="RouteDisplay">
        <div className="row justify-content-md-center">
           <div className="col-md-4">
           <h2 className="resultsPanel">Upcoming Trains</h2>

          {/* Route List */}
          {this.props.trips.length > 0 && (
              this.props.trips.map((currentRoute,index) => {
                return <RouteCard route={currentRoute} key={index} stationMap={this.props.stationMap} lineMap={this.props.lineMap}/>
              })
          )}
          {this.props.trips.length == 0 && (
            <p>Select stations to see results!</p>
          )}


           </div>
         </div>
     </div>
    );
  }
}

export default RouteDisplay;
