import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Modal from './Modal';

const ModalLoading = props => {
  const { onClose, modalTitle, show } = props;
  const Footer = <Button onClick={onClose}>Close</Button>;

  return (
    <Modal show={show} onClose={onClose} Footer={Footer} title={modalTitle}>
      <span>Your task is loading. Please be patient.</span>
    </Modal>
  );
};

ModalLoading.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
  show: PropTypes.bool,
};

ModalLoading.defaultProps = {
  modalTitle: 'Modal',
  show: false,
};

export default ModalLoading;
