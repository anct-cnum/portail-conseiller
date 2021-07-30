import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireSexeAgeActions } from '../../actions/formulaireSexeAge.actions';
import FlashMessage from 'react-flash-message';
import Header from '../Header';
import Footer from '../Footer';

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

  const { date, sexe } = inputs;

  if (isUpdated) {
    setTimeout(function() {
      window.location.reload();
    }, 2000);
  }

  function handleChange(e) {
    if (e.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    } else {
      setInputs(inputs => ({ ...inputs, date: e }));
    }
  }

  function handleSubmit() {
    if ($id && sexe && date) {
      dispatch(formulaireSexeAgeActions.updateConseiller({ idEntity: $id, sexe: sexe, dateDeNaissance: date }));
    }
  }

  return (
    <>
      <Header/>
      <div className="contenu-vide"></div>
      <dialog aria-labelledby="rf-modal-sexe-age" role="dialog" id="rf-modal-sexe-age" className="rf-modal modalOpened">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--center">
            <div className="rf-col-7 rf-modal__body modal-sexe-age">
              <div className="rf-modal__content">
                <h1 id="rf-modal-title-modal-sexe-age" className="rf-modal__title">
                  Une dernière étape !
                </h1>
                { error &&
                  <div className="rf-mb-3w">
                    <FlashMessage duration={10000} >
                      <div className=" flashBag invalid">
                        <span>
                          {error}
                        </span>
                      </div>
                    </FlashMessage>
                  </div>
                }
                { isUpdated &&
                  <div className="rf-mb-3w">
                    <FlashMessage duration={10000} >
                      <div className=" flashBag">
                        <span>
                          Vos informations ont bien été ajouté, vous allez être redirigé vers l&apos;accueil !
                        </span>
                      </div>
                    </FlashMessage>
                  </div>
                }
                <div className="element-gauche">
                  <div className="label" >Vous êtes <span className="important">*</span></div>
                  <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-4w rf-mb-3w">
                    <div className="rf-fieldset__content">
                      <div className="rf-radio-group">
                        <input type="radio" id="Homme" name="sexe" value="Homme" onClick={handleChange}/>
                        <label className="fr-label" htmlFor="Homme">un homme</label>
                      </div>
                      <div className="rf-radio-group">
                        <input type="radio" id="Femme" name="sexe" value="Femme" onClick={handleChange} required="required"/>
                        <label className="fr-label" htmlFor="Femme">une femme</label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="element-droite">
                  <label className="label" htmlFor="date">Votre date de naissance <span className="important">*</span></label>
                  <DatePicker
                    id="date"
                    name="date"
                    className="rf-input rf-my-3w"
                    placeholderText="../../...."
                    dateFormat="dd/MM/yyyy"
                    locale="fr"
                    selected={date}
                    onChange={handleChange}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    required="required"
                  />
                </div>
                <p className="rf-mb-6w">L’usage de ces données est strictement réservé aux statistiques internes de l’ANCT et de la Banque des Territoires,
                    celles-ci ne seront pas publiées.<br/>
                    Vous pourrez également modifier vos informations de profil par la suite. <br/>
                <a className="rf-nav__link" target="blank" href="https://cdn.conseiller-numerique.gouv.fr/CGU-ConseillerNumerique-Coop.pdf">
                  Consulter les CGU pour plus de détails
                </a>
                </p>
                <div className="centre">
                  <button className="sexe-age-btn" onClick={handleSubmit}>Valider</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <Footer/>
    </>
  );
}

export default FormulaireSexeAge;

/*


*/
