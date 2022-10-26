import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SelectPermanence() {
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);
  let cra = useSelector(state => state.cra);

console.log(listPermanences);

  return (
    <div id="buttonPermanences" className={`dropdown ${cra?.buttonPermanences ? 'show' : ''}`}>
      {listPermanences && listPermanences?.map((permanence, idx) => {
        return (
          <button className="buttonPermanence" key={idx}>
            <div className="nomEnseigne">{permanence.nomEnseigne}</div>
            <div className="adresse">
              {
                permanence.adresse.numeroRue + ' ' +
                permanence.adresse.rue + ' ' +
                permanence.adresse.codePostal + ' ' +
                permanence.adresse.ville
              }
            </div>
          </button>
        );
      })}
      <div>
        <Link to="/mon-nouveau-lieu-activite">Ajouter un nouveau lieu d&rsquo;activit&eacute;</Link>
      </div>
      {/*
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
            style={cra?.searchCP === true && listPermanences.length > 0 ? { borderRadius: '20px 20px 0 0' } : {}}
            autoFocus={true}/>
          <div className={`${cra?.buttonCP ? 'show' : 'hide'}`}>Saisissez au moins 3 caract&egrave;res</div>
        </div>
        <div className="scrollOptions">{listPermanences}</div>
      </div> */}
    </div>
  );

}

export default SelectPermanence;
