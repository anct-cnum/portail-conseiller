import React from 'react';
import PropTypes from 'prop-types';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { userRoles } from '../../../../helpers';

import labelsCorrespondance from '../../../../data/labelsCorrespondance.json';

function ElementHighcharts({ donneesStats, variablesGraphique, print, listeAutres }) {

  const isReoriente = variablesGraphique.titre.optionTitre === 'Usager.ères réorienté.es';
  const { typeGraphique, largeurGraphique, largeurGraphiquePrint, hauteurGraphique, hauteurGraphiquePrint,
    margeGaucheGraphique, margeGaucheGraphiquePrint, margeDroiteGraphique, margeDroiteGraphiquePrint,
    optionResponsive, couleursGraphique } = variablesGraphique.graphique;
  const { optionTitre, margeTitre, placementTitre } = variablesGraphique.titre;

  const categoriesStatistiques = setCategoriesStatistiques(donneesStats, typeGraphique);
  const chartStatistiques = setStatistiquesGraphique(typeGraphique,
    largeurGraphique, largeurGraphiquePrint, hauteurGraphique, hauteurGraphiquePrint,
    margeGaucheGraphique, margeGaucheGraphiquePrint, margeDroiteGraphique, margeDroiteGraphiquePrint
  );
  const titreStatistiques = setStatistiquesTitre(optionTitre, margeTitre, placementTitre);
  const seriesStatistiques = setStatistiquesDonnees(donneesStats, typeGraphique, couleursGraphique, optionTitre);
  const legendStatistiques = setStatistiquesLegende(typeGraphique, isReoriente, optionTitre === 'Temps en accompagnement', donneesStats);
  const yAxisStatistiques = setStatistiquesAxeY(typeGraphique);
  const xAxisStatistiques = setStatistiquesAxeX(typeGraphique, optionResponsive, categoriesStatistiques);
  const plotOptionsStatistiques = setStatistiquesOptionsTrace(typeGraphique, optionResponsive, isReoriente);

  function setCategoriesStatistiques(donneesStats, typeGraphique) {
    let categories = [];
    donneesStats.forEach(element => {
      let libelle = labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element.nom;
      if (typeGraphique === 'bar') {
        categories.push(libelle + '&nbsp;&nbsp;&nbsp;&nbsp;<i>' + element.pourcent + '</i>%&nbsp;&nbsp;&nbsp;&nbsp;<b>' + element.valeur + '</b>');
      } else {
        categories.push(libelle);
      }
    });

    return categories;
  }

  function setStatistiquesGraphique(
    typeGraphique, largeurGraphique, largeurGraphiquePrint, hauteurGraphique, hauteurGraphiquePrint, margeGaucheGraphique, margeDroiteGraphique) {
    const type = typeGraphique === 'stacked' ? 'bar' : typeGraphique;
    let chart = {
      width: print ? largeurGraphiquePrint : largeurGraphique,
      height: print ? hauteurGraphiquePrint : hauteurGraphique,
      marginLeft: print ? margeGaucheGraphiquePrint : margeGaucheGraphique,
      marginRight: print ? margeDroiteGraphiquePrint : margeDroiteGraphique,
      backgroundColor: print ? '#fff' : '#1e1e1e',
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
      chart.colorCount = 30;
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
      y: print ? 50 : 13,
      width: print ? 800 : 400,
      align: 'left',
      style: {
        color: print ? '#1e1e1e' : '#fff',
        fontSize: print ? '2rem' : '16px',
        fontWeight: 'bold',
        lineHeight: '24px'
      }
    };

    return titre;
  }

  function setStatistiquesDonnees(donneesStats, typeGraphique, couleursGraphique, titreGraphique) {
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
          borderColor: print ? '#fff' : '#1e1e1e',
          borderWidth: 1,
        });
      } else if (typeGraphique === 'pie') {
        //Ne pas afficher la valeur 0 dans le camembert
        if (titreGraphique === 'Temps en accompagnement') {
          let labelValeur = '';
          const valeur = element.valeur ?? 0;
          const pourcentage = element.pourcent ?? 0;
          if (element.nom !== 'total') {
            switch (element.nom) {
              case 'individuel':
                labelValeur = 'individuels&nbsp;&nbsp;&nbsp;' + pourcentage + '%&nbsp;&nbsp;&nbsp;<b>' + valeur + 'h</b>';
                break;
              case 'collectif':
                labelValeur = 'collectifs&nbsp;&nbsp;&nbsp;' + pourcentage + '%&nbsp;&nbsp;&nbsp;<b>' + valeur + 'h</b>';
                break;
              case 'ponctuel':
                labelValeur = 'ponctuels&nbsp;&nbsp;&nbsp;' + pourcentage + '%&nbsp;&nbsp;&nbsp;<b>' + valeur + 'h</b>';
                break;
              default:
                break;
            }
            valeurs.push({
              name: labelValeur,
              y: element.pourcent > 0 ? element.pourcent : null,
              color: couleursGraphique[i],
              visible: true
            });
          }
        } else if (titreGraphique !== 'Temps en accompagnement') {
          valeurs.push({
            name: labelsCorrespondance.find(label => label.nom === element.nom)?.correspondance ?? element?.nom,
            y: element?.valeur > 0 ? element?.valeur : null,
            color: couleursGraphique[i],
            visible: true
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

      if (valeurs[0].data[0] >= 8 && valeurs[valeurs?.length - 1].data[0] >= 8) {
        valeurs[0].borderRadiusTopLeft = '100%';
        valeurs[0].borderRadiusTopRight = '100%';
        valeurs[valeurs?.length - 1].borderRadiusBottomLeft = '100%';
        valeurs[valeurs?.length - 1].borderRadiusBottomRight = '100%';
      }
      donnees = valeurs;
    } else if (typeGraphique === 'xy') {
      donnees = [{
        name: 'Accompagnements par mois',
        type: 'column',
        yAxis: 1,
        data: valeurs,
        color: '#169b62',
      }, {
        name: 'Accompagnements cumul&eacute;s',
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

  function setStatistiquesLegende(typeGraphique, isReoriente, optionLegend = false, donneesStats = false) {
    let legende = {};

    switch (typeGraphique) {

      case 'bar':

        legende = {
          enabled: false
        };

        break;

      case 'pie':
        if (isReoriente) {
          const x = print ? -100 : -165;
          legende = {
            title: optionResponsive ? {} : {
              text: '<span>Lieux</span>',
              style: {
                fontFamily: 'Marianne',
                fontWeight: 'bold',
                fontSize: '16px',
                color: print ? '#1e1e1e' : '#fff',
              }
            },
            itemMarginBottom: 5,
            symbolPadding: 12,
            verticalAlign: optionResponsive ? 'bottom' : 'right',
            align: optionResponsive ? 'left' : 'right',
            x: optionResponsive ? 0 : x,
            y: optionResponsive ? 0 : 65,
            width: optionResponsive ? '100%' : '30%',
            maxHeight: '450px',
            itemStyle: {
              color: print ? '#1e1e1e' : '#fff',
              fontWeight: 400,
              lineHeight: '20px',
            },
            itemHoverStyle: {
              color: print ? '#1e1e1e' : '#fff'
            },
          };
        } else {
          legende = {
            symbolPadding: 12,
            itemMarginBottom: 5,
            align: 'left',
            x: -10,
            y: 0,
            width: '100%',
            itemStyle: {
              color: print ? '#1e1e1e' : '#fff',
              fontWeight: 400,
              lineHeight: '20px'
            },
            itemHoverStyle: {
              color: print ? '#1e1e1e' : '#fff'
            },
          };

          if (optionLegend) {
            const totalHeure = donneesStats.find(stats => stats.nom === 'total').valeur;
            legende.title = {
              text: '<span>&nbsp;au total <b>' + totalHeure + 'h </b><br/> dont : <br/></span>',
              style: {
                fontFamily: 'Marianne',
                fontSize: '12px',
                fontWeight: 400,
                color: print ? '#1e1e1e' : '#fff',
              }
            };
          }
        }
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
            color: print ? '#1e1e1e' : '#fff',
            fontWeight: 400,
          },
          itemHoverStyle: {
            color: print ? '#1e1e1e' : '#fff'
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
            color: print ? '#1e1e1e' : '#fff',
          },
          itemHoverStyle: {
            color: print ? '#1e1e1e' : '#fff'
          },
          navigation: {
            enabled: false,
          },
          useHTML: true,
          labelFormatter: function() {
            if (this.data?.length > 0) {
              //titre-legende-bis
              if (this.chart.title.textStr === 'Statut des usagers') {
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
    let axeY = {};

    switch (typeGraphique) {

      case 'bar':

        axeY = {
          title: {
            text: null
          },
          gridLineWidth: 0,
          fontSize: '12px',
          labels: {
            enabled: false
          },
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
          tickColor: print ? '#1e1e1e' : '#fff',
          gridLineWidth: 0,

          labels: {
            textAlign: 'left',
            x: -26,
            format: '{value}',
            style: {
              fontSize: '12px',
              color: print ? '#1e1e1e' : '#fff',
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
    let axeX = {};

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
            x: -8,
            format: '{value}',
            style: {
              color: print ? '#1e1e1e' : '#fff',
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
              color: print ? '#1e1e1e' : '#fff',
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
              color: print ? '#1e1e1e' : '#fff',
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

  function setStatistiquesOptionsTrace(typeGraphique, optionResponsive, isReoriente) {
    let optionsTrace = {};

    switch (typeGraphique) {

      case 'bar':

        optionsTrace.bar = {
          borderRadius: 6,
          borderWidth: 2,
          borderColor: print ? '#fff' : '#1e1e1e',
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
          size: isReoriente && !optionResponsive ? 382 : 162,
          dataLabels: {
            format: userRoles()?.includes('admin_coop') || isReoriente ? '{point.y}%' : '{point.y}',
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

  if (isReoriente) {
    Highcharts.getOptions().colors.push('#cac5b0');
    Highcharts.getOptions().colors.push('#abb8df');
    Highcharts.getOptions().colors.push('#fdcf41');
    Highcharts.getOptions().colors.push('#169b62');
    Highcharts.getOptions().colors.push('#80d5c6');
    Highcharts.getOptions().colors.push('#ff8d7e');
    Highcharts.getOptions().colors.push('#714753');
    Highcharts.getOptions().colors.push('#956052');
    Highcharts.getOptions().colors.push('#ffed33');
    Highcharts.getOptions().colors.push('#be9b31');
    Highcharts.getOptions().colors.push('#caffb0');
    Highcharts.getOptions().colors.push('#abbeef');
    Highcharts.getOptions().colors.push('#11cf41');
    Highcharts.getOptions().colors.push('#18eb62');
    Highcharts.getOptions().colors.push('#a9d5c6');
    Highcharts.getOptions().colors.push('#f18d7e');
    Highcharts.getOptions().colors.push('#114753');
    Highcharts.getOptions().colors.push('#bb6052');
    Highcharts.getOptions().colors.push('#66ed33');
    Highcharts.getOptions().colors.push('#b78b31');
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={optionsStatistiques} />
      {listeAutres && listeAutres?.length > 0 &&
        <div className="lieux-autres dont-print">
          <div className="fr-mt-list">Autres <span>(écrits manuellement)</span></div>
          <ul>
            {listeAutres?.map((autres, idx) => {
              return (<li key={idx}>{autres}</li>);
            })}
          </ul>
        </div>
      }
    </>
  );
}

ElementHighcharts.propTypes = {
  donneesStats: PropTypes.array,
  variablesGraphique: PropTypes.object,
  print: PropTypes.bool,
  listeAutres: PropTypes.array,
};

export default ElementHighcharts;
