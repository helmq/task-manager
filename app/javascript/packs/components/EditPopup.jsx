import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../fetch';

export default class EditPopup extends React.Component {
  state = {
    task: {
      id: null,
      name: '',
      description: '',
      state: null,
      author: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
      assignee: {
        id: null,
        first_name: null,
        last_name: null,
        email: null,
      },
    },
    isLoading: true,
  };

  componentDidUpdate(prevProps) {
    const { cardId } = this.props;

    if (cardId !== null && cardId !== prevProps.cardId) {
      this.loadCard(cardId);
    }
  }

  loadCard = cardId => {
    this.setState({ isLoading: true });

    fetch('GET', window.Routes.api_v1_task_path(cardId, { format: 'json' })).then(({ data }) => {
      this.setState({ task: data });
      this.setState({ isLoading: false });
    });
  };

  handleNameChange = e => {
    const { task } = this.state;

    this.setState({ task: { ...task, name: e.target.value } });
  };

  handleDescriptionChange = e => {
    const { task } = this.state;

    this.setState({ task: { ...task, description: e.target.value } });
  };

  handleCardEdit = () => {
    const { cardId, onClose } = this.props;
    const { task } = this.state;

    fetch('PUT', window.Routes.api_v1_task_path(cardId, { format: 'json' }), {
      name: task.name,
      description: task.description,
      author_id: task.author.id,
      assignee_id: task.assignee.id,
      state: task.state,
    })
      .then(() => {
        onClose(task.state);
      })
      .catch(e => {
        alert(`Update failed! ${e.response.status} - ${e.response.statusText}`);
      });
  };

  handleCardDelete = () => {
    const { cardId, onClose } = this.props;
    const { task } = this.state;

    fetch('DELETE', window.Routes.api_v1_task_path(cardId, { format: 'json' }))
      .then(() => {
        onClose(task.state);
      })
      .catch(e => {
        alert(`DELETE failed! ${e.response.status} - ${e.response.statusText}`);
      });
  };

  render() {
    const { isLoading } = this.state;
    const { show, onClose } = this.props;
    const { task } = this.state;

    if (isLoading) {
      return (
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your task is loading. Please be patient.</Modal.Body>
          <Modal.Footer>
            <Button onClick={onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    return (
      <div>
        <Modal show={show} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task #{task.id}[{task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task name:</Form.Label>
                <Form.Control
                  type="text"
                  value={task.name}
                  placeholder="Set the name for the task"
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={task.description}
                  placeholder="Set the description for the task"
                  onChange={this.handleDescriptionChange}
                />
              </Form.Group>
            </form>
            Author: {task.author.first_name} {task.author.last_name}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>
              Delete
            </Button>
            <Button onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={this.handleCardEdit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

EditPopup.propTypes = {
  cardId: PropTypes.string,
  onClose: PropTypes.func,
  show: PropTypes.bool,
};

EditPopup.defaultProps = {
  cardId: '1',
  onClose: () => {},
  show: false,
};
