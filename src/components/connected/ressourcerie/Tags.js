import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ressourcesActions } from '../../../actions/ressources.actions';

function Tags({ rechercheParTag, rechercheParTexte }) {
  const dispatch = useDispatch();

  const tagsList = useSelector(state => state.ressources?.tagsList);
  const tagsListLoading = useSelector(state => state.ressources?.tagsListLoading);
  const tagsListError = useSelector(state => state.ressources?.tagsListError);
  const tagsListSelected = useSelector(state => state.ressourcesFiltres?.tagsListSelected);
  const aideRessourcerie = process.env.REACT_APP_MATTERMOST_URL + '/cnum/channels/ressourcerie-provisoire';

  const [seeAllTags, setSeeAlltags] = useState(false);

  useEffect(() => {
    dispatch(ressourcesActions.getTags());
  }, []);

  return (
    <div className="tags rf-ml-md-10w">
      <h2 className="rf-mb-md-5v sous-titre">Liste de tags</h2>
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
      <div className="rf-my-5v rf-mb-md-11w tout-tags" onClick={() => {
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
                    <button id="modal-annuler-close" className="rf-link--close rf-link" title="Fermer la fen&ecirc;tre modale"
                      aria-controls="rf-modal-1" target="_self" onClick={() => {
                        setSeeAlltags(false);
                      }}>
                      Fermer
                    </button>
                  </div>
                  <div className="rf-modal__content">
                    <h2 className="rf-mb-md-5v sous-titre">Liste de tous les tags</h2>
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

      <div className="rf-my-5w rf-mt-md-9w rf-mb-md-6w">
        <a className="tous-documents" title="Zip de tous les documents de la ressourcerie" target="blank" rel="noreferrer"
          href="https://ressourcerie.conseiller-numerique.gouv.fr/ressourcerie.zip">
          <i className="ri-file-zip-line" style={{ marginRight: '18px' }}></i>
          T&eacute;l&eacute;charger tous les documents de la ressourcerie.
        </a>
      </div>

      <hr/>
      <div className="rf-my-md-4w">
        <span className="bulle-discussion"></span>
        <span className="canal"><a href={aideRessourcerie} className="lien-aide"> Canal #ressourcerie-provisoire</a></span><br/>
        <span className="texte-canal">Une question ? un &eacute;l&eacute;ment &agrave; partager ? Rendez-vous sur votre espace de discussion pour partager.</span>
      </div>
    </div>
  );
}

Tags.propTypes = {
  rechercheParTag: PropTypes.func,
  rechercheParTexte: PropTypes.func,
};

export default Tags;
