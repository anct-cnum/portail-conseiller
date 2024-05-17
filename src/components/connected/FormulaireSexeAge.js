import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireSexeAgeActions, conseillerActions, alerteActions } from '../../actions';
import Alerte from '../common/Alerte';

registerLocale('fr', fr);
function FormulaireSexeAge() {

  const dispatch = useDispatch();
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const isUpdated = useSelector(state => state.conseiller?.isUpdated);
  const error = useSelector(state => state.conseiller?.error);
  const [inputs, setInputs] = useState({
    date: '',
    sexe: '',
  });

  const todayDate = new Date();
  const maxDate = todayDate.getFullYear() - 18;
  const minDate = todayDate.getFullYear() - 99;

  const { date, sexe } = inputs;

  function handleChange(e) {
    if (e?.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    } else {
      setInputs(inputs => ({ ...inputs, date: e }));
    }
  }

  function handleSubmit() {
    if (date !== '' && date !== null && sexe !== '') {
      dispatch(formulaireSexeAgeActions.updateConseiller({ sexe: sexe, dateDeNaissance: date }));
      dispatch(conseillerActions.get($id));
    } else {
      window.scrollTo(0, 0);
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: 'Erreur : veuillez remplir tous les champs obligatoires (*) du formulaire.',
      }));
    }
  }

  useEffect(() => {
    if (error) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: error,
      }));
    }
  }, [error]);

  return (
    <>
      {!isUpdated &&
        <dialog aria-labelledby="fr-modal-sexe-age" role="dialog" id="fr-modal-sexe-age" className="fr-modal modalOpened">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-sexe-age">
                <div className="fr-modal__content">
                  <h1 id="fr-modal-title-modal-sexe-age" className="fr-modal__title">
                    Une derni&egrave;re &eacute;tape !
                  </h1>
                  <Alerte />
                  <div className="element-gauche">
                    <div className="fr-form-group">
                      <fieldset className="fr-fieldset fr-fieldset--inline">
                        <legend className="fr-fieldset__legend fr-text--bold fr-mb-4w" id="sexe-legend">
                          Vous &ecirc;tes <span className="important">*</span>
                        </legend>
                        <div className="fr-fieldset__content">
                          <div className="fr-radio-group">
                            <input type="radio" id="Homme" name="sexe" value="Homme" onClick={handleChange}/>
                            <label className="fr-label" htmlFor="Homme">un homme</label>
                          </div>
                          <div className="fr-radio-group">
                            <input type="radio" id="Femme" name="sexe" value="Femme" onClick={handleChange} required="required"/>
                            <label className="fr-label" htmlFor="Femme">une femme</label>
                          </div>
                          <div className="fr-radio-group">
                            <input type="radio" id="Autre" name="sexe" value="Autre" onClick={handleChange} required="required"/>
                            <label className="fr-label" htmlFor="Autre">autre</label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <div className="element-droite">
                    <label className="label" htmlFor="date">Votre date de naissance <span className="important">*</span></label>
                    <DatePicker
                      id="date"
                      name="date"
                      className="fr-input fr-my-3w"
                      placeholderText="../../...."
                      dateFormat="dd/MM/yyyy"
                      locale="fr"
                      selected={date}
                      onChange={handleChange}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      maxDate={new Date('12/31/' + maxDate)}
                      minDate={new Date('01/01/' + minDate)}
                      dropdownMode="select"
                      required="required"
                    />
                  </div>
                  <p className="fr-mt-1w fr-mb-5w">L&rsquo;usage de ces donn&eacute;es est strictement r&eacute;serv&eacute; aux statistiques internes de
                      l&rsquo;ANCT et de la Banque des Territoires, celles-ci ne seront pas publi&eacute;es.<br/>
                      Vous pourrez &eacute;galement modifier vos informations de profil par la suite. <br/>
                  <a className="fr-nav__link sexe-age-link" target="blank" href="https://cdn.conseiller-numerique.gouv.fr/CGU-ConseillerNumerique-Coop.pdf">
                    Consulter les CGU pour plus de d&eacute;tails
                  </a>
                  </p>
                  <div className="centre">
                    <button className="sexe-age-btn" onClick={handleSubmit}>Valider et passer à la derni&egrave;re &eacute;tape</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      }

    </>
  );
}

export default FormulaireSexeAge;

