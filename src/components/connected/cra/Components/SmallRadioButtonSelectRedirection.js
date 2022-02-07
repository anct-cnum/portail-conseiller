import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';
import { lieuxReorientation } from '../utils/ArrayLieuxReorientation.json';

function SmallRadioButtonSelectRedirection({ type, label, value, image, imageSelected, heightImage }) {
  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);

  const [champAutre, setChampAutre] = useState('');
  const autreAccompagnement = ['atelier', 'individuel'];

  const onClickRadio = e => {
    const preAccompagnement = e.target.getAttribute('value') === null ? 'redirection' : e.target.getAttribute('value');
    let accompagnement = !autreAccompagnement.includes(preAccompagnement) ? 'redirection' : e.target.getAttribute('value');
    const organismeRedirection = lieuxReorientation.find(v => v === e.target.getAttribute('value')) ? e.target.getAttribute('value') : label;
    const organismeValue = lieuxReorientation.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
    const organisme = organismeValue ?? champAutre;
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
      setSelectOption('');
      dispatch(craActions.updateAccompagnement(null, organisme));
    } else {
      dispatch(craActions.updateAccompagnement(accompagnement, autreAccompagnement.includes(accompagnement) ? null : organisme));
    }
  };

  const affichageLabel = () => {
    if (value === 'redirection' && controlSelected === value && selectOption !== '') {
      return selectOption;
    }
    return label;
  };

  const cssOpenSelectRedirection = () => {
    if (value === 'redirection' && controlSelected === value && openSelectRedirection) {
      return true;
    }
    return false;
  };

  return (
    <div className="radioButton" onClick={onClickRadio} value={value}>
      <button id="radioRattachement"
        className={`radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}
        ${value === 'redirection' && controlSelected === value && openSelectRedirection ? `styleButtonRedirection` : ``}`}
        style={cssOpenSelectRedirection() ? { height: '73px', borderRadius: '0 0 20px 20px', border: 'solid 1px #5398FF' } : { height: '73px' }}
        value={value}>
        { value === 'redirection' && openSelectRedirection &&
        <SelectAccompagnement value={value} controlSelected={controlSelected} setChampAutre={setChampAutre}/>
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

SmallRadioButtonSelectRedirection.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
};

export default SmallRadioButtonSelectRedirection;
