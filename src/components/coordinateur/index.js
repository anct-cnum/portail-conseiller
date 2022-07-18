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
import { conseillerActions, permanenceActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';
import MesInformations from '../connected/mesInformations';
import Cra from '../connected/cra';
import FormulaireSexeAge from '../connected/FormulaireSexeAge';

function Coordinateur() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const structure = useSelector(state => state?.structure?.structure);

  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const voirPermanence = useSelector(state => state?.permanence?.showFormular);
  const suspendrePermanence = localStorage.getItem('suspension_permanence');

  useEffect(() => {
    if (conseiller) {
      if (!structure || structure === undefined) {
        dispatch(structureActions.get(conseiller.structureId));
      }
      dispatch(permanenceActions.isPermanenceChecked(conseiller?.hasPermanence));

    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      <Header linkAccount={user?.name}/>
      <div className="admin">
        <CoordinateurHeader linkAccount={user?.name}/>
        {(!voirPermanence || suspendrePermanence) &&
          <>
            <Route path={'/mes-informations'} component={MesInformations} />
            <Route path={`/compte-rendu-activite`} component={Cra} />
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
          </>
        }
        {(voirPermanence && !suspendrePermanence) &&
          <>
            <Route path={`/accueil`} component={Permanence} />
            <Route path="/" render={() => (<Redirect to="/accueil" />)} />
          </>
        }

        {voirFormulaire &&
          <FormulaireSexeAge />
        }
      </div>
    </>
  );
}

export default Coordinateur;
