import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, ListCard, Modal } from '../../components/atoms';
import {
  ChevronLeftSVG,
  EditSVG,
  PlusSVG,
  AzSVG,
  NewestSVG,
  OldestSVG,
  UnfinishedSVG,
  ZaSVG,
} from '../../assets/icons';
import { useModal } from '../../hooks/common';
import { NavLink } from 'react-router-dom';
import { ModalAddTodo } from '../../components/modals';
import { SortItems } from '../../components/molecules';
import EmptyState from '../../components/layouts/empty-state';

const icons = [
  <NewestSVG />,
  <OldestSVG />,
  <AzSVG />,
  <ZaSVG />,
  <UnfinishedSVG />,
];
const DetailActivity = (props) => {
  const { isOpen: openModal, toggleModal: toggleModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <header className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <NavLink to="/">
            <ChevronLeftSVG className="hover:scale-105" />
          </NavLink>
          {isEdit ? (
            <input
              type="text"
              className="border-b-2 border-b-black bg-transparent text-4xl font-bold focus:outline-none"
              value="Activity"
              onChange={() => {}}
            />
          ) : (
            <h2 className="text-4xl font-bold">Activity</h2>
          )}
          <EditSVG
            className="hover:scale-105"
            onClick={() => setIsEdit((prev) => !prev)}
          />
        </div>
        <div className="relative flex justify-start items-center gap-5">
          <SortItems
            icons={icons}
            options={[
              { label: 'Newest', value: 'newest' },
              { label: 'Oldest', value: 'oldest' },
              { label: 'A-Z', value: 'a-z' },
              { label: 'Z-A', value: 'z-a' },
              { label: 'Unfinished', value: 'unfinished' },
            ]}
            value={'newest'}
          />
          <Button icon={<PlusSVG />} onClick={() => toggleModal()}>
            Tambah
          </Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-[10px]">
        {/* <ListCard />
        <ListCard />
        <ListCard /> */}
        <EmptyState dataCy="todo-empty-state" todo />
      </div>
      <ModalAddTodo
        label="Nama list Item"
        isOpen={openModal}
        onClose={() => toggleModal()}
      />
    </>
  );
};

DetailActivity.propTypes = {};

export default DetailActivity;
