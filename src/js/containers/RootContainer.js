import {connect} from 'react-redux';
import Root from '../components/Root';

const mapStateToProps = (state) => {
  return {
    path: state.router.location.pathname
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Root);

export default RootContainer