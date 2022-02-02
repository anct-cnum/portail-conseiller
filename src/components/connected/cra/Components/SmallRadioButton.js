import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';

function SmallRadioButton({ type, label, value, image, imageSelected, heightImage }) {
  const lieuxReorientation = [
    'ANTS',
    'Assistante sociale',
    'CAF',
    'CARSAT',
    'CCAS',
    'CEFS',
    'CIP',
    'CPAM',
    'DGFIP',
    'France Services',
    'Mairie',
    'Médiathèque',
    'Mission locale',
    'Pôle emploi',
    'Préfecture',
    'Sous-préfecture',
    'Service de police',
    'Gendarmerie',
    'Tiers-lieu / fablab'
  ];
  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);

  const [valeurInput, setValeurInput] = useState('');
  const autreAccompagnement = ['atelier', 'individuel'];

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
        let accompagnement = !autreAccompagnement.includes(preAccompagnement) ? 'redirection' : e.target.getAttribute('value');
        const organismeRedirection = lieuxReorientation.find(v => v === e.target.getAttribute('value')) ? e.target.getAttribute('value') : label;
        const organismeValue = lieuxReorientation.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
        const organisme = organismeValue ?? valeurInput;
        if (organisme !== null) {
          setSelectOption(organisme);
          if (openSelectRedirection) {
            setOpenSelectRedirection(false);
          } else {
            setOpenSelectRedirection(true);
          }
        }
        //Optional case so deselection is possible
        if (e.target.getAttribute('value') === controlSelected) {
          dispatch(craActions.updateAccompagnement(null, organisme));
        } else {
          dispatch(craActions.updateAccompagnement(accompagnement, autreAccompagnement.includes(accompagnement) ? null : organisme));
        }
        break;
      default:
        break;
    }
  };

  const affichageLabel = () => {
    if (value === 'redirection' && controlSelected === value && selectOption !== '') {
      return selectOption;
    }
    return label;
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={value}>
      <button id="radioRattachement"
        className={`radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}
        ${value === 'redirection' && controlSelected === value && openSelectRedirection ? `styleButtonRedirection` : ``}`}
        style={value === 'redirection' && controlSelected === value && openSelectRedirection ?
          { height: '73px', borderRadius: '0 0 20px 20px', position: 'relative', border: 'solid 1px #5398FF', maxHeight: '250px' } : { height: '73px' }}
        value={value}>
        { value === 'redirection' && openSelectRedirection &&
        <SelectAccompagnement value={value} controlSelected={controlSelected} setValeurInput={setValeurInput}/>
        }
        <div value={value}>
          <img
            src={controlSelected !== value ? image : imageSelected}
            alt={label} height={heightImage}
            style={{ marginTop: '0.2rem', marginRight: '14px' }}
            value={value}/>
          <span
            className={`rf-label labelSmallRadioCustom ${controlSelected === value ? 'radioRattachement-selected' : ''}`}
            style={{ display: 'inline-block', verticalAlign: 'bottom', lineHeight: '36px' }}
            value={value}>
            {affichageLabel()}
          </span>
        </div>
      </button>
    </div>
  );
}

SmallRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
};

export default SmallRadioButton;
