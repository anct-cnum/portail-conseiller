import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

function FormulaireInfosPersonnelles() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  function calcAge(birthDate) {
    const now = dayjs();
    const yearDiff = now.diff(birthDate, 'years');

    return yearDiff;
  }
  return (
    <>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="prenom">
          Pr&eacute;nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="prenom"
          name="prenom"
          disabled
          value={conseiller?.prenom}
        />
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="nom">
          Nom
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="nom"
          name="nom"
          disabled
          value={conseiller?.nom}
        />
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="email">
          Adresse mail secondaire
          <span className="rf-hint-text desc-input">Celle-ci vous a servi pour candidater au dispositif Conseiller numérique France services.</span>
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="email"
          id="email"
          disabled
          name="email"
          value={conseiller?.email}
        />
      </div>
      <div className="rf-input-group rf-mb-5w">
        <label className="rf-label" htmlFor="prenom">
          &Acirc;ge
        </label>
        <input
          className="rf-input"
          aria-describedby="text-input-error-desc-error"
          type="text"
          id="prenom"
          disabled
          name="prenom"
          value={calcAge(conseiller?.dateDeNaissance)}
        />
      </div>
      <div className="rf-form-group">
        <fieldset className="rf-fieldset rf-fieldset--inline" disabled="disabled">
          <legend className="rf-fieldset__legend rf-text--regular" id="radio-inline-legend">
            Genre
          </legend>
          <div className="rf-fieldset__content">
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-1" name="radio-inline" value="Homme"
                checked={conseiller?.sexe === 'Homme'}
              />
              <label className="rf-label" htmlFor="radio-inline-1">Homme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-2" name="radio-inline" value="Femme" checked={conseiller?.sexe === 'Femme'} />
              <label className="rf-label" htmlFor="radio-inline-2">Femme
              </label>
            </div>
            <div className="rf-radio-group radio-genre">
              <input type="radio" id="radio-inline-3" name="radio-inline" value="Autre" checked={conseiller?.sexe === 'Autre'} />
              <label className="rf-label" htmlFor="radio-inline-3">Autre
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default FormulaireInfosPersonnelles;
