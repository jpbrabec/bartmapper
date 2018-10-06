import React, { Component, Fragment } from 'react';
import './RouteCard.css';

class RouteCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      var legs = [];
      var currentRoute = this.props.route;
      for(var i=0; i<currentRoute.leg.length; i++) {
        var currentLine = this.props.lineMap[currentRoute.leg[i]['@line']]
        legs.push(
          <Fragment key={i}>
          <tr>
          <td><span className="glyphicon glyphicon-triangle-right" aria-hidden="true"></span> {currentRoute.leg[i]['@origTimeMin']}</td>
          <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}></td>
          <td>{this.props.stationMap[currentRoute.leg[i]['@origin']].name}</td>
          </tr>
          <tr>
            <td></td>
            <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}>vvvv</td>
            <td>{currentLine.name}</td>
          </tr>
          <tr>
            <td><span className="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>{currentRoute.leg[i]['@destTimeMin']}</td>
            <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}></td>
            <td>{this.props.stationMap[currentRoute.leg[i]['@destination']].name}</td>
          </tr>
          </Fragment>
        )

        // Add a buffer row if there's a transfer
        if(i<currentRoute.leg.length-1) {
          legs.push(
            <tr>
            <td><span className="glyphicon glyphicon-resize-horizontal" aria-hidden="true"></span></td>
            <td>Transfer Lines</td>
            <td></td>
            </tr>
          )
        }
      }

     return (
       <div class="panel panel-default" key={currentRoute['@destTimeMin']}>
        <div class="panel-heading">
          <h3 class="panel-title">Arrive around {currentRoute['@destTimeMin']}- ${currentRoute['@fare']}</h3>
        </div>
        <div class="panel-body">
        <div class="col-md-12">

        <div className="stopCardWrapper">

        <div className="stopContainer">
        <div className="stopCircle">
          <div className="stopCircleIcon iconTop">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </div>
        </div>
          <div className="stopPadder">
          </div>
          <div className="stopCircle">
          <div className="stopCircleIcon iconBot">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          </div>
        </div>
        </div>

        <div className="stopInfoContainer">
          <div className="stopCircleInfo infoTop">
            <p><b>16th & Market</b></p>
            <p>Board at 5:15 pm</p>
          </div>
          <div className="stopPadderInfo">
            <p><b>Red Line</b></p>
            <p>18 Stops</p>
          </div>
          <div className="stopCircleInfo infoBot">
            <p><b>25th & Market</b></p>
            <p>Exit at 5:55 pm</p>
          </div>
        </div>
        </div>

        <table className="table">
        <tbody>
          {legs}
        </tbody>
        </table>
        </div>
        </div>
      </div>

     );

  }
}

export default RouteCard;
