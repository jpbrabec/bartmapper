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
        <form className="form-horizontal">
        <div className="form-group formPadding">
          <label className="control-label col-sm-3" htmlFor={"select-"+this.props.keyName}>{this.props.label}</label>
          <select id={"select-"+this.props.keyName} value={this.props.selectedStation ? this.props.selectedStation : "na"} className="form-control col-sm-9" style={{fontSize: '10pt', height: '40px'}} onChange={this.props.onChangeHandler}>
            <option value="na" disabled>Select a station</option>
            {this.props.stations.length > 0 && (
                this.props.stations.map(function(currentStation,index){
                   return <option value={currentStation.abbr} key={index}>{currentStation.name}</option>;
                })
            )}
         </select>

         </div>
        </form>

        </div>
       </div>
     </div>
    );
  }
}

export default StationSelector;
