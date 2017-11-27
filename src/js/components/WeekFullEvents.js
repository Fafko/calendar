import React, {Component} from 'react';
import moment from 'moment';
import EventService from '../utils/EventService';
import FullEventsGrid from '../utils/FullEventsGrid';

export default class WeekFullEvents extends Component {

  getWeekHeaderTemplate(events) {

    let rowsCount = EventService.getMaxConcurrentEventsCount(events);
    let weekEventStyle = {
      height: `${rowsCount * 19}px`
    };

    let prevWeek = moment(this.props.week[0].date).subtract(1, 'days');
    let nextWeek = moment(this.props.week[6].date).add(1, 'days');

    let weekDatesTemplate = [];
    let weekEventsTemplate = [];
    let eventsTemplate = EventService.sortByStartDate(events).map((event, index) => {

      let arrowPrev = event.existsInPast(prevWeek) ? <span className="arrow-prew"/> : null;
      let arrowNext = event.existsInFuture(nextWeek) ? <span className="arrow-next"/> : null;

      let getEventLengthFrom = event.existsInPast(prevWeek)
          ? this.props.week[0].date
          : event.start;

      let getEventLengthTo = event.existsInFuture(nextWeek)
          ? nextWeek
          : event.end;

      let style = {
        width: `calc(100% / 7 * ${event.getDaysLength(getEventLengthFrom, getEventLengthTo)} - 4px)`,
        top: `${index * 19 + 19}px`,
        marginLeft: `calc(100% / 7 * ${getEventLengthFrom.weekday()} + 2px)`
      };

      return (<div className="week__event-full" key={event.id} style={style}>
        {arrowPrev}
        <span className="week__event-full__title">{event.title}
          ({`${event.start.format('dd, MM/DD HH:mm')} - ${event.end.format('dd, MM/DD HH:mm')}`})</span>
        {arrowNext}
      </div>);

    });

    this.props.week.forEach((day, index) => {
      weekDatesTemplate.push(
          <div key={index} className="week__date">
            <span onClick={() => this.props.openDay(day.date)} className="week__date-link">
              {day.date.format('dd, MM/DD')}
            </span>
          </div>);
      weekEventsTemplate.push(<div style={weekEventStyle} key={index} className="week__event"/>);
    });

    return (
        <div className="week__header">
          <div className="week__gmt">
            {this.props.week[0].date.format('[GMT]Z')}
          </div>
          <div className="week__header-row">
            <div className="week__dates">
              {weekDatesTemplate}
            </div>
            <div className="week__events">
              {weekEventsTemplate}
            </div>
            {eventsTemplate}
          </div>
        </div>);
  }

  render() {

    if (this.props.week) {

      let fullEvents = [];
      let eventsInList = {};

      this.props.week.forEach(day => {
        day.events.forEach(event => {
          if (event.isFullDayOrLonger() && !eventsInList[event.id]) {
            eventsInList[event.id] = true;
            fullEvents.push(event);
          }
        });
      });

      return (
          <div className="week__header-row">
            <div className="week__dates">
              {weekDatesTemplate}
            </div>
            <div className="week__events">
              {weekEventsTemplate}
            </div>
            {eventsTemplate}
          </div>
      )

    }

    return null;
  }

}