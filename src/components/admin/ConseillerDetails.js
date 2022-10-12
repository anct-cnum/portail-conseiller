import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { conseillerActions, structureActions, userActions } from '../../actions';
import Footer from '../Footer';

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  let { id } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const isUserActif = useSelector(state => state.conseiller?.isUserActif);
  const user = useSelector(state => state?.authentication?.user?.user);
  const isSubordonne = useSelector(state => state?.conseiller?.isSubordonne);
  const loadedIsSubordonee = useSelector(state => state?.conseiller?.loaded);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (conseiller?._id !== id) {
      dispatch(conseillerActions.get(id));
    }
  }, [conseiller]);

  useEffect(() => {
    if (conseiller !== undefined) {
      dispatch(structureActions.get(conseiller?.structureId));
      dispatch(conseillerActions.isUserActif(conseiller));
      if (user?.role === 'coordinateur_coop') {
        dispatch(conseillerActions.isSubordonne(user.entity.$id, conseiller?._id));
      }
    }
  }, [conseiller]);

  useEffect(() => {
    if (loadedIsSubordonee && user?.role === 'coordinateur_coop' && conseiller?._id !== id && !isSubordonne) {
      dispatch(conseillerActions.resetIsSubordonne());
      dispatch(userActions.logout());
    }
  }, [isSubordonne, loadedIsSubordonee, conseiller]);

  return (
    <div className="fr-container conseillerDetails">
      <div className="fr-grid-row fr-grid-row--bottom fr-pt-12w fr-pb-9w">
        <div className="fr-col-3 titreCol">
          <h1 className="titre">Profil</h1>
        </div>
        <div className="fr-col-xs-6 fr-col-lg-3 recrutementCol fr-mb-1w">
          <strong>Recrutement</strong>&nbsp;&nbsp;
          { conseiller?.datePrisePoste ? dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY') : <>non renseign&eacute;e</>}
          <br/>
          <strong>Fin de formation</strong>&nbsp;&nbsp;
          { conseiller?.dateFinFormation ? dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY') : <>non renseign&eacute;e</>}
        </div>
        <div className="fr-col-xs-6 fr-col-lg-2 fr-mb-1w">
          <img src={conseiller?.certifie ? '/logos/icone-check.svg' : '/logos/icone-croix.svg'} style={{ marginRight: '16px' }}/>
          Certification
          <br/>
          <span className={isUserActif ? 'circle-true' : 'circle-false'}/>
          {isUserActif ? <>Activ&eacute;</> : <>Non activ&eacute;</>}
        </div>
      </div>
      <div className="fr-grid-row">
        <div className="fr-col-3">
          <div className="fr-mb-3w">
            <strong>Nom</strong><br/>
            <span className="breakWord">{conseiller?.nom}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Pr&eacute;nom</strong><br/>
            <span className="breakWord">{conseiller?.prenom}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Sexe</strong><br/>
            <span className="breakWord">{conseiller?.sexe ?? <>non renseign&eacute;</>}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Date de naissance</strong><br/>
            <span className="breakWord">
              {conseiller?.dateDeNaissance ? dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY') : <>non renseign&eacute;e</>}
            </span>
          </div>
        </div>
        <div className="fr-col-5">
          <div className="fr-mb-3w">
            <strong>Lieu d&rsquo;habitation</strong><br/>
            {conseiller?.codePostal.replace(/^(.{2})(.*)$/, '$1 $2')}&nbsp; {/* espace entre les 2 premiers caractères du CP et les 3 autres */}
            <span style={{ textTransform: 'uppercase' }}>{conseiller?.nomCommune}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Adresse mail CnFS</strong><br/>
            {conseiller?.emailCN?.address &&
              <a className="email"href={'mailto:' + conseiller?.emailCN?.address}>
                {conseiller?.emailCN?.address}
              </a>
            }
            {!conseiller?.emailCN?.address &&
              <span>non renseign&eacute;</span>
            }
          </div>
          <div className="fr-mb-3w">
            <strong>Adresse mail personelle</strong><br/>
            <a className="email"href={'mailto:' + conseiller?.email}>{conseiller?.email}</a>
          </div>
          <div className="fr-mb-3w">
            <strong>T&eacute;l&eacute;phone personnel</strong><br/>
            <span>{conseiller?.telephone ? conseiller?.telephone.replace(/(.{2})(?=.)/g, '$1 ') : <>non renseign&eacute;</>}</span>
            {/* espace tous les 2 chiffres */}
          </div>
        </div>
        <div className="fr-col-xs-12 fr-col-xl-4">
          <div className="fr-mb-3w">
            <strong>Structure</strong><br/>
            <span>{structure?.nom}</span>
          </div>
          <div className="fr-grid-row fr-mb-3w">
            <div className="fr-col-8">
              <strong>Code Postal de la Structure</strong><br/>
              <span>{structure?.codePostal.replace(/^(.{2})(.*)$/, '$1 $2')}</span>
            </div>
            <div className="fr-col-4">
              <strong>Siret</strong><br/>
              <span>{structure?.siret ?? <>non renseign&eacute;</>}</span>
            </div>
          </div>
          <div className="fr-mb-3w">
            <strong>Adresse mail de la structure</strong><br/>
            <a className="email"href={'mailto:' + structure?.contact?.email}>
              {structure?.contact?.email}
            </a>
          </div>
          <div className="fr-mb-3w">
            <strong>T&eacute;l&eacute;phone de la structure</strong><br/>
            <span>{structure?.contact?.telephone ? structure?.contact?.telephone.replace(/(.{2})(?=.)/g, '$1 ') : <>non renseign&eacute;</>}</span>
          </div>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-5w">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-6w fr-mb-8w">
        <div className="fr-col-12 titreCol">
          <h1 className="titre">Contact du responsable</h1>
        </div>
      </div>
      <div className="fr-grid-row">
        <div className="fr-col-3">
          <div className="fr-mb-3w">
            <strong>Nom</strong><br/>
            <span className="breakWord">{conseiller?.supHierarchique?.nom ?? '-'}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Pr&eacute;nom</strong><br/>
            <span className="breakWord">{conseiller?.supHierarchique?.prenom ?? '-'}</span>
          </div>
          <div className="fr-mb-3w">
            <strong>Fonction</strong><br/>
            <span className="breakWord">{conseiller?.supHierarchique?.fonction ?? '-'}</span>
          </div>
        </div>
        <div className="fr-col-5">
          <div className="fr-mb-3w">
            <strong>Mail</strong><br/>
            {conseiller?.supHierarchique?.email &&
              <a className="email"href={'mailto:' + conseiller?.supHierarchique?.email}>
                {conseiller?.supHierarchique?.email}
              </a>
            }
            {!conseiller?.supHierarchique?.email &&
              <span>-</span>
            }
          </div>
          <div className="fr-mb-3w">
            <strong>T&eacute;l&eacute;phone</strong><br/>
            <span>
              {conseiller?.supHierarchique?.numeroTelephone ?
                /* espace tous les 2 chiffres après l'indicatif*/
                conseiller?.supHierarchique?.numeroTelephone.replace(/(\+)(33|590|596|594|262|269)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3 $4 $5 $6 $7') :
                <>-</>
              }
            </span>
          </div>
        </div>
        <div className="fr-col-xs-12 fr-col-xl-4">
          <p className="blocCoordonnees">
            Ces coordonn&eacute;es pourront &ecirc;tre utilis&eacute;es pour communiquer des informations concernant le dispositif
            et l&rsquo;animation du r&eacute;seau
            (ex: invitation &agrave; des webinaires, envoi de documents explicatifs, newsletter, etc.)
          </p>
        </div>
      </div>
      <div className="fr-grid-row fr-mt-5w fr-mb-2w">
        <div className="fr-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="fr-grid-row fr-pb-12w fr-mb-3w">
        <div className="fr-col-8">
          <ul className="fr-footer__bottom-list liste-action">
            <li className="fr-footer__bottom-item">
              <Link
                className="fr-footer__bottom-link fr-pr-sm-1w"
                style={{ boxShadow: 'none', color: '#8585F6', fontSize: '16px' }}
                to={{
                  pathname: `/accueil`,
                  currentPage: location?.currentPage }}>
                <img
                  className="image-banniere"
                  src="/logos/statistics/logo-fleche-gauche.svg"
                  alt="Revenir &agrave; l’&eacute;tape pr&eacute;c&eacute;dente"
                  style={{ verticalAlign: 'super' }} />
                <span style={{ paddingLeft: '8px' }}>Page pr&eacute;c&eacute;dente</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="fr-col-xs-12 fr-col-md-4 fr-mt-2w">
          <Link className="statistiques-btn" to={{
            pathname: `/statistiques`,
            currentPage: location?.currentPage,
            idUser: conseiller?._id,
            nomSubordonneeCSV: `${conseiller?.nom}_${conseiller?.prenom}`,
            origin: '/accueil' }}>
              Statistiques d&rsquo;accompagnement
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );

}

ConseillerDetails.propTypes = {
  location: PropTypes.object
};

export default ConseillerDetails;
