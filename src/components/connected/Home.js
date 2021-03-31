import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

function Home() {



  return (
    <div className="Home">
      <div>
        <Header/>
      </div>
      <div>
        <h2>Mon portail</h2>
        <Link to="/login">Se déconnecter</Link>
      </div>
      <div>
        <Footer/>
      </div>
    </div>

  );
}

export default Home;
