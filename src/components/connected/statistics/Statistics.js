import React from 'react';

import ElementButton from './ElementButton';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import StatisticsBanner from './StatisticsBanner';

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
      nbReconduction: 12,
      tauxReconduction: 18,
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
        <div className="rf-grid-row rf-grid-row--gutters">
          <div className="rf-col-12">
            <div className="rf-m-12w"></div>
          </div>
          <div className="rf-col-12">
            <div className="rf-m-1w"></div>
          </div>
          <div className="rf-col-xs-12 rf-col-md-6 title">
            <h1 className="title" >Vos Statistiques</h1>
          </div>
          <div className="rf-col-2">
            <ElementButton titre="Accueil"/>
          </div>
          <div className="rf-col-4">
            <ElementButton titre="Enregistrer un nouvel accompagnement"/>
          </div>
          <div className="rf-col-4">
            <LeftPage dataStats={donneesStatistiques}/>
          </div>
          <div className="rf-col-8">
            <RightPage dataStats={donneesStatistiques}/>
          </div>
          <div className="rf-col-12">
            <BottomPage dataStats={donneesStatistiques}/>
          </div>
          <div className="rf-col-12">
            <StatisticsBanner />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Statistics;
