import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import Statistics from './statistics/Statistics';

function Home() {

  //<h2>Mon portail</h2>
  //<Link to="/login">Se déconnecter</Link>

  return (
    <div className="Home">
      <div>
        <Header/>
      </div>
      <div>
        <Statistics/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>

  );
}

export default Home;
