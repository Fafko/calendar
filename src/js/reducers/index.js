import day from './day';
import week from './week';
import month from './month';
import navigation from './navigation';
import eventModal from './eventModal';

export default function calendar(state = {}, action) {
  return {
    day: day(state.day, action),
    week: week(state.week, action),
    month: month(state.month, action),
    navigation: navigation(state.navigation, action),
    eventModal: eventModal(state.eventModal, action)
  }
}