import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { permanenceActions } from '../../../actions';

function Ouverture() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  function closeModal(plusTard) {
    setShow(false);
    if (plusTard) {
      dispatch(permanenceActions.suspensionFormulaire());
    }
  }

  return (
    <>
      {show &&
        <dialog aria-labelledby="rf-modal-ouverture" role="dialog" id="rf-modal-ouverture" className="rf-modal modalOpened">
          <div className="rf-container">
            <div className="rf-grid-row rf-grid-row--center">
              <div className="rf-col-12 rf-col-sm-10 rf-col-md-7 rf-modal__body modal-ouverture">
                <div className="rf-modal__content rf-mt-n4w">
                  <h1 className="rf-modal__title centre rf-mb-4w">À vous de jouer !</h1>
                  <div className="rf-mb-5w centre">
                    <img className="conseillers-carte" src="logos/permanences/carthographie-avec-conseillers.svg"/>
                    <div className="rf-mt-4w">
                      En cliquant sur enregistrer, vous renseignerez vos lieux d&rsquo;activit&eacute; et informations de contact,
                      afin qu&rsquo;ils soient affich&eacute;s sur la carte nationale des conseillers num&eacute;riques.
                      Comptez environ 2 &agrave; 3 minutes pour enregistrer un lieu d&rsquo;activit&eacute;.
                    </div>
                    <div className="rf-mt-3w">
                      Si vous &ecirc;tes install&eacute; dans des locaux situ&eacute;s hors du si&egrave;ge de la structure qui vous a recrut&eacute;,
                      nous vous recommandons de rechercher au pr&eacute;alable le <strong>SIRET</strong> de l&rsquo;&eacute;tablissement o&ugrave;
                      vous avez votre poste en vous renseignant aupr&egrave;s de vos collaborateurs, ou sur ce&nbsp;
                      <a className="ouverture-link" href="https://www.pappers.fr/" title="Liens vers https://www.pappers.fr/" target="blank" rel="noreferrer">
                        site
                      </a>.
                    </div>
                  </div>
                  <div className="centre">
                    <button className="rf-btn ouverture-btn rf-mr-9w" onClick={ () => {
                      closeModal(false);
                    }} >Enregistrer mes lieux d&rsquo;activit&eacute;</button>
                    <button className="rf-btn plus-tard-btn" onClick={ () => {
                      closeModal(true);
                    }} >Plus Tard</button>
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

export default Ouverture;
