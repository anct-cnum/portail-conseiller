import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

import { candidatActions, conseillerActions } from '../../../actions';

function MonCurriculumVitae({ isUploaded, isDeleted, uploading }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.authentication?.user?.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const isDownloaded = useSelector(state => state.candidat?.isDownloaded);
  const downloadError = useSelector(state => state.candidat?.downloadError);
  const uploadError = useSelector(state => state.candidat?.uploadError);
  const blob = useSelector(state => state.candidat?.blob);

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
    if (blob !== null && blob !== undefined && (uploadError === undefined || uploadError === false)) {
      dispatch(candidatActions.resetCVFile());
    }
  }, [blob, uploadError]);

  useEffect(() => {
    if (isDownloaded || isUploaded || isDeleted) {
      dispatch(conseillerActions.get(user?.entity?.$id));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        dispatch(candidatActions.initBoolean());
      }, 10000);
    }
  }, [isDownloaded, isUploaded, isDeleted]);

  return (
    <>
      <h2 className="sous-titre fr-mb-6w">Mon curriculum vit&aelig;</h2>
      { (!isUploaded &&
        (typeof uploadError === 'string' && uploadError?.length > 0) ||
        (typeof downloadError === 'string' && downloadError?.length > 0)) &&
        <FlashMessage duration={10000}>
          <p className="fr-label flashBag invalid">
            {uploadError ?? downloadError}
            <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }

      <div className={`bouton-cv ${conseiller?.cv ? 'fr-mb-3w' : 'fr-mb-6w'} ${fileRejections.length > 0 ? 'dropZone drop-error' : ''}`}
        {...getRootProps()}>
        <input {...getInputProps()} />
        {(conseiller?.cv && !uploading || acceptedFiles.length === 0) &&
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
        {uploading && acceptedFiles.length > 0 &&
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

MonCurriculumVitae.propTypes = {
  isUploaded: PropTypes.bool,
  isDeleted: PropTypes.bool,
  uploading: PropTypes.bool,
};
export default MonCurriculumVitae;
