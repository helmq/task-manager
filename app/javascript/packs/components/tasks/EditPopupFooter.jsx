import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const EditPopupFooter = ({ onClose, onDelete, onEdit }) => (
  <>
    <Button variant="danger" onClick={onDelete}>
      Delete
    </Button>
    <Button onClick={onClose}>Close</Button>
    <Button variant="primary" onClick={onEdit}>
      Save changes
    </Button>
  </>
);

EditPopupFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditPopupFooter;
