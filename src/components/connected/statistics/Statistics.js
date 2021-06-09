import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { statistiqueActions } from '../../../actions';
import PeriodStatistics from './StatisticsPeriod';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';
import StatisticsBanner from './StatisticsBanner';

function Statistics() {
  const dispatch = useDispatch();
  let statsDataError = useSelector(state => state.statistique?.statsDataError);
  let dateDebutStats = useSelector(state => state.statistique?.dateDebutStats);
  let dateFinStats = useSelector(state => state.statistique?.dateFinStats);
  let donneesStatistiques2 = useSelector(state => state.statistique?.statsData); //TODO à remplacer par donneesStatistiques quand OK

  useEffect(() => {
    dispatch(statistiqueActions.getStatsCra(dateDebutStats, dateFinStats));
  }, []);

  const donneesStatistiques = {
    periodes: [{
      nbAccompagnement: 78,
      nbAteliers: 3,
      nbTotalParticipant: 25,
      nbAccompagnementPerso: 19,
      nbDemandePonctuel: 3,
      nbUsagersBeneficiantSuivi: 12,
      tauxTotalUsagersAccompagnes: 15,
      nbUsagersAccompagnementIndividuel: 2,
      nbUsagersAtelierCollectif: 8,
      nbReconduction: 8,
      statsThemes: [
        { nom: 'Équipement informatique', valeur: 5 },
        { nom: 'Naviguer sur Internet', valeur: 40 },
        { nom: 'Courriels', valeur: 10 },
        { nom: 'Applications smartphone', valeur: 7 },
        { nom: 'Gestion de contenus numériques', valeur: 6 },
        { nom: 'Env., vocab. numérique', valeur: 21 },
        { nom: 'Traitement de texte', valeur: 8 },
        { nom: 'Échanger avec ses proches', valeur: 13 },
        { nom: 'Emploi, formation', valeur: 18 },
        { nom: 'Accompagner son enfant', valeur: 9 },
        { nom: 'Numérique et TPE/PME', valeur: 25 },
        { nom: 'Démarche en ligne', valeur: 17 }
      ],
      statsLieux: [
        { nom: 'À domicile', valeur: 12 },
        { nom: 'À distance', valeur: 15 },
        { nom: 'Autre lieu', valeur: 27 },
        { nom: 'Lieu de ratachement', valeur: 22 },
      ],
      statsDurees: [
        { nom: '0 à 30 min.', valeur: 5 },
        { nom: '30 min. à 1h', valeur: 20 },
        { nom: '1h à 2h', valeur: 16 },
        { nom: '2h et plus', valeur: 36 },
      ],
      statsEvolutions: [
        { nom: 'Avril', valeur: 25 },
        { nom: 'Mai', valeur: 85 },
        { nom: 'Juin', valeur: 45 },
        { nom: 'Juillet', valeur: 75 },
      ],
      statsAges: [
        { nom: '-12 ans', valeur: 20 },
        { nom: '12-18 ans', valeur: 8 },
        { nom: '18-35 ans', valeur: 12 },
        { nom: '35-60 ans', valeur: 31 },
        { nom: '60 ans et plus', valeur: 19 },
      ],
      statsUsagers: [
        { nom: 'Non renseigné', valeur: 8 },
        { nom: 'Etudiant', valeur: 4 },
        { nom: 'En emploi', valeur: 20 },
        { nom: 'Sans emploi', valeur: 33 },
        { nom: 'Retraité', valeur: 25 },
      ]
    }]
  };

  return (
    <div className="Statistics">
      <div className="rf-container">

        <div className="rf-grid-row">
          <div className="rf-col-12">
            <div className="rf-mt-2w rf-mt-md-9w rf-mt-lg-13w"></div>
            { (statsDataError !== undefined && statsDataError !== false) &&
              <p className="rf-label flashBag" style={{ color: 'red' }}>
                {statsDataError?.toString()}
              </p>
            }
            <h1 className="title">Mes Statistiques</h1>
            <div className="rf-mb-5w rf-mt-md-4w"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-xs-3 rf-col-sm-7 rf-col-md-6 rf-col-lg-4">
            <div className="rf-mb-4w rf-mb-md-6w">
              <PeriodStatistics dateDebut={dateDebutStats} dateFin={dateFinStats} />
              <i className="ri-arrow-down-s-line ri-2x chevron"></i>
            </div>
          </div>

          <div className="rf-col-md-6 rf-col-lg-8">
            <hr className="hr-sm-hide"/>
            <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
          </div>
        </div>

        <div className="rf-grid-row">

          <LeftPage donneesStats={donneesStatistiques}/>

          <div className="rf-col-offset-md-1"></div>

          <RightPage donneesStats={donneesStatistiques}/>

          <BottomPage donneesStats={donneesStatistiques}/>

          {/* <StatisticsBanner /> On le cache car fonctionnalités pour + tard */}

        </div>
      </div>
      <div className="rf-m-5w rf-m-md-9w rf-m-lg-15w"></div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </div>
  );
}

export default Statistics;
