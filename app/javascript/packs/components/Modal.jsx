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
  onClose: PropTypes.func,
  Footer: PropTypes.element,
  author: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
FormPopup.defaultProps = {
  title: '',
  show: '',
  onClose: () => {},
  Footer: <></>,
  author: null,
  children: <></>,
};

export default FormPopup;
