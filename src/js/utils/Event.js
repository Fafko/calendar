import moment from 'moment';

export default class Event {

  constructor(eventData) {

    const {id = null, title, start, end} = eventData;
    this.id = id || (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.title = title;
    this.start = moment(start);
    this.end = moment(end);
  }

  getValidationErrors() {

    const errorBag = [];

    if (!this.title || !this.title.trim().length) {
      errorBag.push({key: 'title', message: 'Event title is required'});
    }

    if (!moment.isMoment(this.start)) {
      errorBag.push({key: 'start', message: 'Event start is required'});
    }

    if (!moment.isMoment(this.end)) {
      errorBag.push({key: 'end', message: 'Event end is required'});
    }

    if (this.end.isBefore(this.start)) {
      errorBag.push({key: 'end', message: 'Wrong end date'});
    }

    return errorBag;

  }

  isMultiMonth() {
    return this.start.format('YYYY-MM') !== this.end.format('YYYY-MM');
  }

  isFullDayOrLonger() {
    return Math.abs(this.start.diff(this.end, 'days')) >= 1;
  }

  getDaysLength(fromDate = this.start, tillDate = this.end) {
    return Math.abs(fromDate.diff(tillDate, 'days'));
  }

  existsInFuture(date) {
    return this.end.isSameOrAfter(date, 'day') && Math.abs(this.end.diff(date, 'seconds')) > 1;
  }

  existsInPast(date) {
    return this.start.isSameOrBefore(date, 'day');
  }

}