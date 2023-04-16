import React from 'react';
import PropTypes from 'prop-types';
import { CheckSVG } from '../../../assets/icons';

const DropdownItems = (props) => {
  const { dataCy, icon, options, value, onChange } = props;
  return (
    <ul
      className="w-full flex flex-col justify-start items-center bg-white border border-secondary rounded-md divide-y"
      data-cy={dataCy}
    >
      {options?.map(({ label, value: optValue, isDisabled }, index) => {
        const isSelected = value === optValue;

        return (
          <li
            key={index}
            data-cy="modal-add-priority-dropdown"
            className="w-full flex justify-between items-start py-3 px-4 hover:bg-tertiary"
            onClick={() => {
              if (isDisabled) {
                return;
              } else {
                if (onChange) {
                  return onChange({ label, value: optValue });
                }
              }
            }}
          >
            <div className="flex gap-5 justify-start items-center">
              {icon[index]}
              {label}
            </div>
            {isSelected && <CheckSVG />}
          </li>
        );
      })}
    </ul>
  );
};

DropdownItems.propTypes = {
  dataCy: PropTypes.string,
  icon: PropTypes.any,
  text: PropTypes.string,
};

DropdownItems.defaultProps = {
  dataCy: '',
  icon: <></>,
  text: 'No Data',
};

export default DropdownItems;
