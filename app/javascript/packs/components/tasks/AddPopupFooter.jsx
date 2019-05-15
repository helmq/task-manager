import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const AddPopupFooter = ({ onClose, onSave }) => (
  <>
    <Button onClick={onClose}>Close</Button>
    <Button variant="primary" onClick={onSave}>
      Save changes
    </Button>
  </>
);

AddPopupFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddPopupFooter;
