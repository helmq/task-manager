import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import FormControl from './FormControl';

const TaskForm = ({ name, description, onNameChange, onDescriptionChange, author }) => (
  <Form>
    <FormControl
      controlId="formTaskName"
      label="Task name:"
      value={name}
      placeholder="Set the name for the task"
      onChange={onNameChange}
    />
    <FormControl
      controlId="formTaskDescription"
      label="Task description:"
      value={description}
      placeholder="Set the description for the task"
      onChange={onDescriptionChange}
      as="textarea"
    />
    {author && `Author: ${author.first_name} ${author.last_name}`}
  </Form>
);

TaskForm.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
TaskForm.defaultProps = {
  name: '',
  description: '',
  author: null,
};

export default TaskForm;
