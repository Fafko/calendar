import {CHOOSE_DATE, CHOOSE_TAB} from '../actions/navigation';

const DEFAULT_STATE = {
  chosenTab: null,
  chosenDate: null
};

export default function navigation(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CHOOSE_DATE:
      return {
        ...state,
        chosenDate: action.payload
      };
    case CHOOSE_TAB:
      return {
        ...state,
        chosenTab: action.payload
      };
    default:
      return state
  }
}