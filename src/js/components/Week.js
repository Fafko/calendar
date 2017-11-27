import React, {Component} from 'react';
import FullEventsGrid from '../utils/FullEventsGrid';

import TimeLine from './TimeLine';
import Event from './Event';
import Day from './Day';

export default class Week extends Component {

  constructor() {
    super();

    this.getWeekTemplate = this.getWeekTemplate.bind(this);
  }

  getMaxConcurrentEventsCount(events) {

    let eventsPoints = events.reduce((result, current) => {
      result.push({point: current.start, type: 1});
      result.push({point: current.end, type: -1});
      return result;
    }, []).sort((a, b) => a.point < b.point ? -1 : a.point > b.point ? 1 : 0);

    let maxValue = 0;
    let currentValue = 0;

    eventsPoints.forEach(point => {
      currentValue += point.type;
      maxValue = Math.max(maxValue, currentValue);
    });

    return maxValue;

  }

  getWeekHeaderTemplate(events) {

    const grid = new FullEventsGrid(events, this.props.week).getGrid();

    let weekEventStyle = {
      height: `${grid.length * 19}px`
    };

    let weekDatesTemplate = [];
    let weekEventsTemplate = [];

    let fullEventsTemplate = grid.map((row, index) => {
      let events = row.map((eventData, index) => {

        let {length, offset, event, prev, next} = eventData;
        let arrowPrev = prev ? <span className="arrow-prew"/> : null;
        let arrowNext = next ? <span className="arrow-next"/> : null;

        let style = {
          width: `calc(100% / 7 * ${length} - 4px)`,
          marginLeft: `calc(100% / 7 * ${offset} + ${index ? 3 : 2}px)`
        };

        return <Event style={style}
                      event={event}
                      full={true}
                      arrowPrev={arrowPrev}
                      arrowNext={arrowNext}
                      key={event.id}/>;
      });

      return <div className="week__events-row" key={index}>{events}</div>;
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
            <div className="week__events-full">
              {fullEventsTemplate}
            </div>
          </div>
        </div>);
  }

  getWeekTemplate() {

    let weekTemplate = [];

    this.props.week.forEach((day, index) => {
      weekTemplate.push(<Day key={index} hideDayHeader={true} hideTimeLine={true} day={day}/>);
    });

    return weekTemplate;

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
          <div className="week__wrap">
            {this.getWeekHeaderTemplate(fullEvents)}
            <div className="week">
              <TimeLine date={this.props.week[0].date}/>
              <div className="week__schedule">
                {this.getWeekTemplate()}
              </div>
            </div>
          </div>
      )

    }

    return null;
  }

}