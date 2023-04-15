import React from 'react';
import PropTypes from 'prop-types';
import { DeleteSVG } from '../../../assets/icons';

const Card = (props) => {
  const { dataCy } = props;
  return (
    <div
      className="w-[230px] rounded-lg shadow-sm h-[234px] bg-white cursor-pointer hover:shadow-lg flex flex-col justify-between items-center p-6 hover:scale-105"
      data-cy={dataCy}
    >
      <h3 className="text-lg font-bold">Daftar Belanja Bulanan</h3>
      <div className="w-full flex justify-between items-center">
        <p className="text-sm text-gray-100">5 Oktober 2022</p>
        <DeleteSVG />
      </div>
    </div>
  );
};

Card.propTypes = {
  dataCy: PropTypes.string,
};

Card.defaultProps = {
  dataCy: 'activity-card',
};

export default Card;
