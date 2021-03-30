import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

function RightPage(props) {

  roundedCorner(Highcharts);

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];
  const periodeTest = props.dataStats.periodes[0];
  const statsThemes = periodeTest.statsThemes;
  const statsDurees = periodeTest.statsDurees;
  const statsLieux = periodeTest.statsLieux;

  let themesAccompagnement = [];
  let valeursAccompagnement = [];
  statsThemes.forEach((theme, i) => {
    themesAccompagnement.push(theme.nom + '&nbsp;&nbsp;<b>' + theme.valeur + '</b>');
    valeursAccompagnement.push({
      y: theme.valeur,
      color: tabColorTheme[i],
    });
  });

  let valeursLieux = [];
  statsLieux.forEach((lieu, i) => {
    valeursLieux.push({
      name: lieu.nom,
      y: lieu.valeur,
      color: tabColorLieux[i],
    });
  });

  let dureeAccompagnement = [];
  let valeursDurees = [];
  statsDurees.forEach(duree => {
    dureeAccompagnement.push(duree.nom);
    valeursDurees.push({
      y: duree.valeur,
      color: '#abcdf5',
    });
  });

  const optionsChart1 = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
    },
    title: {
      text: 'Thèmes des accompagnements',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderWidth: 0
      }
    },
    xAxis: {
      categories: themesAccompagnement,
      title: {
        text: null
      },
      lineWidth: 0,
      gridLineWidth: 0,
      labels: {
        format: '{value}',
        style: {
          color: '#ffffff',
        }
      },
    },
    yAxis: {
      title: {
        text: null
      },
      gridLineWidth: 0,
      labels: '',
    },
    series: [{
      data: valeursAccompagnement,
    }]
  };

  const optionsChart2 = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      backgroundColor: '#1e1e1e',
    },
    plotOptions: {
      innerHeight:240,
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          format: '{point.y}',
          color: '#fff',
          distance: '-40%'
        },
        showInLegend: true,
        borderWidth: 0
      }
    },
    title: {
      text: 'Lieux des accompagnements',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    legend: {
      itemStyle: {
        color: '#cdc8c3',
      },
      itemHoverStyle: {
        color: '#ffffff'
      }
    },
    series: [{
      data: valeursLieux
    }]
  };

  const optionsChart3 = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      backgroundColor: '#1e1e1e',
    },
    xAxis: {
      categories: dureeAccompagnement,
      title: {
        text: null
      },
      gridLineWidth: 0,
      lineWidth: 0,
      className: 'highcharts-axis-dark',
      labels: {
        format: '<b>{value}</b>',
        style: {
          fontSize: 16,
          color: '#cdc8c3',
        }
      },
    },
    yAxis: {
      title: {
        text: null
      },
      tickWidth: 1,
      tickColor: '#ffffff',
      gridLineWidth: 0,
      className: 'highcharts-axis-dark',
      labels: {
        format: '<b>{value}</b>',
        style: {
          fontSize: 16,
          color: '#cdc8c3',
        }
      },
    },
    plotOptions: {
      column: {
        borderWidth: 0
      }
    },
    legend: {
      enabled: false
    },
    tooltip: {
      pointFormat: '<div style="text-align: right">{point.y}</div>'
    },
    title: {
      text: 'Durée des accompagnements',
      margin: 48,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    series: [{
      data: valeursDurees
    }]
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">
          <hr></hr>
          <div className="rf-m-6w"></div>
        </div>
        <div className="rf-col-12"><HighchartsReact highcharts={Highcharts} options={optionsChart1} /></div>
        <div className="rf-col-12">
          <div className="rf-m-6w"></div>
          <hr></hr>
          <div className="rf-m-6w"></div>
        </div>
        <div className="rf-col-6"><HighchartsReact highcharts={Highcharts} options={optionsChart2} /></div>
        <div className="rf-col-6"><HighchartsReact highcharts={Highcharts} options={optionsChart3} /></div>
      </div>
    </div>
  );
}

RightPage.propTypes = {
  dataStats: PropTypes.object,
};

export default RightPage;
