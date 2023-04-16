import React from 'react';
import PropTypes from 'prop-types';
import ActivityEmpty from '../../assets/images/activity-empty-state.png';
import TodoEmpty from '../../assets/images/todo-empty-state.png';

const EmptyState = (props) => {
  const { dataCy, todo, onClick } = props;
  return (
    <div className="w-full grid place-items-center" data-cy={dataCy}>
      <img
        src={todo ? TodoEmpty : ActivityEmpty}
        alt="empty-state"
        className="cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

EmptyState.propTypes = {
  dataCy: PropTypes.string,
  todo: PropTypes.bool,
  onClick: PropTypes.func,
};

EmptyState.defaultProps = {
  dataCy: '',
  todo: false,
  onClick: () => {},
};

export default EmptyState;
