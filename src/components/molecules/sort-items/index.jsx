import React, { useMemo, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { SortSVG } from '../../../assets/icons';
import DropdownItems from '../dropdown-items';

const SortItems = (props) => {
  const { icons, dataCy, value, options, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2" data-cy={dataCy}>
      <div className="rounded-full p-2 border border-gray-300 hover:scale-105">
        <SortSVG onClick={() => setIsOpen((prev) => !prev)} />
      </div>
      {isOpen ? (
        <div className="absolute w-[235px] mt-1 z-50 top-12 right-3/4">
          <DropdownItems
            dataCy="sort-dropdown"
            icon={icons}
            value={value}
            options={options}
            onChange={(v) => {
              if (onChange) {
                onChange(v);
              }
              setIsOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

SortItems.propTypes = {
  dataCy: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: oneOfType([PropTypes.array, PropTypes.object]),
  icons: PropTypes.array,
};

SortItems.defaultProps = {
  dataCy: 'todo-sort',
  onChange: () => {},
  icons: [],
  value: '',
  options: {},
};

export default SortItems;
