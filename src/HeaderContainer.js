import React, { Component, Fragment } from 'react';
import './App.css';
import StationSelector from './StationSelector.js';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <Fragment>
    <div className="row justify-content-md-center">
      <div className="col-md-4">
      <h2>BartMapper</h2>
      <hr/>
      </div>
    </div>

    <StationSelector keyName="1" onChangeHandler={this.props.onChangeSourceHandler} stations={this.props.stations} label="Depart From"/>
    <StationSelector keyName="2" onChangeHandler={this.props.onChangeDestHandler} stations={this.props.stations} label="Arrive At"/>

    <div className="row justify-content-md-center">
      <div className="col-md-4">
      <hr/>
      </div>
    </div>
    </Fragment>
    );
  }
}

export default HeaderContainer;
