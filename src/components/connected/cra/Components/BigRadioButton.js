import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import SelectAccompagnement from './SelectAccompagnement';

function BigRadioButton({ type, label, value, image, imageSelected, heightImage, classDiv }) {
  const [array, _] = useState([
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
  ]);
  const dispatch = useDispatch();
  let controlSelected = getCraValue(type);
  const [selectOption, setSelectOption] = useState(label);
  const [openSelectRedirection, setOpenSelectRedirection] = useState(false);

  const [champAutre, setChampAutre] = useState('');
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
        const organismeRedirection = array.find(v => v === e.target.getAttribute('value')) ? e.target.getAttribute('value') : label;
        const organismeValue = array.includes(e.target.getAttribute('value')) ? organismeRedirection : null;
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
  const cssOpenSelectRedirection = () => {
    if (value === 'redirection' && controlSelected === value && openSelectRedirection) {
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
        { value === 'redirection' && openSelectRedirection &&
        <SelectAccompagnement value={value} controlSelected={controlSelected} setChampAutre={setChampAutre}/>
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
