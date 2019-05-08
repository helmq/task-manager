import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TaskForm from './TaskForm';
import Modal from './Modal';
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

  renderModalFooter() {
    const { isLoading } = this.state;
    const { onClose } = this.props;

    if (isLoading) {
      return <Button onClick={onClose}>Close</Button>;
    }

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
  }

  render() {
    const { isLoading } = this.state;
    const { show, onClose } = this.props;
    const { task } = this.state;

    const modalTitle = `Task #${task.id} [${task.state}]`;
    const ModalFooter = this.renderModalFooter();

    if (isLoading) {
      return (
        <Modal show={show} onClose={onClose} Footer={ModalFooter} title={modalTitle}>
          <span>Your task is loading. Please be patient.</span>
        </Modal>
      );
    }

    return (
      <Modal show={show} onClose={onClose} Footer={ModalFooter} title={modalTitle}>
        <TaskForm
          description={task.description}
          name={task.name}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          author={task.author}
        />
      </Modal>
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
