import React from 'react';
import PropTypes from 'prop-types';
import routes from 'routes';
import { fetch, handleFetchError } from '../../fetch';
import TaskForm from './forms/TaskForm';
import Modal from '../modals/Modal';
import AddPopupFooter from './AddPopupFooter';
import UserSelect from './forms/UserSelect';

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
      await fetch('POST', routes.api_v1_tasks_path(), {
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

  handleAssigneeChange = value => {
    this.setState({ assignee: value });
  };

  render() {
    const { show, onClose } = this.props;
    const { description, name } = this.state;

    const modalTitle = 'Create Task';
    const Footer = <AddPopupFooter onClose={onClose} onSave={this.handleCardAdd} />;

    return (
      <Modal show={show} onClose={onClose} Footer={Footer} title={modalTitle}>
        <TaskForm
          description={description}
          name={name}
          onNameChange={this.handleNameChange}
          onDescriptionChange={this.handleDescriptionChange}
        >
          <UserSelect id="Assignee" onChange={this.handleAssigneeChange} placeholder="Assignee" />
        </TaskForm>
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
