
import React, { Component } from 'react';

import PropTypes from 'prop-types';
import FinishedItem from './FinishedItem';


class Finished extends Component {
  render() {
    return this.props.todos.map((todo) => (
      <FinishedItem key={todo._id} todo={todo} markComplete={this.props.markComplete} updateCompletedList={this.props.updateCompletedList} deleteReminder={this.props.deleteReminder} />
    ));
  }
}

// PropTypes
Finished.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  updateCompletedList: PropTypes.func.isRequired
}

export default Finished;