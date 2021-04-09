import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

//import ElementOptions from './Components/ElementOptions';

function RightPage(props) {

  roundedCorner(Highcharts);

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];

  const periodeTest = props.donneesStats.periodes[0];
  const { statsThemes, statsDurees, statsLieux } = periodeTest;

  //const optionsThemes = <ElementOptions donneesStats={statsThemes} variableGraphique={variableGraphique}></ElementOptions>;

  let themesAccompagnement = [];
  let valeursAccompagnement = [];
  statsThemes.forEach((theme, i) => {
    themesAccompagnement.push(theme.nom + '&nbsp;&nbsp;&nbsp;&nbsp;<b>' + theme.valeur + '</b>');
    valeursAccompagnement.push({
      y: theme.valeur,
      color: tabColorTheme[i]
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

  const optionsThemeAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
      marginLeft: 210,
      style: {
        fontFamily: 'Marianne'
      }
    },
    title: {
      text: 'Thèmes des accompagnements',
      margin: 48,
      width: 300,
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
        borderWidth: 0,
        pointWidth: 12
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

  /* Options pour l'écran SM - MD */
  const optionsThemeAccompagnementsMd = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'bar',
      backgroundColor: '#1e1e1e',
      marginLeft: 0,
      height: 650,
      style: {
        fontFamily: 'Marianne'
      }
    },
    title: {
      text: 'Thèmes des accompagnements',
      margin: 28,
      width: 300,
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
        borderWidth: 0,
        pointWidth: 12
      },
      series: {
        pointPlacement: 'between',
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
        align: 'left',
        x: 0,
        format: '{value}',
        style: {
          color: '#ffffff',
          width: '300px',
        },
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

  const optionsLieuxAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      backgroundColor: '#1e1e1e',
      marginLeft: 0,
      marginRight: 10,
      width: 300,
      style: {
        fontFamily: 'Marianne'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: 162,
        dataLabels: {
          format: '{point.y}',
          color: '#fff',
          distance: '-40%'
        },
        showInLegend: true,
        borderWidth: 0
      }
    },
    yAxis: {
      title: {
        text: null
      }
    },
    xAxis: null,
    title: {
      text: 'Lieux des accompagnements',
      margin: 48,
      width: 300,
      x: -10,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    legend: {
      align: 'left',
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
  };

  const optionsLieuxAccompagnementsMd = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'pie',
      backgroundColor: '#1e1e1e',
      marginLeft: 0,
      marginRight: 10,
      width: 300,
      height: 320,
      style: {
        fontFamily: 'Marianne'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        size: 162,
        center: [130, 70],
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
      width: 300,
      x: -10,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    legend: {
      align: 'left',
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
  };

  const optionsDureeAccompagnements = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'column',
      backgroundColor: '#1e1e1e',
      width: 300,
      marginRight: 55,
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
          color: '#fff',
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
          color: '#fff',
        }
      },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
      series: {
        pointWidth: 16
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
      width: 300,
      x: -12,
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
    <>
      <div className="rf-col-12 rf-col-md-5 rf-col-lg-7 graphique-responsive-lg">
        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12">
              <HighchartsReact highcharts={Highcharts} options={optionsThemeAccompagnements} />
            </div>

            <div className="rf-col-12">
              <div className="rf-my-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-lg-6">
              <HighchartsReact highcharts={Highcharts} options={optionsLieuxAccompagnements} />
            </div>

            <div className="rf-col-12 rf-col-lg-6">
              <div className="rf-ml-md-6w">
                <HighchartsReact highcharts={Highcharts} options={optionsDureeAccompagnements} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rf-col-12 rf-col-md-5 graphique-responsive-md">

        <div className="rf-container-fluid">
          <div className="rf-grid-row ">
            <div className="rf-col-12">
              <HighchartsReact highcharts={Highcharts} options={optionsThemeAccompagnementsMd} />
            </div>
          </div>
        </div>
      </div>

      <div className="rf-col-12 graphique-responsive-md">
        <div className="rf-container-fluid">
          <div className="rf-grid-row ">

            <div className="rf-col-12 rf-col-md-5 hr-sm-hide">
              <div className="rf-m-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-offset-md-1"></div>

            <div className="rf-col-12 rf-col-md-5">
              <div className="rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-md-6">
              <HighchartsReact highcharts={Highcharts} options={optionsLieuxAccompagnementsMd} />
            </div>

            <div className="rf-col-12 hr-md-hide">
              <div className="rf-m-6w rf-m-xs-to-md-7v"><hr/></div>
            </div>

            <div className="rf-col-12 rf-col-md-6">
              <HighchartsReact highcharts={Highcharts} options={optionsDureeAccompagnements} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

RightPage.propTypes = {
  donneesStats: PropTypes.object,
};

export default RightPage;
