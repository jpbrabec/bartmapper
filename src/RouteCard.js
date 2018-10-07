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
          {/* Horizontal section representing one leg */}
          <div className="legContainerHorizontal">
            {/* Column containing icon and time */}
            <div className="iconHolderColumn">
              <div className="stopCircleIcon" style={{backgroundColor: currentLine.hexcolor}}>
                <i className="fas fa-train fa-2x"></i>
              </div>
              <p>RED</p>
            </div>
            {/* Column containing line seperator */}
            <div className="stopPadderColumn" style={{backgroundColor: currentLine.hexcolor}}>
            <div className="stopPadderPin"></div>
            </div>
            {/* Column containing station information */}
            <div className="stopInfoColumn">
            <p><b>{this.props.stationMap[currentRoute.leg[i]['@origin']].name}</b></p>
            <p>{i == 0 ? <span>Board</span> : <span>Transfer</span>} at {currentRoute.leg[i]['@origTimeMin']}</p>
            <p>Ride for 7 stops</p>
            </div>
          </div>
          </Fragment>
        )

        // Add the end-cap row if we're done
        if(i == currentRoute.leg.length-1) {
          legs.push(
            <Fragment key={i}>
            {/* Horizontal section representing one leg */}
            <div className="legContainerHorizontal">
              {/* Column containing icon and time */}
              <div className="iconHolderColumn">
              <div className="stopCircleIcon endCapCircleIcon" style={{backgroundColor: currentLine.hexcolor}}>
                <i className="fas fa-walking fa-2x"></i>
              </div>
              </div>
              {/* Column containing line seperator */}
              <div className="stopPadderColumn endCapPadder" style={{backgroundColor: currentLine.hexcolor}}>
              <div className="stopPadderPin"></div>
              </div>
              {/* Column containing station information */}
              <div className="stopInfoColumn">
              <p><b>{this.props.stationMap[currentRoute.leg[i]['@destination']].name}</b></p>
              <p>Arrive at {currentRoute.leg[i]['@destTimeMin']}</p>
              </div>
            </div>
            </Fragment>
          )
        }
      }

     return (
       <div class="panel panel-default" key={currentRoute['@destTimeMin']}>
        <div class="panel-body">
        <div class="col-md-12">
          <div className="stopCardWrapper">
          {legs}
          </div>
        </div>
        </div>
      </div>

     );

  }
}

export default RouteCard;
