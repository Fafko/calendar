import React, {Component} from 'react';

export default class Toolbar extends Component {

  constructor() {
    super();
    this.getButtonClass = this.getButtonClass.bind(this);
    this.getCurrentView = this.getCurrentView.bind(this);
  }

  getButtonClass(tab) {
    let baseClasses = ['button', '__normal'];
    if (tab === this.props.chosenTab) baseClasses.push('__active');
    return baseClasses;
  }

  getCurrentView() {

    let {day, week, month, chosenTab} = this.props;

    if (chosenTab === 'day' && day) {

      return day.date.format('dddd, DD MMM YYYY');

    } else if (chosenTab === 'week' && week) {

      let weekStart = week[0].date;
      let weekEnd = week[6].date;

      return weekStart.isSame(weekEnd, 'year')
          ? `${weekStart.format('DD MMM')} - ${weekEnd.format('DD MMM YYYY')}`
          : `${weekStart.format('DD MMM YYYY')} - ${weekEnd.format('DD MMM YYYY')}`;

    } else if (chosenTab == 'month' && month) {

      let monthMiddleDay = month[Math.floor(month.length / 2)].date;
      return monthMiddleDay.format('MMMM YYYY');

    }

  }

  render() {

    const {chosenTab, chooseTab, chosenDate, prev, next, current} = this.props;

    return (
        <div className="toolbar">

          <div className="toolbar__navigation">
            <button className="button __normal"
                    onClick={() => prev(chosenDate, chosenTab)}>Prev
            </button>
            <button className="button __normal" onClick={() => current(chosenTab)}>Current</button>
            <button className="button __normal"
                    onClick={() => next(chosenDate, chosenTab)}>Next
            </button>

            <span className="toolbar__current-view">{this.getCurrentView()}</span>

          </div>

          <div className="toolbar__zoom">
            <button className={this.getButtonClass('day').join(' ')}
                    onClick={() => chooseTab('day', chosenDate)}>Day
            </button>
            <button className={this.getButtonClass('week').join(' ')}
                    onClick={() => chooseTab('week', chosenDate)}>Week
            </button>
            <button className={this.getButtonClass('month').join(' ')}
                    onClick={() => chooseTab('month', chosenDate)}>Month
            </button>
          </div>

          <button className="button __success" onClick={this.props.openModal}>Create event</button>

        </div>
    );
  }

}