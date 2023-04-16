import React from 'react';
import PropTypes from 'prop-types';
import ActivityEmpty from '../../assets/images/activity-empty-state.png';
import TodoEmpty from '../../assets/images/todo-empty-state.png';

const EmptyState = (props) => {
  const { dataCy, todo } = props;
  return (
    <div className="w-full grid place-items-center" data-cy={dataCy}>
      <img src={todo ? TodoEmpty : ActivityEmpty} alt="empty-state" />
    </div>
  );
};

EmptyState.propTypes = {
  dataCy: PropTypes.string,
  todo: PropTypes.bool,
};

EmptyState.defaultProps = {
  dataCy: '',
  todo: false,
};

export default EmptyState;
