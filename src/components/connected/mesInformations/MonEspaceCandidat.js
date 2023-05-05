import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import codesPostaux from '../../../data/codesPostaux.json';

import Footer from '../../Footer';
import { informations } from '../../../actions';

function MonEspaceCandidat() {

  const dispatch = useDispatch();
  let cra = useSelector(state => state.cra);
  const [codePostalList, setCodePostalList] = useState([]);

  const erreur = null;
  const cpVille = null;

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
    dispatch(informations.updateCP(e.target.getAttribute('value')));
  };

  //Keyup to reload list with search filter
  const onKeyUp = () => {
    let input = document.getElementById('searchCP');
    dispatch(informations.searchInput(input.value?.length > 2));
    if (input.value?.length > 2) {
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

  const handleChange = () => {

  };

  const handleSubmit = () => {

  };

  return (
    <>
      <div className="mon-espace-candidat">
        <div className="fr-container">
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <h1 className="titre fr-mt-10w fr-mb-6w">Mon espace candidat</h1>
              <p className="paragraphe fr-mb-6w">
                Cette page vous permet de modifier vos informations de candidature et de vous d&eacute;clarer disponible afin de
                vous mettre en visibilit&eacute; des structures qui recrutent.
              </p>
            </div>

            <div className="fr-col-12">
              {/** Emplacement Disponibilité */}
              <hr className="fr-my-6w"/>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <h2 className="sous-titre fr-mb-6w">Ma disponibilit&eacute; g&eacute;ographique</h2>
              <div id="myDropdown" className={`dropdown-content2 ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
                <div className={`inputCP ${(cra?.searchCP === true || cra?.searchInput === true) ? 'show' : ''}`}>
                  <input
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

              <div className={`fr-input-group ${erreur ? 'fr-input-group--error' : 'fr-mb-5w'}`} style={{ width: '348px' }}>
                <label className="fr-label" htmlFor="nom">
                  Nom ou code postal <span className="important">*</span>
                </label>
                <input
                  className={`fr-input ${erreur ? 'fr-input--error' : ''}`}
                  aria-describedby="text-input-error-desc-error"
                  type="text"
                  id="nom"
                  name="nom"
                  value={cpVille}
                  onChange={handleChange}
                />
                {erreur &&
                  <p id="text-input-error-desc-error" className="fr-error-text">
                    {erreur}
                  </p>
                }
              </div>

              <div className={`fr-input-group ${erreur ? 'fr-input-group--error' : 'fr-mb-5w'}`}>
                Depuis ce lieu, pour une mission de conseiller num&eacute;rique,
                je suis pr&ecirc;t(e) &agrave; me d&eacute;placer &agrave; : <span className="important">*</span>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance5km" name="distance" value="false" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance5km">
                       5 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance10km" name="distance" value="true" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance10km">
                        10 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance15km" name="distance" value="false" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance15km">
                        15 km
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance20km" name="distance" value="true" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance20km">
                        20 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance40km" name="distance" value="false" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance40km">
                        40 km
                      </label>
                    </div>
                    <div className="fr-radio-group" style={{ width: '138px' }}>
                      <input type="radio" id="distance100km" name="distance" value="true" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distance100km">
                        100 km
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset className="fr-fieldset fr-fieldset--inline fr-my-3w">
                  <div className="fr-fieldset__content">
                    <div className="fr-radio-group">
                      <input type="radio" id="distanceFranceEntiere" name="distance" value="true" required="required"
                        defaultChecked={false} onClick={handleChange}/>
                      <label className={erreur ? 'fr-label invalid' : 'fr-label' } htmlFor="distanceFranceEntiere">
                        France enti&egrave;re
                      </label>
                    </div>
                  </div>
                </fieldset>
                { erreur &&
                  <p className="text-error fr-mb-n3w">{erreur}</p>
                }
              </div>

              <button className="form-button fr-btn fr-mt-3w fr-mb-4w" onClick={handleSubmit}>
                Enregistrer
              </button>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
              {/** Emplacement CV */}
            </div>

            <div className="fr-col-12">
              <hr/>
              {/** Emplacement PIX */}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
MonEspaceCandidat.propTypes = {

};

export default MonEspaceCandidat;
