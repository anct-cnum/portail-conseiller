import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ressourcesActions } from '../../../actions/ressources.actions';
import ReactTooltip from 'react-tooltip';

function Tags({ rechercheParTag, rechercheParTexte }) {
  const dispatch = useDispatch();

  const tagsList = useSelector(state => state.ressources?.tagsList);
  const tagsListLoading = useSelector(state => state.ressources?.tagsListLoading);
  const tagsListError = useSelector(state => state.ressources?.tagsListError);
  const tagsListSelected = useSelector(state => state.ressourcesFiltres?.tagsListSelected);

  const [seeAllTags, setSeeAlltags] = useState(false);

  useEffect(() => {
    dispatch(ressourcesActions.getTags());
  }, []);

  return (
    <div className="tags rf-ml-10w">
      <h2 className="rf-mb-5v sous-titre">Liste de tags</h2>
      <div>
        {!tagsListError && !tagsListLoading && tagsList?.slice(0, 12)?.map((tag, idx) => {
          return <div key={idx} className={tagsListSelected?.includes(tag.nom) ? 'tag actif' : 'tag'} onClick={() => {
            rechercheParTag(tag.nom);
          }}>{tag.nom}</div>;
        })
        }
        {tagsListError &&
          <div> Une erreur s&rsquo;est produite lors du chargement des tags, veuillez recharger la page.</div>
        }
      </div>
      <div className="rf-mt-5v rf-mb-11w tout-tags" onClick={() => {
        setSeeAlltags(true);
      }} >
        Afficher tous les tags
      </div>
      {seeAllTags &&
        <dialog aria-labelledby="rf-modal-confirm-siret" role="dialog" id="rf-modal-confirm-siret" className="rf-modal modalOpened">
          <div className="rf-container--fluid rf-container-md">
            <div className="rf-grid-row rf-grid-row--center">
              <div className="rf-col-12">
                <div className="rf-modal__body">
                  <div className="rf-modal__header">
                    <button id="modal-annuler-close" className="rf-link--close rf-link" title="Fermer la fenêtre modale"
                      aria-controls="rf-modal-1" target="_self" onClick={() => {
                        setSeeAlltags(false);
                      }}>
                      Fermer
                    </button>
                  </div>
                  <div className="rf-modal__content">
                    <h2 className="rf-mb-5v sous-titre">Liste de tous les tags</h2>
                    {!tagsListError && !tagsListLoading && tagsList?.map((tag, idx) => {
                      return <div key={idx} className={tagsListSelected?.includes(tag.nom) ? 'tag actif' : 'tag'} onClick={() => {
                        rechercheParTag(tag.nom);
                      }}>{tag.nom}</div>;
                    })}
                    {tagsListError &&
                      <div> Une erreur s&rsquo;est produite lors du chargement des tags, veuillez recharger la page.</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      }

      <div className="rf-search-bar rf-search-bar--lg" id="search" role="search" >
        <input className="rf-input" placeholder="Rechercher un document" type="search" id="search-input" name="search-input" />
        <button className="rf-btn" onClick={rechercheParTexte} title="Rechercher un document">
            Rechercher
        </button>
      </div>

      <div className="rf-mt-9w rf-mb-6w">
        <a className="tous-documents" title="Zip de tous les documents de la ressourcerie" target="blank" rel="noreferrer"
          href="https://ressourcerie.conseiller-numerique.gouv.fr/ressourcerie.zip">
          <i className="ri-file-zip-line" style={{ marginRight: '18px' }}></i>
          T&eacute;l&eacute;charger tous les documents de la ressourcerie.
        </a>
      </div>

      <hr/>
      <div className="rf-my-4w prochainement" data-tip="
              <img class='infobulle-image' src='/logos/abeille-roue.png'/>
              <div><b>En travaux !</b></div>
              <div>Cette fonctionnalité sera disponible prochainement.</div>">
        <span className="bulle-discussion"></span><span className="canal"> Canal #ressources</span><br/>
        <span className="texte-canal">Une question ? un &eacute;l&eacute;ment à partager ? Rendez-vous sur votre espace de discussion pour partager.</span>
      </div>
      <ReactTooltip html={true} className="infobulle" arrowColor="white"/>
    </div>
  );
}

Tags.propTypes = {
  rechercheParTag: PropTypes.func,
  rechercheParTexte: PropTypes.func,
};

export default Tags;
