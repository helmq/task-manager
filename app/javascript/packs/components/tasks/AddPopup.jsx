import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch, handleFetchError } from '../../fetch';
import TaskForm from './forms/TaskForm';
import Modal from '../modals/Modal';

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

  renderModalFooter = () => {
    const { onClose } = this.props;

    return (
      <>
        <Button onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={this.handleCardAdd}>
          Save changes
        </Button>
      </>
    );
  };

  render() {
    const { show, onClose } = this.props;
    const { description, name } = this.state;

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
