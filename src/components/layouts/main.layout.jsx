import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <div
      className="min-h-screen bg-secondary flex flex-col justify-start gap-16"
      data-cy="main-layout"
    >
      <div
        className="w-full bg-primary py-7 flex justify-center items-center shadow-md"
        data-cy="header-background"
      >
        <h2
          className="w-semiFull font-bold text-2xl text-white"
          data-cy="header-title"
        >
          Todo List App
        </h2>
      </div>
      <div className="w-semiFull mx-auto">
        <div className="w-full flex flex-col justify-start items-center gap-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
