import React, {Component} from 'react';
import Datetime from 'react-datetime';

export default class EventModal extends Component {

  constructor() {
    super();

    this.state = {
      title: '',
      start: null,
      end: null
    };

    this.save = this.save.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.isOpened !== nextProps.data.isOpened) {
      this.setState({
        title: '',
        start: null,
        end: null
      });
    }
  }

  save() {

    let event = {
      title: this.state.title,
      start: this.state.start,
      end: this.state.end
    };

    this.props.createEvent(event, this.props.navigation);

  }

  onFieldChange(value, type) {
    this.setState({[type]: value});
  }

  getErrorMessage(key) {
    const error = this.props.data.errors.filter(error => error.key === key)[0];
    return error && error.message;
  }

  render() {

    let wrapClasses = [
      'event-modal__wrap',
      this.props.data.isOpened ? '__opened' : ''
    ];

    let timeConstraints = {
      minutes: {
        step: 30
      }
    };

    let startInputProps = {
      placeholder: 'Start at',
      required: true,
      readOnly: true
    };

    let endInputProps = {
      placeholder: 'End at',
      required: true,
      readOnly: true
    };

    return (
        <div className={wrapClasses.join(' ')}>
          <div className="event-modal__backdrop" onClick={this.props.closeModal}/>
          <div className="event-modal">
            <div className="event-modal__row">
              <input className="input" value={this.state.title} onChange={(e) => {
                this.onFieldChange(e.target.value, 'title')
              }} placeholder="Event name" type="text"/>
              <p className="event-modal__error">{this.getErrorMessage('title')}</p>
            </div>
            <div className="event-modal__row">
              <Datetime timeFormat="HH:mm" timeConstraints={timeConstraints} value={this.state.start}
                        onChange={(value) => {
                          this.onFieldChange(value, 'start')
                        }} inputProps={startInputProps} dateFormat="YYYY-MM-DD"/>
              <p className="event-modal__error">{this.getErrorMessage('start')}</p>
            </div>
            <div className="event-modal__row">
              <Datetime timeFormat="HH:mm" timeConstraints={timeConstraints} value={this.state.end}
                        onChange={(value) => {
                          this.onFieldChange(value, 'end')
                        }} inputProps={endInputProps} dateFormat="YYYY-MM-DD"/>
              <p className="event-modal__error">{this.getErrorMessage('end')}</p>
            </div>
            <div className="event-modal__row __justified">
              <button className="button __danger" onClick={this.props.closeModal}>Close</button>
              <button className="button __success" onClick={() => this.save()}>Save</button>
            </div>
          </div>
        </div>
    )
  }

}