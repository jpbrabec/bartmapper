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

           {/* Show a error message if offline */}
           {!navigator.onLine && (
             <span>Please connect to the internet to view train times!</span>
            )
           }

           {/* Show a error message if online */}
           {navigator.onLine && (
             <span>
             {/* Route List */}
             {this.props.trips.length > 0 && (
                 this.props.trips.map((currentRoute,index) => {
                   return <RouteCard route={currentRoute} key={index} stationMap={this.props.stationMap} lineMap={this.props.lineMap}/>
                 })
             )}
             {this.props.trips.length == 0 && (
               <p>Select stations to see results!</p>
             )}
             </span>
            )
           }
           </div>
         </div>
     </div>
    );
  }
}

export default RouteDisplay;
