import React from 'react';
import PropTypes from 'prop-types';

import TypeAcces from './TypeAcces';
import Horaires from './Horaires';
import Adresse from './Adresse';

function PermanenceSecondaireUpdate({ conseillerId, permanences }) {

  const listSecondaires = permanences?.filter(field => field.estStructure === false && field.conseillers.includes(conseillerId));

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
    </>

  );
}

PermanenceSecondaireUpdate.propTypes = {
  conseillerId: PropTypes.string,
  permanences: PropTypes.array,
};

export default PermanenceSecondaireUpdate;
