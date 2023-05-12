import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';
import Spinner from 'react-loader-spinner';

import ModalUpdateForm from './ModalUpdateForm';
import Footer from '../../Footer';
import MaZoneGeographique from './MaZoneGeographique';
import MonCurriculumVitae from './MonCurriculumVitae';
import MonPix from './MonPix';

function MonEspaceCandidat() {

  const candidat = useSelector(state => state.candidat);

  const isUploaded = useSelector(state => state.candidat?.isUploaded);
  const isDeleted = useSelector(state => state.candidat?.isDeleted);
  const succes = useSelector(state => state.candidat?.success);
  const uploading = useSelector(state => state.candidat?.uploading);

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <ModalUpdateForm form={candidat} showModal={showModal} setShowModal={setShowModal} formOrigin="espaceCandidat"/>
      <div className="mon-espace-candidat">
        <div className="fr-container">
          <div className="spinnerCustom">
            <Spinner
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              visible={ uploading === true}
            />
          </div>
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Mon espace candidat</h1>
              <p className="paragraphe fr-mb-6w">
                Cette page vous permet de modifier vos informations de candidature et de vous d&eacute;clarer disponible afin de
                vous mettre en visibilit&eacute; des structures qui recrutent.
              </p>
            </div>

            <div className="fr-col-12">
              {succes &&
                <FlashMessage duration={10000}>
                  <p className="fr-label flashBag">
                    Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
                    <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                  </p>
                </FlashMessage>
              }

              {isUploaded &&
                <FlashMessage duration={10000} >
                  <p className="fr-label flashBag">
                    Votre Curriculum Vit&aelig; a &eacute;t&eacute; ajout&eacute; avec succ&egrave;s !
                    <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                    <br /><br />
                    <span style={{ color: 'initial' }}>
                      Important : il sera conserv&eacute; seulement 6 mois sur votre espace candidat.&nbsp;
                      Au del&agrave;, il vous sera recommand&eacute; de le t&eacute;l&eacute;charger de nouveau.
                    </span>
                  </p>
                </FlashMessage>
              }
              {isDeleted &&
                <FlashMessage duration={10000} >
                  <p className="fr-label flashBag">
                    Votre Curriculum Vit&aelig; a &eacute;t&eacute; supprim&eacute; avec succ&egrave;s !
                    <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                  </p>
                </FlashMessage>
              }
            </div>
            <div className="fr-col-12">
              {/** Emplacement Disponibilité */}
              <hr className="fr-my-6w"/>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <MaZoneGeographique setSubmitted={setSubmitted} submitted={submitted} setShowModal={setShowModal}/>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5">
              <MonCurriculumVitae isUploaded={isUploaded} isDeleted={isDeleted} uploading={uploading}/>
            </div>

            <div className="fr-col-12">
              <hr/>
              <MonPix/>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MonEspaceCandidat;
