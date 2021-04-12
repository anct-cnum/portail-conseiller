import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

function ElementHighcharts(props) {

  roundedCorner(Highcharts);

  const { typeGraphique, largeurGraphique, hauteurGraphique,
    margeGaucheGraphique, margeDroiteGraphique, optionResponsive, couleursGraphique } = props.variablesGraphique.graphique;
  const { optionTitre, margeTitre, placementTitre } = props.variablesGraphique.titre;

  const categoriesStatistiques = setCategoriesStatistiques(props.donneesStats, typeGraphique);
  const chartStatistiques = setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique);
  const titreStatistiques = setStatistiquesTitre(optionTitre, margeTitre, placementTitre);
  const seriesStatistiques = setStatistiquesDonnees(props.donneesStats, typeGraphique, couleursGraphique);
  const legendStatistiques = setStatistiquesLegende(typeGraphique);
  const yAxisStatistiques = setStatistiquesAxeY(typeGraphique);
  const xAxisStatistiques = setStatistiquesAxeX(typeGraphique, optionResponsive, categoriesStatistiques);
  const plotOptionsStatistiques = setStatistiquesOptionsTrace(typeGraphique, optionResponsive);

  function setCategoriesStatistiques(donneesStats, typeGraphique) {

    let categories = [];
    donneesStats.forEach(element => {
      if (typeGraphique === 'bar') {
        categories.push(element.nom + '&nbsp;&nbsp;&nbsp;&nbsp;<b>' + element.valeur + '</b>');
      } else {
        categories.push(element.nom);
      }
    });

    return categories;
  }

  function setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique) {
    const type = typeGraphique === 'stacked' ? 'bar' : typeGraphique;

    let chart = {
      width: largeurGraphique,
      height: hauteurGraphique,
      marginLeft: margeGaucheGraphique,
      marginRight: margeDroiteGraphique,
      backgroundColor: '#1e1e1e',
      style: {
        fontFamily: 'Marianne'
      },
      container: {
        onclick: null
      }
    };

    if (typeGraphique !== 'xy') {
      chart.type = type;
    } else {
      chart.zoomType = type;
    }

    return chart;
  }

  function setStatistiquesTitre(optionTitre, margeTitre, placementTitre) {

    let titre = {
      text: optionTitre,
      margin: margeTitre,
      x: placementTitre,
      width: 300,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    };

    return titre;
  }

  function setStatistiquesDonnees(donneesStats, typeGraphique, couleursGraphique) {
    let donnees = {};

    let cumul = 0;
    let valeurs = [];
    let valeursCumul = [];

    donneesStats.forEach((element, i) => {
      if (typeGraphique === 'xy') {
        cumul += element.valeur;
        valeurs.push(element.valeur);
        valeursCumul.push(cumul);
      } else if (typeGraphique === 'stacked') {
        valeurs.push({
          name: element.nom,
          data: [element.valeur],
          color: couleursGraphique[i],
        });
      } else {
        valeurs.push({
          name: element.nom,
          y: element.valeur,
          color: couleursGraphique[i]
        });
      }
    });

    if (typeGraphique === 'stacked') {
      valeurs[0].borderRadiusTopLeft = '50%';
      valeurs[0].borderRadiusTopRight = '50%';
      valeurs[valeurs.length - 1].borderRadiusBottomLeft = '50%';
      valeurs[valeurs.length - 1].borderRadiusBottomRight = '50%';
      donnees = valeurs;
    } else if (typeGraphique === 'xy') {
      donnees = [{
        name: 'Accompagnement par mois',
        type: 'column',
        yAxis: 1,
        data: valeurs,
        color: '#169b62'
      }, {
        name: 'Accompagnement cumulés',
        data: valeursCumul,
        lineWidth: 5,
        color: '#f7a35c'
      }];
    } else {
      donnees = [{
        data: valeurs,
      }];
    }

    return donnees;
  }

  function setStatistiquesLegende(typeGraphique) {
    let legende = { };

    switch (typeGraphique) {

      case 'bar':

        legende = {
          enabled: false
        };

        break;

      case 'pie':

        legende = {
          align: 'left',
          itemStyle: {
            color: '#fff',
          },
          itemHoverStyle: {
            color: '#fff'
          },
          bubbleLegend: {
            style: {
              marginRight: '12px'
            }
          }
        };

        break;

      case 'column':

        legende = {
          enabled: false
        };

        break;

      case 'xy':

        legende = {
          backgroundColor: '#1e1e1e',
          align: 'left',
          itemStyle: {
            color: '#cdc8c3',
          },
          itemHoverStyle: {
            color: '#ffffff'
          }
        };

        break;

      case 'stacked':

        legende = {
          backgroundColor: '#1e1e1e',
          itemMarginBottom: 10,
          itemWidth: 200,
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

        break;

      default:
        break;
    }

    return legende;
  }

  function setStatistiquesAxeY(typeGraphique) {
    let axeY = { };

    switch (typeGraphique) {

      case 'bar':

        axeY = {
          title: {
            text: null
          },
          gridLineWidth: 0,
          labels: '',
        };

        break;

      case 'pie':

        axeY = null;

        break;

      case 'column':
        axeY = {
          title: {
            text: null
          },
          tickWidth: 1,
          tickColor: '#ffffff',
          gridLineWidth: 0,
          labels: {
            format: '<b>{value}</b>',
            style: {
              fontSize: '12px',
              color: '#ffffff',
            }
          }
        };

        break;

      case 'xy':

        axeY = [
          { // Primary yAxis
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
          }];

        break;

      case 'stacked':

        axeY = {
          visible: false
        };

        break;

      default:
        break;
    }
    return axeY;
  }

  function setStatistiquesAxeX(typeGraphique, optionResponsive, categoriesAxeX) {
    let axeX = { };

    switch (typeGraphique) {

      case 'bar':
        axeX = {
          categories: categoriesAxeX,
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
        };

        if (optionResponsive === true) {
          axeX.labels.align = 'left';
          axeX.labels.x = 0;
          axeX.labels.style.width = '300px';
        }

        break;

      case 'pie':

        axeX = null;

        break;

      case 'column':

        axeX = {
          categories: categoriesAxeX,
          title: {
            text: null
          },
          gridLineWidth: 0,
          lineWidth: 0,
          labels: {
            format: '<b>{value}</b>',
            style: {
              fontSize: '12px',
              color: '#fff',
            }
          },
        };

        break;

      case 'xy':
        axeX = [{
          categories: categoriesAxeX,
          crosshair: true,
          lineWidth: 0,
          labels: {
            style: {
              color: '#cdc8c3',
              fontSize: '15px'
            }
          }
        }];
        break;

      case 'stacked':

        axeX = {
          visible: false
        };

        break;

      default:
        break;
    }

    return axeX;
  }

  function setStatistiquesOptionsTrace(typeGraphique, optionResponsive) {
    let optionsTrace = { };

    switch (typeGraphique) {

      case 'bar':

        optionsTrace.bar = {
          borderRadius: 6,
          borderWidth: 0,
          pointWidth: 12,
        };

        if (optionResponsive === true) {
          optionsTrace.series = {
            pointPlacement: 'between',
          };
        }

        break;

      case 'pie':

        optionsTrace.pie = {
          events: {
            click: function(e) {
              e.preventDefault();
              return false;
            }
          },
          allowPointSelect: true,
          cursor: 'pointer',
          size: 162,
          dataLabels: {
            format: '&nbsp;&nbsp;{point.y}',
            color: '#fff',
            distance: '-40%',
            style: {
              fontSize: '12px',
            },
          },
          showInLegend: true,
          borderWidth: 0,
        };

        optionsTrace.series = {
          point: {
            events: {
              legendItemClick: function(e) {
                e.preventDefault();
                return false;
              }
            }
          }
        };

        if (optionResponsive === true) {
          optionsTrace.series = {
            pie: {
              center: [130, 70],
            },
            point: {
              events: {
                legendItemClick: function(e) {
                  e.preventDefault();
                  return false;
                }
              }
            }
          };
        }

        break;

      case 'column':

        optionsTrace = {
          column: {
            borderWidth: 0,
          },
          series: {
            pointWidth: 16
          }
        };

        break;

      case 'xy':

        optionsTrace = {
          column: {
            borderWidth: 0
          },
          series: {
            pointWidth: 16,
            events: {
              legendItemClick: function(e) {
                e.preventDefault();
              }
            }
          }
        };

        break;

      case 'stacked':

        optionsTrace = {
          series: {
            stacking: 'normal',
            events: {
              legendItemClick: function(e) {
                e.preventDefault();
              }
            }
          },
          bar: {
            pointPadding: 0.2,
            borderWidth: 0,
            pointWidth: 24,
          }
        };

        break;

      default:
        break;
    }

    return optionsTrace;
  }

  const optionsStatistiques = {
    credits: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    chart: chartStatistiques,
    title: titreStatistiques,
    series: seriesStatistiques,
    legend: legendStatistiques,
    yAxis: yAxisStatistiques,
    xAxis: xAxisStatistiques,
    plotOptions: plotOptionsStatistiques
  };

  return (
    <HighchartsReact highcharts={Highcharts} options={optionsStatistiques} />
  );
}

ElementHighcharts.propTypes = {
  donneesStats: PropTypes.array,
  variablesGraphique: PropTypes.object,
};

export default ElementHighcharts;
