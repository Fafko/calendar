export const SET_MONTH = 'SET_MONTH';
import Calendar from '../utils/Calendar';

export function setMonth(date) {
  return {
    type: SET_MONTH,
    payload: Calendar.getMonth(date)
  }
}