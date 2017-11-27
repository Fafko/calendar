import {SET_WEEK} from '../actions/week';

export default function week(state = null, action) {
  switch (action.type) {
    case SET_WEEK:
      return action.payload;
    default:
      return state
  }
}