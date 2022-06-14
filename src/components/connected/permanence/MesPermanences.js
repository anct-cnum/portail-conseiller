import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { conseillerActions, permanenceActions } from '../../../actions';
import { userEntityId } from '../../../helpers';

import Banner from './Banner';
import MaPermanence from './MaPermanence';
import Footer from '../../Footer';

function MesPermanences() {
  const dispatch = useDispatch();
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);
  const mesPermanences = Array.from({ length: listPermanences?.length }, () => ({}));

  const isDeleted = useSelector(state => state.permanence.isDeleted);
  const isConseillerDeleted = useSelector(state => state.permanence.isConseillerDeleted);

  //Tri pour obtenir le lieu principal en premier
  useEffect(() => {
    if (listPermanences) {
      for (let i = 0; i < listPermanences.length; i++) {
        if (listPermanences[i]?.lieuPrincipalPour.includes(conseiller._id) === true) {
          mesPermanences[0] = listPermanences[i];
        } else {
          mesPermanences[i + 1] = listPermanences[i];
        }
      }
    }
  }, [listPermanences]);

  useEffect(() => {
    if (!conseiller) {
      dispatch(conseillerActions.get(userEntityId()));
    } else {
      dispatch(permanenceActions.getMesPermanences(conseiller._id));
    }
  }, [conseiller]);

  useEffect(() => {
    if (isConseillerDeleted || isDeleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      dispatch(permanenceActions.getMesPermanences(conseiller._id));
      setTimeout(() => {
        dispatch(permanenceActions.reinitiliserStatut());
      }, 2000);
    }
  }, [isDeleted, isConseillerDeleted]);
  return (
    <>
      {conseiller &&
      <>
        { ((location.pathname === '/mes-lieux-activite' && conseiller?.hasPermanence) ||
          (location.pathname !== '/mes-lieux-activite' && !conseiller?.hasPermanence)) &&
          <div id="formulaire-horaires-adresse" >
            <Banner />
            {isDeleted &&
              <p className="rf-label flashBag">
                Le lieu d&rsquo;activit&eacute; &agrave; bien &eacute;t&eacute; supprim&eacute;.
              </p>
            }

            {isConseillerDeleted &&
              <p className="rf-label flashBag">
                Vous avez bien &eacute;t&eacute; retir&eacute; du lieu d&rsquo;activit&eacute;.
              </p>
            }

            <div className="rf-container">
              <div className="rf-grid-row">

                <div className="rf-col-12 rf-ml-12w">
                  <a className="rf-btn creer-btn" href="/mon-nouveau-lieu-activite">Ajouter un nouveau lieu</a>
                </div>
                <div className="rf-col-12 rf-ml-12w">
                  <div className="rf-table">
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
                        {listPermanences?.length > 0 && mesPermanences?.map((permanence, idx) => {
                          return (<MaPermanence key={idx} permanence={permanence} conseillerId={conseiller._id} trClass ={idx % 2 === 0 ? 'pair' : 'impair'}/>);
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
        { ((location.pathname === '/mes-lieux-activite' && !conseiller?.hasPermanence) ||
          (location.pathname !== '/mes-lieux-activite' && conseiller?.hasPermanence)) &&
          <div id="formulaire-horaires-adresse" >
            <Banner />
            <div className="rf-container">
              <div className="rf-grid-row">
                <div className="rf-col-12 rf-ml-12w">
                  <h2 className="titre-acces rf-my-9w ">Vous n&rsquo;avez pas acc&egrave;s &agrave; ce formulaire pour le moment !</h2>
                </div>
              </div>
            </div>
          </div>
        }
        <Footer type="support"/>
      </>
      }
    </>
  );
}

export default MesPermanences;

