import React from 'react';
import PropTypes from 'prop-types';
import ButtonAjoutLieu from './Components/ButtonAjoutLieu';
import { useSelector } from 'react-redux';

function AjouterAutrePermanence({ secondaireId, conseillerId, structureId, show, isUpdate }) {
  const fields = useSelector(state => state.permanence?.fields);
  const ajoutBtn = fields?.filter(field => field.name === 'submit_and_next_' + secondaireId)[0]?.value;
  const ajoutBtnNext = fields?.filter(field => field.name === 'submit_and_next_' + (secondaireId + 1))[0]?.value;

  return (
    <>
      { (!ajoutBtn && isUpdate || !isUpdate && !ajoutBtnNext) &&
        <>
          <div className="rf-col-1 col-logo rf-mt-8w">
            <img className="pin" src="logos/permanences/pin.svg"/>
          </div>
          <div className="rf-col-5 rf-mt-7w">
            <ButtonAjoutLieu secondaireId={secondaireId} conseillerId={conseillerId} structureId={structureId} show={show} isUpdate={isUpdate} />
            <span className="baseline rf-mb-6w">
              Vous pourrez ajouter et modifier vos lieux d&rsquo;activit&eacute; plus tard.
            </span>
          </div>
        </>
      }

    </>
  );
}

AjouterAutrePermanence.propTypes = {
  show: PropTypes.array,
  conseillerId: PropTypes.string,
  structureId: PropTypes.string,
  secondaireId: PropTypes.number,
  isUpdate: PropTypes.bool,
};

export default AjouterAutrePermanence;
