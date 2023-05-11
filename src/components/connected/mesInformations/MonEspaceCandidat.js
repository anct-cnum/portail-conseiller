import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';

import ModalUpdateForm from './ModalUpdateForm';
import Footer from '../../Footer';
import MaZoneGeographique from './MaZoneGeographique';
import MonCurriculumVitae from './MonCurriculumVitae';

function MonEspaceCandidat() {

  const succes = useSelector(state => state.candidat?.success);
  const candidat = useSelector(state => state.candidat);

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <ModalUpdateForm form={candidat} showModal={showModal} setShowModal={setShowModal} formOrigin="espaceCandidat"/>

      {succes &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }

      <div className="mon-espace-candidat">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Mon espace candidat</h1>
              <p className="paragraphe fr-mb-6w">
                Cette page vous permet de modifier vos informations de candidature et de vous d&eacute;clarer disponible afin de
                vous mettre en visibilit&eacute; des structures qui recrutent.
              </p>
            </div>

            <div className="fr-col-12">
              {/** Emplacement Disponibilité */}
              <hr className="fr-my-6w"/>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <MaZoneGeographique setSubmitted={setSubmitted} submitted={submitted} setShowModal={setShowModal}/>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5">
              <MonCurriculumVitae/>
            </div>

            <div className="fr-col-12">
              <hr/>
              {/** Emplacement PIX */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MonEspaceCandidat;
