import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { DeleteSVG } from '../../../assets/icons';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import { useModal } from '../../../hooks/common';
import { ModalDeleteTodo, ModalInformation } from '../../modals';
import { deleteActivity } from '../../../services/activity';

const Card = (props) => {
  const { dataCy, data, revalidate } = props;
  const { id, title, created_at } = data || {};

  const { isOpen: openDelete, toggleModal: toggleModalDelete } = useModal();
  const { isOpen: openInfo, toggleModal: toggleModalInfo } = useModal();

  const submitDelete = async (id) => {
    try {
      await deleteActivity(id).then((res) => {
        toggleModalInfo();
        toggleModalDelete();
      });
    } catch (error) {
      console.log(error);
    } finally {
      revalidate();
      // setTimeout(() => {
      //   toggleModalInfo();
      // }, 500);
    }
  };

  return (
    <>
      <div
        className="w-[230px] rounded-lg shadow-sm h-[234px] bg-white cursor-pointer hover:shadow-lg flex flex-col justify-between items-start p-6"
        data-cy={dataCy}
      >
        <NavLink className="w-full h-full" to={`/detail/${id}`}>
          <h3
            className="w-full h-full text-lg font-bold"
            data-cy="activity-item-title"
          >
            {title}
          </h3>
        </NavLink>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-gray-100" data-cy="activity-item-date">
            {created_at
              ? format(new Date(created_at), 'dd MMMM yyyy')
              : 'No Date'}
          </span>
          <DeleteSVG
            className="hover:scale-110"
            onClick={() => toggleModalDelete()}
            data-cy="activity-item-delete-button"
          />
        </div>
      </div>
      <ModalDeleteTodo
        isOpen={openDelete}
        data={title}
        onSubmit={() => submitDelete(id)}
        onClose={() => toggleModalDelete()}
      />
      <ModalInformation
        message="Activity berhasil dihapus"
        isOpen={openInfo}
        onClose={() => {
          toggleModalInfo();
        }}
      />
    </>
  );
};

Card.propTypes = {
  dataCy: PropTypes.string,
  data: oneOfType([PropTypes.object, PropTypes.array]),
  revalidate: PropTypes.func,
};

Card.defaultProps = {
  dataCy: 'activity-card',
  data: {},
  revalidate: () => {},
};

export default Card;
