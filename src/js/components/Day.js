import React, {Component} from 'react';
import moment from 'moment';
import EventService from '../utils/EventService';

import TimeLine from './TimeLine';
import Event from './Event';

export default class Day extends Component {

  constructor() {
    super();
    this.DAY_LENGTH = 24;
    this.MOMENT_UPDATE_INTERVAL = 1000 * 60;

    this.state = {
      momentPosition: null,
      momentInterval: null
    };
    this.actualizeMomentPosition = this.actualizeMomentPosition.bind(this);
    this.isCurrent = this.isCurrent.bind(this);
    this.getDayTemplate = this.getDayTemplate.bind(this);
  }

  getDayTemplate() {

    let dayTemplate = [];

    for (let i = 0; i < this.DAY_LENGTH; i += 1) {
      dayTemplate.push(
          <div className="day__hour" key={i}>
            <div className="day__hour-half"></div>
            <div className="day__hour-half"></div>
          </div>
      );
    }

    return dayTemplate;

  }

  getMomentPosition(m, invert) {

    let minutesAll = 60 * 24;
    let dayStart = moment(m).startOf('day');
    let minutesMoment = m.diff(dayStart, 'minutes');
    let result = minutesMoment * 100 / minutesAll;
    return invert ? 100 - result : result;

  }

  getEventsTemplate(events) {
    return events.map(event => {

      let style = {
        top: `${this.getMomentPosition(event.start)}%`,
        bottom: event.end.isSame(this.props.day.date, 'day') ? `${this.getMomentPosition(event.end, true)}%` : '0%'
      };

      return <Event event={event} key={event.id} style={style}/>;

    });
  }

  getTimelineTemplate() {
    return this.props.hideTimeLine
        ? null
        : <TimeLine date={this.props.day.date}/>;
  }

  getFullEventsTemplate(events) {

    let yesterday = moment(this.props.day.date).subtract(1, 'days');
    let tomorrow = moment(this.props.day.date).add(1, 'days');

    return EventService.sortByStartDate(events).map(event => {

      let arrowPrev = event.existsInPast(yesterday) ? <span className="arrow-prew"/> : null;
      let arrowNext = event.existsInFuture(tomorrow) ? <span className="arrow-next"/> : null;

      return <Event event={event} full={true} arrowPrev={arrowPrev} arrowNext={arrowNext} key={event.id}/>;
    });

  }

  getDayHeaderTemplate(events) {

    return this.props.hideDayHeader
        ? null
        : (
            <div className="day__header">
              <div className="day__gmt">
                {this.props.day.date.format('[GMT]Z')}
              </div>
              <div className="day__header-row">
                <div className="day__date">
                  {this.props.day.date.format('dddd, MM/DD')}
                </div>
                <div className="day__events_full">
                  {this.getFullEventsTemplate(events)}
                </div>
              </div>
            </div>);
  }

  isCurrent() {
    return this.props.day.date.isSame(moment(), 'day');
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

  render() {

    if (this.props.day) {

      let events = [];
      let fullEvents = [];

      this.props.day.events.forEach(event => {
        event.isFullDayOrLonger()
            ? fullEvents.push(event)
            : events.push(event);
      });


      let momentStyle = {
        top: `${this.state.momentPosition}%`
      };

      let dayScheduleStyle = {
        width: this.props.hideTimeLine ? '100%' : 'calc(100% - 63px)'
      };

      let moment = this.isCurrent()
          ? <span style={momentStyle} className="day__moment"/>
          : null;

      return (
          <div className="day__wrap">
            {this.getDayHeaderTemplate(fullEvents)}
            <div className="day">
              {this.getTimelineTemplate()}
              <div style={dayScheduleStyle} className={`day__schedule ${this.isCurrent() ? '__current' : ''}`}>
                {moment}
                <div className="day__hours">
                  {this.getDayTemplate()}
                </div>
                <div className="day__events">
                  {this.getEventsTemplate(events)}
                </div>
              </div>
            </div>
          </div>
      );
    }

    return null;

  }

}