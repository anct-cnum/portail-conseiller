import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import { getCraValue } from '../utils/CraFunctions';
import sousThemes from '../../../../data/sousThemes.json';

function BigCheckboxMultipleButton({ type, label, value, image, imageSelected, baseline }) {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  let controlSelected = getCraValue(type);

  const arrayValueSousTheme = [
    ...sousThemes.map(test => test.value),
    null
  ];
console.log(arrayValueSousTheme);
  const clickSousTheme = async e => {
    const valueOnClick = e.target.getAttribute('value');
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
        const valueOnClick = e.target.getAttribute('value');
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

  const checkboxHtml = (values, texts) => {
    let contents;
    //update
    // const matchingTheme = cra?.sousThemes ? cra?.sousThemes.find(s => s[value]) : undefined;
    // const checked = matchingTheme ? matchingTheme[value]?.includes(sous.value) : false;
    console.log(value);
    console.log(values);
    console.log(texts);
    for (let i = 0; i >= values.length; i++) {
      const checked = false;
      contents =
        <>
          <input type="checkbox" id={values[i]} name={values[i]} value={values[i]} defaultChecked={checked} onClick={clickSousTheme}/>
          <label className="fr-label fr-text--sm" htmlFor={values[i]}>{texts[i]}</label>
        </>;
    }
    return contents;
  };

  const inputCheckbox = val => {
    return <input type="checkbox" id={val} name={val} value={val} onClick={clickSousTheme}/>;
  };

  console.log(sousThemes);
  return (
    <div className="checkboxButton" onClick={onClickCheckbox} value={value}>
      <div className="gradient-box">
        <button id="checkboxRattachement"
          className={`checkboxRattachement2 ${controlSelected?.includes(value) ? 'checkboxRattachement2-selected' : ''}`}
          style={{ height: '104px' }}
          value={value}>
          <div value={value} style={{ display: `${controlSelected?.includes(value) ? '' : 'flex'}` }}>
            { !controlSelected?.includes(value) &&
              <>
                <span className={`imageTheme ${!controlSelected?.includes(value) ? image : imageSelected}`}></span>
                <span
                  className={`fr-label labelCheckboxCustom ${controlSelected?.includes(value) ? 'checkboxRattachement-selected' : ''}`}
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
              <div className="checkbox-selected fr-mt-3w fr-mb-3w">
                <label className="fr-label fr-text--sm" style={{ color: 'black', margin: 'auto' }}>Optionnellement, pr&eacute;cisez&nbsp;:</label>
                <div className="fr-checkbox-group">
                  { sousThemes.filter(t => t.theme === value).map((sous, key) => {
                    return <div key={key} style={{ margin: '-0.5rem' }}>

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
