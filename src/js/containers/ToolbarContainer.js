import moment from 'moment';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Toolbar from '../components/Toolbar';
import {toggleModal} from '../actions/eventModal';

const mapStateToProps = (state) => {
  return {
    chosenTab: state.calendar.navigation.chosenTab,
    chosenDate: state.calendar.navigation.chosenDate,
    day: state.calendar.day,
    week: state.calendar.week,
    month: state.calendar.month
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    current: (chosenTab) => {
      dispatch(push(`/${chosenTab}/${moment().format('YYYY-MM-DD')}/`));
    },
    prev: (date, chosenTab) => {

      let newDate;

      switch (chosenTab) {
        case 'day':
          newDate = moment(date).subtract(1, 'd');
          break;
        case 'week':
          newDate = moment(date).subtract(1, 'w');
          break;
        case 'month':
          newDate = moment(date).subtract(1, 'M');
          break;
        default:
          newDate = moment(date);
      }

      dispatch(push(`/${chosenTab}/${newDate.format('YYYY-MM-DD')}/`));
    },
    next: (date, chosenTab) => {

      let newDate;

      switch (chosenTab) {
        case 'day':
          newDate = moment(date).add(1, 'd');
          break;
        case 'week':
          newDate = moment(date).add(1, 'w');
          break;
        case 'month':
          newDate = moment(date).add(1, 'M');
          break;
        default:
          newDate = moment(date);
      }

      dispatch(push(`/${chosenTab}/${newDate.format('YYYY-MM-DD')}/`));

    },
    chooseTab: (tab, chosenDate) => {
      dispatch(push(`/${tab}/${moment(chosenDate).format('YYYY-MM-DD')}/`));
    },
    openModal: () => {
      dispatch(toggleModal(true));
    }
  }
};

const ToolbarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export default ToolbarContainer