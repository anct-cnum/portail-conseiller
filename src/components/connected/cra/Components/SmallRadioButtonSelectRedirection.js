import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';
import { lieuxReorientation } from '../../../../data/LieuxRedirection';

function SmallRadioButtonSelectRedirection({ type, label, value, image, imageSelected, heightImage }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);
  const [champAutre, setChampAutre] = useState(null);
  const [champAutreActif, setChampAutreActif] = useState(false);

  const onClickRadio = e => {
    const organismeRedirection = lieuxReorientation.find(v => v === e.target.getAttribute('value')) ? e.target.getAttribute('value') : label;
    const organismeValue = lieuxReorientation.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
    let organisme = organismeValue ?? champAutre;
    if (organisme !== null) {
      setSelectOption(organisme);
      if (openSelectRedirection) {
        setOpenSelectRedirection(false);
      } else {
        setOpenSelectRedirection(true);
      }
      setChampAutreActif(false);
      organisme = organisme = organisme.toLowerCase().trim();
    } else {
      setOpenSelectRedirection(true);
    }
    //Optional case so deselection is possible
    if ((e.target.getAttribute('value') === controlSelected && champAutre === null && e.target.getAttribute('value') === null) ||
    (e.target.getAttribute('value') === controlSelected && champAutre !== null) ||
    (e.target.getAttribute('value') === controlSelected && lieuxReorientation.find(v => v === selectOption))) {
      setSelectOption('');
      setChampAutre(null);
      dispatch(craActions.updateAccompagnement(null, organisme));
    } else {
      dispatch(craActions.updateAccompagnement(value, organisme));
      if (e.target.getAttribute('value') === null) {
        setOpenSelectRedirection(false);
      }
    }
  };
  useEffect(() => {
    if (value === controlSelected) {
      const organisme = selectOption.toLowerCase().trim();
      dispatch(craActions.updateAccompagnement(value, organisme));
    }
  }, [selectOption]);

  const affichageLabel = () => {
    if (controlSelected === value && selectOption !== '') {
      return selectOption;
    }
    return label;
  };
  const cssOpenSelectRedirection = () => {
    if (controlSelected === value && openSelectRedirection) {
      return true;
    }
    return false;
  };
  return (
    <div className="radioButton" onClick={onClickRadio} value={value}>
      <button id="radioRattachement"
        className={`radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}
        ${cssOpenSelectRedirection() ? `styleButtonRedirection` : ``}`}
        style={cssOpenSelectRedirection() ? { height: '73px', borderRadius: '0 0 20px 20px', border: 'solid 1px #5398FF' } : { height: '73px' }}
        value={value}>
        {openSelectRedirection &&
        <SelectAccompagnement value={value} controlSelected={controlSelected}
          setChampAutre={setChampAutre} champAutreActif={champAutreActif}
          setChampAutreActif={setChampAutreActif} setOpenSelectRedirection={setOpenSelectRedirection} setSelectOption={setSelectOption} />
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
