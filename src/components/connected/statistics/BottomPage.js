import React from 'react';
import PropTypes from 'prop-types';
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
  const tabColorLieux = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e', '#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];
  const tabColorTemps = ['', '#76adf8', '#a96751', '#496b30'];
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
          donnees.valeur = Math.round(donnees.valeur);
        }
      } else {
        listDelete.push(i);
      }
    });

    listDelete.forEach(i => {
      delete statsReorientations[i];
    });
    if (!statsReorientations.find(stats => stats?.nom === 'Autres&#0;')) {
      donneesAutre.valeur = Math.round(donneesAutre.valeur);
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
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 300,
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
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 300,
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
      couleursGraphique: tabColorLieux,
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 400,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 10,
    },
    titre: {
      optionTitre: 'Canaux d&rsquo;accompagnements',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const pieGraphiqueSm = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: true,
      couleursGraphique: tabColorLieux
    },
    titre: {
      optionTitre: 'Canaux d&rsquo;accompagnements',
      margeTitre: -17,
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
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 400,
      margeGaucheGraphiquePrint: 0,
      margeDroiteGraphiquePrint: 10,
    },
    titre: {
      optionTitre: 'Temps en accompagnement',
      margeTitre: 48,
      placementTitre: 0
    }
  };

  const pieGraphiqueSmTemps = {
    graphique: {
      typeGraphique: 'pie',
      largeurGraphique: 300,
      hauteurGraphique: 320,
      margeGaucheGraphique: 0,
      margeDroiteGraphique: 10,
      optionResponsive: true,
      couleursGraphique: tabColorTemps
    },
    titre: {
      optionTitre: 'Temps en accompagnement',
      margeTitre: -17,
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
      largeurGraphiquePrint: 1100,
      hauteurGraphiquePrint: 450,
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

      largeurGraphiquePrint: 1100,
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
      <div className="fr-col-12 dont-print">
        <div className="fr-grid-row">
          <div className="fr-col-12 fr-col-md-5 fr-col-lg-6 age-print">
            <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} print={print}/>
          </div>
          {/**
           <div className="fr-col-12 fr-col-md-5 graphique-responsive-md dont-print">
            {statsReorientations?.length > 0 &&
              <>
                <div className="fr-mt-6w fr-mb-5w fr-m-xs-to-md-7v"><hr/></div>
                <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientationsSM} print={print}/>
              </>
            }
          </div>


            <div className="fr-mt-6w fr-mb-5w fr-m-xs-to-md-7v dont-print"><hr/></div>
            <div className="fr-mt-6w fr-mb-5w fr-m-xs-to-md-7v"><hr className="dont-print"/></div>
          */}
          <div className="fr-col-12 fr-col-md-5 fr-col-lg-6 statut-print">
            <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} print={print}/>
          </div>

          <div className="fr-col-12 fr-col-md-3 dont-print">
            <hr/>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-1 dont-print">
            <hr/>
          </div>
          <div className="fr-col-12 fr-col-md-3 fr-col-offset-1 dont-print">
            <hr/>
          </div>

          <div className="fr-col-12 fr-col-md-4 dont-print">
            <ElementHighcharts donneesStats={statsLieux} variablesGraphique={pieGraphique} print={print}/>
          </div>

          <div className="fr-col-12 fr-col-md-4 dont-print">
            <ElementHighcharts donneesStats={statsTempsAccompagnements} variablesGraphique={pieGraphiqueTemps} print={print}/>
          </div>

          <div className="fr-col-12 fr-col-lg-4 dont-print">
            <ElementHighcharts donneesStats={statsDurees} variablesGraphique={columnGraphiqueSm} print={print}/>
          </div>



          <div className={type === 'conseiller' ? 'fr-col-12 fr-col-offset-md-4 fr-col-md-8 graphique-responsive-lg reorientation-print-conseiller' :
            'fr-col-12 fr-col-offset-md-4 fr-col-md-8 graphique-responsive-lg reorientation-print'}
          >
            <div className="fr-mt-6w"></div>
            {statsReorientations?.length > 0 &&
              <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations}
                listeAutres={listeAutresReorientations} print={print}/>
            }
            <div className="fr-m-no-reorientation"></div>
          </div>
        </div>
      </div>


      {/*
        </div>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print" >
        <ElementHighcharts donneesStats={statsAges} variablesGraphique={graphiqueAge} print={true}/>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print" >
        <ElementHighcharts donneesStats={statsUsagers} variablesGraphique={graphiqueStatut} print={true}/>
      </div>
      <div className="fr-col-12 fr-mb-6w only-print evolution-print">
        <ElementHighcharts donneesStats={statsEvolutionsFiltered} variablesGraphique={graphiqueEvolution} print={true}/>
      </div>
      <div className="fr-col-12 only-print">
        {statsReorientations?.length > 0 &&
          <ElementHighcharts donneesStats={statsReorientations} variablesGraphique={graphiqueReorientations}
            listeAutres={listeAutresReorientations} print={true}/>
        }
      </div>

    */}
    </>
  );
}

BottomPage.propTypes = {
  donneesStats: PropTypes.object,
  print: PropTypes.bool,
  type: PropTypes.string,
};
export default BottomPage;
