import React from 'react';
import PropTypes from 'prop-types';

const ListCard = (props) => {
  return (
    <div
      data-cy="activity-list-card"
      className="w-full rounded-xl shadow-md py-6 px-7 bg-white hover:scale-x-105"
    >
      Telur
    </div>
  );
};

ListCard.propTypes = {};

export default ListCard;
