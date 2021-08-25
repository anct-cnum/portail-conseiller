import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireSexeAgeActions, conseillerActions } from '../../actions';
import FlashMessage from 'react-flash-message';

registerLocale('fr', fr);
function FormulaireSexeAge() {

  const dispatch = useDispatch();
  const { $id } = useSelector(state => state.authentication.user?.user.entity);
  const isUpdated = useSelector(state => state.conseiller?.isUpdated);
  const error = useSelector(state => state.conseiller?.error);
  const [inputs, setInputs] = useState({
    errorInputs: false,
    date: '',
    sexe: '',
  });

  const todayDate = new Date();
  const maxDate = todayDate.getFullYear() - 18;
  const minDate = todayDate.getFullYear() - 99;

  const { date, sexe, errorInputs } = inputs;

  function handleChange(e) {
    if (e.target) {
      const { name, value } = e.target;
      setInputs(inputs => ({ ...inputs, [name]: value }));
    } else {
      setInputs(inputs => ({ ...inputs, date: e }));
    }
  }

  function handleSubmit() {
    if (date !== '' && date !== null && sexe !== '') {
      setInputs(inputs => ({ ...inputs, errorInputs: false }));
      dispatch(formulaireSexeAgeActions.updateConseiller({ sexe: sexe, dateDeNaissance: date }));
      dispatch(conseillerActions.get($id));
    } else {
      window.scrollTo(0, 0);
      setInputs(inputs => ({ ...inputs, errorInputs: true }));
    }
  }

  function closeModal() {
    dispatch(conseillerActions.closeFormulaire());
  }

  return (
    <dialog aria-labelledby="rf-modal-sexe-age" role="dialog" id="rf-modal-sexe-age" className="rf-modal modalOpened">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-7 rf-modal__body modal-sexe-age">
            <div className="rf-modal__content">
              { isUpdated &&
              <>
                <h1 className="rf-modal__title">Merci !</h1>
                <div className="rf-mb-3w">
                  <div className="rf-mb-3w">
                    Votre compte sur l’espace Coop est désormais activé !
                    Toute l’équipe Conseiller numérique France Services vous souhaite un excellent début de mission.
                  </div>
                  <img className="conseiller-course" src="avatars/conseiller-course.png"/>
                  <img className="conseillere-tablette" src="avatars/conseillere-tablette.svg"/>
                </div>
                <div className="centre">
                  <button className="sexe-age-btn" onClick={closeModal} >Fermer</button>
                </div>
              </>
              }
              { !isUpdated &&
                <>
                  <h1 id="rf-modal-title-modal-sexe-age" className="rf-modal__title">
                    Une dernière étape !
                  </h1>
                  { (error || errorInputs) &&
                    <div className="rf-mb-3w">
                      <FlashMessage duration={10000} >
                        <div className=" flashBag invalid">
                          <span>
                            {error ? error : 'Erreur : veuillez remplir tous les champs obligatoires (*) du formulaire.'}
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
                      maxDate={new Date('12/31/' + maxDate)}
                      minDate={new Date('01/01/' + minDate)}
                      dropdownMode="select"
                      required="required"
                    />
                  </div>
                  <p className="rf-mb-6w">L&rsquo;usage de ces données est strictement réservé aux statistiques internes de l’ANCT et de la
                      Banque des Territoires, celles-ci ne seront pas publiées.<br/>
                      Vous pourrez également modifier vos informations de profil par la suite. <br/>
                  <a className="rf-nav__link" target="blank" href="https://cdn.conseiller-numerique.gouv.fr/CGU-ConseillerNumerique-Coop.pdf">
                    Consulter les CGU pour plus de détails
                  </a>
                  </p>
                  <div className="centre">
                    <button className="sexe-age-btn" onClick={handleSubmit}>Valider</button>
                  </div>
                </>
              }
            </div>

          </div>
        </div>
      </div>
    </dialog>
  );
}

export default FormulaireSexeAge;

