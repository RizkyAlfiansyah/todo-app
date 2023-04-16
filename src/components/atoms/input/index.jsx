import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { dataCy, name, label, value, suffixIcon, prefixIcon, ...otherProps } =
    props;
  return (
    <label
      htmlFor={name}
      className="w-full flex flex-col gap-2"
      data-cy={dataCy}
    >
      {label ? (
        <label htmlFor={name} className="text-xs font-semibold uppercase">
          {label}
        </label>
      ) : null}
      <div className="relative w-full">
        {prefixIcon && value ? (
          <div className="absolute left-4 top-[18px]" {...otherProps}>
            {prefixIcon}
          </div>
        ) : null}
        <input
          value={value}
          name={name}
          className={`w-full py-3 ${
            prefixIcon && value ? 'px-12' : 'px-4'
          } border border-secondary rounded-md focus:outline-primary`}
          {...otherProps}
        />
        {suffixIcon ? (
          <div className="absolute right-4 top-3" {...otherProps}>
            {suffixIcon}
          </div>
        ) : null}
      </div>
    </label>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  suffixIcon: PropTypes.any,
};

Input.defaultProps = {
  name: '',
  value: '',
  label: '',
  suffixIcon: <></>,
};

export default Input;
