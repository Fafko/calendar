import {connect} from 'react-redux';
import Day from '../components/Day';

const mapStateToProps = (state) => {
  return {
    day: state.calendar.day
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const DayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Day);

export default DayContainer;