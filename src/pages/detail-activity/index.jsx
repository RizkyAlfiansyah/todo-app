import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListCard, Modal } from '../../components/atoms';
import { ChevronLeft, EditSVG, PlusSVG, SortSVG } from '../../assets/icons';
import { useModal } from '../../hooks/common';
import { NavLink } from 'react-router-dom';

const DetailActivity = (props) => {
  const { isOpen: openModal, toggleModal: toggleModal } = useModal();
  return (
    <>
      <header className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <NavLink to="/">
            <ChevronLeft className="hover:scale-105" />
          </NavLink>
          <h2 className="text-4xl font-bold">Activity</h2>
          <EditSVG className="hover:scale-105" />
        </div>
        <div className="flex justify-start items-center gap-5">
          <div className="rounded-full p-2 border border-gray-300 hover:scale-105">
            <SortSVG />
          </div>
          <Button icon={<PlusSVG />} onClick={() => toggleModal()}>
            Tambah
          </Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-[10px]">
        <ListCard />
        <ListCard />
        <ListCard />
      </div>
      <Modal isOpen={openModal} onClose={() => toggleModal()} />
    </>
  );
};

DetailActivity.propTypes = {};

export default DetailActivity;
