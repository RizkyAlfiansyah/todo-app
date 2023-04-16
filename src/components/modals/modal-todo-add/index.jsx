import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../../atoms/modal';
import { Input } from '../../atoms';
import { SelectInput } from '../../molecules';
import { useForm } from '../../../hooks/common';

const ModalTodoAdd = (props) => {
  const { isOpen, onClose, ...otherProps } = props;

  const { state, handleFormChange } = useForm({
    name: '',
    priority: '',
  });

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} {...otherProps}>
      <div className="w-full p-8 flex flex-col justify-start items-start gap-6">
        <Input
          name="name"
          dataCy="todo-input-name"
          value={state.name}
          type="text"
          placeholder="Tambahkan nama list item"
          onChange={handleFormChange}
          {...otherProps}
        />
        <SelectInput
          dataCy="todo-select-priority"
          name="priority"
          label="prioriry"
          placeholder="Pilih Priority"
          value={state.priority}
          options={[
            { label: 'Very High', value: 'very-high' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
            { label: 'Very Low', value: 'very-low' },
          ]}
          onChange={(v) => {
            handleFormChange({ target: { name: 'priority', value: v } });
          }}
        />
      </div>
    </ModalLayout>
  );
};

ModalTodoAdd.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ModalTodoAdd.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

export default ModalTodoAdd;
