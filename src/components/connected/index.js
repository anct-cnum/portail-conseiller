import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import Statistics from './statistics/Statistics';
import Cra from './cra';
import Welcome from './Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FormulaireSexeAge from './FormulaireSexeAge';

function Connected() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const formulaireIsUpdated = useSelector(state => state?.conseiller?.isUpdated);

  useEffect(() => {
    if (conseiller) {
      dispatch(conseillerActions.isFormulaireChecked(conseiller.sexe, formulaireIsUpdated));
    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      <Header linkAccount={user?.name}/>
      {voirFormulaire &&
        <FormulaireSexeAge/>
      }
      {!user.pdfGenerator &&
        <>
          <Route path={`/accueil`} component={Welcome} />
          <Route path={`/compte-rendu-activite`} component={Cra} />
          <Route path={`/statistiques`} component={Statistics} />
          <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
        </>
      }
      { user.pdfGenerator &&
        <>
          <Route path={`/statistiques`} component={Statistics} />
        </>
      }
    </>
  );
}

export default Connected;
