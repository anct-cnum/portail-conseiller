import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import Statistics from './statistics/Statistics';
import Cra from './cra';
import Welcome from './Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, structureActions, permanenceActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FormulaireSexeAge from './FormulaireSexeAge';
import Ressourcerie from './ressourcerie/Ressourcerie';
import Permanence from './permanence/index';

function Connected() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const formulaireIsUpdated = useSelector(state => state?.conseiller?.isUpdated);

  const structure = useSelector(state => state?.structure?.structure);
  const permanence = useSelector(state => state?.permanence?.permanence);
  const voirPermanence = useSelector(state => state?.permanence?.showFormulairePermanence);

  useEffect(() => {
    if (conseiller) {
      dispatch(conseillerActions.isFormulaireChecked(conseiller.sexe, formulaireIsUpdated));
      dispatch(permanenceActions.isPermanenceChecked(conseiller?.hasPermanence));
      if (!structure) {
        dispatch(structureActions.get(conseiller.structureId));
      }
      if (permanence === undefined) {
        dispatch(permanenceActions.get(conseiller._id));
      }
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
        {!voirPermanence &&
          //<Route path={`/mes-informations`} component={Permanence} />
          <>
            <Route path={`/accueil`} component={Welcome} />
            <Route path={`/compte-rendu-activite`} component={Cra} />
            <Route path={`/statistiques`} component={Statistics} />
            <Route path={`/ressourcerie`} component={Ressourcerie} />
            <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
          </>
        }
        {voirPermanence &&
        <>
          <Route path={`/accueil`} component={Permanence} />
          <Route path="/" render={() => (<Redirect to="/accueil" />)} />
        </>
        }
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
