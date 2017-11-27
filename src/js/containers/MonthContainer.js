import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Month from '../components/Month';

const mapStateToProps = (state) => {
  return {
    month: state.calendar.month,
    chosenDate: state.calendar.navigation.chosenDate
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDay: (date) => {
      dispatch(push(`/day/${date.format('YYYY-MM-DD')}/`));
    }
  };
};

const MonthContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Month);

export default MonthContainer;