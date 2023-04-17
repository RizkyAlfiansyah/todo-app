import React, { useMemo, useState } from 'react';
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
  const [sort, setSort] = useState('newest');

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

  const dataFiltered = useMemo(() => {
    if (todo_items?.length > 0) {
      if (sort === 'newest') {
        return todo_items.sort((a, b) => {
          return b.id - a.id;
        });
      } else if (sort === 'oldest') {
        return todo_items.sort((a, b) => {
          return a.id - b.id;
        });
      } else if (sort === 'a-z') {
        return todo_items.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      } else if (sort === 'z-a') {
        return todo_items.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      } else if (sort === 'unfinished') {
        return todo_items.sort((a, b) => {
          return b.is_active - a.is_active;
        });
      }
    }
  }, [todo_items, sort]);

  return (
    <>
      <header className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <NavLink to="/">
            <ChevronLeftSVG className="hover:scale-105" />
          </NavLink>
          {isEdit ? (
            <OutsideClickHandler
              onOutsideClick={() => submitEdit(data?.id)}
              data-cy="todo-title"
            >
              <input
                type="text"
                className="border-b-2 border-b-black bg-transparent text-4xl font-bold focus:outline-none"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
                data-cy="todo-title"
              />
            </OutsideClickHandler>
          ) : (
            <h2
              className="text-4xl font-bold"
              data-cy="todo-title"
              onClick={() => {
                setIsEdit(true);
                setTitle(data?.title);
              }}
            >
              {data?.title}
            </h2>
          )}
          <EditSVG
            className="hover:scale-105"
            data-cy="todo-title-edit-button"
            onClick={() => {
              if (isEdit) return submitEdit(data?.id);
              setIsEdit((prev) => !prev);
              setTitle(data?.title);
            }}
          />
        </div>
        <div className="relative flex justify-start items-center gap-5">
          {dataFiltered?.length > 0 ? (
            <SortItems
              icons={icons}
              options={[
                { label: 'Newest', value: 'newest' },
                { label: 'Oldest', value: 'oldest' },
                { label: 'A-Z', value: 'a-z' },
                { label: 'Z-A', value: 'z-a' },
                { label: 'Unfinished', value: 'unfinished' },
              ]}
              value={sort}
              onChange={(e) => {
                setSort(e?.value);
              }}
            />
          ) : null}
          <Button
            icon={<PlusSVG />}
            onClick={() => {
              toggleModal();
              setIsEdit(false);
            }}
            dataCy="todo-add-button"
          >
            Tambah
          </Button>
        </div>
      </header>
      <div className="w-full flex flex-col gap-[10px]">
        {dataFiltered?.length > 0 ? (
          dataFiltered?.map((item, idx) => (
            <ListCard
              dataCy="activity-list-card"
              key={idx}
              data={item}
              revalidate={refetch}
            />
          ))
        ) : loading ? (
          <EmptyState dataCy="todo-empty-state" todo />
        ) : (
          <EmptyState dataCy="todo-empty-state" todo />
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
