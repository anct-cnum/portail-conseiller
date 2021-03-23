import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../Header';
import Footer from '../Footer';

function Home() {

  //<h2>Mon portail</h2>
  //<Link to="/login">Se déconnecter</Link>

  return (
    <div className="Home">
      <div>
        <Header/>
      </div>
      <div>
        <Statistiques/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>

  );
}

function Statistiques() {

  return (
    <div className="Statistics">
      <div className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-6">
            <h2>Vos Statistiques</h2>
          </div>
          <div className="rf-col-2">
            <ElementBouton titre="Accueil"/>
          </div>
          <div className="rf-col-4">
            <ElementBouton titre="Enregistrer un nouvel accompagnement"/>
          </div>
          <div className="rf-col-4">
            <PageGauche/>
          </div>
          <div className="rf-col-8">
            <PageDroite/>
          </div>
          <div className="rf-col-12">
            <PageBas/>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageGauche() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">
          <PeriodeStatistiques dateDebut="01/04/2021" dateFin="02/05/2021"/>
        </div>
        <div className="rf-col-12">
          <StatistiquesAccompagnement nbAccompagnement={78} />
        </div>
        <div className="rf-col-12">
          <StatistiquesAteliers nbAteliers={3} nbTotalParticipant={25}/>
        </div>
        <div className="rf-col-12">
          <StatistiquesAccompagnementPerso nbAccompagnementPerso={19} nbDemandePonctuel={3} />
        </div>
        <div className="rf-col-12">
          <StatistiquesReconduction nbReconduction={12} tauxReconduction={18} caracteresSpeciaux="%" />
        </div>
      </div>
    </div>
  );
}

function PageDroite() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12"><hr></hr></div>
        <div className="rf-col-12">Graph 1 Droite</div>
        <div className="rf-col-12"><hr></hr></div>
        <div className="rf-col-6">Graph 2 Droite</div>
        <div className="rf-col-6">Graph 3 Droite</div>
        <div className="rf-col-6"><hr></hr></div>
        <div className="rf-col-6"><hr></hr></div>

      </div>
    </div>
  );
}

function PageBas() {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4"><hr></hr></div>
        <div className="rf-col-4">Graph 1 Bas</div>
        <div className="rf-col-4">Graph 2 Bas</div>
        <div className="rf-col-4">Graph 3 Bas</div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

function PeriodeStatistiques(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-12">Période du {props.dateDebut} au {props.dateFin}</div>
      </div>
    </div>
  );
}

function StatistiquesAccompagnement(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNombre nombre={props.nbAccompagnement}/></div>
        <div className="rf-col-6"><ElementTexte texte="accompagnements réalisés durant cette période" /></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

function StatistiquesAteliers(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNombre nombre={props.nbAteliers}/></div>
        <div className="rf-col-6"><ElementTexte texte="ateliers réalisés"/></div>
        <div className="rf-col-6"><ElementNombre nombre={props.nbTotalParticipant}/></div>
        <div className="rf-col-6"><ElementTexte texte="participants au total"/></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

function StatistiquesAccompagnementPerso(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNombre nombre={props.nbAccompagnementPerso}/></div>
        <div className="rf-col-6"><ElementTexte texte="accompagnements personnalisés réalisés"/></div>
        <div className="rf-col-6"><ElementNombre nombre={props.nbDemandePonctuel}/></div>
        <div className="rf-col-6"><ElementTexte texte="demandes ponctuelles"/></div>
        <div className="rf-col-12"><hr></hr></div>
      </div>
    </div>
  );
}

function StatistiquesReconduction(props) {

  return (
    <div className="rf-container">
      <div className="rf-grid-row">
        <div className="rf-col-6"><ElementNombre nombre={props.nbReconduction}/></div>
        <div className="rf-col-6"> <ElementTexte texte="accompagnements reconduits"/></div>
        <div className="rf-col-6"><ElementNombre nombre={props.tauxReconduction} caracteresSpeciaux={props.caracteresSpeciaux}/></div>
        <div className="rf-col-6"><ElementTexte texte="taux moyen de reconduction sur l’ensemble des accompagnements"/></div>
      </div>
    </div>
  );
}

function ElementBouton(props) {

  return (
    <button className="rf-btn rf-btn--secondary">{props.titre}</button>
  );
}

function ElementNombre(props) {

  let chaine = (props.caracteresSpeciaux) ? props.caracteresSpeciaux : '';
  return (
    <div>{props.nombre}{chaine}</div>
  );
}
function ElementTexte(props) {

  return (
    <div>{props.texte}</div>
  );
}


PeriodeStatistiques.propTypes = {
  dateDebut: PropTypes.string,
  dateFin: PropTypes.string
};

StatistiquesAccompagnement.propTypes = {
  nbAccompagnement: PropTypes.number
};

StatistiquesAteliers.propTypes = {
  nbAteliers: PropTypes.number,
  nbTotalParticipant: PropTypes.number
};

StatistiquesAccompagnementPerso.propTypes = {
  nbAccompagnementPerso: PropTypes.number,
  nbDemandePonctuel: PropTypes.number
};

StatistiquesReconduction.propTypes = {
  nbReconduction: PropTypes.number,
  tauxReconduction: PropTypes.number,
  caracteresSpeciaux: PropTypes.string
};

ElementBouton.propTypes = {
  titre: PropTypes.string
};

ElementNombre.propTypes = {
  nombre: PropTypes.number,
  caracteresSpeciaux: PropTypes.string

};

ElementTexte.propTypes = {
  texte: PropTypes.string
};

export default Home;
