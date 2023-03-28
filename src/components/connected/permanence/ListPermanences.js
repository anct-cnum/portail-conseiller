import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { permanenceActions } from '../../../actions';

import horairesInitiales from '../../../data/horairesInitiales.json';
import { formatAdresse } from '../../../utils/functionFormats';
import ReactTooltip from 'react-tooltip';

function ListPermanences({ prefixId, conseillerId, permanenceActuelId = null, firstTime }) {
  const dispatch = useDispatch();

  const listPermanences = useSelector(state => state.permanence?.permanences);
  const permanencesReservees = useSelector(state => state.permanence?.permanencesReservees);
  const loadingHoraires = useSelector(state => state.permanence?.loadingHoraires);
  const fields = useSelector(state => state.permanence?.fields);
  const geocodeAdresses = useSelector(state => state.permanence?.geocodeAdresses);
  const adresseIntrouvable = useSelector(state => state.permanence?.adresseIntrouvable);
  const erreurAddresseIntrouvable = useSelector(state => state.permanence?.errorAdresseIntrouvable);
  const [showList, setShowList] = useState(0);

  const handleClick = e => {
    const permanence = listPermanences?.find(permanence => permanence?._id === e.target.value);
    if (permanence?._id) {
      dispatch(permanenceActions.reserverPermanence({ prefixId: prefixId, idPermanence: permanence?._id }));
      dispatch(permanenceActions.getAdresseIntrouvable(permanence?._id));
    }

    if (permanence?._id !== permanenceActuelId) {
      dispatch(permanenceActions.updateField('idOldPermanence', permanenceActuelId));
    }
    dispatch(permanenceActions.updateField(prefixId + 'idPermanence', permanence?._id ?? 'nouveau'));
    dispatch(permanenceActions.updateField(prefixId + 'nomEnseigne', permanence?.nomEnseigne));
    dispatch(permanenceActions.updateField(prefixId + 'siret', permanence?.siret));
    dispatch(permanenceActions.updateField(prefixId + 'checkboxSiret', e.target.value === 'nouveau' ? false : !permanence?.siret));
    dispatch(permanenceActions.updateField(prefixId + 'numeroVoie', permanence?.adresse?.numeroRue?.toUpperCase()));
    dispatch(permanenceActions.updateField(prefixId + 'rueVoie', permanence?.adresse?.rue?.toUpperCase()));
    dispatch(permanenceActions.updateField(prefixId + 'codePostal', permanence?.adresse?.codePostal));
    dispatch(permanenceActions.updateField(prefixId + 'ville', permanence?.adresse?.ville?.toUpperCase()));
    dispatch(permanenceActions.updateField(prefixId + 'adresse', formatAdresse(permanence?.adresse)));
    dispatch(permanenceActions.updateField(prefixId + 'adresseIntrouvable', adresseIntrouvable?.adresse?.length));
    dispatch(permanenceActions.updateField(prefixId + 'location', permanence?.location));
    dispatch(permanenceActions.updateField(prefixId + 'codeCommune', permanence?.codeCommune));
    dispatch(permanenceActions.updateField(prefixId + 'numeroTelephone', permanence?.numeroTelephone));
    dispatch(permanenceActions.updateField(prefixId + 'email', permanence?.email));
    dispatch(permanenceActions.updateField(prefixId + 'siteWeb', permanence?.siteWeb));
    dispatch(permanenceActions.updateField(prefixId + 'horaires', { [prefixId + 'horaires']: permanence?.horaires ?? horairesInitiales }));
    dispatch(permanenceActions.updateField(prefixId + 'conseillers', permanence?.conseillers));
    dispatch(permanenceActions.updateField(prefixId + 'libre', false));
    dispatch(permanenceActions.updateField(prefixId + 'rdv', false));
    dispatch(permanenceActions.updateField(prefixId + 'prive', false));

    permanence?.typeAcces.forEach(type => {
      dispatch(permanenceActions.updateField(prefixId + type, true));
    });
    if (firstTime) {
      loadingHoraires[Number(prefixId.split('_')[1]) + 1] = true;
    } else {
      loadingHoraires[0] = true;
    }
    if (prefixId === 'principal_') {
      dispatch(permanenceActions.updateField('lieuPrincipalPour', permanence?.lieuPrincipalPour));
    } else {
      dispatch(permanenceActions.updateField(prefixId + 'conseillersItinerants', permanence?.conseillersItinerants));
    }

    const adresse = {
      numero: permanence?.adresse?.numeroRue,
      rue: permanence?.adresse?.rue,
      codePostal: permanence?.adresse?.codePostal,
      ville: permanence?.adresse?.ville
    };
    dispatch(permanenceActions.getGeocodeAdresse(adresse, prefixId));
    dispatch(permanenceActions.setHorairesLoading(loadingHoraires));
    dispatch(permanenceActions.disabledField(prefixId, e.target.value !== 'nouveau'));
  };

  useEffect(() => {
    let nbPermanences = 0;
    if (listPermanences !== undefined && listPermanences?.length > 0) {
      listPermanences.forEach(permanence => {
        if (permanence?.conseillers.includes(conseillerId) === false && permanence?.estStructure === false) {
          nbPermanences++;
        }
      });
    }
    setShowList(nbPermanences);
    if (adresseIntrouvable) {
      dispatch(permanenceActions.updateField(prefixId + 'adresse', formatAdresse(null, null, null, adresseIntrouvable?.adresse)));
      dispatch(permanenceActions.updateField(prefixId + 'adresseIntrouvable', adresseIntrouvable?.adresse?.length > 0));
    }
  }, [listPermanences, adresseIntrouvable]);

  useEffect(() => {
    if (geocodeAdresses) {
      const geocodeAdresse = geocodeAdresses?.filter(geocode => geocode.prefixId === prefixId)[0]?.geocodeAdresse;
      if (geocodeAdresse) {
        let resultGeocode = geocodeAdresse[0]?.geometry ?? { type: 'Point', coordinates: [1.849121, 46.624100] };
        if (prefixId === 'principal_' && geocodeAdresse.length === 0) {
          resultGeocode = null;
        }
        dispatch(permanenceActions.updateField(prefixId + 'location', resultGeocode));
      }
    }
  }, [geocodeAdresses]);

  return (
    <>
      {showList > 0 &&
      <>
        {((prefixId !== 'principal_') ||
        (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
          <>
            <div className="fr-col-offset-1 fr-col-11">
              S&eacute;lectionnez votre lieu d&rsquo;activit&eacute;, s&rsquo;il n&rsquo;apparaît pas dans cette liste,
              cochez la puce &laquo;&nbsp;Ajouter un nouveau lieu d&rsquo;activit&eacute;&nbsp;&raquo;.
              <span className="baseline">
                Cette liste correspond aux lieux d&rsquo;activit&eacute; d&eacute;j&agrave; enregistr&eacute;s par les
                conseillers num&eacute;riques de votre structure d&rsquo;accueil.<br/>
                En s&eacute;l&eacute;ctionnant un &eacute;l&eacute;ment existant, les champs seront remplis avec informations pr&eacute;-enregistr&eacute;es
                par vos collaborateurs.
              </span>
            </div>
            {erreurAddresseIntrouvable &&
              <span className="text-error fr-mb-n3w">
                Une erreur est survenue lors de la recherche de vos demandes d&rsquo;adresse.
              </span>
            }
            <div className="fr-col-offset-1 fr-col-8">
              <div className="fr-form-group">
                <fieldset className="fr-fieldset fr-mt-4w">
                  <div className="fr-fieldset__content">
                    {listPermanences.map(((permanence, idx) => {
                      return (
                        <div className="fr-radio-group fr-radio-rich radio-permanence" key={idx}>
                          {(permanence?.conseillers.includes(conseillerId) === false || permanenceActuelId === String(permanence?._id)) &&
                            <>
                              {(permanencesReservees?.filter(perm => perm.idPermanence === permanence?._id)?.length > 0 &&
                              permanencesReservees?.filter(perm => perm.idPermanence === permanence?._id)[0]?.prefixId !== prefixId) &&
                                <>
                                  <input type="radio" disabled/>
                                  <label className="fr-label fr-my-2w permanence-existante" htmlFor={prefixId + permanence?._id}>
                                    <span className="fr-container fr-container--fluid">
                                      <span className="fr-grid-row">
                                        <span className="fr-col-3">{permanence?.adresse?.ville?.toUpperCase()}</span>
                                        <span className="fr-col-2">{permanence?.adresse?.codePostal}</span>
                                        <span className="fr-col-7">{permanence?.nomEnseigne}</span>
                                      </span>
                                    </span>
                                  </label>
                                </>
                              }
                              {(permanencesReservees?.filter(perm => perm.idPermanence === permanence?._id)?.length === 0 ||
                              permanencesReservees?.filter(perm => perm.idPermanence === permanence?._id)[0]?.prefixId === prefixId) &&
                                <>
                                  <input type="radio" id={prefixId + permanence?._id} className="permanence-existante"
                                    defaultChecked={permanenceActuelId === String(permanence?._id)}
                                    name={prefixId + 'permancenceSecondaire'} value={permanence?._id} required="required" onClick={e => {
                                      handleClick(e);
                                    }}/>
                                  <label className="fr-label fr-my-2w permanence-existante" htmlFor={prefixId + permanence?._id}>
                                    <span className="fr-container fr-container--fluid">
                                      {permanence?.adresse &&
                                      <span className="fr-grid-row">
                                        <span className="fr-col-3">{permanence?.adresse?.ville?.toUpperCase()}</span>
                                        <span className="fr-col-2">{permanence?.adresse?.codePostal}</span>
                                        <span className="fr-col-7">{permanence?.nomEnseigne}</span>
                                      </span>
                                      }
                                      {!permanence?.adresse &&
                                      <span className="fr-grid-row">
                                        <span className="fr-col-5" >
                                          <span className="ri-error-warning-fill warning-adresse"
                                            data-tip="Vous avez remonT&eacute; un probl&egrave;me d&rsquo;adresse, celui-ci est en cours de traitement.">
                                          </span>
                                          <span className="warning-text">Correction en cours</span>
                                          <ReactTooltip html={true} className="infobulle" arrowColor="white"/></span>
                                        <span className="fr-col-7">{permanence?.nomEnseigne}</span>
                                      </span>
                                      }
                                    </span>
                                  </label>
                                </>
                              }
                            </>
                          }
                        </div>);
                    })) }
                    <div className="fr-radio-group fr-radio-rich radio-permanence">
                      <input type="radio" className="permanence-existante" id={prefixId + 'nouveau'} name={prefixId + 'permancenceSecondaire'} value="nouveau"
                        defaultChecked={permanenceActuelId === null} required="required" onClick={e => {
                          handleClick(e);
                        }} />
                      <label className="fr-label fr-my-2w permanence-existante" htmlFor={prefixId + 'nouveau'} >
                        Ajouter un nouveau lieu d&rsquo;activit&eacute;
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </>
        }
      </>
      }
    </>
  );
}

ListPermanences.propTypes = {
  prefixId: PropTypes.string,
  conseillerId: PropTypes.string,
  permanenceActuelId: PropTypes.string,
  firstTime: PropTypes.bool
};

export default ListPermanences;
