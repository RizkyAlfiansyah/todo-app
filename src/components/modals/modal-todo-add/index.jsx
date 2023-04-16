import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import ModalLayout from '../../atoms/modal';
import { Input } from '../../atoms';
import { SelectInput } from '../../molecules';
import { useForm } from '../../../hooks/common';
import { postTodo, putTodo } from '../../../services/todo';
import { useParams } from 'react-router-dom';

const ModalTodoAdd = (props) => {
  const { id } = useParams();
  const { isOpen, onClose, revalidate, isEdit, data, ...otherProps } = props;
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { state, handleFormChange, resetForm, setForm } = useForm({
    title: '',
    priority: 'very-high',
    activity_group_id: id,
  });

  useEffect(() => {
    if (!isEdit) return;
    const { title, priority } = data || {};
    setForm({
      title: title,
      priority: priority,
    });
  }, [isOpen]);

  const handleSubmit = async (isEdit) => {
    setLoadingSubmit(true);
    try {
      (await isEdit)
        ? putTodo(state, data?.id)
        : postTodo(state)
            .then((res) => {
              onClose();
            })
            .catch((err) => {
              console.log(err);
              setLoadingSubmit(false);
            });
    } catch (error) {
      console.log(error);
      setLoadingSubmit(false);
    } finally {
      setLoadingSubmit(false);
      revalidate(id);
      resetForm();
    }
  };

  const onCloseModal = () => {
    onClose();
    resetForm();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={() => handleSubmit(isEdit)}
      dataCy="modal-todo-add"
      disabled={loadingSubmit || state.title === '' || state.priority === ''}
      {...otherProps}
    >
      <div className="w-full p-8 flex flex-col justify-start items-start gap-6">
        <Input
          name="title"
          dataCy="modal-add-name-input"
          value={state.title}
          type="text"
          placeholder="Tambahkan nama list item"
          onChange={handleFormChange}
          {...otherProps}
        />
        <SelectInput
          dataCy="modal-add-priority-dropdown"
          name="priority"
          label="priority"
          placeholder="Pilih Priority"
          value={state.priority}
          options={[
            { label: 'Very High', value: 'very-high' },
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'normal' },
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
  revalidate: PropTypes.func,
  id: PropTypes.string,
  isEdit: PropTypes.bool,
  data: oneOfType([PropTypes.object, PropTypes.array]),
};

ModalTodoAdd.defaultProps = {
  isOpen: false,
  onClose: () => {},
  revalidate: () => {},
  id: '',
  isEdit: false,
  data: {},
};

export default ModalTodoAdd;
