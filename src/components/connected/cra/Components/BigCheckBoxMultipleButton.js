import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import correspondancesSousThemes from '../../../../data/sousThemes.json';
import CheckboxButton from './CheckboxButton';

function BigCheckboxMultipleButton({ type, label, value, image, imageSelected, baseline }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  const arrayValueSousTheme = [
    ...correspondancesSousThemes.map(test => test.values),
    null
  ];

  const clickSousTheme = async e => {
    const valueOnClick = e.target.getAttribute('data-sous-theme');
    let sousthemesList = cra?.sousThemes ? cra?.sousThemes : [];
    if (!sousthemesList.find(name => name[value])) {
      sousthemesList.push({ [value]: [valueOnClick] });
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
        const valueOnClick = e.target.getAttribute('data-theme');
        let newthemesList = cra?.themes ? cra?.themes : [];
        let sousthemesList = cra?.sousThemes ? cra?.sousThemes : [];
        if (!newthemesList.includes(valueOnClick) && !arrayValueSousTheme.includes(valueOnClick)) {
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
    <div className="checkboxButton" onClick={onClickCheckbox} data-theme={value}>
      <div className="gradient-box">
        <button id="checkboxRattachement"
          className={`checkboxRattachement2 ${controlSelected?.includes(value) ? 'checkboxRattachement2-selected' : ''}`}
          style={{ height: '104px' }}
          data-theme={value}>
          <div data-theme={value} style={{ display: `${controlSelected?.includes(value) ? '' : 'flex'}` }}>
            { !controlSelected?.includes(value) &&
              <>
                <span data-theme={value} className={`imageTheme ${!controlSelected?.includes(value) ? image : imageSelected}`}></span>
                <span
                  className={`fr-label labelCheckboxCustom ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
                  data-theme={value}>
                  {label}
                  {baseline &&
                    <>
                      <br/>
                      <span data-theme={value} className="baseline">{baseline}</span>
                    </>
                  }
                </span>
              </>
            }
            { controlSelected?.includes(value) &&
              <div className="checkbox-selected multi-select fr-mt-3w fr-mb-3w">
                <label className="fr-label fr-text--sm" style={{ color: 'black', margin: 'auto' }}>
                  Optionnellement, pr&eacute;cisez&nbsp;:
                </label>
                <div className="fr-fieldset fr-fieldset--inline">
                  { correspondancesSousThemes.filter(t => t.theme === value).map((sous, key) => {
                    let st = [];
                    cra?.sousThemes?.forEach(sousTheme => {
                      if (sousTheme[value]) {
                        st = sousTheme;
                      }
                    });
                    return <div key={key} className="fr-checkbox-group">
                      <CheckboxButton values= {sous.values} labels={sous.labels} clickSousTheme={clickSousTheme}
                        craSousThemes={st[value] ?? []} />
                    </div>;
                  }
                  )}
                </div>
              </div>
            }
          </div>
        </button>
      </div>
    </div>
  );
}

BigCheckboxMultipleButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  baseline: PropTypes.string,
};

export default BigCheckboxMultipleButton;
