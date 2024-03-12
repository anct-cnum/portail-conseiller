import React, { useEffect } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
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
  const errorLoadingConseiller = useSelector(state => state?.conseiller?.errorLoadingConseiller);
  const countErrorConseiller = useSelector(state => state?.conseiller?.countErrorConseiller);
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
    } else if (countErrorConseiller <= 3) {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller, errorLoadingConseiller]);

  return (
    <>
      <Header linkAccount={user?.name} />
      <Routes>
        {(!voirPermanence || suspendrePermanence) &&
          <>
            <Route path={`/accueil`} element={<Welcome />} />
            <Route exact path={`/compte-rendu-activite`} element={<Cra />} />
            <Route path={`/compte-rendu-activite/:idCra`} element={<UpdateCra />} />
            <Route path={`/statistiques`} element={<Statistics />} />
            <Route path={'/mes-informations'} element={<MesInformations />} />
            <Route path={'/mon-espace-candidat'} element={<MonEspaceCandidat />} />
            <Route path={'/contact-mon-responsable'} element={<FormulaireSuperieurHierarchique />} />
            <Route path={`/lieux-activite`} element={<Permanence />} />
            <Route path={'/mes-lieux-activite'} element={<MesPermanences />} />
            <Route path={'/mon-lieu-activite/:idPermanence'} element={<PermanenceUpdate />} />
            <Route path={'/mon-nouveau-lieu-activite'} element={<PermanenceCreate />} />
            <Route path={'/historique'} element={<HistoriqueCras />} />
            <Route exact path="/" element={<Navigate to="/accueil" />} />
          </>
        }
        {(voirPermanence && !suspendrePermanence) &&
          <>
            <Route path={`/accueil`} element={<Permanence />} />
            <Route path="/" element={<Navigate to="/accueil" />} />
          </>
        }
        {voirFormulaire &&
          <FormulaireSexeAge />
        }
      </Routes>
    </>
  );
}

export default Connected;
