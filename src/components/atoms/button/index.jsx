import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { variant, size, icon, children, dataCy, ...otherProps } = props;

  const styles = {
    variant: {
      primary: 'text-white bg-primary',
      secondary: 'bg-tertiary',
      error: 'text-white bg-error',
    },
    size: {
      sm: 'py-2 px-4',
      lg: 'py-3 px-12',
    },
  };

  return (
    <button
      className={`${styles.size[size]} flex justify-start gap-1 items-center rounded-4xl text-lg font-semibold hover:shadow-md hover:scale-105 ${styles.variant[variant]} disabled:bg-gray-100`}
      data-cy={dataCy}
      {...otherProps}
    >
      {icon ? icon : null}
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.any,
  children: PropTypes.any,
  dataCy: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'sm',
  icon: <></>,
  children: <></>,
  dataCy: '',
};

export default Button;
