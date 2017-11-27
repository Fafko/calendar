export const SET_WEEK = 'SET_WEEK';
import Calendar from '../utils/Calendar';

export function setWeek(date) {
  return {
    type: SET_WEEK,
    payload: Calendar.getWeek(date)
  }
}