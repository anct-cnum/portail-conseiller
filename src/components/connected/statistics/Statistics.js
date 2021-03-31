import React from 'react';
import LeftPage from './LeftPage';
import RightPage from './RightPage';
import BottomPage from './BottomPage';
import Footer from '../../Footer';

function Statistics() {

  return (
    <div className="Statistics">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h2>Vos Statistiques</h2>
          </div>
          <div className="rf-col-4">
            <LeftPage/>
          </div>
          <div className="rf-col-8">
            <RightPage/>
          </div>
          <div className="rf-col-12">
            <BottomPage/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Statistics;
