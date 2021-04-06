import React from 'react';

import PeriodStatistics from './PeriodStatistics';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';
import StatisticsBanner from '../statistics/StatisticsBanner';

function Statistics() {
  const donneesStatistiques = {
    periodes: [{
      dateDebut: '04/01/2021',
      dateFin: '05/02/2021',
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
        { nom: '0 à 30 min.', valeur: 1 },
        { nom: '30 min. à 1h', valeur: 3 },
        { nom: '1h à 2h', valeur: 2 },
        { nom: '2h et plus', valeur: 5 },
      ],
      statsEvolutions: [
        { nom: 'Avril', valeur: 25 },
        { nom: 'Mai', valeur: 85 },
        { nom: 'Juin', valeur: 45 },
        { nom: 'Juillet', valeur: 75 },
      ],
      statsAges: [
        { nom: '-12 ans', valeur: 4 },
        { nom: '12-18 ans', valeur: 8 },
        { nom: '18-35 ans', valeur: 12 },
        { nom: '35-60 ans', valeur: 31 },
        { nom: '60 ans et plus', valeur: 45 },
      ],
      statsUsagers: [
        { nom: 'Non renseigné', valeur: 2 },
        { nom: 'Etudiant', valeur: 8 },
        { nom: 'En emploi', valeur: 20 },
        { nom: 'Sans emploi', valeur: 33 },
        { nom: 'Retraité', valeur: 37 },
      ]
    }]
  };

  return (
    <div className="Statistics">
      <div className="rf-container">

        <div className="rf-grid-row">
          <div className="rf-col-1"></div>
          <div className="rf-col-11">
            <div className="rf-ml-1w"></div>
            <div className="rf-mb-sm-4w">
              <h1 className="title">Mes Statistiques</h1>
            </div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-sm-1"></div>
          <div className="rf-col-sm-4 rf-col-md-3">
            <div className="rf-m-md-2w rf-m-lg-1w"></div>
            <PeriodStatistics dateDebut={donneesStatistiques.periodes[0].dateDebut} dateFin={donneesStatistiques.periodes[0].dateFin} />
          </div>
          <div className="rf-col-1">
            <i className="ri-arrow-down-s-line ri-2x chevron"></i>
          </div>
          <div className="rf-col-md-6 rf-col-lg-7">
            <div className="rf-m-md-3w"></div>
            <hr className="hr-sm-hide"/>
            <div className="rf-m-6w rf-m-xs-to-md-7v"></div>
          </div>
        </div>

        <div className="rf-grid-row">
          <div className="rf-col-offset-lg-1"></div>
          <div className="rf-col-md-6 rf-col-lg-3">
            <LeftPage dataStats={donneesStatistiques}/>
          </div>

          <div className="rf-col-offset-lg-1"></div>
          <div className="rf-col-md-6 rf-col-lg-7">
            <RightPage dataStats={donneesStatistiques}/>
          </div>

          <div className="rf-col-lg-12">
            <BottomPage dataStats={donneesStatistiques}/>
          </div>

          <div className="rf-col-offset-lg-1"></div>
          <div className="rf-col-lg-11">
            <hr />
          </div>
          <div className="rf-col-lg-12">
            <div className="rf-m-5w"></div>
            <StatisticsBanner />
            <div className="rf-m-10w"></div>
          </div>
        </div>
      </div>
      <div className="rf-m-5w"></div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </div>
  );
}

export default Statistics;
