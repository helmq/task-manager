import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../fetch';

export default class AddPopup extends React.Component {
  state = {
    name: '',
    description: '',
    assignee: {
      id: null,
      first_name: null,
      last_name: null,
      email: null,
    },
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleCardAdd = () => {
    const { name, assignee, description } = this.state;
    const { onClose } = this.props;

    fetch('POST', window.Routes.api_v1_tasks_path(), {
      task: {
        name,
        description,
        assignee_id: assignee.id,
      },
    }).then(response => {
      if (response.statusText === 'Created') {
        onClose(true);
      } else {
        alert(`${response.status} - ${response.statusText}`);
      }
    });
  };

  render() {
    const { show, onClose } = this.props;
    const { description, name } = this.state;

    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Set the name for the task"
                onChange={this.handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Set the description for the task"
                onChange={this.handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={this.handleCardAdd}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
};

AddPopup.defaultProps = {
  show: false,
  onClose: () => {},
};
