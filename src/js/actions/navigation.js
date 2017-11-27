import moment from 'moment';

import {setDay} from './day';
import {setWeek} from './week';
import {setMonth} from './month';

export const CHOOSE_DATE = 'CHOOSE_DATE';
export const CHOOSE_TAB = 'CHOOSE_TAB';

export function chooseDate(date) {

  date = moment(date);

  if (!date.isValid()) {
    date = moment();
  }

  return {
    type: CHOOSE_DATE,
    payload: date.format('YYYY-MM-DD')
  }
}

export function chooseTab(tab) {
  return {
    type: CHOOSE_TAB,
    payload: tab
  }
}

export function setTabData(tab, date) {
  return dispatch => {

    switch (tab) {
      case 'day':
        dispatch(setDay(date));
        break;
      case 'week':
        dispatch(setWeek(date));
        break;
      case 'month':
        dispatch(setMonth(date));
        break;
    }

  }
}

export function processTransition(path) {
  return dispatch => {

    const dateRegExp = /\d{4}-\d{2}-\d{2}/;
    const tabRegExp = /day|week|month/;

    let date = dateRegExp.test(path)
        ? moment(path.match(dateRegExp)[0])
        : moment();

    let tab = tabRegExp.test(path)
        ? path.match(tabRegExp)[0]
        : 'week';

    dispatch(chooseTab(tab));
    dispatch(chooseDate(date));
    dispatch(setTabData(tab, date));

  }
}
