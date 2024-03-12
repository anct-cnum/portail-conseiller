
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';

import ModalUpdateForm from './ModalUpdateForm';
import Footer from '../../Footer';
import MaZoneGeographique from './MaZoneGeographique';
import MonCurriculumVitae from './MonCurriculumVitae';
import MonPix from './MonPix';
import MaDisponibilite from './MaDisponibilite';
import { alerteActions } from '../../../actions';
import Alerte from '../../common/Alerte';

function MonEspaceCandidat() {
  const dispatch = useDispatch();
  const candidat = useSelector(state => state.candidat);

  const isUploaded = useSelector(state => state.candidat?.isUploaded);
  const isDeleted = useSelector(state => state.candidat?.isDeleted);
  const success = useSelector(state => state.candidat?.success);
  const uploading = useSelector(state => state.candidat?.uploading);
  const loadingCandidat = useSelector(state => state.candidat?.loading);
  const loadingConseiller = useSelector(state => state.conseiller?.loading);
  const loadingAdresses = useSelector(state => state.candidat?.loadingAdresses);
  const loadingDeleteCv = useSelector(state => state.candidat?.loadingDeleteCv);
  const loadingDownloadCv = useSelector(state => state.candidat?.downloading);

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (success) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Vos informations ont bien été enregistrées',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (isUploaded) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Votre Curriculum Vitæ a été ajouté avec succès',
        description: 'Important : il sera conservé seulement 6 mois sur votre espace candidat. Au delà, il vous sera recommandé de le télécharger de nouveau.',
        icon: 'ri-check-line ri-xl'
      }));
    }
    if (isDeleted) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: 'Votre Curriculum Vitæ a été supprimé avec succès',
        icon: 'ri-check-line ri-xl'
      }));
    }
  }, [success, isDeleted, isUploaded]);

  return (
    <>
      <ModalUpdateForm form={candidat} showModal={showModal} setShowModal={setShowModal} formOrigin="espaceCandidat" />
      <div className="mon-espace-candidat">
        <div className="fr-container">
          <div className="spinnerCustom">
            <Oval
              color="#00BFFF"
              height={100}
              width={100}
              visible={uploading === true || loadingCandidat === true || loadingConseiller === true || loadingAdresses === true ||
                loadingDeleteCv === true || loadingDownloadCv === true}
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
            <Alerte />
            <div className="fr-col-12">
              <MaDisponibilite />
              <hr className="fr-my-6w" />
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <MaZoneGeographique setSubmitted={setSubmitted} submitted={submitted} setShowModal={setShowModal} />
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5">
              <MonCurriculumVitae
                isUploaded={isUploaded}
                isDeleted={isDeleted}
                uploading={uploading}
                loadingDeleteCv={loadingDeleteCv}
                loadingDownloadCv={loadingDownloadCv}
              />
            </div>

            <div className="fr-col-12">
              <hr />
              <MonPix />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MonEspaceCandidat;
