import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '.././../../../actions';
import codesPostaux from '../../../../data/codesPostaux.json';

function SelectPermanence() {
  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);
console.log(listPermanences);
  //Tri
  const tri = permanences => {
    return permanences.sort(function compare(a, b) {
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
    const value = e.target.getAttribute('value');
    dispatch(craActions.updateCP(value));
  };

  //OnClick button
  const onClickButton = () => {
    dispatch(craActions.getSearchlist());
    setTimeout(() => {
      document.getElementById('searchCP').focus();
    }, 100);
  };

  //Focus input
  const focusInput = () => {
    document.getElementById('searchCP').focus();
  };

  return (
    <div className="dropdown">
      {!cra?.searchCP && !cra?.searchInput &&
      <button id="buttonCP"
        onClick={onClickButton}
        className={`${cra?.cp === undefined ? 'buttonCP' : 'buttonCP-filled'} ${cra?.buttonCP ? ' show' : ''}`}>
        {cra?.cp === undefined ? 'Entrez le code postal ou la commune' : cra.cp}
        <div>Saisissez au moins 3 caract&egrave;res</div>
      </button>
      }
      <div id="myDropdown" className={`dropdown-content ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
        <div className={`inputCP ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
          <input
            onMouseMove={focusInput}
            autoComplete="off"
            type="text"
            id="searchCP"
            name="searchCP"
            className={`searchCP ${cra?.searchInput === true ? 'dropdown-expanded' : ''}`}
            style={cra?.searchCP === true && codePostalList.length > 0 ? { borderRadius: '20px 20px 0 0' } : {}}
            onKeyUp={onKeyUp}
            autoFocus={true}/>
          <div className={`${cra?.buttonCP ? 'show' : 'hide'}`}>Saisissez au moins 3 caract&egrave;res</div>
        </div>
        <div className="scrollOptions">{codePostalList}</div>
      </div>
    </div>
  );

}

export default SelectPermanence;
