import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';

function BigRadioButton({ type, label, value, image, imageSelected, heightImage, classDiv }) {
  const [array, _] = useState([
    'ANTS', 'Assistante sociale', 'CAF', 'CARSAT', 'CCAS', 'CEFS', 'CIP',
    'CPAM',
    'DGFIP',
    'France Services',
    'Mairie',
    'Médiathèque',
    'Mission locale',
    'Pôle emploi',
    'Préfecture',
    'Sous-préfecture',
    'Service de police', 'gendarmerie',
    'Tiers-lieu / fablab'
  ]);
  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [option, setOption] = useState(label);
  const [openList, setOpenList] = useState(false);

  const onClickRadio = e => {
    let accompagnement = array.includes(e.target.getAttribute('value')) ? 'redirection' : e.target.getAttribute('value');
    switch (type) {
      case 'canal':
        dispatch(craActions.updateCanal(accompagnement));
        break;
      case 'activite':
        dispatch(craActions.updateActivite(accompagnement));
        break;
      case 'accompagnement':
        const organismeRedirection = array.find(v => v === e.target.getAttribute('value')) ?? label;
        const organisme = array.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
        if (organisme !== null) {
          setOption(organisme);
          setOpenList(false);
        }
        //Optional case so deselection is possible
        if (e.target.getAttribute('value') === controlSelected) {
          dispatch(craActions.updateAccompagnement(null, organisme));
        } else {
          dispatch(craActions.updateAccompagnement(accompagnement, organisme));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={value}>
      <button
        id="radioRattachement"
        className={`radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}
        ${value === 'redirection' && controlSelected === value && openList ? `styleButtonRedirection` : ``}`}
        style={value === 'redirection' && controlSelected === value && openList ?
          { height: '144px', borderRadius: '0 0 20px 20px', position: 'relative', border: 'solid 1px #5398FF', maxHeight: '250px' } : { height: '144px' }}
        value={value}
        onClick={() => setOpenList(true)}>
        { value === 'redirection' && openList &&
        <SelectAccompagnement value={value} controlSelected={controlSelected} />
        }
        <div value={value}>
          <div className={classDiv !== undefined ? classDiv : '' } value={value}>
            <img
              src={controlSelected !== value ? image : imageSelected}
              alt={label}
              height={heightImage}
              value={value}/>
          </div>
          <span
            className={`rf-label labelBigRadioCustom ${controlSelected === value ? 'radioRattachement-selected' : ''}`}
            value={value}>
            {value === 'redirection' && controlSelected === value ? option : label}
          </span>
        </div>
      </button>
    </div>
  );
}

BigRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButton;
