import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'react-bootstrap';

const FormPopup = ({
  modalTitle,
  show,
  onClose,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  Footer,
  author,
}) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form>
        <Form.Group controlId="formTaskName">
          <Form.Label>Task name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Set the name for the task"
            onChange={onNameChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescriptionName">
          <Form.Label>Task description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            placeholder="Set the description for the task"
            onChange={onDescriptionChange}
          />
        </Form.Group>
        {author && `Author: ${author.first_name} ${author.last_name}`}
      </Form>
    </Modal.Body>

    <Modal.Footer>{Footer}</Modal.Footer>
  </Modal>
);

FormPopup.propTypes = {
  modalTitle: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  onNameChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  Footer: PropTypes.element,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};
FormPopup.defaultProps = {
  modalTitle: '',
  show: '',
  onClose: () => {},
  name: '',
  description: '',
  onNameChange: () => {},
  onDescriptionChange: () => {},
  Footer: <></>,
  author: null,
};

export default FormPopup;
