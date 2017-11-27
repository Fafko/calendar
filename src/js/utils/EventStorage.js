import StorageClient from './StorageClient';
import moment from 'moment';
import Event from './Event';

class EventStorage {

  constructor() {
    this._storage = new StorageClient();
  }

  _getStorageKey(date) {
    return date.format('YYYY-MM');
  }

  getEventsForDate(date) {

    let events = this._storage.get(this._getStorageKey(date)) || [];

    return events
        .filter(({start, end}) =>
            Math.abs(date.startOf('date').diff(end, 'minutes')) > 1 &&
            date.isSameOrAfter(moment(start), 'day') && date.isSameOrBefore(moment(end), 'day'))
        .map(event => new Event(event));

  }

  saveEvent(event) {

    if (event.isMultiMonth()) {

      let date = moment(event.start);
      let goAhead = true;

      while (goAhead) {

        let storageKey = this._getStorageKey(date);
        let monthEvents = this._storage.get(storageKey) || [];
        monthEvents.push(event);
        this._storage.set(storageKey, monthEvents);

        if (date.isSame(event.end, 'month') && date.isSame(event.end, 'year')) {
          goAhead = false;
        }

        date = moment(date.add(1, 'month'));
      }

    } else {

      let monthEvents = this._storage.get(this._getStorageKey(event.start)) || [];
      monthEvents.push(event);
      this._storage.set(this._getStorageKey(event.start), monthEvents);

    }

  }

  updateEvent() {

  }

  deleteEvent() {

  }

}

export default new EventStorage();