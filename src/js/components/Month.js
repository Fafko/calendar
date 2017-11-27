import React, {Component} from 'react';
import moment from 'moment';

export default class Month extends Component {

  constructor() {
    super();

    this.dayMinHeight = 80;
    this.offsetSumm = 90;
    this.state = {
      dayHeight: this.dayMinHeight,
      weeksCount: null
    };

    this.getMonthTemplate = this.getMonthTemplate.bind(this);
    this.updateDayHeight = this.updateDayHeight.bind(this);
  }

  updateDayHeight() {

    if (this.state.weeksCount) {
      this.setState({
        dayHeight: Math.floor(Math.max((window.innerHeight - this.offsetSumm) / this.state.weeksCount, this.dayMinHeight))
      });
    }

  }

  isDayCurrent(day) {
    return day.date.isSame(moment(), 'day');
  }

  isDayInactive(day) {
    return !moment(this.props.chosenDate).isSame(day.date, 'month');
  }

  getMonthTemplate() {

    let monthTemplate = [];
    let week = [];

    this.props.month.forEach((day, index) => {

      let dayClasses = [
        'month__day',
        this.isDayCurrent(day) ? '__current' : '',
        this.isDayInactive(day) ? '__inactive' : ''
      ];

      let dayStyles = {
        height: `${this.state.dayHeight}px`
      };

      let format = day.date.date() === 1 ? 'DD MMM' : 'DD';

      week.push(
          <div style={dayStyles} key={index} className={dayClasses.join(' ')}>
            <div className="month__day-info">
              <span onClick={() => this.props.openDay(day.date)} className="month__day-link">
                {day.date.format(format)}
              </span>
            </div>
          </div>
      );

      if (week.length >= 7) {
        monthTemplate.push(week);
        week = [];
      }

    });

    return monthTemplate;

  }

  componentDidMount() {
    if (this.props.month) {
      this.setState({
        weeksCount: this.props.month.length / 7
      }, this.updateDayHeight);
    }
    window.addEventListener('resize', this.updateDayHeight);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.month) {
      this.setState({
        weeksCount: nextProps.month.length / 7
      }, this.updateDayHeight);
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDayHeight)
  }

  render() {

    if (this.props.month) {

      let month = this.getMonthTemplate().map((week, index) =>
          <div key={index} className="month__week">{week}</div>
      );

      let weekdays = moment.weekdaysMin(true);

      let headers = weekdays.map((weekday, index) =>
          <div key={index} className="month__header">{weekday}</div>
      );

      return (
          <div className="month__wrap">
            <div className="month">
              <div className="month__headers">
                {headers}
              </div>
              {month}
            </div>
          </div>
      );
    }

    return null;

  }

}