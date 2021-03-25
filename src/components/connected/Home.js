import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Statistics from './statistics/Statistics';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Home">
      <Header linkAccount={user?.name}/>
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--end rf-mb-7w">
          <Link className="rf-btn rf-btn--sm" to="/login">Se déconnecter&nbsp;<i className="ri-logout-box-r-line"></i></Link>
        </div>
      </div>
      <div className="rf-container">
        <div className="rf-grid-row rf-mb-10w">
          <Statistics/>
        </div>
      </div>
      <Footer/>
    </div>

  );
}

export default Home;
