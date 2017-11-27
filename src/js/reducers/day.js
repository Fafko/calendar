import {SET_DAY} from '../actions/day';

export default function day(state = null, action) {
  switch (action.type) {
    case SET_DAY:
      return action.payload;
    default:
      return state
  }
}