import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '../components/atoms';
import { PlusSVG } from '../assets/icons';
import { NavLink } from 'react-router-dom';
import EmptyState from '../components/layouts/empty-state';
import { useActivity } from '../hooks/activity';
import { postActivity } from '../services/activity';

const Activity = (props) => {
  const { data, refetch, loading } = useActivity();
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const submitActivity = async () => {
    setLoadingSubmit(true);
    try {
      await postActivity({
        title: 'New Activity',
        email: 'rizkkyaf@gmail.com',
      })
        .then((res) => {
          refetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <header className="w-full flex justify-between items-center">
        <h2 className="text-4xl font-bold" data-cy="activity-title">
          Activity
        </h2>
        <Button
          icon={<PlusSVG />}
          dataCy="activity-add-button"
          disabled={loadingSubmit}
          onClick={submitActivity}
        >
          Tambah
        </Button>
      </header>
      <div className="w-full flex flex-wrap justify-start items-center gap-5">
        {data.length > 0 ? (
          data.map((item, idx) => (
            <Card
              data={item}
              revalidate={refetch}
              key={idx}
              dataCy="activity-item"
            />
          ))
        ) : loading ? (
          <EmptyState dataCy="activity-empty-state" onClick={submitActivity} />
        ) : (
          <EmptyState dataCy="activity-empty-state" onClick={submitActivity} />
        )}
      </div>
    </>
  );
};

Activity.propTypes = {};

export default Activity;
