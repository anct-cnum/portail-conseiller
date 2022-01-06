import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Recapitulatif from './Recapitulatif';
import Informations from './Informations';
import Adresse from './Adresse';
import Horaires from './Horaires';
import Itinerance from './Itinerance';
import Validation from './Validation';
import Footer from '../../Footer';

function FormulaireHorairesAdresse() {
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const isAdresseCachee = useSelector(state => state.horairesAdresse?.isAdresseCachee);
  const adresseStructure = structure?.insee.etablissement.adresse;
  const dateUpdate = conseiller?.cartographie?.updateAt ? dayjs(conseiller?.cartographie.updateAt).format('DD/MM/YYYY') : null;

  return (
    <>
      <div id="formulaire-horaires-adresse" className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h1 className="titre rf-mt-9w rf-mb-1w">Informations d&rsquo;acc&egrave;s et contact CnFS </h1>
            {dateUpdate &&
              <p className="derniere-modification">Derni&egrave;re modification de vos informations effectu&eacute;e le&nbsp;{dateUpdate}</p>
            }
            <Recapitulatif structure={structure} adresseStructure={adresseStructure}/>
            <div className="rf-container rf-container--fluid">
              <div className="rf-grid-row rf-grid-row--gutters">
                <Informations structure={structure} adresseStructure={adresseStructure}/>

                {!isAdresseCachee &&
                <Adresse adresseStructure={adresseStructure} isAdresseCachee={isAdresseCachee}/>
                }
                <Horaires />
                <Itinerance />
                <Validation conseillerId={conseiller?._id}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default FormulaireHorairesAdresse;

