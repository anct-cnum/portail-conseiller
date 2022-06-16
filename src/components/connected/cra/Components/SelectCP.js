import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';
import codesPostaux from '../../../../data/codesPostaux.json';

function SelectCP() {
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
    dispatch(craActions.searchInput(input.value.length > 2));
    if (input.value.length > 2) {
      let codesPostauxFiltered = filterArray(input.value);
      let options = [];
      codesPostauxFiltered.forEach(codePostal => options.push(
        <div key={`${codePostal.Code_postal} ${codePostal.Nom_commune}`}
          value={`${codePostal.Code_postal} ${codePostal.Nom_commune}`}
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
  };

  //Focus input
  const focusInput = () => {
    document.getElementById('searchCP').focus();
  };

  return (
    <div className="dropdown" style={cra?.searchCP === true ? { marginBottom: '104px' } : {}}>
      {!cra?.searchCP && !cra?.searchInput &&
      <button id="buttonCP"
        onClick={onClickButton}
        className={`${cra?.cp === undefined ? 'buttonCP' : 'buttonCP-filled'}`}>
        {cra?.cp === undefined ? 'Entrez le code postal ou la commune...' : cra.cp}
      </button>
      }
      <div id="myDropdown"
        className={`dropdown-content ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}
        style={cra?.searchCP === true && codePostalList.length > 0 ? { border: '1px solid white' } : {}}>
        <input
          onMouseMove={focusInput}
          autoComplete="off"
          type="text"
          id="searchCP"
          name="searchCP"
          className={`searchCP ${cra?.searchInput === true ? 'dropdown-expanded' : ''}`}
          style={cra?.searchCP === true && codePostalList.length > 0 ? { borderRadius: '20px 20px 0 0' } : {}}
          placeholder="Saisissez au moins 3 caract&egrave;res"
          onKeyUp={onKeyUp}
          autoFocus={true}/>
        <div className="scrollOptions">{codePostalList}</div>
      </div>
    </div>
  );

}

export default SelectCP;
