import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD:app/javascript/packs/components/tasks/EditPopup.jsx
import TaskForm from './forms/TaskForm';
import Modal from '../modals/Modal';
import ModalLoading from '../modals/ModalLoading';
import EditPopupFooter from './EditPopupFooter';
import { fetch, handleFetchError } from '../../fetch';
=======
import { fetch } from '../fetch';
import FormPopup from './FormPopup';
import UserSelect from './UserSelect';
>>>>>>> add feature: choose assignee:app/javascript/packs/components/EditPopup.jsx

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
      handleFetchError(e, 'Load failed!');
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
      });
      onClose(task.state);
    } catch (e) {
      handleFetchError(e, 'Update failed!');
    }
  };

  handleCardDelete = async () => {
    const { cardId, onClose } = this.props;
    const { task } = this.state;

    try {
      await fetch('DELETE', window.Routes.api_v1_task_path(cardId, { format: 'json' }));
      onClose(task.state);
    } catch (e) {
      handleFetchError(e, 'Delete failed!');
    }
  };

<<<<<<< HEAD:app/javascript/packs/components/tasks/EditPopup.jsx
=======
  handleAuthorChange = value => {
    const { task } = this.state;

    this.setState({ task: { ...task, author: value } });
  };

  handleAssigneeChange = value => {
    const { task } = this.state;

    this.setState({ task: { ...task, assignee: value } });
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

>>>>>>> add feature: choose assignee:app/javascript/packs/components/EditPopup.jsx
  render() {
    const { isLoading, task } = this.state;
    const { show, onClose } = this.props;

    const modalTitle = `Task #${task.id} [${task.state}]`;
    const Footer = (
      <EditPopupFooter
        onClose={onClose}
        onDelete={this.handleCardDelete}
        onEdit={this.handleCardEdit}
      />
    );

    if (isLoading) {
      return <ModalLoading onClose={onClose} modalTitle={modalTitle} show={show} />;
    }

    return (
<<<<<<< HEAD:app/javascript/packs/components/tasks/EditPopup.jsx
      <Modal show={show} onClose={onClose} Footer={Footer} title={modalTitle}>
        <TaskForm
          description={task.description}
          name={task.name}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          author={task.author}
        />
      </Modal>
=======
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
      >
        <UserSelect id="Author" isDisabled value={task.author} onChange={this.handleAuthorChange} />
        <UserSelect id="Assignee" value={task.assignee} onChange={this.handleAssigneeChange} />
      </FormPopup>
>>>>>>> add feature: choose assignee:app/javascript/packs/components/EditPopup.jsx
    );
  }
}

EditPopup.propTypes = {
  cardId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

EditPopup.defaultProps = {
  cardId: null,
  show: false,
};
