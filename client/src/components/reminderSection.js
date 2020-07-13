
import React, { Component } from 'react';
import ReminderItem from './reminderItem';
import PropTypes from 'prop-types';


class Reminders extends Component {
  render() {
    return this.props.todos.map((todo) => (
      <ReminderItem key={todo._id} todo={todo} markComplete={this.props.markComplete} updateCompletedList={this.updateCompletedList} deleteReminder={this.props.deleteReminder} />
    ));
  }
}

// PropTypes
Reminders.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  updateCompletedList: PropTypes.func.isRequired
}

export default Reminders;