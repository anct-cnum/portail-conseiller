import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function BottomPage() {
  const optionsChart1 = {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Evolution des accompagnements'
    },
    xAxis: [{
      categories: ['Avril', 'Mai', 'Juin', 'Juillet'],
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: '',
      }
    }, { // Secondary yAxis
      title: {
        text: '',
      },
      labels: {
        format: '{value}',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 100,
      verticalAlign: 'top',
      y: 300,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
    },
    series: [{
      name: 'Accompagnement cumulés',
      type: 'column',
      yAxis: 1,
      data: [25, 85, 45, 75],
    }, {
      name: 'Accompagnement par mois',
      type: 'spline',
      data: [25, 110, 155, 230],
    }]
  };

  const optionsChart2 = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Tranches d\'âge des usagers'
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Plus de 60 ans',
      data: [5],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: '30-60 ans',
      data: [2],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: '18-35 ans',
      data: [3],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: '12-18 ans',
      data: [4],
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: '- 12 ans',
      data: [2],
      tooltip: {
        valueSuffix: '%'
      }
    }]
  };

  const optionsChart3 = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Statut des usagers'
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Retraité',
      data: [37]
    }, {
      name: 'Sans emploi',
      data: [35]
    }, {
      name: 'En emploi',
      data: [20]
    }, {
      name: 'Etudiant',
      data: [8]
    }, {
      name: 'Non renseigné',
      data: [2]
    }]
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

export default BottomPage;
