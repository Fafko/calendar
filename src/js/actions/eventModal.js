export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_ERRORS = 'SET_ERRORS';

export function toggleModal(isOpened) {
  return {
    type: TOGGLE_MODAL,
    payload: isOpened
  }
}

export function setErrors(errorBag) {
  return {
    type: SET_ERRORS,
    payload: errorBag
  }
}