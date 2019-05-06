import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../fetch';
import FormPopup from './FormPopup';

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

  loadCard = async cardId => {
    this.setState({ isLoading: true });

    try {
      const { data } = await fetch(
        'GET',
        window.Routes.api_v1_task_path(cardId, { format: 'json' }),
      );
      this.setState({ task: data });
      this.setState({ isLoading: false });
    } catch (e) {
      if (e.response) {
        alert(`Load failed! ${e.response.status} - ${e.response.statusText}`);
      } else {
        alert('No response.');
      }
    }
  };

  handleNameChange = e => {
    const { task } = this.state;

    this.setState({ task: { ...task, name: e.target.value } });
  };

  handleDescriptionChange = e => {
    const { task } = this.state;

    this.setState({ task: { ...task, description: e.target.value } });
  };

  handleCardEdit = async () => {
    const { cardId, onClose } = this.props;
    const { task } = this.state;

    try {
      await fetch('PUT', window.Routes.api_v1_task_path(cardId, { format: 'json' }), {
        name: task.name,
        description: task.description,
        author_id: task.author.id,
        assignee_id: task.assignee.id,
        state: task.state,
      });
      onClose(task.state);
    } catch (e) {
      if (e.response) {
        alert(`Update failed! ${e.response.status} - ${e.response.statusText}`);
      } else {
        alert('No response.');
      }
    }
  };

  handleCardDelete = async () => {
    const { cardId, onClose } = this.props;
    const { task } = this.state;

    try {
      await fetch('DELETE', window.Routes.api_v1_task_path(cardId, { format: 'json' }));
      onClose(task.state);
    } catch (e) {
      if (e.response) {
        alert(`DELETE failed! ${e.response.status} - ${e.response.statusText}`);
      } else {
        alert('No response.');
      }
    }
  };

  renderFooter = () => {
    const { onClose } = this.props;

    return (
      <>
        <Button variant="danger" onClick={this.handleCardDelete}>
          Delete
        </Button>
        <Button onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={this.handleCardEdit}>
          Save changes
        </Button>
      </>
    );
  };

  render() {
    const { isLoading } = this.state;
    const { show, onClose } = this.props;
    const { task } = this.state;
    const Footer = this.renderFooter();

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
      <FormPopup
        modalTitle="Create task"
        show={show}
        onClose={onClose}
        description={task.description}
        name={task.name}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        Footer={Footer}
        author={task.author}
      />
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
