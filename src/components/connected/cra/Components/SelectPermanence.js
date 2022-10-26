import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function SelectPermanence() {
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);
  let cra = useSelector(state => state.cra);

  return (
    <div id="buttonPermanences" className={`dropdown ${cra?.buttonPermanences ? 'show' : ''}`}>
      <div className="listButtonPermanence">
        {listPermanences && listPermanences?.map((permanence, idx) => {
          return (
            <button className="buttonPermanence" key={idx}>
              <span className="logoRattachementActif"></span>
              <span style={{display: 'inline-block'}}>
                <div className="nomEnseigne">{permanence.nomEnseigne.toUpperCase()}</div>
                <div className="adresse">
                  {permanence.adresse.numeroRue !== 'null' ? permanence.adresse.numeroRue : ''}
                  {
                    ' ' + permanence.adresse.rue.toUpperCase() + ' ' +
                    permanence.adresse.codePostal + ' ' +
                    permanence.adresse.ville.toUpperCase()
                  }
                </div>
              </span>
            </button>
          );
        })}
      </div>
      <div className="lienPermanence">
        <Link to="/mon-nouveau-lieu-activite" >Ajouter un nouveau lieu d&rsquo;activit&eacute;</Link>
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
