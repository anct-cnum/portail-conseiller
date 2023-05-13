import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';
import codesPostaux from '../../../../data/codesPostaux.json';
import PropTypes from 'prop-types';

function SelectCP({ voirInformation }) {
  const [codePostalList, setCodePostalList] = useState([]);
  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  //Tri
  const tri = codesPostaux => {
    return codesPostaux.sort(function compare(a, b) {
      if (a.Nom_commune < b.Nom_commune) {
        return -1;
      }
      if (a.Nom_commune > b.Nom_commune) {
        return 1;
      }
      return 0;
    });
  };

  //Remove doublons if necessary
  const removeDuplicatesFromArray = arr => [...new Set(
    arr.map(el => JSON.stringify(el))
  )].map(e => JSON.parse(e));

  //filter array with search
  const filterArray = text => {
    return tri(removeDuplicatesFromArray(codesPostaux).filter(
      codePostal => String(codePostal.Code_postal).startsWith(text) || String(codePostal.Nom_commune.toLowerCase()).startsWith(text.toLowerCase())
    ));
  };

  //Select Option and set value
  const onClickOption = e => {
    dispatch(craActions.updateCP(e.target.getAttribute('value')));
  };

  //Keyup to reload list with search filter
  const onKeyUp = () => {
    let input = document.getElementById('searchCP');
    dispatch(craActions.searchInput(input.value?.length > 2));
    if (input.value?.length > 2) {
      let codesPostauxFiltered = filterArray(input.value);
      let options = [];
      codesPostauxFiltered.forEach(codePostal => options.push(
        <div key={`${codePostal.Code_postal} ${codePostal.Nom_commune}`}
          value={`${codePostal.Code_postal} ${codePostal.Code_Commune} ${codePostal.Nom_commune}`}
          onClick={onClickOption}>
          {codePostal.Code_postal} {codePostal.Nom_commune}
        </div>
      ));
      setCodePostalList(options);
    } else {
      setCodePostalList([]);
    }
  };

  //OnClick button
  const onClickButton = () => {
    dispatch(craActions.getSearchlist());
    setTimeout(() => {
      document.getElementById('searchCP')?.focus();
    }, 100);
  };

  //Focus input
  const focusInput = () => {
    document.getElementById('searchCP')?.focus();
  };

  return (
    <>
      {(!cra?.idPermanence && cra?.canal !== 'rattachement') &&
        <div id="dropdown" className={ `dropdown ${voirInformation ? 'force-width' : ''}`} onClick={() => {
          if (document.getElementById('buttonCP')) {
            onClickButton();
          } else {
            focusInput();
          }
        }}>
          {!cra?.searchCP && !cra?.searchInput &&
          <button id="buttonCP"
            onClick={onClickButton}
            className={`${cra?.cp === undefined ? 'buttonCP' : 'buttonCP-filled'} ${cra?.buttonCP ? ' show' : ''}`}>
            {cra?.cp === undefined ? 'Entrez le code postal ou la commune' : cra.cp.split(' ')[0] + ' ' + cra.cp.split(' ').splice(2).join(' ') }
            <div className={`${cra.cp ? 'hide' : 'show'}`}>Saisissez au moins 3 caract&egrave;res</div>
          </button>
          }
          <div id="myDropdown" className={`dropdown-content2 ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
            <div className={`inputCP ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
              <input
                onMouseMove={focusInput}
                autoComplete="off"
                type="text"
                id="searchCP"
                name="searchCP"
                className={`searchCP ${cra?.searchInput === true ? 'dropdown-expanded' : ''}`}
                style={cra?.searchCP === true && codePostalList?.length > 0 ? { borderRadius: '20px 20px 0 0' } : {}}
                onKeyUp={onKeyUp}
                autoFocus={true}/>
              <div>Saisissez au moins 3 caract&egrave;res</div>
            </div>
            <div className="scrollOptions2">{codePostalList}</div>
          </div>
        </div>
      }
    </>
  );

}

SelectCP.propTypes = {
  voirInformation: PropTypes.bool,
};

export default SelectCP;
