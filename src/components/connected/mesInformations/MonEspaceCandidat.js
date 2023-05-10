import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from 'react-flash-message';

import { candidatActions } from '../../../actions';
import ModalUpdateForm from './ModalUpdateForm';
import Footer from '../../Footer';

function MonEspaceCandidat() {

  const dispatch = useDispatch();

  const loadingAdresses = useSelector(state => state.candidat?.loadingAdresses);
  const erreursForm = useSelector(state => state.candidat?.erreursFormulaire);
  const erreurCpVille = erreursForm?.errors?.filter(erreur => erreur?.cpVille)[0]?.cpVille;
  const erreurDistanceMax = erreursForm?.errors?.filter(erreur => erreur?.distance)[0]?.distance;
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const adresses = useSelector(state => state.candidat?.adresses);
  const succes = useSelector(state => state.candidat?.success);
  const erreur = useSelector(state => state.candidat?.error);
  const candidat = useSelector(state => state.candidat);

  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    cpVille: candidat.cpVille,
    distance: candidat.distance
  });

  const onClickOption = adresse => {
    const value = adresse.properties.postcode + ' ' + adresse.properties.city;
    const ville = adresse.properties.city;
    const codeCommune = adresse.properties.citycode;
    const codePostal = adresse.properties.postcode;
    const location = adresse.geometry;
    dispatch(candidatActions.updateCPVille(value, ville, codeCommune, codePostal, location));
    setInputs(inputs => ({ ...inputs, cpVille: value }));
  };

  const handleChangeCpVille = () => {
    let input = document.getElementById('searchCP');
    setInputs(inputs => ({ ...inputs, cpVille: input.value }));

    if (input.value?.length > 2) {
      dispatch(candidatActions.searchVilleCP(input.value));
    }
  };

  const handleChangeDistance = e => {
    const value = Number(e.target.value);
    setInputs(inputs => ({ ...inputs, distance: value }));
    dispatch(candidatActions.updateDistance(value));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    dispatch(candidatActions.verifyForm(candidat));
  };

  useEffect(() => {
    if (conseiller !== null && conseiller !== undefined) {
      dispatch(candidatActions.initForm(conseiller));
      setInputs({
        cpVille: conseiller.codePostal + ' ' + conseiller.nomCommune,
        distance: conseiller.distanceMax,
      });
    }
  }, [conseiller]);

  useEffect(() => {
    if (candidat?.errorsFormulaire?.lengthError === 0 && submitted) {
      setShowModal(true);
      window.scrollTo(0, 0);
    }
    setSubmitted(false);
  }, [candidat]);

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
              {(erreur || erreursForm?.lengthError > 0) &&
                <FlashMessage duration={10000}>
                  <p className="fr-label flashBag invalid">
                    {erreursForm?.lengthError > 0 &&
                      <>
                        Veuillez corriger les erreurs du formulaire.
                      </>
                    }
                    {erreursForm?.lengthError <= 0 &&
                      <>
                        Une erreur est survenue lors de la mise &agrave; jour de vos informations, veuillez r&eacute;essayer ult&eactue;rieurement !
                      </>
                    }
                    <i className="ri-close-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                  </p>
                </FlashMessage>
              }

              <h2 className="sous-titre fr-mb-6w">Ma disponibilit&eacute; g&eacute;ographique</h2>

              <div className={`fr-input-group ${erreurCpVille ? 'fr-input-group--error fr-mb-6w' : 'fr-mb-12w'}`}>
                <label className="fr-label" htmlFor="nom">
                  Nom ou code postal <span className="important">*</span>
                </label>
                <div id="myDropdown">
                  <input
                    className={
                      `fr-input searchCP
                      ${erreurCpVille ? 'fr-input--error' : ''}`
                    }
                    aria-describedby="text-input-error-desc-error"
                    type="text"
                    id="searchCP"
                    name="searchCP"
                    onChange={handleChangeCpVille}
                    value={inputs.cpVille}
                  />
                  {(!loadingAdresses && adresses?.length > 0) &&
                    <div className="scrollOptions2">
                      { adresses?.map((adresse, idx) => {
                        return (
                          <div key={idx} className="adresse" onClick={() => {
                            onClickOption(adresse);
                          }}>
                            {adresse?.properties?.postcode + ' ' + adresse?.properties?.city}
                          </div>
                        );
                      })}
                    </div>
                  }
                </div>
                {erreurCpVille &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreurCpVille}
                  </p>
                }
              </div>

              <div className={`fr-input-group fr-mt-6w ${erreurDistanceMax ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                Depuis ce lieu, pour une mission de conseiller num&eacute;rique,
                je suis pr&ecirc;t(e) &agrave; me d&eacute;placer &agrave; : <span className="important">*</span>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance5km" name="distance" value="5" required="required" onChange={() => { }}
                        checked={inputs.distance === 5} onClick={handleChangeDistance}/>
                      <label className={erreurDistanceMax ? 'fr-label invalid' : 'fr-label' } htmlFor="distance5km">
                       5 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance10km" name="distance" value="10" required="required" onChange={() => { }}
                        checked={inputs.distance === 10} onClick={handleChangeDistance}/>
                      <label className={erreurDistanceMax ? 'fr-label invalid' : 'fr-label' } htmlFor="distance10km">
                        10 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance15km" name="distance" value="15" required="required" onChange={() => { }}
                        checked={inputs.distance === 15} onClick={handleChangeDistance}/>
                      <label className={erreurDistanceMax ? 'fr-label invalid' : 'fr-label' } htmlFor="distance15km">
                        15 km
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance20km" name="distance" value="20" required="required" onChange={() => { }}
                        checked={inputs.distance === 20} onClick={handleChangeDistance}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance20km">
                        20 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance40km" name="distance" value="40" required="required" onChange={() => { }}
                        checked={inputs.distance === 40} onClick={handleChangeDistance}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance40km">
                        40 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance100km" name="distance" value="100" required="required" onChange={() => { }}
                        checked={inputs.distance === 100} onClick={handleChangeDistance}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance100km">
                        100 km
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group">
                      <input type="radio" id="distanceFranceEntiere" name="distance" value="2000" required="required" onChange={() => { }}
                        checked={inputs.distance === 2000} onClick={handleChangeDistance}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distanceFranceEntiere">
                        France enti&egrave;re
                      </label>
                    </div>
                  </div>
                </fieldset>
                { erreur &&
                  <p className="text-error fr-mb-n3w">{erreur}</p>
                }
              </div>

              <button className="form-button fr-btn fr-mt-3w fr-mb-4w" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
              {/** Emplacement CV */}
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
