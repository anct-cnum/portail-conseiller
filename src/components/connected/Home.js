import React from 'react';
import { useSelector } from 'react-redux';
import Connected from '../connected';

function Home() {

  const user = useSelector(state => state.authentication.user.user);

  return (
    <div className="Home">
      { user?.role === 'conseiller' &&
        <Connected />
      }
    </div>
  );
}

export default Home;
