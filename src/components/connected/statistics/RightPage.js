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
  const { statsThemes, statsDurees, statsLieux } = periodeTest;

  let themesAccompagnement = [];
  let valeursAccompagnement = [];
  statsThemes.forEach((theme, i) => {
    themesAccompagnement.push(theme.nom + '&nbsp;&nbsp;<b>' + theme.valeur + '</b>');
    valeursAccompagnement.push({
      y: theme.valeur,
      color: tabColorTheme[i],
    });
    /* Version tablette et mobile */

  });

  let graphiquesResponsiveTheme = [];
  statsThemes.forEach((theme, i) => {
    graphiquesResponsiveTheme.push(

    );
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

  const optionsThemeAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
      height: 352,
      marginLeft: 205,
      style: {
        fontFamily: 'Marianne'
      }
    },
    title: {
      text: 'Thèmes des accompagnements',
      margin: 48,
      align: 'left',
      x: -10,
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
    }],

  };

  const optionsLieuxAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      backgroundColor: '#1e1e1e',
      height: 352,
      marginLeft: 0,
      marginRight: 50,
      style: {
        fontFamily: 'Marianne'
      }
    },
    plotOptions: {
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
      margin: 50,
      x: -10,
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
    tooltip: {
      enabled: false
    },
    series: [{
      data: valeursLieux
    }],
    responsive: {
      rules: [{
        condition: {
          minWidth: 320,
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            width: 200
          }
        },
        navigator: {
          enabled: false
        }
      }]
    }
  };

  const optionsDureeAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      backgroundColor: '#1e1e1e',
      height: 352,
      style: {
        fontFamily: 'Marianne'
      }
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
      enabled: false
    },
    title: {
      text: 'Durée des accompagnements',
      margin: 48,
      align: 'left',
      x: -10,
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    series: [{
      data: valeursDurees
    }],
    responsive: {
      rules: [{
        condition: {
          minWidth: 320,
          maxWidth: 500
        },
        chartOptions: {
          chart: {
            width: 200
          }
        },
        navigator: {
          enabled: false
        }
      }]
    }
  };

  return (
    <div className="rf-container-fluid">
      <div className="rf-grid-row ">
        <div className="rf-col-lg-12"><HighchartsReact highcharts={Highcharts} options={optionsThemeAccompagnements} /></div>
        <div className="rf-col-12">
          <div className="rf-my-6w"><hr/></div>
        </div>
        <div className="rf-col-lg-6"><HighchartsReact highcharts={Highcharts} options={optionsLieuxAccompagnements} /></div>
        <div className="rf-col-lg-6">
          <div className="rf-ml-6w"><HighchartsReact highcharts={Highcharts} options={optionsDureeAccompagnements} /></div>
        </div>
      </div>
    </div>
  );
}

RightPage.propTypes = {
  dataStats: PropTypes.object,
};

export default RightPage;
