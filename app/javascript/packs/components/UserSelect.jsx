import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import PropTypes from 'prop-types';
import { fetch } from '../fetch';

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

  handleInputChange = inputValue => {
    const newValue = inputValue.replace(/\W/g, '');
    return newValue;
  };

  getOptionValue = option => {
    return option.id;
  };

  getOptionLabel = option => {
    return `${option.first_name} ${option.last_name}`;
  };

  render() {
    const { isDisabled, value, onChange, placeholder } = this.props;

    return (
      <div>
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
      </div>
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
