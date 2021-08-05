import React from 'react';
import { useSelector } from 'react-redux';
import Connected from '../connected';
import Admin from '../admin';
import FormulaireSexeAge from './FormulaireSexeAge';

function Home() {

  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);

  return (
    <div className="Home">
      { user?.role === 'admin COOP' &&
        <Admin />
      }
      { user?.role === 'conseiller' && (!conseiller || conseiller?.sexe !== undefined) &&
        <Connected />
      }
      { user?.role === 'conseiller' && conseiller && conseiller?.sexe === undefined &&
        <FormulaireSexeAge />
      }
    </div>


  );
}

export default Home;
