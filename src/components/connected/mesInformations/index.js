import React, { useEffect } from 'react';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireInfosProfessionnelles from './FormulaireInfosProfessionnelles';
import { useDispatch, useSelector } from 'react-redux';
import { formInformationsActions } from '../../../actions/informations.actions';
import { conseillerActions } from '../../../actions/conseiller.actions';
import Footer from '../../Footer';
import { userEntityId } from '../../../helpers';
import { alerteActions } from '../../../actions';
import Alerte from '../../common/Alerte';

function MesInformations() {
  const formInformations = useSelector(state => state.formulaireInformations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formInformationsActions.initFormInformationsMessage({ isCreated: false, showError: false }));
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  useEffect(() => {
    if (formInformations.isUpdated) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Vos informations ont bien été enregistrées',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (formInformations.showConfirmationMail) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Un mail de confirmation de votre nouvelle adresse mail vous a été envoyé pour valider votre changement',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (formInformations.showConfirmationMailPro) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Un mail de confirmation de votre nouvelle adresse mail professionnelle vous a été envoyé pour valider votre changement',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (formInformations.error) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: formInformations.error,
        icon: 'ri-close-line ri-xl'
      }));
    }
  }, [formInformations]);

  return (
    <>
      <Alerte />
      <div className="mes-informations">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Mes informations</h1>
            </div>
            <div className="fr-col-12 fr-col-md-5 fr-mr-md-6w">
              <div>
                <FormulaireInfosProfessionnelles />
              </div>
            </div>
            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5 fr-mr-md-6w">
              <div>
                <FormulaireInfosPersonnelles />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support" />
    </>
  );
}

export default MesInformations;
