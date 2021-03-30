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
  const statsEvolutions = periodeTest.statsEvolutions;
  const statsUsagers = periodeTest.statsUsagers;
  const statsAges = periodeTest.statsAges;

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

  let valeursAges = [];
  statsAges.forEach((age, i) => {
    if (i === statsAges.length - 1) {

    }
    valeursAges.push({
      name: age.nom,
      data: [age.valeur],
      color: tabColorAge[i],
      tooltip: {
        valueSuffix: '%'
      }
    });
  });
  valeursAges[0].borderRadiusTopLeft = '50%';
  valeursAges[0].borderRadiusTopRight = '50%';
  valeursAges[valeursAges.length - 1].borderRadiusBottomLeft = '50%';
  valeursAges[valeursAges.length - 1].borderRadiusBottomRight = '50%';

  let valeursStatus = [];
  statsUsagers.forEach((statut, i) => {
    if (i === statsUsagers.length - 1) {

    }
    valeursStatus.push({
      name: statut.nom,
      data: [statut.valeur],
      color: tabColorStatut[i],
      tooltip: {
        valueSuffix: '%'
      }
    });
  });

  valeursStatus[0].borderRadiusTopLeft = '50%';
  valeursStatus[0].borderRadiusTopRight = '50%';
  valeursStatus[valeursStatus.length - 1].borderRadiusBottomLeft = '50%';
  valeursStatus[valeursStatus.length - 1].borderRadiusBottomRight = '50%';

  const optionsChart1 = {
    credits: {
      enabled: false
    },
    chart: {
      zoomType: 'xy',
      backgroundColor: '#1e1e1e',
    },
    title: {
      text: 'Evolution des accompagnements',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
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

  const optionsChart2 = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
    },
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    title: {
      text: 'Tranches d\'âge des usagers',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
      }
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
      bar: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    legend: {
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
    },
    series: valeursAges
  };

  const optionsChart3 = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
    },
    yAxis: {
      visible: false
    },
    xAxis: {
      visible: false
    },
    title: {
      text: 'Statut des usagers',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
      bar: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    legend: {
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
    },
    series: valeursStatus,
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsChart1} /></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsChart2} /></div>
        <div className="rf-col-4"><HighchartsReact highcharts={Highcharts} options={optionsChart3} /></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

BottomPage.propTypes = {
  dataStats: PropTypes.object,
};
export default BottomPage;
