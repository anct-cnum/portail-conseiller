import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-loader-spinner';

import { conseillerActions, permanenceActions } from '../../../actions';
import { userEntityId } from '../../../helpers';

import Banner from './Banner';
import MaPermanence from './MaPermanence';
import Permanence from './index';
import Footer from '../../Footer';

function MesPermanences() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);
  const loading = useSelector(state => state.permanence?.loading);
  const reloadList = useSelector(state => state.permanence?.reloadList);

  const [mesPermanences, setMesPermanences] = useState([]);

  const isDeleted = useSelector(state => state.permanence?.isDeleted);
  const isConseillerDeleted = useSelector(state => state.permanence?.isConseillerDeleted);

  const isCreated = useSelector(state => state.permanence?.isCreated);
  const isUpdated = useSelector(state => state.permanence?.isUpdated);

  //Tri pour obtenir le lieu principal en premier
  useEffect(() => {
    if (listPermanences) {
      setMesPermanences(Array.from({ length: listPermanences?.length }, () => ({})));
      for (let i = 0; i < listPermanences?.length; i++) {
        if (listPermanences[i]?.lieuPrincipalPour.includes(conseiller?._id) === true) {
          mesPermanences[0] = listPermanences[i];
        } else {
          mesPermanences[i + 1] = listPermanences[i];
        }
      }
      setMesPermanences(mesPermanences);
    }
  }, [listPermanences]);

  useEffect(() => {
    if (!conseiller) {
      dispatch(conseillerActions.get(userEntityId()));
    } else {
      dispatch(permanenceActions.getMesPermanences(conseiller?._id));
    }
    if ((location.pathname === '/mes-lieux-activite' && !conseiller?.hasPermanence) ||
          (location.pathname !== '/mes-lieux-activite' && conseiller?.hasPermanence)) {
      localStorage.removeItem('suspension_permanence');
    }
  }, [conseiller, isCreated, isUpdated]);

  useEffect(() => {
    if (isConseillerDeleted || isDeleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(permanenceActions.getMesPermanences(conseiller?._id));
      setTimeout(() => {
        dispatch(permanenceActions.reinitiliserStatut());
      }, 2000);
    }
  }, [isDeleted, isConseillerDeleted]);

  useEffect(() => {
    if (reloadList && conseiller) {
      setMesPermanences([]);
      dispatch(permanenceActions.getMesPermanences(conseiller?._id));
      dispatch(permanenceActions.reloadList(false));
    }
  }, [reloadList]);

  return (
    <>
      <div className="spinnerCustom">
        <Spinner
          type="Oval"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading === true }
        />
      </div>
      {(conseiller && !loading) &&
      <>
        { ((location.pathname === '/mes-lieux-activite' && conseiller?.hasPermanence) ||
          (location.pathname !== '/mes-lieux-activite' && !conseiller?.hasPermanence)) &&
          <div id="formulaire-horaires-adresse" >
            <Banner />
            {isDeleted &&
              <p className="fr-label flashBag">
                Le lieu d&rsquo;activit&eacute; &agrave; bien &eacute;t&eacute; supprim&eacute;.
              </p>
            }

            {isConseillerDeleted &&
              <p className="fr-label flashBag">
                Vous avez bien &eacute;t&eacute; retir&eacute; du lieu d&rsquo;activit&eacute;.
              </p>
            }

            <div className="fr-container">
              <div className="fr-grid-row">

                <div className="fr-col-12">
                  <a className="fr-btn creer-btn" href="/mon-nouveau-lieu-activite">Ajouter un nouveau lieu</a>
                </div>
                <div className="fr-col-12 fr-ml-7w">
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Nom du lieu d&rsquo;activit&eacute;</th>
                          <th style={{ textAlign: 'center' }}>Lieu principal</th>
                          <th style={{ textAlign: 'center' }}>Adresse</th>
                          <th style={{ textAlign: 'center' }}>Type d&rsquo;acc&egrave;s</th>
                          <th style={{ textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mesPermanences?.length > 0 && mesPermanences?.map((permanence, idx) => {
                          return (<MaPermanence key={idx} permanence={permanence} conseillerId={conseiller?._id}
                            trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
        { (location.pathname !== '/mes-lieux-activite' && conseiller?.hasPermanence) &&
          <Footer type="support"/>
        }
      </>
      }
    </>
  );
}

export default MesPermanences;

