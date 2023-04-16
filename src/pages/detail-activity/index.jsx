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
import { NavLink, useParams } from 'react-router-dom';
import { ModalAddTodo } from '../../components/modals';
import { SortItems } from '../../components/molecules';
import EmptyState from '../../components/layouts/empty-state';
import { useDetailActivity } from '../../hooks/activity';
import OutsideClickHandler from 'react-outside-click-handler';
import { putActivity } from '../../services/activity';

const icons = [
  <NewestSVG />,
  <OldestSVG />,
  <AzSVG />,
  <ZaSVG />,
  <UnfinishedSVG />,
];
const DetailActivity = (props) => {
  const { id } = useParams();
  const { data, refetch, loading } = useDetailActivity(id);
  const { isOpen: openModal, toggleModal: toggleModal } = useModal();
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState('');

  const { todo_items } = data || [];

  const submitEdit = async (id) => {
    try {
      await putActivity({ title: title }, id)
        .then((res) => {
          setIsEdit(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      refetch(id);
    }
  };

  return (
    <>
      <header className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <NavLink to="/">
            <ChevronLeftSVG className="hover:scale-105" />
          </NavLink>
          {isEdit ? (
            <OutsideClickHandler onOutsideClick={() => submitEdit(data?.id)}>
              <input
                type="text"
                className="border-b-2 border-b-black bg-transparent text-4xl font-bold focus:outline-none"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </OutsideClickHandler>
          ) : (
            <h2 className="text-4xl font-bold">{data?.title}</h2>
          )}
          <EditSVG
            className="hover:scale-105"
            onClick={() => {
              setIsEdit((prev) => !prev);
              setTitle(data?.title);
            }}
          />
        </div>
        <div className="relative flex justify-start items-center gap-5">
          {todo_items?.length > 0 ? (
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
          ) : null}
          <Button icon={<PlusSVG />} onClick={() => toggleModal()}>
            Tambah
          </Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-[10px]">
        {todo_items?.length > 0 ? (
          todo_items?.map((item, idx) => (
            <ListCard
              dataCy="activity-list-card"
              key={idx}
              data={item}
              revalidate={refetch}
            />
          ))
        ) : loading ? (
          <EmptyState
            dataCy="todo-empty-state"
            todo
            onClick={() => toggleModal()}
          />
        ) : (
          <EmptyState
            dataCy="todo-empty-state"
            todo
            onClick={() => toggleModal()}
          />
        )}
      </div>
      <ModalAddTodo
        label="Nama list Item"
        isOpen={openModal}
        onClose={() => toggleModal()}
        revalidate={refetch}
      />
    </>
  );
};

DetailActivity.propTypes = {};

export default DetailActivity;
