import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { fetch } from '../../../fetch';

export default class UserSelect extends Component {
  componentDidMount() {
    this.loadOptions();
  }

  loadOptions = async inputValue => {
    const { data } = await fetch(
      'GET',
      window.Routes.api_v1_users_path({
        q: { first_name_or_last_name_cont: inputValue },
        format: 'json',
      }),
    );
    return data.items;
  };

  handleInputChange = inputValue => inputValue.replace(/\W/g, '');

  getOptionValue = ({ id }) => id;

  getOptionLabel = option => `${option.first_name} ${option.last_name}`;

  render() {
    const { isDisabled, value, onChange, placeholder } = this.props;

    return (
      <AsyncSelect
        cacheOptions
        loadOptions={this.loadOptions}
        defaultOptions
        onInputChange={this.handleInputChange}
        getOptionLabel={this.getOptionLabel}
        getOptionValue={this.getOptionValue}
        isDisabled={isDisabled}
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
}

UserSelect.propTypes = {
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.objectOf(PropTypes.string),
  placeholder: PropTypes.string,
};

UserSelect.defaultProps = {
  isDisabled: false,
  value: null,
  placeholder: '',
};
