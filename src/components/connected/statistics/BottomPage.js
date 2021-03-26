import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import roundedCorner from 'highcharts-rounded-corners';

function BottomPage() {
  roundedCorner(Highcharts);

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
      style: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    xAxis: [{
      categories: ['Avril', 'Mai', 'Juin', 'Juillet'],
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
      }
    },
    series: [{
      name: 'Accompagnement cumulés',
      type: 'column',
      yAxis: 1,
      data: [25, 85, 45, 75],
      color: '#169b62'
    }, {
      name: 'Accompagnement par mois',
      data: [25, 110, 155, 230],
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
        pointPadding: 0.4,
        borderWidth: 0
      }
    },
    legend: {
      backgroundColor: '#1e1e1e',
      itemStyle: {
        color: '#cdc8c3',
      }
    },
    series: [{
      name: '- 12 ans',
      data: [4],
      tooltip: {
        valueSuffix: '%'
      },
      color: '#ff0185',
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%',
    }, {
      name: '12-18 ans',
      data: [8],
      tooltip: {
        valueSuffix: '%'
      },
      color: '#5770be'
    }, {
      name: '18-35 ans',
      data: [12],
      tooltip: {
        valueSuffix: '%'
      },
      color: '#cac5b0'
    }, {
      name: '35-60 ans',
      data: [31],
      tooltip: {
        valueSuffix: '%'
      },
      color: '#ff6f4c'
    }, {
      name: 'Plus de 60 ans',
      data: [45],
      tooltip: {
        valueSuffix: '%'
      },
      color: '#169b62',
      borderRadiusBottomLeft: '50%',
      borderRadiusBottomRight: '50%',
    }]
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
        pointPadding: 0.4,
        borderWidth: 0
      }
    },
    legend: {
      backgroundColor: '#1e1e1e',
      itemStyle: {
        color: '#cdc8c3',
      }
    },
    series: [{
      name: 'Non renseigné',
      data: [2],
      color: '#a2b4b1',
      borderRadiusTopLeft: '50%',
      borderRadiusTopRight: '50%',
    }, {
      name: 'Etudiant',
      data: [8],
      color: '#ffdbd2'
    }, {
      name: 'En emploi',
      data: [20],
      color: '#a3a6bc'
    }, {
      name: 'Sans emploi',
      data: [35],
      color: '#ddb094'
    }, {
      name: 'Retraité',
      data: [37],
      color: '#fff480',
      borderRadiusBottomLeft: '50%',
      borderRadiusBottomRight: '50%',
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
