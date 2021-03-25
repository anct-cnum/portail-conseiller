import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function RightPage() {
  const themesAccompagnement = [
    'Équipement informatique 5',
    'Naviguer sur Internet 40',
    'Courriels 10',
    'Applications smartphone 7',
    'Gestion de contenus numériques 6',
    'Env., vocab. numérique 21',
    'Traitement de texte 8',
    'Échanger avec ses proches 13',
    'Emploi, formation 18',
    'Accompagner son enfant 9',
    'Numérique et TPE/PME 25',
    'Démarche en ligne 17'
  ];

  const optionsChart1 = {

    chart: {
      type: 'bar'
    },
    title: {
      text: 'Thèmes des accompagnements'
    },
    xAxis: {
      categories: themesAccompagnement,
      title: {
        text: null
      }
    },
    series: [{
      data: [5, 40, 10, 7, 6, 21, 8, 13, 18, 9, 25, 17]
    }]
  };

  const optionsChart2 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    title: {
      text: 'Lieux des accompagnements'
    },
    series: [{
      data: [1, 2, 3]
    }]
  };

  const optionsChart3 = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Durée des accompagnements'
    },
    series: [{
      data: [1, 3, 2, 5]
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
        <div className="rf-col-6"><hr></hr></div>
        <div className="rf-col-6"><hr></hr></div>

      </div>
    </div>
  );
}

export default RightPage;
