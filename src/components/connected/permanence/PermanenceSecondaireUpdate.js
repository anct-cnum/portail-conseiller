import React from 'react';
import PropTypes from 'prop-types';

import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Adresse from './Adresse';
import AjouterAutrePermanence from './AjouterAutrePermanence';
import ListPermanences from './ListPermanences';
import { useSelector } from 'react-redux';

function PermanenceSecondaireUpdate({ structure, structureId, conseillerId, permanences }) {
  const show = Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => (false));

  const listSecondaires = permanences?.filter(field => field.estStructure === false && field.conseillers.includes(conseillerId));
  const lieuxSecondaires = Array.from({ length: process.env.REACT_APP_NOMBRE_LIEU_SECONDAIRE }, () => ({}));
  const adresseStructure = structure?.insee?.etablissement?.adresse;
  const fields = useSelector(state => state.permanence?.fields);

  return (
    <>
      {listSecondaires && listSecondaires.map((lieuSecondaire, idx) => {
        return (
          <div key={idx} className="rf-container">
            <div className="rf-grid-row">
              <div className="rf-col-1 col-logo">
                <img className="pin rf-mt-8w" src="logos/permanences/pin.svg"/>
              </div>
              <div className="rf-col-8 ">
                <h2 className="sous-titre rf-mt-7w rf-mb-4w">
                  Lieu d&rsquo;activit&eacute; secondaire
                  <span className="baseline rf-mt-1w">
                    Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                    d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                  </span>
                </h2>
              </div>
            </div>
            <div className="rf-grid-row">
              <Adresse prefixId={ 'secondaire_' + idx + '_'}
                conseillerId={conseillerId}
                permanence={lieuSecondaire} isUpdate={true}/>
              <TypeAcces prefixId={ 'secondaire_' + idx + '_'} islieuPrincipal={false} permanence={lieuSecondaire} isUpdate={true}/>
              <Horaires prefixId={ 'secondaire_' + idx + '_'} horairesId={idx + 1} permanence={lieuSecondaire} isUpdate={true}/>
            </div>
          </div>
        );
      })
      }
      <div className="rf-container">
        <div className="rf-grid-row">
          <AjouterAutrePermanence secondaireId={ listSecondaires.length } conseillerId={conseillerId} structureId={structureId}
            show={show} isUpdate={true}/>
        </div>

      </div>
      {lieuxSecondaires && lieuxSecondaires.map((lieuSecondaire, idx) => {
        return (
          <div key={idx} className="rf-container">
            {idx >= listSecondaires.length &&
            <>
              <div className={(idx === 0 && show[0]) ||
                (idx > 0 &&
                  fields?.filter(field => field.name === 'submit_and_next_' + idx)[0]?.value) ? 'rf-grid-row' : 'hide'}>

                <div className="rf-col-1 col-logo">
                  <img className="pin rf-mt-8w" src="logos/permanences/pin.svg"/>
                </div>
                <div className="rf-col-8 ">
                  <h2 className="sous-titre rf-mt-7w rf-mb-4w">
                    Lieu d&rsquo;activit&eacute; secondaire
                    <span className="baseline rf-mt-1w">
                      Un lieu d&rsquo;activit&eacute; secondaire correspond &agrave; une permanence o&ugrave; vous avez &eacute;t&eacute;
                      d&eacute;l&eacute;gu&eacute;(e) et o&ugrave; vous exercez votre activit&eacute; de mani&egrave;re hebdomadaire.
                    </span>
                  </h2>
                </div>

                <ListPermanences prefixId={ 'secondaire_' + idx + '_'} conseillerId={conseillerId}/>
                <Adresse
                  codeDepartement={structure?.codeDepartement}
                  adressePermanence={adresseStructure}
                  nomEnseignePermanence={structure?.nom}
                  prefixId={ 'secondaire_' + idx + '_'}
                  secondaireId={ idx }
                  islieuPrincipal={false}
                  conseillerId={conseillerId}
                />
                <TypeAcces prefixId={ 'secondaire_' + idx + '_'} islieuPrincipal={false} />
                <Horaires prefixId={ 'secondaire_' + idx + '_'} horairesId={idx + 1}/>
                {idx < 14 &&
                  <AjouterAutrePermanence secondaireId={ idx } conseillerId={conseillerId} structureId={structureId} show={show} />
                }
              </div>
            </>
            }
          </div>
        );
      })
      }
    </>

  );
}

PermanenceSecondaireUpdate.propTypes = {
  conseillerId: PropTypes.string,
  permanences: PropTypes.array,
  structure: PropTypes.object,
  structureId: PropTypes.string,
};

export default PermanenceSecondaireUpdate;
