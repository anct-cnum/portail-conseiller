import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Connected from '../connected';
import Admin from '../admin';
import FormulaireSexeAge from './FormulaireSexeAge';
import { conseillerActions, userActions } from '../../actions';
import { userEntityId } from '../../helpers';

function Home() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const ecran = useSelector(state => state.createAccount.ecran);

  useEffect(() => {
    if (conseiller) {
      dispatch(userActions.getEcran(user, conseiller?.sexe));
    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [user, conseiller]);

  return (
    <div className="Home">
      { ecran === 'admin' &&
        <Admin />
      }
      { ecran === 'conseiller' &&
        <Connected />
      }
      { ecran === 'formulaire' &&
        <FormulaireSexeAge />
      }
    </div>


  );
}

export default Home;
