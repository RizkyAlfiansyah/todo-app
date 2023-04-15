import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { variant, icon, children, dataCy, ...otherProps } = props;

  const styles = {
    variant: {
      primary: 'text-white bg-primary',
      secondary: 'bg-tertiary',
      error: 'text-white bg-error',
    },
  };

  return (
    <button
      className={`py-2 px-4 flex justify-start gap-1 items-center rounded-4xl text-lg font-semibold hover:shadow-md hover:scale-105 ${styles.variant[variant]}`}
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
  icon: PropTypes.any,
  children: PropTypes.any,
  dataCy: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  icon: <></>,
  children: <></>,
  dataCy: '',
};

export default Button;
