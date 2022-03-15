import React from 'react';
import PropTypes from 'prop-types';
import ButtonAjoutLieu from './Components/ButtonAjoutLieu';

function AjouterAutrePermanence({ secondaireId, show }) {

  return (
    <>
      <div className="rf-col-1 col-logo rf-mt-8w">
        <img className="pin" src="logos/permanences/pin.svg"/>
      </div>
      <div className="rf-col-5 rf-mt-7w">
        <ButtonAjoutLieu secondaireId={secondaireId} show={show} />
        <span className="baseline rf-mb-6w">
          Vous pourrez ajouter et modifier vos lieux d&rsquo;activit&eacute; plus tard.
        </span>
      </div>
    </>
  );
}

AjouterAutrePermanence.propTypes = {
  show: PropTypes.array,
  secondaireId: PropTypes.number,
};

export default AjouterAutrePermanence;
