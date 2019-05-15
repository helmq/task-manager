import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BootstrapModal } from 'react-bootstrap';

const Modal = ({ title, show, onClose, Footer, children }) => (
  <BootstrapModal show={show} onHide={onClose}>
    <BootstrapModal.Header closeButton>
      <BootstrapModal.Title>{title}</BootstrapModal.Title>
    </BootstrapModal.Header>

    <BootstrapModal.Body>{children}</BootstrapModal.Body>

    <BootstrapModal.Footer>{Footer}</BootstrapModal.Footer>
  </BootstrapModal>
);

Modal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  Footer: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
Modal.defaultProps = {
  title: '',
  show: false,
  Footer: <></>,
  children: <></>,
};

export default Modal;
