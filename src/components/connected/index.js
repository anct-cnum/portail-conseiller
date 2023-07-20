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
import Permanence from './permanence/index';
import MesInformations from './mesInformations';
import MesPermanences from './permanence/MesPermanences';
import PermanenceUpdate from './permanence/PermanenceUpdate';
import PermanenceCreate from './permanence/PermanenceCreate';
import HistoriqueCras from './historiqueCras';
import UpdateCra from './cra/UpdateCra';
import MonEspaceCandidat from './mesInformations/MonEspaceCandidat';
import FormulaireSuperieurHierarchique from './mesInformations/FormulaireSupHierarchique';

function Connected() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication?.user?.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const voirPermanence = useSelector(state => state?.permanence?.showFormular);
  const formulaireIsUpdated = useSelector(state => state?.conseiller?.isUpdated);

  const structure = useSelector(state => state?.structure?.structure);
  const mesPermanences = useSelector(state => state?.permanence?.mesPermanences);
  const suspendrePermanence = localStorage.getItem('suspension_permanence');

  useEffect(() => {
    if (conseiller) {
      dispatch(conseillerActions.isFormulaireChecked(conseiller?.sexe, formulaireIsUpdated));
      dispatch(permanenceActions.isPermanenceChecked(conseiller?.hasPermanence));

      if (!structure || structure === undefined) {
        dispatch(structureActions.get(conseiller?.structureId));
      }
      if (mesPermanences === undefined) {
        dispatch(permanenceActions.getMesPermanences(conseiller?._id));
      }
    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      <Header linkAccount={user?.name} />
      {!user.pdfGenerator &&
        <>
          {(!voirPermanence || suspendrePermanence) &&
            <>
              <Route path={`/accueil`} component={Welcome} />
              <Route exact path={`/compte-rendu-activite`} component={Cra} />
              <Route path={`/compte-rendu-activite/:idCra`} component={UpdateCra} />
              <Route path={`/statistiques`} component={Statistics} />
              <Route path={'/mes-informations'} component={MesInformations} />
              <Route path={'/mon-espace-candidat'} component={MonEspaceCandidat} />
              <Route path={'/contact-mon-responsable'} component={FormulaireSuperieurHierarchique} />
              <Route path={`/lieux-activite`} component={Permanence} />
              <Route path={'/mes-lieux-activite'} component={MesPermanences} />
              <Route path={'/mon-lieu-activite/:idPermanence'} component={PermanenceUpdate} />
              <Route path={'/mon-nouveau-lieu-activite'} component={PermanenceCreate} />
              <Route path={'/historique'} component={HistoriqueCras} />
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
        </>
      }
      {user.pdfGenerator &&
        <>
          <Route path={`/statistiques`} component={Statistics} />
        </>
      }
    </>
  );
}

export default Connected;
