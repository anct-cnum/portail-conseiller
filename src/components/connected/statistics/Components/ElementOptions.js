import React from 'react';
import PropTypes from 'prop-types';

function ElementOptions(props) {

  const tabColorTheme = ['#cac5b0', '#abb8df', '#fdcf41', '#169b62', '#80d5c6', '#ff8d7e', '#714753', '#956052', '#ddb094', '#5770be', '#ffed33', '#be9b31'];
  const tabColorLieux = ['#ffcc9f', '#ff8d7e', '#466964', '#5770be'];

  const { typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique } = props.variablesGraphique.graphique;
  const { optionTitre, margeTitre, placementTitre } = props.variablesGraphique.titre;

  const chartStatistiques = setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique);
  const titreStatistiques = setStatistiquesTitre(optionTitre, margeTitre, placementTitre);
  const seriesStatistiques = setStatistiquesDonnees();
  const legendStatistiques = setStatistiquesLegende();
  const yAxisStatistiques = setStatistiquesAxeY();
  const xAxisStatistiques = setStatistiquesAxeX();
  const plotOptionsStatistiques = setStatistiquesOptionsTrace();

  function setStatistiquesGraphique(typeGraphique, largeurGraphique, hauteurGraphique, margeGaucheGraphique, margeDroiteGraphique) {

    let chart = {
      type: typeGraphique === 'stacked' ? 'bar' : typeGraphique,
      width: largeurGraphique,
      height: hauteurGraphique,
      marginLeft: margeGaucheGraphique,
      marginRight: margeDroiteGraphique,
      backgroundColor: '#1e1e1e',
      style: {
        fontFamily: 'Marianne'
      }
    };

    if (typeGraphique !== 'xy') {
      chart.type = typeGraphique;
    } else {
      chart.zoomType = typeGraphique;
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

  function setStatistiquesDonnees() {
    let donnees = {};

    /* ********************************************************************** */
    /*
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
                      enabled: false
                    },
                  });
                });

                tabValeurs[0].borderRadiusTopLeft = '50%';
                tabValeurs[0].borderRadiusTopRight = '50%';
                tabValeurs[tabValeurs.length - 1].borderRadiusBottomLeft = '50%';
                tabValeurs[tabValeurs.length - 1].borderRadiusBottomRight = '50%';

                return tabValeurs;
              }
    */
    /* ********************************************************************** */

    switch (typeGraphique) {

      case 'bar':

        break;

      case 'pie':

        break;

      case 'column':

        break;

      case 'xy':

        break;

      case 'stacked':

        break;

      default:
        break;
    }

    return donnees;
  }

  function setStatistiquesLegende() {
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
            color: '#cdc8c3',
          },
          itemHoverStyle: {
            color: '#ffffff'
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
          className: 'highcharts-axis-dark',
          labels: {
            format: '<b>{value}</b>',
            style: {
              fontSize: 16,
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
          className: 'highcharts-axis-dark',
          labels: {
            format: '<b>{value}</b>',
            style: {
              fontSize: 16,
              color: '#cdc8c3',
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

  function setStatistiquesOptionsTrace(typeGraphique, optionResponsive) {
    let optionsTrace = { };

    switch (typeGraphique) {

      case 'bar':

        optionsTrace.bar = {
          borderRadius: 6,
          borderWidth: 0,
          pointWidth: 12
        };

        if (optionResponsive !== true) {
          optionsTrace.series = {
            pointPlacement: 'between',
          };
        }

        break;

      case 'pie':

        optionsTrace.pie = {
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
        };

        if (optionResponsive !== true) {
          optionsTrace.series.pie.center = [130, 70];
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
            pointWidth: 16
          }
        };

        break;

      case 'stacked':

        optionsTrace = {
          series: {
            stacking: 'normal',
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

}

ElementOptions.propTypes = {
  donneesStats: PropTypes.object,
  variablesGraphique: PropTypes.object,
};

export default ElementOptions;
