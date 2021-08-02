import React from 'react';
import { useSelector } from 'react-redux';
import Connected from '../connected';
import Admin from '../admin';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Home">
      { user?.role === 'conseiller' &&
        <Connected />
      }
      { user?.role === 'admin COOP' &&
        <Admin />
      }
    </div>
  );
}

export default Home;
