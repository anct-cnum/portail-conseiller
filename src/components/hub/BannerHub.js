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
    <div className="rf-container">
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
      <div className="rf-grid-row rf-grid-row--right">
        <div className="rf-col-xs-12 rf-col-md-6 'rf-mt-5w rf-mb-6w">
          <a className="statistiques_nationales-btn" href="statistiques-nationales">Statistiques Nationales</a>
          <button className="export_conseillers-btn rf-ml-4w" onClick={exportConseiller}>Exporter les conseillers</button>
        </div>
        <div
          className="rf-col-xs-12 rf-mt-7w rf-col-md-6 'rf-mt-5w rf-mb-6w"
          style={{ textAlign: 'right' }}>
          {location.pathname !== '/territoires' &&
          <a className="header-btn" href="territoires">
            <span className="stats-logo-btn"></span>
            <span className="stats-texte-btn">Statistiques par territoire</span>
          </a>
          }
          <a className="header-btn" href={lienLaBase}>
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
  );
}

export default BannerHub;
