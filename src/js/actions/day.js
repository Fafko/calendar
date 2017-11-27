export const SET_DAY = 'SET_DAY';
import Calendar from '../utils/Calendar';

export function setDay(date) {
  return {
    type: SET_DAY,
    payload: Calendar.getDay(date)
  }
}