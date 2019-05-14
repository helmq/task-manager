import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const FormControl = props => {
  const { controlId, label, value, placeholder, onChange, as } = props;

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        as={as}
      />
    </Form.Group>
  );
};

FormControl.propTypes = {
  controlId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  as: PropTypes.string,
};

FormControl.defaultProps = {
  value: '',
  placeholder: '',
  as: 'input',
};

export default FormControl;
