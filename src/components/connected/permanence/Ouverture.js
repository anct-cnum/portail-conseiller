import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { permanenceActions } from '../../../actions';

function Ouverture() {
  const dispatch = useDispatch();
  const isReporter = useSelector(state => state.permanence?.isReporter);
  const showErrorReporter = useSelector(state => state.permanence?.showErrorReporter);
  const errorReporter = useSelector(state => state.permanence?.errorReporter);

  const [show, setShow] = useState(true);
  function closeModal(plusTard) {
    setShow(false);
    if (plusTard) {
      dispatch(permanenceActions.reporterPermanence());
    }
  }

  useEffect(() => {
    if (isReporter) {
      dispatch(permanenceActions.suspensionFormulaire());
    }
  }, [isReporter]);

  return (
    <>
      {show &&
        <dialog aria-labelledby="fr-modal-ouverture" role="dialog" id="fr-modal-ouverture" className="fr-modal modalOpened">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-sm-10 fr-col-md-7 fr-modal__body modal-ouverture">
                <div className="fr-modal__content fr-mt-n4w">
                  <h1 className="fr-modal__title centre fr-mb-4w">À vous de jouer !</h1>
                  <div className="fr-mb-5w centre">
                    {showErrorReporter &&
                      <div className="invalid">{errorReporter}</div>
                    }
                    <img className="conseillers-carte" src="logos/permanences/carthographie-avec-conseillers.svg"/>
                    <div className="fr-mt-4w">
                      En cliquant sur enregistrer, vous renseignerez vos lieux d&rsquo;activit&eacute; et informations de contact,
                      afin qu&rsquo;ils soient affich&eacute;s sur la carte nationale des conseillers num&eacute;riques.
                      Comptez environ 2 &agrave; 3 minutes pour enregistrer un lieu d&rsquo;activit&eacute;.
                    </div>
                    <div className="fr-mt-3w">
                      Si vous &ecirc;tes install&eacute; dans des locaux situ&eacute;s hors du si&egrave;ge de la structure qui vous a recrut&eacute;,
                      nous vous recommandons de rechercher au pr&eacute;alable le <strong>SIRET</strong> de l&rsquo;&eacute;tablissement o&ugrave;
                      vous avez votre poste en vous renseignant aupr&egrave;s de vos collaborateurs, ou sur ce&nbsp;
                      <a className="ouverture-link" href="https://annuaire-entreprises.data.gouv.fr/?mtm_campaign=Conseiller_numériqueFS"
                        title="Lien vers https://annuaire-entreprises.data.gouv.fr/" target="blank" rel="noreferrer">
                        site
                      </a>.
                    </div>
                  </div>
                  <div className="centre">
                    <button className="fr-btn ouverture-btn fr-mr-9w" onClick={ () => {
                      closeModal(false);
                    }} >Enregistrer mes lieux d&rsquo;activit&eacute;</button>
                    <button className="fr-btn plus-tard-btn" onClick={ () => {
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
