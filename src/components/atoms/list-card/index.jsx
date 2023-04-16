import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
  DeleteSVG,
  EditSVG,
  ElipseBlueSVG,
  ElipseGreenSVG,
  ElipsePurpleSVG,
  ElipseRedSVG,
  ElipseYellowSVG,
} from '../../../assets/icons';
import { useModal } from '../../../hooks/common';
import { ModalAddTodo, ModalDeleteTodo, ModalInformation } from '../../modals';
import { deleteTodo, putTodo } from '../../../services/todo';

const colors = {
  'very-high': <ElipseRedSVG />,
  high: <ElipseYellowSVG />,
  normal: <ElipseGreenSVG />,
  low: <ElipseBlueSVG />,
  'very-low': <ElipsePurpleSVG />,
};
const ListCard = (props) => {
  const { data, revalidate } = props;
  const { isOpen: openDelete, toggleModal: toggleModalDelete } = useModal();
  const { isOpen: openEdit, toggleModal: toggleModalEdit } = useModal();
  const { isOpen: openInfo, toggleModal: toggleModalInfo } = useModal();

  const { activity_group_id, title, is_active, priority } = data || {};

  const submitToActive = async () => {
    const value = { is_active: !is_active };

    try {
      await putTodo(value, data.id).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      revalidate(activity_group_id);
    }
  };

  const submitDelete = async (id) => {
    try {
      await deleteTodo(id).then((res) => {
        toggleModalInfo();
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleModalDelete();
    }
  };

  return (
    <>
      <div
        data-cy="activity-list-card"
        className="w-full flex justify-between items-center rounded-xl shadow-md py-6 px-7 bg-white"
      >
        <div className="w-full flex justify-start items-center gap-5">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            data-cy="todo-item-checkbox"
            checked={!is_active}
            onChange={submitToActive}
          />
          {colors[priority]}
          <p
            className={`text-lg text-gray-100 ${!is_active && 'line-through'}`}
            data-cy="todo-title"
          >
            {title}
          </p>
          <EditSVG
            className="w-5 h-5 hover:scale-110"
            onClick={() => toggleModalEdit()}
          />
        </div>
        <DeleteSVG
          className="w-5 h-5 hover:scale-110"
          onClick={() => toggleModalDelete()}
        />
      </div>
      <ModalDeleteTodo
        isOpen={openDelete}
        data={title}
        onClose={() => toggleModalDelete()}
        onSubmit={() => submitDelete(data.id)}
      />
      <ModalAddTodo
        isEdit
        isOpen={openEdit}
        data={data}
        onClose={() => toggleModalEdit()}
        revalidate={revalidate}
      />
      <ModalInformation
        message="List berhasil dihapus"
        isOpen={openInfo}
        onClose={() => {
          toggleModalInfo();
          revalidate(activity_group_id);
        }}
      />
    </>
  );
};

ListCard.propTypes = {
  data: oneOfType([PropTypes.object, PropTypes.array]),
  revalidate: PropTypes.func,
};

ListCard.defaultProps = {
  data: {},
  revalidate: () => {},
};

export default ListCard;
