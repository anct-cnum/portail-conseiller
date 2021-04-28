import React, { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useSelector, useDispatch } from 'react-redux';
import { conseillerActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';

function ValidationAccount() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.createAccount.user);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const structure = useSelector(state => state.structure?.structure);

  useEffect(() => {
    dispatch(conseillerActions.get(userEntityId()));
  }, []);

  useEffect(() => {
    if (conseiller !== undefined) {
      dispatch(structureActions.get(conseiller?.idStructure));
    }
  }, [conseiller]);

  return (
    <div className="validationAccount">
      <Header/>
      <div className="rf-container rf-container--fluid rf-pt-2w containerCustom">
        {/* Bandeau */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-py-5w rf-mb-9w headBand">
          <p className="customLabel">Félicitations ! Votre adresse mail vient d&rsquo;être créée&nbsp;:<br/>
            <span className="emailLabel">jean.dupond@conseiller-numerique.fr {user?.name}</span>
          </p>
        </div>
        {/* Etape suivante */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-mb-6w step">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center' }}>
            <p>
              <strong style={{ fontSize: '24px' }}>&Eacute;tape suivante&nbsp;:</strong>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
        {/* Procédure */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-mb-4w process">
          <div className="rf-col-3"></div>
          <div className="rf-col-sm-10 rf-col-md-6 processText">
            <p>
              Rendez-vous sur la boîte de réception de votre mail Conseiller numérique France Services,
              et cliquez sur le lien de connexion à l&rsquo;espace Coop qui vous a été envoyé.
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
        {/* Bouton webmail */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-mb-9w buttonResponsive">
          <div className="rf-col-1"></div>
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <p>
              <a href={process.env.REACT_APP_WEBMAIL_URL} className="rf-btn rf-text--bold big-btn finalButton" title="Accéder au webmail">Accéder au webmail</a>
            </p>
          </div>
          <div className="rf-col-1"></div>
        </div>
        {/* Titre Coordonnees Pro */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-mb-6w coordonnees">
          <p style={{ textAlign: 'center' }}>
            <strong style={{ fontSize: '24px' }}>Vos coordonnées professionnelles</strong>
          </p>
        </div>
        {/* Coordonnees */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-mb-6w coordonnees">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center', color: '#BFBFE3' }}>
            <p>
              <strong>
                <span style={{ textTransform: 'capitalize' }}>
                  {conseiller?.prenom}&nbsp;{conseiller?.nom}
                </span>
              </strong>
            </p>
            <p>
              <strong>{ structure?.nom }</strong>
            </p>
            { structure?.insee?.etablissement?.adresse?.l4 &&
            <p>
              <strong>{ structure?.insee?.etablissement?.adresse?.l4 }</strong>
            </p>
            }
            { structure?.insee?.etablissement?.adresse?.l5 &&
            <p>
              <strong>{ structure?.insee?.etablissement?.adresse?.l5 }</strong>
            </p>
            }
            { structure?.insee?.etablissement?.adresse?.code_postal &&
            <p>
              <strong>{ structure?.insee?.etablissement?.adresse?.code_postal }</strong>
            </p>
            }
            { structure?.insee?.etablissement?.adresse?.localite &&
            <p style={{ textTransform: 'uppercase' }}>
              <strong>{ structure?.insee?.etablissement?.adresse?.localite }</strong>
            </p>
            }
          </div>
          <div className="rf-col-3"></div>
        </div>
        {/* Procédure */}
        <div className="rf-grid-row rf-grid-row--center rf-grid-row--middle rf-pb-12w modifCoordonnees">
          <p style={{ textAlign: 'center' }}>
            Vous pourrez modifier vos coordonnées professionnelles plus tard.
          </p>
        </div>
      </div>
      {/* End content */}
      <Footer type="support"/>
    </div>
  );

}

export default ValidationAccount;
