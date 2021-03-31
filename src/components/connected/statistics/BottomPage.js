import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

function BottomPage(props) {
  roundedCorner(Highcharts);

  const tabColorAge = ['#ff007a', '#6945bd', '#c6c9ae', '#ff5e3b', '#00ba8e'];
  const tabColorStatut = ['#a2b4b1', '#ffdbd2', '#a3a6bc', '#ddb094', '#fff480'];

  const periodeTest = props.dataStats.periodes[0];
  const { statsEvolutions, statsUsagers, statsAges } = periodeTest;

  let moisEvolution = [];
  let valeurEvolution = [];
  let valeurCumul = [];
  let cumul = 0;

  statsEvolutions.forEach(evolution => {
    cumul += evolution.valeur;
    moisEvolution.push(evolution.nom);
    valeurEvolution.push(evolution.valeur);
    valeurCumul.push(cumul);
  });

  let valeursAges = getValeurs(statsAges, tabColorAge);
  let valeursStatus = getValeurs(statsUsagers, tabColorStatut);

  function getValeurs(statValeurs, tabCouleurs) {
    let tabValeurs = [];
    statValeurs.forEach((element, i) => {
      tabValeurs.push({
        name: element.nom,
        data: [element.valeur],
        color: tabCouleurs[i],
        tooltip: {
          valueSuffix: '%'
        }
      });
    });

    tabValeurs[0].borderRadiusTopLeft = '50%';
    tabValeurs[0].borderRadiusTopRight = '50%';
    tabValeurs[tabValeurs.length - 1].borderRadiusBottomLeft = '50%';
    tabValeurs[tabValeurs.length - 1].borderRadiusBottomRight = '50%';

    return tabValeurs;
  }

  const titreEvoAccompagnement = setOptionsTitre('Évolution des accompagnements');
  const titreAgeUsagers = setOptionsTitre('Tranches d\'âge des usagers');
  const titreStatutUsagers = setOptionsTitre('Statut des usagers');

  function setOptionsTitre(optionTitre) {
    const titre = {
      text: optionTitre,
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '17px',
        fontWeight: 'bold'
      }
    };
    return titre;
  }

  const legendBarStacked = getLegendOptionBarStacked();
  const plotOptionsBarStacked = getPlotOptionsBarStacked();

  function getLegendOptionBarStacked() {
    const legend = {
      backgroundColor: '#1e1e1e',
      itemMarginBottom: 10,
      itemWidth: 200,
      y: -80,
      align: 'left',
      reversed: true,
      itemStyle: {
        color: '#cdc8c3',
      },
      itemHoverStyle: {
        color: '#ffffff'
      },
      labelFormatter: function() {
        if (this.data !== []) {
          return this.name + ' <span class="valeur-legende">' + this.options.data[0] + '%</span>';
        } else {
          return this.name;
        }
      }
    };
    return legend;
  }

  function getPlotOptionsBarStacked() {
    const plotOptions = {
      series: {
        stacking: 'normal',
      },
      bar: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    };
    return plotOptions;
  }

  const optionsEvolutionAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      zoomType: 'xy',
      backgroundColor: '#1e1e1e',
      style: {
        fontFamily: 'Marianne'
      }
    },
    title: titreEvoAccompagnement,
    xAxis: [{
      categories: moisEvolution,
      crosshair: true,
      lineWidth: 0,
      labels: {
        style: {
          color: '#cdc8c3',
          fontSize: '15px'
        }
      }
    }],
    yAxis: [{ // Primary yAxis
      tickWidth: 1,
      tickColor: '#f7a35c',
      gridLineWidth: 0,
      labels: {
        format: '{value}',
        style: {
          color: '#f7a35c',
        }
      },
      title: {
        text: '',
      },
      opposite: true
    }, { // Secondary yAxis
      tickWidth: 1,
      tickColor: '#169b62',
      gridLineWidth: 0,
      title: {
        text: '',
      },
      labels: {
        format: '{value}',
        style: {
          color: '#169b62'
        }
      },
    }],
    plotOptions: {
      column: {
        borderWidth: 0
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      backgroundColor: '#1e1e1e',
      itemStyle: {
        color: '#cdc8c3',
      },
      itemHoverStyle: {
        color: '#ffffff'
      }
    },
    series: [{
      name: 'Accompagnement par mois',
      type: 'column',
      yAxis: 1,
      data: valeurEvolution,
      color: '#169b62'
    }, {
      name: 'Accompagnement cumulés',
      data: valeurCumul,
      lineWidth: 5,
      color: '#f7a35c'
    }]
  };

  const optionsAgeUsagers = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
      style: {
        fontFamily: 'Marianne'
      }
    },
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    title: titreAgeUsagers,
    plotOptions: plotOptionsBarStacked,
    legend: legendBarStacked,
    series: valeursAges
  };

  const optionsStatutUsagers = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
      style: {
        fontFamily: 'Marianne'
      }
    },
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    title: titreStatutUsagers,
    plotOptions: plotOptionsBarStacked,
    legend: legendBarStacked,
    series: valeursStatus,
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row rf-grid-row--gutters">
        <div className="rf-col-4"><hr className="bar" /></div>
        <div className="rf-col-4"><hr className="bar" /></div>
        <div className="rf-col-4"><hr className="bar" /></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsEvolutionAccompagnements} /></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsAgeUsagers} /></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsStatutUsagers} /></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

BottomPage.propTypes = {
  dataStats: PropTypes.object,
};
export default BottomPage;
