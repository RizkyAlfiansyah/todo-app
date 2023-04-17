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
  InformationSVG,
} from '../../../assets/icons';
import { useModal } from '../../../hooks/common';
import { ModalAddTodo, ModalDeleteTodo } from '../../modals';
import { deleteTodo, putTodo } from '../../../services/todo';
import { toast } from 'react-toastify';

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
        toast(
          <div
            className="flex gap-3 rounded-xl justify-start items-center"
            data-cy="modal-information"
          >
            <InformationSVG />
            <p className="text-sm text-center">List berhasil dihapus</p>
          </div>,
          {
            style: {
              borderRadius: '12px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
              padding: '18px 30px',
              margin: '0px',
            },
            bodyStyle: {
              padding: '0px',
              margin: '0px',
              backgroundColor: '#fff',
            },
            position: 'bottom-left',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            closeButton: false,
            progress: undefined,
          }
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      toggleModalDelete();
      revalidate(activity_group_id);
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
            data-cy="todo-item-title"
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
          data-cy="todo-item-delete-button"
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
