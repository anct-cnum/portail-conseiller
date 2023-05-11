import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import FlashMessage from 'react-flash-message';

import { candidatActions } from '../../../actions';

function MonCurriculumVitae() {
  const dispatch = useDispatch();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const downloadError = useSelector(state => state.conseiller?.downloadError);
  const isDownloaded = useSelector(state => state.conseiller?.isDownloaded);
  const isUploaded = useSelector(state => state.conseiller?.isUploaded);
  const isDeleted = useSelector(state => state.conseiller?.isDeleted);
  const blob = useSelector(state => state.conseiller?.blob);
  const user = useSelector(state => state.user);
  const errorTab = [{
    key: 'too-many-files',
    label: 'La plateforme n\'accepte qu\'un seul fichier !'
  }, {
    key: 'file-invalid-type',
    label: 'Le type de fichier doit obligatoirement être un .pdf !'
  }, {
    key: 'file-too-large',
    label: 'La taille du fichier ne doit pas excéder 10Mo !'
  }];

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0], acceptedFiles[0].name);
      dispatch(candidatActions.uploadCurriculumVitae(formData));
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone(
    { onDrop, accept: '.pdf', maxFiles: 1, maxSize: process.env.REACT_APP_CV_FILE_MAX_SIZE });

  const downloadCV = () => {
    dispatch(candidatActions.getCurriculumVitae(user?.entity?.$id, conseiller));
  };

  const deleteCV = () => {
    if (conseiller?.cv?.file) {
      dispatch(candidatActions.deleteCurriculumVitae(user?.entity?.$id, conseiller));
    }
  };

  useEffect(() => {
    if (blob !== null && blob !== undefined && (downloadError === undefined || downloadError === false)) {
      dispatch(candidatActions.resetCVFile());
    }
  }, [blob, downloadError]);

  useEffect(() => {
    if (isDownloaded || isUploaded || isDeleted) {
     /// dispatch(conseillerActions.get(user?.entity?.$id));
    }
  }, [isDownloaded, isUploaded, isDeleted]);

  return (
    <>
      <h2 className="sous-titre fr-mb-6w">Mon curriculum vit&aelig;</h2>

      <div className={`bouton-cv ${conseiller?.cv ? 'fr-mb-3w' : 'fr-mb-6w'} ${fileRejections.length > 0 ? 'dropZone drop-error' : ''}`}
        {...getRootProps()}>
        <input {...getInputProps()} />
        {acceptedFiles.length === 0 &&
          <>
            {isDragActive ?
              <span>Déposez votre CV ici ...</span> :
              <>
                <i className="ri-upload-2-line icone-upload"></i>
                <span>Faites glisser votre CV ou cliquez <br/>pour le s&eacute;lectionner (format PDF)</span>
              </>
            }
          </>
        }
        {acceptedFiles.length > 0 &&
          <span>{acceptedFiles[0].name}</span>
        }
        {fileRejections?.length > 0 &&
          <div className="drop-error-message">{
            errorTab.find(item => item.key === fileRejections[0].errors[0].code).label
          }
          </div>
        }
      </div>

      {conseiller?.cv &&
        <>
          <div className="text-cv fr-mb-3w">
            Voir ou t&eacute;l&eacute;charger mon CV :<br/>
            <p className="bouton-download" onClick={downloadCV}>
              <i className="ri-file-download-line icone" aria-hidden="true" style={{ fontSize: '1.8em' }}></i> {conseiller?.cv?.file}
            </p>
          </div>
          <div className="text-cv fr-mb-3w">
            Supprimer mon CV :
            <p className="bouton-delete" onClick={deleteCV}>
              <i className="ri-delete-bin-6-line icone" aria-hidden="true" style={{ fontSize: '1.5em' }}></i> Supprimer
            </p>
          </div>
        </>
      }
      <div className="text-cv">
        Une fois t&eacute;l&eacute;charg&eacute; sur le site, votre CV est conserv&eacute; pour une dur&eacute;e de 6 mois, conform&eacute;ment au RGPD.
      </div>
    </>
  );
}

export default MonCurriculumVitae;
