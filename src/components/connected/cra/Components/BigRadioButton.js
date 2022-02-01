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

  const [valeurInput, setValeurInput] = useState('');
  const [array2, __] = useState(['atelier', 'individuel']);

  const onClickRadio = e => {
    switch (type) {
      case 'canal':
        dispatch(craActions.updateCanal(e.target.getAttribute('value')));
        break;
      case 'activite':
        dispatch(craActions.updateActivite(e.target.getAttribute('value')));
        break;
      case 'accompagnement':
        const preAccompagnement = e.target.getAttribute('value') === null ? 'redirection' : e.target.getAttribute('value');
        let accompagnement = !array2.includes(preAccompagnement) ? 'redirection' : e.target.getAttribute('value');
        const organismeRedirection = array.find(v => v === e.target.getAttribute('value')) ? e.target.getAttribute('value') : label;
        const organismeValue = array.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
        console.log('organismeValue:', organismeValue);
        const organisme = organismeValue ?? valeurInput;
        if (organisme !== null) {
          setOption(organisme);
          if (openList) {
            setOpenList(false);
          } else {
            setOpenList(true);
          }
        }
        //Optional case so deselection is possible
        if (e.target.getAttribute('value') === controlSelected) {
          dispatch(craActions.updateAccompagnement(null, organisme));
        } else {
          dispatch(craActions.updateAccompagnement(accompagnement, array2.includes(accompagnement) ? null : organisme));
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
        <SelectAccompagnement value={value} controlSelected={controlSelected} setValeurInput={setValeurInput}/>
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
            {value === 'redirection' && controlSelected === value && option !== '' ? option : label}
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
