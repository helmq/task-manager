import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetch } from '../fetch';
import FormPopup from './FormPopup';

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
      onClose(true);
    } catch (e) {
      if (e.response) {
        alert(`${e.response.status} - ${e.response.statusText}`);
      } else {
        alert('No response.');
      }
    }
  };

  renderFooter = () => {
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
    const Footer = this.renderFooter();

    return (
      <FormPopup
        modalTitle="Create task"
        show={show}
        onClose={onClose}
        description={description}
        name={name}
        onNameChange={this.handleNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        Footer={Footer}
      />
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
