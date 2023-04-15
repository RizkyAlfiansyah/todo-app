import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from '../components/atoms';
import { PlusSVG } from '../assets/icons';
import { NavLink } from 'react-router-dom';

const Activity = (props) => {
  return (
    <>
      <header className="w-full flex justify-between items-center">
        <h2 className="text-4xl font-bold">Activity</h2>
        <Button icon={<PlusSVG />}>Tambah</Button>
      </header>
      <div className="w-full flex flex-wrap justify-start items-center gap-5">
        <NavLink to="/detail-activity">
          <Card />
        </NavLink>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};

Activity.propTypes = {};

export default Activity;
