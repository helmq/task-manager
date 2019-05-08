import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const TaskForm = ({ name, description, onNameChange, onDescriptionChange, author }) => (
  <Form>
    <Form.Group controlId="formTaskName">
      <Form.Label>Task name:</Form.Label>
      <Form.Control
        type="text"
        value={name}
        placeholder="Set the name for the task"
        onChange={onNameChange}
      />
    </Form.Group>
    <Form.Group controlId="formDescriptionName">
      <Form.Label>Task description</Form.Label>
      <Form.Control
        as="textarea"
        value={description}
        placeholder="Set the description for the task"
        onChange={onDescriptionChange}
      />
    </Form.Group>
    {author && `Author: ${author.first_name} ${author.last_name}`}
  </Form>
);

TaskForm.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
TaskForm.defaultProps = {
  name: '',
  description: '',
  onNameChange: () => {},
  onDescriptionChange: () => {},
  author: null,
};

export default TaskForm;
