import React, {Component} from 'react';

export default class Event extends Component {

  // constructor() {
  //   super();
  //   this.getButtonClass = this.getButtonClass.bind(this);
  //   this.getCurrentView = this.getCurrentView.bind(this);
  // }


  render() {

    const {
      style = null,
      event,
      arrowPrev = null,
      arrowNext = null,
      full = false,
      week = false
    } = this.props;

    const className = [
      'event',
      full ? 'full' : '',
      week ? 'week' : ''
    ];

    const time = full
        ? null
        : <span className="event-time">{event.start.format('HH:mm')} - {event.end.format('HH:mm')} </span>;

    const title = full
        ? <span className="event-title">{event.title}
          ({`${event.start.format('dd, MM/DD HH:mm')} - ${event.end.format('dd, MM/DD HH:mm')}`})
          </span>
        : <span className="event-title">{event.title}</span>;

    return (
        <div className={className.join(' ')} style={style}>
          {arrowPrev}
          {time}
          {title}
          {arrowNext}
        </div>
    );
  }

}