import React, { useEffect } from 'react';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireSuperieurHierarchique from './FormulaireSupHierarchique';
import { useDispatch, useSelector } from 'react-redux';
import { formSupHierarchiqueActions } from '../../../actions/supHierarchique.actions';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import { conseillerActions } from '../../../actions/conseiller.actions';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';
import { Link } from 'react-router-dom';
import { userEntityId } from '../../../helpers';
import FormulaireContrat from './FormulaireContrat';
import FormulaireMesCoordonneesCnfs from './FormulaireMesCoordonneesCnfs';

function MesInformations() {
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const formSupHierarchique = useSelector(state => state.formulaireSupHierarchique);
  const formInfoPersonnel = useSelector(state => state.formulaireInfoPersonnel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(formSupHierarchiqueActions.initFormSupHierarchiqueMessage({ isCreated: false, showError: false }));
    dispatch(formInfoPersonnelActions.initFormInfoPersonnelMessage({ isCreated: false, showError: false }));
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  return (
    <>
      {(formSupHierarchique.isCreated || formInfoPersonnel.isCreated) &&
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
      <div className="mes-informations">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-12w fr-mb-4w fr-mb-md-4w">Mes informations</h1>
            </div>
            <div className="fr-col-12 fr-mb-15w ">
              {conseiller?.prenom} {conseiller?.nom} - {structure?.nom}
            </div>

            <FormulaireContrat conseiller={conseiller}/>

            <FormulaireSuperieurHierarchique />

            <FormulaireMesCoordonneesCnfs />

            <FormulaireInfosPersonnelles />







            <div className="fr-col-12 fr-col-md-5 fr-mr-md-6w">

            </div>
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-ml-md-10w">
                <h2 className="fr-mb-md-4w sous-titre">Contact de mon responsable</h2>
                <p className="paragraphe fr-mb-md-3w">Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant
                  le dispositif et l&rsquo;animation du r&eacute;seau à votre employeur (ex: invitation à des webinaires,
                  envoi de documents explicatifs, newsletter, etc.)
                </p>

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
