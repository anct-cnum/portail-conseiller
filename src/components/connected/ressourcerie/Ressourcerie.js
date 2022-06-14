import React, { useEffect, useState } from 'react';
import Thematiques from './Thematiques';
import Tags from './Tags';
import Ressources from './Ressources';
import DerniersAjouts from './DerniersAjouts';
import Footer from '../../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { ressourcesFiltresActions, ressourcesActions } from '../../../actions';

function Ressourcerie() {

  const dispatch = useDispatch();

  const ressources = useSelector(state => state.ressources?.ressources);
  const ressourcesLoading = useSelector(state => state.ressources?.ressourcesLoading);
  const ressourcesError = useSelector(state => state.ressources?.ressourcesError);
  const tagsListSelected = useSelector(state => state.ressourcesFiltres?.tagsListSelected);
  const user = useSelector(state => state?.authentication?.user?.user);

  const dernierAjout = ressources?.slice(-4);

  const [tagsSelected, setTagsSelected] = useState([]);
  const rechercheParTag = nom => {
    if (tagsSelected?.includes(nom)) {
      setTagsSelected([...tagsSelected.filter(item => item !== nom)]);
    } else {
      setTagsSelected([...tagsSelected, nom]);
    }
  };

  const [recherche, setRecherche] = useState(null);
  const rechercheParTexte = e => {
    setRecherche(e.target.previousSibling.value);
  };

  useEffect(() => {
    if (tagsListSelected !== undefined) {
      dispatch(ressourcesActions.getRessources(tagsListSelected, recherche));
    }
  }, [tagsListSelected, recherche]);

  useEffect(() => {
    dispatch(ressourcesFiltresActions.getTagSelectionnes(tagsSelected));
  }, [tagsSelected]);

  return (
    <div className="ressourcerie">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12 rf-col-md-10">
            <h1 className="titre rf-mt-2w rf-mb-1w rf-mt-md-5w rf-mb-md-6w">Ressourcerie</h1>
            <div className="div-info-annonce-ressourcerie rf-mb-3w rf-py-1w">
              <i className="ri-information-line information icone-info-annonce"></i>
              <p className="margin-info">
                  &Agrave; partir du 27 juin, la ressourcerie sera int&eacute;gr&eacute;e &agrave; La Base, nouvelle plateforme d&eacute;velopp&eacute;e par l&apos;ANCT pour
                  favoriser la mise en r&eacute;seau des ressources de l&apos;inclusion et de la m&eacute;diation num&eacute;riques.
                  En plus d&apos;y retrouver les tutoriels d&eacute;j&agrave; pr&eacute;sents sur la ressourcerie, vous pourrez en d&eacute;couvrir d&apos;autres
                  publi&eacute;s par les acteurs et actrices du secteur (Hubs territoriaux pour un num&eacute;rique inclusif, administrations,
                  collectivit&eacute;s, associations, entreprises de l&apos;ESS).
                  Un mail contenant un lien d&apos;inscription &agrave; La Base vous sera tr&egrave;s prochainement envoy&eacute;s, restez connect&eacute;-e !
                  Pour plus d&apos;informations sur La Base : La Base - Societ&eacute; Num&eacute;rique ( <a href="https://societenumerique.gouv.fr">societenumerique.gouv.fr</a> )
              </p>
            </div>
          </div>
          <div className="rf-col-12 rf-col-md-6">
            <Thematiques />
            {(!ressourcesLoading && !ressourcesError) &&
              <span className="hide-md">
                <DerniersAjouts ressources={dernierAjout} />
              </span>
            }
          </div>
          <div className="rf-col-12 rf-col-md-6">
            <Tags rechercheParTag={rechercheParTag} rechercheParTexte={rechercheParTexte} />
            {(!ressourcesLoading && !ressourcesError) &&
              <span className="show-md">
                <hr className="rf-mt-5v rf-mb-4w" />
                <DerniersAjouts ressources={dernierAjout} />
              </span>
            }
          </div>
          {ressourcesLoading &&
            <div className="rf-col-12 rf-mb-5w rf-mt-5w"> <h2>Chargement de la ressourcerie ...</h2></div>
          }
          {ressourcesError &&
            <div className="rf-col-12 rf-mb-5w rf-mt-5w"><h2>Erreur lors du chargement de la ressourcerie, veuillez r&eacute;essayer.</h2></div>
          }
          {ressources?.length === 0 &&
            <div className="rf-col-12 rf-mb-5w rf-mt-5w"><h2>Il n&rsquo;y a pas de r&eacute;sultats pour votre recherche.</h2></div>
          }
        </div>
      </div>

      {(!ressourcesLoading && !ressourcesError) &&
        <div className="ressources">
          <div className="rf-container">
            <div className="rf-grid-row">
              <Ressources ressources={ressources} />
            </div>
          </div>
        </div>
      }
      <Footer type="support" role={user.role}/>
    </div>
  );
}

export default Ressourcerie;
