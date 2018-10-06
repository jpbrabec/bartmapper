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
          <div className="stopCardWrapper">
          <div className="stopContainer">
          <div className="stopCircle">
            <div className="stopCircleIcon iconTop" style={{backgroundColor: currentLine.hexcolor}}>
              <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            </div>
          </div>
            <div className="stopPadder" style={{backgroundColor: currentLine.hexcolor}}>
            </div>
            <div className="stopCircle">
            <div className="stopCircleIcon iconBot" style={{backgroundColor: currentLine.hexcolor}}>
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            </div>
          </div>
          </div>

          <div className="stopInfoContainer">
            <div className="stopCircleInfo infoTop">
              <p><b>{this.props.stationMap[currentRoute.leg[i]['@origin']].name}</b></p>
              <p>Board at {currentRoute.leg[i]['@origTimeMin']}</p>
            </div>
            <div className="stopPadderInfo">
              <p>{currentLine.name}</p>
            </div>
            <div className="stopCircleInfo infoBot">
            <p><b>{this.props.stationMap[currentRoute.leg[i]['@destination']].name}</b></p>
            <p>Exit at {currentRoute.leg[i]['@destTimeMin']}</p>
            </div>
          </div>
          </div>
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
          {legs}
        </div>
        </div>
      </div>

     );

  }
}

export default RouteCard;
