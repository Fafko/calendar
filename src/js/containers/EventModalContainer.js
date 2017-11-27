import {connect} from 'react-redux';
import EventModal from '../components/EventModal';
import EventStorage from '../utils/EventStorage';
import Event from '../utils/Event';
import {toggleModal, setErrors} from '../actions/eventModal';
import {setTabData} from '../actions/navigation';


const mapStateToProps = (state) => {
  return {
    data: state.calendar.eventModal,
    navigation: state.calendar.navigation
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(setErrors([]));
      dispatch(toggleModal(false));
    },
    createEvent: (eventData, navigation) => {

      const event = new Event(eventData);
      const validationErrors = event.getValidationErrors();

      if (validationErrors.length) {
        dispatch(setErrors(validationErrors));
      } else {
        EventStorage.saveEvent(event);
        dispatch(toggleModal(false));
        dispatch(setTabData(navigation.chosenTab, navigation.chosenDate));
      }

    }
  }
};

const EventModalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventModal);

export default EventModalContainer;