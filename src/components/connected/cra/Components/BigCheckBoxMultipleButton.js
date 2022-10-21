import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';

function BigCheckboxMultipleButton({ type, label, value, image, imageSelected, heightImage, baseline }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  let controlSelected = getCraValue(type);

  const sousThemes = [
      {theme: 'sante', value: 'espace-sante', label: 'Mon espace santé'},
  ];
  const array = [
    ...sousThemes.map(test => test.value),
    null
  ];

  const clickSousTheme = async e => {
    const valueOnClick = e.target.getAttribute('value');
    let sousthemesList = cra?.sousThemes ? cra?.sousThemes : [];
    if (!sousthemesList.find(name => name[value])) {
      sousthemesList.push({[value]: [valueOnClick]});
    } else {
      sousthemesList = sousthemesList.filter((e, key) => {
          let nameSousTheme = sousthemesList[key][value];
          if (String(Object.keys(e)) === String(value)) {
              if (sousthemesList && !nameSousTheme.includes(valueOnClick)) {
                sousthemesList[key][value] = [...nameSousTheme, valueOnClick];
              } else {
                sousthemesList[key][value] = nameSousTheme.filter(i => i !== valueOnClick);
                }
              }
            return sousthemesList;
          });
        }
        sousthemesList = sousthemesList.filter(obj => JSON.stringify(obj) !== JSON.stringify({ [value]: [] }));
        await dispatch(craActions.updateMultipleThemes(sousthemesList));
  };

  const onClickCheckbox = e => {
    switch (type) {
      case 'themes':
        const valueOnClick = e.target.getAttribute('value');
        let newthemesList = cra?.themes ? cra?.themes : [];
        let sousthemesList = cra?.sousThemes ? cra?.sousThemes : [];

        if (!newthemesList.includes(valueOnClick) && !array.includes(valueOnClick)) {
          newthemesList.push(valueOnClick);
        } else {
          newthemesList = newthemesList.filter(theme => theme !== valueOnClick);
          if (!newthemesList.includes(value)) {
            sousthemesList = sousthemesList.filter(obj => !obj[value]);
            dispatch(craActions.updateMultipleThemes(sousthemesList));
          }
        }
        dispatch(craActions.updateThemes(newthemesList));
        break;
      default:
        break;
    }
  };

  return (
    <div className="checkboxButton" onClick={onClickCheckbox} value={value}>
      <button id="checkboxRattachement"
        className={`checkboxRattachement ${controlSelected?.includes(value) ? 'checkboxRattachement-selected-sante' : ''}`}
        style={{ height: '108px' }}
        value={value}>
        <div value={value} style={{ display: 'flex' }}>
          { !controlSelected?.includes(value) &&
            <>
              <img
                src={!controlSelected?.includes(value) ? image : imageSelected}
                alt={label} height={heightImage}
                style={{ margin: '24px' }}
                value={value}/>
              <span
                className={`fr-label labelCheckboxCustom ${controlSelected?.includes(value) ? 'checkboxRattachement-selected-sante' : ''}`}
                value={value}>
                {label}
                {baseline &&
                  <>
                    <br/>
                    <span value={value} className="baseline">{baseline}</span>
                  </>
                }
              </span>
            </>
          }
          { controlSelected?.includes(value) &&
            <div>
              <label className="fr-label">Optionnellement, précisez&nbsp;:&nbsp;&nbsp;</label>
              <br/>
              <div className="fr-checkbox-group">
              {sousThemes.filter(t => t.theme === value).map((sous, key) => {
                  const test = cra?.sousThemes ? cra?.sousThemes.find(s => s[value]) : undefined;
                  const checked = test ? test[value]?.includes(sous.value) : false;
                return <div key={key}>
                <input type="checkbox" id={sous.value} name={sous.value} value={sous.value} defaultChecked={checked} onClick={clickSousTheme}/>
                <label className="fr-label" htmlFor={sous.value}>{sous.label}</label>
              </div>;
              }
            )}
              </div>
            </div>
          }
        </div>
      </button>
    </div>
  );
}

BigCheckboxMultipleButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  baseline: PropTypes.string,
};

export default BigCheckboxMultipleButton;
