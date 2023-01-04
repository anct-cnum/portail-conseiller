import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { mesInformationsActions } from '../../actions';

function DemandeInformations({ user, informationsManquantes }) {
  const dspatch = useDispatch();
  const clickPlusTard = () => {
    dspatch(mesInformationsActions.getPlusTard());
  };
  return (
    <dialog aria-labelledby="fr-modal-informations" role="dialog" id="fr-modal-informations" className="fr-modal modalOpened">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-informations">
            <div className="fr-modal__content">
              <div className="centre fr-mb-2w">
                <img src="/logos/home-connected/demande-informations.svg"/>
              </div>
              <h1 className="fr-modal__title titre-demande-information" style={{ fontSize: '20px' }}>
                Bonjour {user?.prenom}, pouvez-vous compl&eacute;ter ces informations :
              </h1>
              <ul className="centre fr-my-4w">
                {informationsManquantes?.map((information, idx) => {
                  return <li key={idx}>{information}</li>;
                })}
              </ul>
              <div className="centre">
                <a className="fr-btn informations-btn fr-mr-7w" href="/mes-informations" onClick={() => {
                  clickPlusTard();
                }}>Aller sur la page &laquo;Mes informations&raquo;</a>
                <button className="fr-btn plus-tard-btn" onClick={() => {
                  clickPlusTard();
                }}>Plus tard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
DemandeInformations.propTypes = {
  user: PropTypes.object,
  informationsManquantes: PropTypes.array
};
export default DemandeInformations;

