import React from 'react';
import PropTypes from 'prop-types';
import { DeleteSVG, EditSVG, ElipseRedSVG } from '../../../assets/icons';
import { useModal } from '../../../hooks/common';
import { ModalDeleteTodo } from '../../modals';

const ListCard = (props) => {
  const { isOpen: openDelete, toggleModal: toggleModalDelete } = useModal();
  const { isOpen: openEdit, toggleModal: toggleModalEdit } = useModal();
  return (
    <>
      <div
        data-cy="activity-list-card"
        className="w-full flex justify-between items-center rounded-xl shadow-md py-6 px-7 bg-white"
      >
        <div className="w-full flex justify-start items-center gap-5">
          <input type="checkbox" className="w-5 h-5 cursor-pointer" />
          <ElipseRedSVG className="w-3 h-3" />
          <p className="text-lg text-gray-100 line-through">Telur Ayam</p>
          <EditSVG className="w-5 h-5 hover:scale-110" />
        </div>
        <DeleteSVG
          className="w-5 h-5 hover:scale-110"
          onClick={() => toggleModalDelete()}
        />
      </div>
      <ModalDeleteTodo
        isOpen={openDelete}
        onClose={() => toggleModalDelete()}
      />
    </>
  );
};

ListCard.propTypes = {};

export default ListCard;
