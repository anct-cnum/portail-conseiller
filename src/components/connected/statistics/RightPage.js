import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

function RightPage() {
  roundedCorner(Highcharts);

  const themesAccompagnement = [
    'Équipement informatique &nbsp;&nbsp;<b>5</b>',
    'Naviguer sur Internet &nbsp;&nbsp;<b>40</b>',
    'Courriels &nbsp;&nbsp;<b>10</b>',
    'Applications smartphone &nbsp;&nbsp;<b>7</b>',
    'Gestion de contenus numériques &nbsp;&nbsp;<b>6</b>',
    'Env., vocab. numérique &nbsp;&nbsp;<b>21</b>',
    'Traitement de texte &nbsp;&nbsp;<b>8</b>',
    'Échanger avec ses proches &nbsp;&nbsp;<b>13</b>',
    'Emploi, formation &nbsp;&nbsp;<b>18</b>',
    'Accompagner son enfant &nbsp;&nbsp;<b>9</b>',
    'Numérique et TPE/PME &nbsp;&nbsp;<b>25</b>',
    'Démarche en ligne &nbsp;&nbsp;<b>17</b>'
  ];

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
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
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
          fontSize: 16,
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
      data: [
        {
          y: 5,
          color: '#cac5b0',

        }, {
          y: 40,
          color: '#abb8df',
        }, {
          y: 10,
          color: '#fdcf41',
        }, {
          y: 7,
          color: '#169b62',
        }, {
          y: 6,
          color: '#80d5c6',
        }, {
          y: 21,
          color: '#ff8d7e',
        }, {
          y: 8,
          color: '#714753',
        }, {
          y: 13,
          color: '#956052',
        }, {
          y: 18,
          color: '#ddb094',
        }, {
          y: 9,
          color: '#5770be',
        }, {
          y: 25,
          color: '#ffed33',
        }, {
          y: 17,
          color: '#be9b31',
        }],
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
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        borderWidth: 0
      }
    },
    title: {
      text: 'Lieux des accompagnements',
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    legend: {
      itemStyle: {
        color: '#cdc8c3',
      }
    },
    series: [{
      data: [{
        name: 'À domicile',
        y: 12,
        color: '#ffcc9f'
      }, {
        name: 'À distance',
        y: 15,
        color: '#ff8d7e'
      }, {
        name: 'Autre lieu',
        y: 27,
        color: '#466964'
      }, {
        name: 'Lieu de rattachement',
        y: 22,
        color: '#5770be'
      }]
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
      categories: ['0 à 30 min.', '30 min. à 1h', '1h à 2h', '2h ou plus'],
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
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    series: [{
      data: [{
        y: 1,
        color: '#abcdf5'
      }, {
        y: 3,
        color: '#abcdf5'
      }, {
        y: 2,
        color: '#abcdf5'
      }, {
        y: 5,
        color: '#abcdf5'
      }]
    }]
  };

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12"><hr></hr></div>
        <div className="rf-col-12"><HighchartsReact highcharts={Highcharts} options={optionsChart1} /></div>
        <div className="rf-col-12"><hr></hr></div>
        <div className="rf-col-6"><HighchartsReact highcharts={Highcharts} options={optionsChart2} /></div>
        <div className="rf-col-6"><HighchartsReact highcharts={Highcharts} options={optionsChart3} /></div>
      </div>
    </div>
  );
}

export default RightPage;
