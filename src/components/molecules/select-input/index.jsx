import React, { useMemo, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Input } from '../../atoms';
import {
  ChevronDownSVG,
  ElipseBlueSVG,
  ElipseGreenSVG,
  ElipsePurpleSVG,
  ElipseRedSVG,
  ElipseYellowSVG,
} from '../../../assets/icons';
import DropdownItems from '../dropdown-items';

const icon = {
  'very-high': <ElipseRedSVG />,
  high: <ElipseYellowSVG />,
  normal: <ElipseGreenSVG />,
  low: <ElipseBlueSVG />,
  'very-low': <ElipsePurpleSVG />,
};

const iconIdx = [
  <ElipseRedSVG />,
  <ElipseYellowSVG />,
  <ElipseGreenSVG />,
  <ElipseBlueSVG />,
  <ElipsePurpleSVG />,
];
const SelectInput = (props) => {
  const { dataCy, text, value, options, onChange, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  const isArrayValue = useMemo(() => Array.isArray(value), [value]);
  const selectedValue = useMemo(() => {
    const labeledValue = isArrayValue
      ? value?.map((val) => options?.find((opt) => opt.value === val)?.label)
      : [];
    return isArrayValue
      ? labeledValue?.join(', ')
      : options?.find((opt) => opt.value === value)?.label;
  }, [value, options, isArrayValue]);

  return (
    <div className="w-[205px] flex flex-col gap-2">
      <Input
        {...otherProps}
        prefixIcon={icon[value]}
        suffixIcon={<ChevronDownSVG />}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isOpen}
        value={selectedValue}
      />
      {isOpen ? (
        <div className="absolute w-[205px] mt-1 z-50 top-[68%]">
          <DropdownItems
            options={options}
            icon={iconIdx}
            value={value}
            onChange={(v) => {
              if (onChange) onChange(v?.value);
              setIsOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

SelectInput.propTypes = {
  dataCy: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string,
  options: oneOfType([PropTypes.array, PropTypes.object]),
};

SelectInput.defaultProps = {
  dataCy: 'todo-select',
  onChange: () => {},
  text: 'No Data',
  value: '',
  options: {},
};

export default SelectInput;
