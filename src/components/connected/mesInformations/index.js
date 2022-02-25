import React from 'react';
import FormulaireInfosPersonnelles from './FormulaireInfosPersonelles';
import FormulaireSuperieurHierarchique from './FormulaireSupHierarchique';
import { useSelector } from 'react-redux';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';

function MesInformations() {
  const user = useSelector(state => state.authentication.user.user);
  const form = useSelector(state => state.formulaireSupHierarchique);
  return (
    <>
      {form.isCreated &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {form.error &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag invalid">
            {form.error}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      <div className="mes-informations rf-mb-md-12w">
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-12">
              <h1 className="titre rf-mt-15w rf-mb-4w rf-mb-md-4w">Mes informations personnelles et contact de mon responsable</h1>
            </div>
            <div className="rf-col-12 rf-col-md-5 rf-mr-md-6w">
              <div>
                <h2 className="rf-mb-md-4w sous-titre">Mes informations personnelles</h2>
                <div className="contact-mail">
                  <img src="/logos/home-connected/icone-courriel.svg" />
                  <div className="infos-user rf-mb-md-4w">
                    <span>{user.name}</span>
                    <span>Modification de mon mot de passe</span>
                    <span>Modification de mon mail Conseiller numérique</span>
                  </div>
                </div>
                <FormulaireInfosPersonnelles />
              </div>
            </div>
            <div className="rf-col-12 rf-col-md-6">
              <div className="rf-ml-md-10w">
                <h2 className="rf-mb-md-4w sous-titre">Contact de mon responsable</h2>
                <p className="paragraphe rf-mb-md-4w">Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant
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
