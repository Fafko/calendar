import moment from 'moment';
import EventStorage from './EventStorage';

moment.updateLocale('ru', {
  week: {dow: 1}
});

class Calendar {

  getDay(date) {

    let day = {
      date: moment(date),
      events: EventStorage.getEventsForDate(moment(date))
    };

    return day;

  }

  getWeek(date) {

    let firstWeekDay = moment(date).startOf('week');
    let lastWeekDay = moment(date).endOf('week');
    let day = moment(firstWeekDay);
    let weekDays = [];

    while (day <= lastWeekDay) {
      weekDays.push(this.getDay(day));
      day.add(1, 'd');
    }

    return weekDays;

  }

  getMonth(date) {

    let firstMonthDay = moment(date).startOf('month');
    let lastMonthDay = moment(date).endOf('month');
    let firstMonthWeek = this.getWeek(firstMonthDay);
    let lastMonthWeek = this.getWeek(lastMonthDay);
    let start = moment(firstMonthWeek[6].date).add(1, 'd');
    let end = moment(lastMonthWeek[0].date).subtract(1, 'd');
    let monthDays = [];

    monthDays.push(...firstMonthWeek);
    while (start <= end) {
      monthDays.push(this.getDay(start));
      start.add(1, 'd');
    }
    monthDays.push(...lastMonthWeek);

    return monthDays;

  }

}

export default new Calendar();