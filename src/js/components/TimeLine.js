import React, {Component} from 'react';
import moment from 'moment';

export default class TimeLine extends Component {

  constructor() {
    super();
    this.DAY_LENGTH = 24;
    this.MOMENT_UPDATE_INTERVAL = 1000 * 60;
    this.state = {
      momentPosition: null,
      momentInterval: null
    };
    this.actualizeMomentPosition = this.actualizeMomentPosition.bind(this);
    this.getTimeLineTemplate = this.getTimeLineTemplate.bind(this);
  }

  componentDidMount() {

    this.actualizeMomentPosition();
    this.setState({
      momentInterval: setInterval(this.actualizeMomentPosition, this.MOMENT_UPDATE_INTERVAL)
    });

  }

  actualizeMomentPosition() {

    let minutesAll = 60 * 24;
    let now = moment();
    let dayStart = moment(now).startOf('day');
    let minutesNow = now.diff(dayStart, 'minutes');

    this.setState({
      momentPosition: minutesNow * 100 / minutesAll
    });

  }

  componentWillUnmount() {
    if (this.state.momentInterval) {
      clearInterval(this.state.momentInterval);
    }
  }

  getTimeLineTemplate() {

    let timeLineTemplate = [];

    for (let i = 0; i < this.DAY_LENGTH; i += 1) {

      timeLineTemplate.push(
          <div className="timeline__hour" key={i}>
            {moment().startOf('d').add(i, 'h').format('HH:mm')}
          </div>
      );
    }

    return timeLineTemplate;

  }

  render() {

    let momentStyle = {
      top: `${this.state.momentPosition}%`
    };

    return (
        <div className="timeline">
          <span style={momentStyle} className="timeline__moment"/>
          {this.getTimeLineTemplate()}
        </div>
    );

  }

}