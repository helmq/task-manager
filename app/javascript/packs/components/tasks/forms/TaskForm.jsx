import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import FormControl from './FormControl';

const renderChildren = children => {
  if (children instanceof Array) {
    return React.Children.map(children, child => <Form.Group>{child}</Form.Group>);
  }
  return <Form.Group>{children}</Form.Group>;
};

const TaskForm = ({ name, description, onNameChange, onDescriptionChange, author, children }) => (
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
    {renderChildren(children)}
    {author && `Author: ${author.first_name} ${author.last_name}`}
  </Form>
);

TaskForm.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  author: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
TaskForm.defaultProps = {
  name: '',
  description: '',
  author: null,
  children: <></>,
};

export default TaskForm;
