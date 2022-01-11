import React from 'react';
import { useDispatch } from 'react-redux';
import { conseillerActions } from '../../../actions';

function Remerciement() {
  const dispatch = useDispatch();
  function closeModal() {
    dispatch(conseillerActions.closeFormulaire());
  }
  return (
    <dialog aria-labelledby="rf-modal-sexe-age" role="dialog" id="rf-modal-sexe-age" className="rf-modal modalOpened">
      <div className="rf-container">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-12 rf-col-sm-10 rf-col-md-7 rf-modal__body modal-sexe-age">
            <div className="rf-modal__content">
              <h1 className="rf-modal__title">Merci !</h1>
              <div className="rf-mb-3w">
                <div className="rf-mb-3w">
                  Votre compte sur l&rsquo;espace Coop est d&eacute;sormais activ&eacute; !
                  Toute l&rsquo;&eacute;quipe Conseiller num&eacute;rique France Services vous souhaite un excellent d&eacute;but de mission.
                </div>
                <img className="conseiller-course" src="avatars/conseiller-course.png"/>
                <img className="conseillere-tablette" src="avatars/conseillere-tablette.svg"/>
              </div>
              <div className="centre">
                <button className="sexe-age-btn" onClick={closeModal} >Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default Remerciement;
