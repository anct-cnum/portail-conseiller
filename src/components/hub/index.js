import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import HeaderHub from './HeaderHub';
import BannerHub from './BannerHub';
import Territoires from '../admin/Territoires';
import Statistiques from '../connected/statistics/Statistics';

function Admin() {
  const location = useLocation();

  const user = useSelector(state => state.authentication?.user?.user);
  return (
    <>
      <HeaderHub linkAccount={user?.name} />
      <div className="admin">
        {!location.pathname.startsWith('/statistiques') &&
          <BannerHub />
        }
        <Route path={`/statistiques`} element={<Statistiques />} />
        <Route path={`/territoires`} element={<Territoires/>} />
        <Route path={`/accueil`} element={<Navigate to="/territoires" />} />
        <Route exact path="/" element={<Navigate to="/territoires" />} />
      </div>
    </>
  );
}

export default Admin;
