import React from 'react';
import PropTypes from 'prop-types';
import labelsCorrespondance from '../../../../data/labelsCorrespondance.json';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ElementHighcharts(props) {

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
      let libelle = labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom;
      if (typeGraphique === 'bar') {
        categories.push(libelle + '&nbsp;&nbsp;&nbsp;&nbsp;<b>' + element.valeur + '</b>');
      } else {
        categories.push(libelle);
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
      spacing: [0, 0, 0, 0],

      style: {
        fontFamily: 'Marianne',
        marginBottom: 150
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
      y: 13,
      width: 300,
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '24px'
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
          name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
          data: [element.valeur],
          color: couleursGraphique[i],
          borderColor: '#1e1e1e',
          borderWidth: 1,
        });
      } else if (typeGraphique === 'pie') {
        //Ne pas afficher la valeur 0 dans le camembert
        if (element.valeur === 0) {
          valeurs.push({
            name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
          });
        } else {
          valeurs.push({
            name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
            y: element.valeur,
            color: couleursGraphique[i]
          });
        }
      } else {
        valeurs.push({
          name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom,
          y: element.valeur,
          color: couleursGraphique[i]
        });
      }
    });

    if (typeGraphique === 'stacked') {

      if (valeurs[0].data[0] >= 8 && valeurs[valeurs.length - 1].data[0] >= 8) {
        valeurs[0].borderRadiusTopLeft = '100%';
        valeurs[0].borderRadiusTopRight = '100%';
        valeurs[valeurs.length - 1].borderRadiusBottomLeft = '100%';
        valeurs[valeurs.length - 1].borderRadiusBottomRight = '100%';
      }
      donnees = valeurs;
    } else if (typeGraphique === 'xy') {
      donnees = [{
        name: 'Accompagnement par mois',
        type: 'column',
        yAxis: 1,
        data: valeurs,
        color: '#169b62',
      }, {
        name: 'Accompagnement cumul&eacute;s',
        data: valeursCumul,
        lineWidth: 5,
        color: '#f7a35c',
        marker: {
          enabled: true,
          radius: 6
        },
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
          symbolPadding: 12,
          itemMarginBottom: 5,
          align: 'left',
          x: -10,
          itemStyle: {
            color: '#fff',
            fontWeight: 400,
            lineHeight: '20px'
          },
          itemHoverStyle: {
            color: '#fff'
          },
        };

        break;

      case 'column':

        legende = {
          enabled: false
        };

        break;

      case 'xy':

        legende = {
          symbolPadding: 12,
          itemMarginBottom: 5,
          align: 'left',
          itemStyle: {
            color: '#fff',
            fontWeight: 400,
          },
          itemHoverStyle: {
            color: '#fff'
          },
        };

        break;

      case 'stacked':

        legende = {
          symbolPadding: 12,
          reversed: true,
          align: 'left',
          x: -10,
          y: -60,
          itemMarginBottom: 5,
          itemStyle: {
            color: '#fff',
          },
          itemHoverStyle: {
            color: '#fff'
          },
          navigation: {
            enabled: false,
          },
          useHTML: true,
          labelFormatter: function() {
            if (this.data !== []) {
              //titre-legende-bis
              if (this.chart.title.textStr === 'Statut usagers') {
                return '<span class="titre-legende-bis">' + this.name + ' </span><span class="valeur-legende">' + this.options.data[0] + '%</span>';
              } else {
                return '<span class="titre-legende">' + this.name + ' </span><span class="valeur-legende">' + this.options.data[0] + '%</span>';
              }

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
          fontSize: '12px',
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
            textAlign: 'left',
            x: -26,
            format: '{value}',
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
            x: -24,
            format: '{value}',
            style: {
              color: '#ffffff',
              fontSize: '12px',
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
            y: 34,
            autoRotation: null,
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
          crosshair: false,
          lineWidth: 0,
          labels: {
            style: {
              color: '#fff',
              fontSize: '12px'
            }
          }
        }];
        break;

      case 'stacked':

        axeX = {
          offset: 10,
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
          borderWidth: 2,
          borderColor: '#1e1e1e',
          pointWidth: 12,
          pointPadding: 25,
          series: {
            states: {
              hover: {
                enabled: false,
              }
            },
          }
        };

        if (optionResponsive === true) {
          optionsTrace.series = {
            pointPlacement: 'between',
            states: {
              hover: {
                enabled: false,
              },
            },
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
            format: '{point.y}',
            color: '#fff',
            distance: '-40%',
            style: {
              fontSize: '12px',
              textOutline: '0px',
            },
          },
          showInLegend: true,
          borderWidth: 0,
        };

        optionsTrace.series = {
          states: {
            hover: {
              enabled: false,
            },
            inactive: {
              opacity: 1
            }
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
            states: {
              hover: {
                enabled: false,
              },
              inactive: {
                opacity: 1
              }
            },
            pointWidth: 16
          }
        };

        break;

      case 'xy':

        optionsTrace = {
          column: {
            borderWidth: 0,
            states: {
              hover: {
                enabled: false,
              },
              inactive: {
                opacity: 1,
              }
            },
          },
          series: {
            column: {
              states: {
                hover: {
                  enabled: false
                }
              }
            },
            states: {
              hover: {
                enabled: false,
              },
              inactive: {
                opacity: 1,
              }
            },
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
            states: {
              hover: {
                enabled: false,
              },
              inactive: {
                opacity: 1
              }
            },
            events: {
              legendItemClick: function(e) {
                e.preventDefault();
              }
            }
          },
          bar: {
            pointPadding: 0.2,
            pointWidth: 23,
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
