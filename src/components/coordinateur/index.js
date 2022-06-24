import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import CoordinateurHeader from './CoordinateurHeader';
import Conseillers from './Conseillers';
import Territoires from '../admin/Territoires';
import Statistics from '../connected/statistics/Statistics';
import Ressourcerie from '../connected/ressourcerie/Ressourcerie';
import conseillerDetails from '../admin/ConseillerDetails';
import Permanence from '../connected/permanence';
import MesPermanences from '../connected/permanence/MesPermanences';
import PermanenceUpdate from '../connected/permanence/PermanenceUpdate';
import PermanenceCreate from '../connected/permanence/PermanenceCreate';
import { conseillerActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';

function Coordinateur() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const structure = useSelector(state => state?.structure?.structure);

  useEffect(() => {
    if (conseiller) {
      if (!structure || structure === undefined) {
        dispatch(structureActions.get(conseiller.structureId));
      }

    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        <CoordinateurHeader linkAccount={user?.name}/>
        <Route path={'/mes-lieux-activite'} component={MesPermanences} />
        <Route path={'/mon-lieu-activite/:idPermanence'} component={PermanenceUpdate} />
        <Route path={'/mon-nouveau-lieu-activite'} component={PermanenceCreate} />
        <Route path={`/accueil`} component={Conseillers} />
        <Route path={`/territoires`} component={Territoires} />
        <Route path={`/statistiques`} component={Statistics} />
        <Route path={`/ressourcerie`} component={Ressourcerie} />
        <Route path={`/conseiller/:id`} component={conseillerDetails} />
        <Route path={`/lieux-activite`} component={Permanence} />
        <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
      </div>
    </>
  );
}

export default Coordinateur;
