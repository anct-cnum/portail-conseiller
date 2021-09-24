import React from 'react';
import DerniersAjouts from './DerniersAjouts';

function Thematiques() {

  return (
    <div className="thematiques">
      <h2 className="rf-mb-3w">Thématiques</h2>
      <div className="rf-container rf-container--fluid">
        <div className="rf-grid-row">
          <div className="rf-col-6">
            <ul className="liste-thematiques">
              <li className="rf-mb-3w">Courriel</li>
              <li className="rf-mb-3w">Échanger avec ses proches</li>
              <li className="rf-mb-3w">Emploi</li>
              <li className="rf-mb-3w">Démarches en ligne</li>
              <li className="rf-mb-3w">Traitement de texte</li>
              <li className="rf-mb-3w">Smartphone, applications mobile</li>
            </ul>
          </div>
          <div className="rf-col-6 rf-mb-3w">
            <ul className="liste-thematiques">
              <li className="rf-mb-3w">Créer et gérer ses contenus numériques</li>
              <li className="rf-mb-3w">Accompagner son enfant</li>
              <li className="rf-mb-3w">Prendre en main un équipement informatique</li>
              <li className="rf-mb-3w">Fiches CNIL</li>
            </ul>
          </div>
        </div>
      </div>
      <br className="rf-mt-3w rf-mb-4w" />
      <DerniersAjouts />
    </div>
  );
}

export default Thematiques;
