import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';
import { lieuxReorientation } from '../utils/ArrayLieuxReorientation.json';

function BigRadioButtonSlectAccompagnement({ type, label, value, image, imageSelected, heightImage, classDiv }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);
  const [champAutre, setChampAutre] = useState(null);
  const [champAutreActif, setChampAutreActif] = useState(false);

  const onClickRadio = e => {
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
      setChampAutreActif(false);
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
      <button
        id="radioRattachement"
        className={`radioRattachement ${controlSelected === value ? 'radioRattachement-selected' : ''}
        ${cssOpenSelectRedirection() ? `styleButtonRedirection` : ``}`}
        style={cssOpenSelectRedirection() ? { height: '144px', borderRadius: '0 0 20px 20px', border: 'solid 1px #5398FF' } : { height: '144px' }}
        value={value}
        onClick={() => setOpenSelectRedirection(true)}>
        {openSelectRedirection &&
        <SelectAccompagnement value={value} controlSelected={controlSelected}
          setChampAutre={setChampAutre} champAutreActif={champAutreActif}
          setChampAutreActif={setChampAutreActif} setOpenSelectRedirection={setOpenSelectRedirection} setSelectOption={setSelectOption} />
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
            {affichageLabel()}
          </span>
        </div>
      </button>
    </div>
  );
}

BigRadioButtonSlectAccompagnement.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButtonSlectAccompagnement;
