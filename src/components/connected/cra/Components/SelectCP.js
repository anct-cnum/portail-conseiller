import React, { useState } from 'react';
import codesPostaux from '../../../../data/codesPostaux.json';

function SelectCP() {

  const [codePostalList, setCodePostalList] = useState([]);

  //Remove doublons if necessary
  const removeDuplicatesFromArray = arr => [...new Set(
    arr.map(el => JSON.stringify(el))
  )].map(e => JSON.parse(e));

  //filter array with search
  const filterArray = text => {
    return removeDuplicatesFromArray(codesPostaux).filter(
      codePostal => String(codePostal.Code_postal).startsWith(text) || String(codePostal.Nom_Commune).startsWith(text)
    );
  };

  //Select Option and set value
  const onClickOption = e => {
    document.getElementById('buttonCP').style.borderColor = 'white';
    document.getElementById('buttonCP').style.backgroundColor = 'white';
    document.getElementById('buttonCP').style.color = 'black';
    document.getElementById('myDropdown').classList.toggle('show');
    document.getElementById('buttonCP').textContent = e.target.value;
    document.getElementById('buttonCP').value = e.target.value;
  };

  //Keyup to reload list with search filter
  const onKeyUp = () => {
    document.getElementById('buttonCP').style.borderColor = '#2B8BF7';
    let input = document.getElementById('searchCP');
    if (input.value.length <= 2) {
      document.getElementById('searchCP').style.borderRadius = '0 0 20px 20px';
    } else {
      document.getElementById('searchCP').style.borderRadius = 0;
    }
    if (input.value.length > 2) {
      let codesPostauxFiltered = filterArray(input.value);
      let options = [];
      codesPostauxFiltered.forEach(codePostal => options.push(
        <option key={`${codePostal.Code_postal} ${codePostal.Nom_commune}`}
          value={`${codePostal.Code_postal} ${codePostal.Nom_commune}`}
          onClick={onClickOption}>
          {codePostal.Code_postal} {codePostal.Nom_commune}
        </option>
      ));
      options = options.slice(0, 5); // print only 5 elements by default
      setCodePostalList(options);
    } else {
      setCodePostalList([]);
    }
  };

  //OnClick button
  const onClickButton = () => {
    document.getElementById('myDropdown').classList.toggle('show');
  };

  //OnClick input
  const onClickInput = () => {
    document.getElementById('buttonCP').style.borderColor = '#2B8BF7';
  };

  return (
    <div className="dropdown">
      <button id="buttonCP" onClick={onClickButton} className="buttonCP">Entrez le code postal...</button>
      <div id="myDropdown" className="dropdown-content">
        <input
          autoComplete="off"
          type="text"
          id="searchCP"
          name="searchCP"
          className="searchCP"
          placeholder="Saisissez au moins 2 caractères"
          onKeyUp={onKeyUp}
          onClick={onClickInput}/>
        {codePostalList}
      </div>
    </div>
  );

}

export default SelectCP;
