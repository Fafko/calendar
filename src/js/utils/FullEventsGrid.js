import moment from 'moment';
import EventService from './EventService';

export default class FullEventsGrid {

  constructor(events, week = []) {

    this._rawGrid = [];
    this._grid = [];
    this.COLLS_COUNT = 7;
    this._events = EventService.sortByStartDate(events);
    this.ROWS_COUNT = EventService.getMaxConcurrentEventsCount(events);
    this._week = week;

    if (week.length) {
      this._initGrid();
      this._fillGrid();
    }

  }

  _initGrid() {
    for (let i = 0; i < this.ROWS_COUNT; i += 1) {
      this._grid.push([]);
      this._rawGrid.push(new Array(this.COLLS_COUNT).fill(null));
    }
  }

  _fillGrid() {

    let preWeek = moment(this._week[0].date).subtract(1, 'days');
    let postWeek = moment(this._week[6].date).add(1, 'days');

    this._events.forEach(event => {

      let prev = event.existsInPast(preWeek);
      let next = event.existsInFuture(postWeek);
      let eventFrom = prev ? this._week[0].date : event.start;
      let eventTo = next ? postWeek : event.end;
      let eventStartDay = eventFrom.weekday();
      let eventLength = event.getDaysLength(eventFrom, eventTo);

      for (let i = 0; i < this.ROWS_COUNT; i += 1) {
        let row = this._rawGrid[i];
        let gridRow = this._grid[i];

        if (!row[eventStartDay]) {

          row.splice(eventStartDay, eventLength, ...(new Array(eventLength).fill(event.id)));

          let offset = 0;

          for (let d = 0; d < 7; d += 1) {
            if (row[d] === event.id) break;
            offset = row[d] ? 0 : offset + 1;
          }

          gridRow.push({
            event,
            offset,
            prev,
            next,
            length: eventLength
          });

          break;
        }

      }

    });
  }

  getGrid() {
    return this._grid;
  }

}
