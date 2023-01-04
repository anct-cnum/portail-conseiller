import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userEntityId } from '../../../helpers';
import FlashMessage from 'react-flash-message';
import { formSupHierarchiqueActions, formInfoPersonnelActions, conseillerActions, mesInformationsActions } from '../../../actions';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireSuperieurHierarchique from './FormulaireSupHierarchique';
import FormulaireContrat from './FormulaireContrat';
import FormulaireMesCoordonneesCnfs from './FormulaireMesCoordonneesCnfs';
import Footer from '../../Footer';

function MesInformations() {
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const formSupHierarchique = useSelector(state => state.formulaireSupHierarchique);
  const formInfoPersonnel = useSelector(state => state.formulaireInfoPersonnel);
  const formContrat = useSelector(state => state.mesInformations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formSupHierarchiqueActions.initFormSupHierarchiqueMessage({ isCreated: false, showError: false }));
    dispatch(formInfoPersonnelActions.initFormInfoPersonnelMessage({ isCreated: false, showError: false }));
    if (conseiller) {
      dispatch(mesInformationsActions.getContratActif(conseiller?.contrats));
    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      {(formSupHierarchique.isCreated || formInfoPersonnel.isCreated || formContrat.success) &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInfoPersonnel.showConfirmationMail &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Un mail de confirmation de votre nouvelle adresse mail vous a &eacute;t&eacute; envoy&eacute; pour valider votre changement
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInfoPersonnel.showConfirmationMailPro &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Un mail de confirmation de votre nouvelle adresse mail professionnelle vous a &eacute;t&eacute; envoy&eacute; pour valider votre changement
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formSupHierarchique.error &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag invalid">
            {formSupHierarchique.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInfoPersonnel.error &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag invalid">
            {formInfoPersonnel.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formContrat.error &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag invalid">
            {formContrat.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      <div className="mes-informations">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-12w fr-mb-4w fr-mb-md-4w">Mes informations</h1>
            </div>
            <div className="fr-col-12 fr-mb-5w ">
              {conseiller?.prenom} {conseiller?.nom} - {structure?.nom}
            </div>
            {(conseiller && user) &&
              <>
                <FormulaireContrat conseiller={conseiller}/>
                <div className="fr-col-1"></div>
                <FormulaireSuperieurHierarchique />
                <div className="fr-col-11 fr-my-3w"><hr/></div>
                <FormulaireMesCoordonneesCnfs conseiller={conseiller} user={user}/>
                <div className="fr-col-1"></div>
                <FormulaireInfosPersonnelles />
              </>
            }
          </div>
        </div>
      </div>
      <Footer type="support" />
    </>
  );
}

export default MesInformations;
