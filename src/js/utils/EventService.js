class EventService {

  sortByStartDate(events) {
    return events.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
      else if (a.start > b.start) {
        return 1
      } else if (a.getDaysLength() > b.getDaysLength()) {
        return -1;
      } else if (a.getDaysLength() < b.getDaysLength()) {
        return 1;
      }
      return 0;
    });
  }

  getMaxConcurrentEventsCount(events) {

    let eventsPoints = events
        .reduce((result, current) => {
          result.push({point: current.start, type: 1});
          result.push({point: current.end, type: -1});
          return result;
        }, [])
        .sort((a, b) =>
            a.point < b.point ? -1 : a.point > b.point ? 1 : 0
        );

    let maxValue = 0;
    let currentValue = 0;

    eventsPoints.forEach(point => {
      currentValue += point.type;
      maxValue = Math.max(maxValue, currentValue);
    });

    return maxValue;

  }

}

export default new EventService();