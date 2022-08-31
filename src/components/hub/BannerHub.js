import React from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions } from '../../actions';
import Spinner from 'react-loader-spinner';
import FlashMessage from 'react-flash-message';

function BannerHub() {
  const location = useLocation();
  const lienMattermost = process.env.REACT_APP_MATTERMOST_URL;
  const linkAccount = useSelector(state => state.authentication?.user?.user?.name);
  const lienLaBase = `${process.env.REACT_APP_LABASE_URL}?email=${linkAccount}`;
  const hub = useSelector(state => state.authentication?.user?.user?.hub);
  const dispatch = useDispatch();
  const loadingCSV = useSelector(state => state.conseiller?.loadingCSV);
  const errorCSV = useSelector(state => state.conseiller?.errorCSV);
  const exportConseiller = () => dispatch(conseillerActions.getStatistiquesHubCSV(hub));

  return (
    <div className="fr-container">
      {errorCSV &&
        <FlashMessage duration={5000}>
          <p className="flashBag invalid">
            {errorCSV}
          </p>
        </FlashMessage>
      }
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loadingCSV === true}
        />
      </div>
      <div className="fr-grid-row fr-grid-row--right">
        <div className="fr-col-xs-12 fr-col-md-6 'fr-mt-5w fr-mb-6w">
          <a className="statistiques_nationales-btn" href="statistiques-nationales">Statistiques Nationales</a>
          <button className="export_conseillers-btn fr-ml-4w" onClick={exportConseiller}>Exporter les conseillers</button>
        </div>
        <div
          className="fr-col-xs-12 fr-mt-7w fr-col-md-6 'fr-mt-5w fr-mb-6w"
          style={{ textAlign: 'right' }}>
          {location.pathname !== '/territoires' &&
          <a className="header-btn" href="territoires">
            <span className="stats-logo-btn"></span>
            <span className="stats-texte-btn">Statistiques par territoire</span>
          </a>
          }
          <div className="block-lien-externe">
            <a className="header-btn" href={lienLaBase} target="blank" rel="noreferrer">
              <span className="ressourcerie-logo-btn"></span>
              <span className="ressourcerie-texte-btn">Ressourcerie</span>
            </a>
            <a className="header-btn" href={lienMattermost}>
              <span className="discussion-logo-btn"></span>
              <span className="discussion-texte-btn">Espace de discussion</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerHub;
