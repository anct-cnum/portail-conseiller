import React from 'react';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireSuperieurHierarchique from './FormulaireSupHierarchique';
import { useSelector } from 'react-redux';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';
import { Link } from 'react-router-dom';

function MesInformations() {
  const user = useSelector(state => state.authentication.user.user);
  const formSupHierarchique = useSelector(state => state.formulaireSupHierarchique);
  const formInfoPersonnel = useSelector(state => state.formulaireInfoPersonnel);
  return (
    <>
      {formSupHierarchique.isCreated &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {formInfoPersonnel.isCreated &&
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
              <h1 className="titre fr-mt-15w fr-mb-4w fr-mb-md-4w">Mes informations personnelles et contact de mon responsable</h1>
            </div>
            <div className="fr-col-12 fr-col-md-5 fr-mr-md-6w">
              <div>
                <h2 className="fr-mb-md-4w sous-titre">Mes informations personnelles</h2>
                <div className="contact-mail">
                  <img src="/logos/home-connected/icone-courriel.svg" />
                  <div className="infos-user fr-mb-md-6w">
                    <span>{user.name}</span>
                    <Link to={{
                      pathname: '/mot-de-passe-oublie',
                      state: {
                        fromModifPassword: true,
                      },
                    }} className="modif-password">
                      Modification de mon mot de passe
                    </Link>
                  </div>
                </div>
                <FormulaireInfosPersonnelles />
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-ml-md-10w">
                <h2 className="fr-mb-md-4w sous-titre">Contact de mon responsable</h2>
                <p className="paragraphe fr-mb-md-3w">Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant
                  le dispositif et l&rsquo;animation du r&eacute;seau à votre employeur (ex: invitation à des webinaires,
                  envoi de documents explicatifs, newsletter, etc.)
                </p>
                <FormulaireSuperieurHierarchique />
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
