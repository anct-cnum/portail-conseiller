import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';
import codesPostaux from '../../../../data/codesPostaux.json';

function SelectCP() {

  const [codePostalList, setCodePostalList] = useState([]);
  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);

  //Remove doublons if necessary
  const removeDuplicatesFromArray = arr => [...new Set(
    arr.map(el => JSON.stringify(el))
  )].map(e => JSON.parse(e));

  //filter array with search
  const filterArray = text => {
    return removeDuplicatesFromArray(codesPostaux).filter(
      codePostal => String(codePostal.Code_postal).startsWith(text) || String(codePostal.Nom_commune.toLowerCase()).startsWith(text.toLowerCase())
    );
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
      options = options.slice(0, 6); // print only 6 elements by default
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
    document.getElementById('searchCP').select();
  };

  return (
    <div className="dropdown">
      <button id="buttonCP"
        onClick={onClickButton}
        onMouseMove={focusInput}
        className={`${cra?.cp === undefined ? 'buttonCP' : 'buttonCP-filled'}`}>
        {cra?.cp === undefined ? 'Entrez le code postal ou la commune...' : cra.cp}
      </button>
      <div id="myDropdown"
        className={`dropdown-content ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
        <input
          autoComplete="off"
          type="text"
          id="searchCP"
          name="searchCP"
          className={`searchCP ${cra?.searchInput === true ? 'dropdown-expanded' : ''}`}
          placeholder="Saisissez au moins 3 caractères"
          onKeyUp={onKeyUp}/>
        {codePostalList}
      </div>
    </div>
  );

}

export default SelectCP;
