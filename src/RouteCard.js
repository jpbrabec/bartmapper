import React, { Component, Fragment } from 'react';

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
          <td> {currentRoute.leg[i]['@origTimeMin']}</td>
          <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}></td>
          <td>{this.props.stationMap[currentRoute.leg[i]['@origin']].name}</td>
          </tr>
          <tr>
            <td></td>
            <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}>vvvv</td>
            <td>{currentLine.name}</td>
          </tr>
          <tr>
            <td>  {currentRoute.leg[i]['@destTimeMin']}</td>
            <td style={{backgroundColor: currentLine.hexcolor, height: '100%'}}></td>
            <td>{this.props.stationMap[currentRoute.leg[i]['@destination']].name}</td>
          </tr>
          </Fragment>
        )

        // Add a buffer row if there's a transfer
        if(i<currentRoute.leg.length-1) {
          legs.push(
            <tr>
            <td></td>
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
