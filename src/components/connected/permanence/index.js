import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Recapitulatif from './Recapitulatif';
import Informations from './Informations';
import Adresse from './Adresse';
import Horaires from './Horaires';
import Itinerance from './Itinerance';
import Validation from './Validation';
import Remerciement from './Remerciement';
import Footer from '../../Footer';
import FlashMessage from 'react-flash-message';
import { useLocation } from 'react-router-dom';
import { permanenceActions } from '../../../actions/permanence.actions';

function Permanence() {
  const location = useLocation();
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);
  const permanence = useSelector(state => state.permanence?.permanence);
  const isAdresseCachee = useSelector(state => state.permanence?.isAdresseCachee);
  const adresseStructure = structure?.insee.etablissement.adresse;
  const dateUpdate = permanence?.updateAt ? dayjs(permanence.updatedAt).format('DD/MM/YYYY') : null;
  const showError = useSelector(state => state.permanence.showError);
  const isUpdated = useSelector(state => state.permanence.isUpdated);
  const isCreated = useSelector(state => state.permanence.isCreated);
  const siretStructure = permanence?.siret ? String(permanence?.siret) : structure?.siret;

  useEffect(() => {
    if (permanence !== null && permanence !== undefined) {
      dispatch(permanenceActions.initPermanence(permanence));
    }
  }, [permanence]);

  return (
    <>
      {isUpdated &&
        <FlashMessage duration={5000}>
          <p className="rf-label flashBag">
            Vos informations ont bien &eacute;t&eacute; enregistr&eacute;es&nbsp;
            <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
          </p>
        </FlashMessage>
      }

      {showError &&
        <p className="rf-label flashBag invalid">
          Une erreur est survenue lors du traitement de vos informations
        </p>
      }
      { (isCreated && location.pathname === '/accueil') &&
        <Remerciement/>
      }
      <div id="formulaire-horaires-adresse" className="rf-container">
        <div className="rf-grid-row">
          <div className="rf-col-12">
            <h1 className="titre rf-mt-9w rf-mb-1w">Informations d&rsquo;acc&egrave;s et contact CnFS </h1>
            {dateUpdate &&
              <p className="derniere-modification">Derni&egrave;re modification de vos informations effectu&eacute;e le&nbsp;{dateUpdate}</p>
            }
            <Recapitulatif
              nomStructure={permanence?.nomEnseigne ?? structure?.nom}
              siret={permanence?.siret ? String(permanence?.siret) : structure?.siret}
              adresseStructure={permanence?.adresse ?? adresseStructure}
            />
            <div className="rf-container rf-container--fluid">
              <div className="rf-grid-row rf-grid-row--gutters">
                <Informations
                  codeDepartement={structure?.codeDepartement}
                  siretStructure={siretStructure}
                  adresseStructure={permanence?.adresse ?? adresseStructure}
                  permanence={permanence}
                />
                {!isAdresseCachee &&
                <Adresse adressePermanence={permanence?.adresse}/>
                }
                <Horaires horairesPermanence={permanence?.horaires}/>
                <Itinerance permanence={permanence}/>
                <Validation permanence={permanence} conseillerId={conseiller?._id} structureId={structure?._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer type="support"/>
    </>
  );
}

export default Permanence;

