import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Week from '../components/Week';

const mapStateToProps = (state) => {
  return {
    week: state.calendar.week
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDay: (date) => {
      dispatch(push(`/day/${date.format('YYYY-MM-DD')}/`));
    }
  };
};

const WeekContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Week);

export default WeekContainer;