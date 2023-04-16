import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layouts/main.layout';

const pageList = [
  {
    path: '',
    component: lazy(() => import('../pages/activity')),
  },
  {
    path: 'detail/:id',
    component: lazy(() => import('../pages/detail-activity')),
  },
];
const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {pageList.map((li, idx) => {
            const Element = li.component;
            return <Route key={idx} path={li.path} element={<Element />} />;
          })}
        </Route>
      </Routes>
    </>
  );
};

export default MainRouter;
