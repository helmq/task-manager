import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const FormPopup = ({ title, show, onClose, Footer, children }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{children}</Modal.Body>

    <Modal.Footer>{Footer}</Modal.Footer>
  </Modal>
);

FormPopup.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  Footer: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
FormPopup.defaultProps = {
  title: '',
  show: false,
  Footer: <></>,
  children: <></>,
};

export default FormPopup;
