import React, { useEffect } from 'react';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireInfosProfessionnelles from './FormulaireInfosProfessionnelles';
import { useDispatch, useSelector } from 'react-redux';
import { formInformationsActions } from '../../../actions/informations.actions';
import { conseillerActions } from '../../../actions/conseiller.actions';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';
import { userEntityId } from '../../../helpers';

function MesInformations() {
  const formInformations = useSelector(state => state.formulaireInformations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formInformationsActions.initFormInformationsMessage({ isCreated: false, showError: false }));
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  return (
    <>
      {formInformations.isUpdated &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInformations.showConfirmationMail &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Un mail de confirmation de votre nouvelle adresse mail vous a &eacute;t&eacute; envoy&eacute; pour valider votre changement
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInformations.showConfirmationMailPro &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Un mail de confirmation de votre nouvelle adresse mail professionnelle vous a &eacute;t&eacute; envoy&eacute; pour valider votre changement
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }

      {formInformations.error &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag invalid">
            {formInformations.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
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
