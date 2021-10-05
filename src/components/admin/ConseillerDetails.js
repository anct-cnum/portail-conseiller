import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { conseillerActions, structureActions } from '../../actions';
import Footer from '../Footer';

function ConseillerDetails({ location }) {

  const dispatch = useDispatch();
  let { id } = useParams();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(conseillerActions.get(id));
  }, []);

  useEffect(() => {
    if (conseiller !== undefined) {
      dispatch(structureActions.get(conseiller?.structureId));
    }
  }, [conseiller]);

  return (
    <div className="rf-container conseillerDetails">
      <div className="rf-grid-row rf-grid-row--bottom rf-pt-12w rf-pb-9w">
        <div className="rf-col-3 titreCol">
          <h1 className="titre">Profil</h1>
        </div>
        <div className="rf-col-xs-6 rf-col-lg-3 recrutementCol">
          <strong>Recrutement</strong>&nbsp;&nbsp;
          { conseiller?.datePrisePoste ? dayjs(conseiller?.datePrisePoste).format('DD/MM/YYYY') : 'non renseigné'}
          <br/>
          <strong>Fin de formation</strong>&nbsp;&nbsp;
          { conseiller?.dateFinFormation ? dayjs(conseiller?.dateFinFormation).format('DD/MM/YYYY') : 'non renseignée'}
        </div>
        <div className="rf-col-xs-6 rf-col-lg-2">
          <img src={conseiller?.certifie ? '/logos/icone-check.svg' : '/logos/icone-croix.svg'} style={{ marginRight: '16px' }}/>
          Certification
          <br/>
          <span className={conseiller?.userCreated ? 'circle-true' : 'circle-false'}/>
          {conseiller?.userCreated ? 'Activé' : 'Non activé'}
        </div>
      </div>
      <div className="rf-grid-row">
        <div className="rf-col-3">
          <div className="rf-mb-3w">
            <strong>Nom</strong><br/>
            <span>{conseiller?.nom}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Prénom</strong><br/>
            <span>{conseiller?.prenom}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Sexe</strong><br/>
            <span>{conseiller?.sexe ?? 'non renseigné'}</span>
          </div>
          <div className="rf-pb-12w rf-mb-3w">
            <strong>Date de naissance</strong><br/>
            <span>{conseiller?.dateDeNaissance ? dayjs(conseiller?.dateDeNaissance).format('DD/MM/YYYY') : 'non renseignée'}</span>
          </div>
        </div>
        <div className="rf-col-5">
          <div className="rf-mb-3w">
            <strong>Lieu d&rsquo;habitation</strong><br/>
            {conseiller?.codePostal.replace(/^(.{2})(.*)$/, '$1 $2')}&nbsp; {/* espace entre les 2 premiers caractères du CP et les 3 autres */}
            <span style={{ textTransform: 'uppercase' }}>{conseiller?.nomCommune}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Adresse mail CnFS</strong><br/>
            <span>{conseiller?.emailCN?.address ?? 'non renseigné'}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Adresse mail personelle</strong><br/>
            <span>{conseiller?.email}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Téléphone personnel</strong><br/>
            <span>{conseiller?.telephone ? conseiller?.telephone.replace(/(.{2})(?=.)/g, '$1 ') : 'non renseigné'}</span> {/* espace tous les 2 chiffres */}
          </div>
        </div>
        <div className="rf-col-xs-12 rf-col-xl-4">
          <div className="rf-mb-3w">
            <strong>Structure</strong><br/>
            <span>{structure?.nom}</span>
          </div>
          <div className="rf-grid-row rf-mb-3w">
            <div className="rf-col-8">
              <strong>Code Postal de la Structure</strong><br/>
              <span>{structure?.codePostal.replace(/^(.{2})(.*)$/, '$1 $2')}</span>
            </div>
            <div className="rf-col-4">
              <strong>Siret</strong><br/>
              <span>{structure?.siret ?? 'non renseigné'}</span>
            </div>
          </div>
          <div className="rf-mb-3w">
            <strong>Adresse mail de la structure</strong><br/>
            <span>{structure?.contact?.email}</span>
          </div>
          <div className="rf-mb-3w">
            <strong>Téléphone de la structure</strong><br/>
            <span>{structure?.contact?.telephone ? structure?.contact?.telephone.replace(/(.{2})(?=.)/g, '$1 ') : 'non renseigné'}</span>
          </div>
        </div>
      </div>
      <div className="rf-grid-row rf-mb-2w">
        <div className="rf-col-12">
          <hr style={{ borderWidth: '0.5px' }}/>
        </div>
      </div>
      <div className="rf-grid-row rf-pb-12w rf-mb-3w">
        <div className="rf-col-8">
          <ul className="rf-footer__bottom-list liste-action">
            <li className="rf-footer__bottom-item">
              <Link
                className="rf-footer__bottom-link rf-pr-sm-1w"
                style={{ boxShadow: 'none' }}
                to={{
                  pathname: `/accueil`,
                  currentPage: location?.currentPage }}>
                <img
                  className="image-banniere"
                  src="/logos/statistics/logo-fleche-gauche.svg"
                  alt="Revenir à l’étape précédente"
                  style={{ verticalAlign: 'middle' }} />
                <span style={{ paddingLeft: '16px' }}>Revenir à la page précédente</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="rf-col-xs-12 rf-col-md-4 rf-mt-5w">
          <Link className="statistiques-btn" style={{ boxShadow: 'none' }} to={{
            pathname: `/statistiques`,
            currentPage: location?.currentPage,
            idUser: conseiller?._id,
            origin: '/accueil' }}>
              Voir les statistiques d&rsquo;accompagnement
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
