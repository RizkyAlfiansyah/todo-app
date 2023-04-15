import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col justify-start gap-16">
      <div className="w-full bg-primary py-7 flex justify-center items-center shadow-md">
        <p className="w-3/6 font-bold text-2xl text-white">Todo List App</p>
      </div>
      <div className="w-3/6 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
