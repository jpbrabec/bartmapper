import React, { Component, Fragment } from 'react';
import './App.css';

class StationSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="StationSelector">
      {/* Need to make this into a component and propogate the state up */}
      <div className="row justify-content-md-center">
         <div className="col-md-4">
          <h2>{this.props.label}</h2>
           <select className="form-control" style={{fontSize: '10pt', height: '40px'}} defaultValue="na" onChange={this.props.onChangeHandler}>
           <option value="na" disabled>Select a station</option>
           {this.props.stations.length > 0 && (
               this.props.stations.map(function(currentStation,index){
                  return <option value={currentStation.abbr} key={index}>{currentStation.name}</option>;
               })
           )}
          </select>
        </div>
       </div>
     </div>
    );
  }
}

export default StationSelector;
