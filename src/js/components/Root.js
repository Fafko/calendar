import React, {Component} from 'react';
import ToolbarContainer from '../containers/ToolbarContainer';
import EventModalContainer from '../containers/EventModalContainer';

export default class Root extends Component {

  render() {
    return (
        <div className="root">
          <ToolbarContainer/>
          {this.props.children}
          <EventModalContainer/>
        </div>
    )
  }

}