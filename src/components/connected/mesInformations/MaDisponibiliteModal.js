import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import fr from 'date-fns/locale/fr';
import dayjs from 'dayjs';
registerLocale('fr', fr);

import { candidatActions } from '../../../actions';

function MaDisponibiliteModal({ conseiller, setIsModalOpen }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date(conseiller?.dateDisponibilite) ?? new Date());
  const [error, setError] = useState(false);

  const minDate = new Date();

  const handleChange = e => {
    setDate(e.target);
    setError(false);
  };

  const handleSubmit = () => {
    if (date !== '' && date !== null && dayjs(date).format('DD/MM/YYYY') >= dayjs(minDate).format('DD/MM/YYYY')) {
      dispatch(candidatActions.updateDateDisponibilite(conseiller._id, date));
      setError(false);
      setIsModalOpen(false);
    } else {
      window.scrollTo(0, 0);
      setError(true);
    }
  };

  return (
    <dialog aria-labelledby="fr-modal-disponibilite" role="dialog" id="fr-modal-disponibilite" className="fr-modal modalOpened">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-disponibilite">
            <button className="fr-btn--close fr-btn fr-mt-n3w" title="Fermer la fen&ecirc;tre modale" aria-controls="fr-modal-suggestion" onClick={() => {
              setIsModalOpen(false);
            }}>Fermer</button>
            <h2 className="titre-modal">Quand serez-vous &agrave; nouveau disponible ?</h2>
            <div className="centre fr-mb-7w">
              <label className="label-disponibilite fr-mt-2w fr-mb-1w" htmlFor="date">
                Vous pouvez indiquer une date diff&eacute;rente de celle de votre fin de contrat. <span className="important">*</span>
              </label>
              <DatePicker
                id="date"
                name="date"
                className={`fr-input input-disponibilite ${error ? 'input-error' : ''}`}
                placeholderText="../../...."
                dateFormat="dd/MM/yyyy"
                locale="fr"
                selected={date}
                onChange={handleChange}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                minDate={minDate}
                required="required"
              />
              {error &&
                <p className="text-error fr-mb-n3w">La date que vous tentez d&rsquo;enregistrer n&rsquo;est pas valide</p>
              }
            </div>
            <div className="centre">
              <button className="fr-btn annuler-btn " onClick={() => {
                setIsModalOpen(false);
              }} >Annuler</button>
              <button className="fr-btn disponibilite-btn fr-ml-3w" onClick={handleSubmit}>Mettre mon statut &agrave; jour</button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

}
MaDisponibiliteModal.propTypes = {
  conseiller: PropTypes.object,
  setIsModalOpen: PropTypes.func,
};
export default MaDisponibiliteModal;

