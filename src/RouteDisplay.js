import React, { Component, Fragment } from 'react';

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

           <table className="table table-striped">
           <tbody>

          {/* Route List */}
          {this.props.trips.length > 0 && (
              this.props.trips.map((currentRoute,index) => {
                var rows = [];
                for(var i=0; i<currentRoute.leg.length; i++) {
                  var currentLine = this.props.lineMap[currentRoute.leg[i]['@line']]
                  console.log('color ' + currentLine.hexcolor)
                  rows.push(
                    <tr>
                      <td style={{backgroundColor: currentLine.hexcolor}}>
                      {this.props.stationMap[currentRoute.leg[i]['@origin']].name} =>
                      </td>
                      <td style={{backgroundColor: currentLine.hexcolor}}>
                      {this.props.stationMap[currentRoute.leg[i]['@destination']].name}
                      </td>
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
    );
  }
}

export default RouteDisplay;
