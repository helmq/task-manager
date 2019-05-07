import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
<<<<<<< HEAD:app/javascript/packs/components/tasks/AddPopup.jsx
import { fetch, handleFetchError } from '../../fetch';
import TaskForm from './forms/TaskForm';
import Modal from '../modals/Modal';
=======
import { fetch } from '../fetch';
import FormPopup from './FormPopup';
import UserSelect from './UserSelect';
>>>>>>> add feature: choose assignee:app/javascript/packs/components/AddPopup.jsx

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

  handleCardAdd = async () => {
    const { name, assignee, description } = this.state;
    const { onClose } = this.props;

    try {
      await fetch('POST', window.Routes.api_v1_tasks_path(), {
        task: {
          name,
          description,
          assignee_id: assignee.id,
        },
      });

      this.setState({ name: '', description: '' });
      onClose(true);
    } catch (e) {
      handleFetchError(e);
    }
  };

<<<<<<< HEAD:app/javascript/packs/components/tasks/AddPopup.jsx
  renderModalFooter = () => {
=======
  handleAssigneeChange = value => {
    this.setState({ assignee: value });
  };

  renderFooter() {
>>>>>>> add feature: choose assignee:app/javascript/packs/components/AddPopup.jsx
    const { onClose } = this.props;

    return (
      <>
        <Button onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={this.handleCardAdd}>
          Save changes
        </Button>
      </>
    );
  }

  render() {
    const { show, onClose } = this.props;
    const { description, name } = this.state;
<<<<<<< HEAD:app/javascript/packs/components/tasks/AddPopup.jsx

    const ModalFooter = this.renderModalFooter();
    const modalTitle = 'Create Task';

    return (
      <Modal show={show} onClose={onClose} Footer={ModalFooter} title={modalTitle}>
        <TaskForm
          description={description}
          name={name}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
        />
      </Modal>
=======

    return (
      <FormPopup
        modalTitle="Create task"
        show={show}
        onClose={onClose}
        description={description}
        name={name}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        Footer={this.renderFooter()}
      >
        <UserSelect id="Assignee" onChange={this.handleAssigneeChange} placeholder="Assignee" />
      </FormPopup>
>>>>>>> add feature: choose assignee:app/javascript/packs/components/AddPopup.jsx
    );
  }
}

AddPopup.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

AddPopup.defaultProps = {
  show: false,
};
