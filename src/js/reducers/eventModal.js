import {TOGGLE_MODAL, SET_ERRORS} from '../actions/eventModal';

const DEFAULT_STATE = {
  isOpened: false,
  errors: []
};

export default function eventModal(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        isOpened: action.payload
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state
  }
}