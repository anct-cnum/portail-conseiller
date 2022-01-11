import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Recapitulatif from './Recapitulatif';
import Informations from './Informations';
import Adresse from './Adresse';
import Horaires from './Horaires';
import Itinerance from './Itinerance';
import Validation from './Validation';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function FormulaireHorairesAdresse() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const isAdresseCachee = useSelector(state => state.horairesAdresse?.isAdresseCachee);
  const adresseStructure = structure?.insee.etablissement.adresse;
  const dateUpdate = conseiller?.informationsCartographie?.updateAt ? dayjs(conseiller?.informationsCartographie.updateAt).format('DD/MM/YYYY') : null;
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);
  const isUpdated = useSelector(state => state.horairesAdresse.isUpdated);

  useEffect(() => {
    if (conseiller?.informationsCartographie) {
      dispatch(formulaireHorairesAdresseActions.initInformations(conseiller?.informationsCartographie));
    }
  }, [conseiller?.informationsCartographie]);

  return (
    <>
      {(erreursFormulaire?.length === 0 && isUpdated) &&
        <FlashMessage duration={5000}>

          <p className="rf-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }
      {erreursFormulaire?.length > 0 &&
        <FlashMessage>
          <p className="rf-label flashBag invalid">
            Une erreur est survenue lors du traitement de vos informations
          </p>
        </FlashMessage>
      }
      <div id="formulaire-horaires-adresse" className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h1 className="titre rf-mt-9w rf-mb-1w">Informations d&rsquo;acc&egrave;s et contact CnFS </h1>
            {dateUpdate &&
              <p className="derniere-modification">Derni&egrave;re modification de vos informations effectu&eacute;e le&nbsp;{dateUpdate}</p>
            }
            <Recapitulatif
              nomStructure={conseiller?.informationsCartographie?.nomEnseigne ? conseiller?.informationsCartographie?.nomEnseigne : structure?.nom}
              siret={conseiller?.informationsCartographie?.siret ? String(conseiller?.informationsCartographie?.siret) : structure?.siret}
              adresseStructure={conseiller?.informationsCartographie?.adresse ? conseiller?.informationsCartographie?.adresse : adresseStructure}
            />
            <div className="rf-container rf-container--fluid">
              <div className="rf-grid-row rf-grid-row--gutters">
                <Informations
                  structure={structure} informationsCartographie={conseiller?.informationsCartographie}
                  siretStructure={conseiller?.informationsCartographie?.siret ? String(conseiller?.informationsCartographie?.siret) : structure?.siret}
                  adresseStructure={conseiller?.informationsCartographie?.adresse ? conseiller?.informationsCartographie?.adresse : adresseStructure}
                />
                {!isAdresseCachee &&
                <Adresse adresseCartographie={conseiller?.informationsCartographie?.adresse}/>
                }
                <Horaires horairesConseiller={conseiller?.informationsCartographie?.horaires}/>
                <Itinerance conseiller={conseiller} informationsCartographie={conseiller?.informationsCartographie}/>
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

