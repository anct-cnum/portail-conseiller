import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Navigate, Routes } from 'react-router-dom';
import Header from '../Header';
import CoordinateurHeader from './CoordinateurHeader';
import Conseillers from './Conseillers';
import Territoires from '../admin/Territoires';
import Statistics from '../connected/statistics/Statistics';
import Permanence from '../connected/permanence';
import MesPermanences from '../connected/permanence/MesPermanences';
import PermanenceUpdate from '../connected/permanence/PermanenceUpdate';
import PermanenceCreate from '../connected/permanence/PermanenceCreate';
import { conseillerActions, permanenceActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';
import MesInformations from '../connected/mesInformations';
import Cra from '../connected/cra';
import FormulaireSexeAge from '../connected/FormulaireSexeAge';
import UpdateCra from '../connected/cra/UpdateCra';
import HistoriqueCras from '../connected/historiqueCras';
import MonEspaceCandidat from '../connected/mesInformations/MonEspaceCandidat';
import FormulaireSuperieurHierarchique from '../connected/mesInformations/FormulaireSupHierarchique';
import ConseillerDetails from '../admin/ConseillerDetails';

function Coordinateur() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.authentication?.user?.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const structure = useSelector(state => state?.structure?.structure);

  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const voirPermanence = useSelector(state => state?.permanence?.showFormular);
  const suspendrePermanence = localStorage.getItem('suspension_permanence');
  const mesPermanences = useSelector(state => state?.permanence?.mesPermanences);

  useEffect(() => {
    if (conseiller) {
      if (!structure || structure === undefined) {
        dispatch(structureActions.get(conseiller?.structureId));
      }
      dispatch(permanenceActions.isPermanenceChecked(conseiller?.hasPermanence));
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
      <div className="admin">
        <CoordinateurHeader linkAccount={user?.name} />
        <Routes>
          {(!voirPermanence || suspendrePermanence) &&
            <>
              <Route path={'/mes-informations'} element={<MesInformations />} />
              <Route exact path={`/compte-rendu-activite`} element={<Cra />} />
              <Route path={`/compte-rendu-activite/:idCra`} element={<UpdateCra />} />
              <Route path={'/mes-lieux-activite'} element={<MesPermanences />} />
              <Route path={'/mon-lieu-activite/:idPermanence'} element={<PermanenceUpdate />} />
              <Route path={'/mon-nouveau-lieu-activite'} element={<PermanenceCreate />} />
              <Route path={`/accueil`} element={<Conseillers />} />
              <Route path={`/territoires`} element={<Territoires />} />
              <Route path={`/statistiques`} element={<Statistics />} />
              <Route path={`/conseiller/:id`} element={<ConseillerDetails />} />
              <Route path={`/lieux-activite`} element={<Permanence />} />
              <Route path={'/historique'} element={<HistoriqueCras />} />
              <Route path={'/mon-espace-candidat'} element={<MonEspaceCandidat />} />
              <Route path={'/contact-mon-responsable'} element={<FormulaireSuperieurHierarchique />} />
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
      </div>
    </>
  );
}

export default Coordinateur;
