import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import 'moment/locale/fr';
import ElementHighcharts from './Components/ElementHighcharts';

import labelsCorrespondance from '../../../data/labelsCorrespondance.json';
import { statistiqueActions } from '../../../actions/statistique.actions';

function BottomPage({ donneesStats, print, type }) {

  const dispatch = useDispatch();

  const listeAutresReorientations = useSelector(states => states.statistique.listeAutresReorientations);

  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
  const tabColorStatut = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];
  const tabColorCanaux = ['#ff8d7e', '#ffcc9f', '#5770be', '#466964'];
  const tabColorLieux = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e', '#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];
  const tabColorTemps = ['#2e2e2e', '#76adf8', '#a96751', '#496b30'];
  const tabColorDuree = ['#abcdf5', '#abcdf5', '#abcdf5', '#abcdf5'];
  const { statsUsagers, statsAges, statsTempsAccompagnements, statsDurees, statsLieux, statsReorientations } = donneesStats;

  //Tri liste des réorientations autres
  if (statsReorientations?.length > 0) {
    let donneesAutre = { nom: 'Autres&#0;', valeur: 0 };
    let listDelete = [];

    statsReorientations.forEach((donnees, i) => {
      if (donnees.valeur > 0) {
        if (labelsCorrespondance.find(label => label.nom === donnees.nom)?.correspondance === undefined) {
          donneesAutre.valeur += Number(donnees.valeur);
          if (!listeAutresReorientations.find(autre => autre === donnees.nom)) {
            listeAutresReorientations.push(donnees.nom);
          }
          listDelete.push(i);
        } else {
          donnees.valeur = Number(Number(donnees.valeur).toFixed(2));
        }
      } else {
        listDelete.push(i);
      }
    });

    listDelete.forEach(i => {
      delete statsReorientations[i];
    });
    if (!statsReorientations.find(stats => stats?.nom === 'Autres&#0;')) {
      donneesAutre.valeur = Number(Number(donneesAutre.valeur).toFixed(2));
      statsReorientations.push(donneesAutre);
      dispatch(statistiqueActions.updateListeAutresReorientations(listeAutresReorientations));
    }
  }

  const graphiqueAge = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 540,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorAge,
      largeurGraphiquePrint: 800,
      hauteurGraphiquePrint: 350,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 0,
    },
    titre: {
      optionTitre: 'Tranches d&rsquo;&acirc;ge des usagers',
      margeTitre: 34,
    }
  };

  const graphiqueStatut = {
    graphique: {
      typeGraphique: 'stacked',
      largeurGraphique: 540,
      hauteurGraphique: 300,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 0,
      optionResponsive: false,
      couleursGraphique: tabColorStatut,
      largeurGraphiquePrint: 800,
      hauteurGraphiquePrint: 350,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 0,
    },
    titre: {
      optionTitre: 'Statut des usagers',
      margeTitre: 34,
    }
  };

  const pieGraphique = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: false,
      couleursGraphique: tabColorCanaux,
      largeurGraphiquePrint: 850,
      hauteurGraphiquePrint: 320,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 10,
    },
    titre: {
      optionTitre: 'Canaux d&rsquo;accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const pieGraphiqueTemps = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: false,
      couleursGraphique: tabColorTemps,
      largeurGraphiquePrint: 850,
      hauteurGraphiquePrint: 320,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 10,
    },
    titre: {
      optionTitre: 'Temps en accompagnement',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const columnGraphique = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 360,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColorDuree,
      largeurGraphiquePrint: 850,
      hauteurGraphiquePrint: 500,
      margeGaucheGraphiquePrint: 55,
      margeDroiteGraphiquePrint: 55,
    },
    titre: {
      optionTitre: 'Dur&eacute;e des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const columnGraphiqueSm = {
    graphique: {
      typeGraphique: 'column',
      largeurGraphique: 300,
      hauteurGraphique: 310,
      margeGaucheGraphique: 55,
      margeDroiteGraphique: 55,
      optionResponsive: false,
      couleursGraphique: tabColorDuree
    },
    titre: {
      optionTitre: 'Dur&eacute;e des accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const graphiqueReorientationsSM = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 320,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: true,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Usager.ères réorienté.es',
      margeTitre: -17,
      placementTitre: 0
    }
  };

  const graphiqueReorientations = {
    graphique: {
      typeGraphique: 'pie',
      hauteurGraphique: 555,
      margeGaucheGraphique: -730,
      optionResponsive: false,
      couleursGraphique: tabColorLieux,
      largeurGraphiquePrint: 850,
      hauteurGraphiquePrint: 500,
      margeGaucheGraphiquePrint: -315,
      margeDroiteGraphiquePrint: 0,
    },
    titre: {
      optionTitre: 'Usager.ères réorienté.es',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  return (
    <>
      <div className="fr-col-11">
        <hr className="dont-print fr-my-6w" />
      </div>
      <div className="fr-col-12">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-5 fr-col-lg-5 age-print">
            <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} print={print}/>
          </div>
          {!print &&
            <div className="fr-col-12 dont-print hr-md-hide">
              <hr className="fr-my-6w"/>
            </div>
          }
          <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-5 fr-col-lg-5 statut-print">
            <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} print={print}/>
          </div>

          <div className="fr-col-12 fr-col-md-3 fr-mb-6w hr-sm-hide dont-print">
            <hr/>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-1 hr-sm-hide dont-print">
            <hr/>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-1 hr-sm-hide dont-print">
            <hr/>
          </div>
          <div className="fr-col-12 hr-md-hide dont-print">
            <hr className="fr-my-6w"/>
          </div>

          <div className="fr-col-12 fr-col-md-4 dont-print">
            <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} print={print}/>
          </div>
          <div className="fr-col-12 hr-md-hide dont-print">
            <hr className="fr-my-6w"/>
          </div>
          <div data-tooltip-id="infobulle-stats" className="dont-print" >
            <ElementHighcharts donneesStats={statsTempsAccompagnements} variablesGraphique={pieGraphiqueTemps} print={print}/>
          </div>
          <Tooltip className="infobulle tooltip-temps" id="infobulle-stats" arrowColor="white">
            <span>Comment calculons nous la donn&eacute;e&nbsp;?</span>
            <ul>
              <li>30min ou moins = 30min.</li>
              <li>30min &agrave; 1h = 1h.</li>
              <li>Au del&agrave; d&rsquo;1h nous prenons le temps exact renseign&eacute;.</li>
            </ul>
          </Tooltip>
          <div className="fr-col-12 hr-md-hide dont-print">
            <hr className="fr-my-6w"/>
          </div>
          <div className="fr-col-12 fr-col-md-4 dont-print">
            <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print}/>
          </div>
          <div className="fr-col-12 graphique-responsive-md dont-print">
            {statsReorientations?.length > 0 &&
              <>
                <hr className="fr-my-6w"/>
                <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientationsSM} print={print}/>
              </>
            }
          </div>
        </div>
      </div>

      <div className={`fr-col-12 only-print ${print ? '' : 'duree-print'}`}>
        {!print &&
          <div className="mozilla-espace-block"></div>
        }
        <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} print={true}/>
      </div>
      <div className={`fr-col-12 only-print ${print ? '' : 'duree-print'}`}>
        {!print &&
          <div className="mozilla-espace-block"></div>
        }
        <ElementHighcharts donneesStats={statsTempsAccompagnements} variablesGraphique={pieGraphiqueTemps} print={true}/>
      </div>
      <div className={`fr-col-12 only-print ${print ? '' : 'lieux-print'}`}>
        {!print &&
          <div className="mozilla-espace-block"></div>
        }
        <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphique} print={true}/>
      </div>

      <div className={type === 'conseiller' ?
        'fr-col-12 fr-col-offset-md-4 fr-col-md-8 graphique-responsive-lg reorientation-print-conseiller' :
        'fr-col-12 fr-col-offset-md-4 fr-col-md-8 graphique-responsive-lg reorientation-print'}
      >
        {statsReorientations?.length > 0 &&
          <>
            <hr className="fr-my-6w"/>
            <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations}
              listeAutres={listeAutresReorientations} print={print}/>
          </>
        }
        <div className="fr-m-no-reorientation"></div>
      </div>
    </>
  );
}

BottomPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool,
  type: PropTypes.string,
};
export default BottomPage;
