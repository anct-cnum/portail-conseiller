import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue, changeToMinusculeWithTrim } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';
import { lieuxReorientation } from '../../../../data/LieuxRedirection';

function BigRadioButtonSelectRedirection({ type, label, value, image, imageSelected, heightImage, classDiv }) {

  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);
  const [champAutre, setChampAutre] = useState(null);
  const [champAutreActif, setChampAutreActif] = useState(false);

  const selectButton = (valueClick, organisme) => {
    if ((valueClick === controlSelected && champAutre === null && valueClick === null) ||
    (valueClick === controlSelected && champAutre !== null) ||
    (valueClick === controlSelected && lieuxReorientation.find(v => v === selectOption))) {
      setSelectOption(label);
      setChampAutre(null);
      dispatch(craActions.updateAccompagnement(null, organisme));
    } else {
      dispatch(craActions.updateAccompagnement(value, organisme));
      if (valueClick === null) {
        setOpenSelectRedirection(false);
      }
    }
  };

  const onClickRadio = e => {
    const valueClick = e.target.getAttribute('value');
    const organismeRedirection = lieuxReorientation.find(v => v === valueClick) ? valueClick : label;
    const organismeValue = lieuxReorientation.includes(valueClick) ? organismeRedirection : null;
    let organisme = organismeValue ?? champAutre;
    if (organisme !== null) {
      setSelectOption(organisme);
      setOpenSelectRedirection(!openSelectRedirection);
      setChampAutreActif(false);
      organisme = changeToMinusculeWithTrim(organisme);
    }
    //Optional case so deselection is possible
    selectButton(valueClick, organisme);
  };

  useEffect(() => {
    // C'est pour récupéré la valeur de la selection (assuré que la valeur autre sois récupé à temps)
    if (value === controlSelected) {
      const organisme = selectOption === null ? selectOption : changeToMinusculeWithTrim(selectOption);
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
    return controlSelected === value && openSelectRedirection;
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

BigRadioButtonSelectRedirection.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButtonSelectRedirection;
