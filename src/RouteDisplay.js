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
           <div className="col-md-3 sad">
           <h2>Route Options</h2>

          {/* Route List */}
          {this.props.trips.length > 0 && (
              this.props.trips.map((currentRoute,index) => {
                return <RouteCard route={currentRoute} stationMap={this.props.stationMap} lineMap={this.props.lineMap}/>
              })
          )}


           </div>
         </div>
     </div>
    );
  }
}

export default RouteDisplay;
