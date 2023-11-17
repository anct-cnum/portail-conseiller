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
      dispatch(structureActions.get(conseiller?.structureId));
    }
  }, [conseiller]);

  return (
    <div className="validationAccount">
      <Header/>
      <div className="fr-container fr-container--fluid fr-pt-2w containerCustom">
        {/* Bandeau */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-py-5w fr-mb-9w headBand">
          <p className="customLabel">F&eacute;licitations ! Votre adresse mail vient d&rsquo;&ecirc;tre cr&eacute;&eacute;e&nbsp;:<br/>
            <span className="emailLabel">{user?.name}</span>
          </p>
        </div>
        {/* Etape suivante */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-6w step">
          <div className="fr-col-3"></div>
          <div className="fr-col-6" style={{ textAlign: 'center' }}>
            <p>
              <strong style={{ fontSize: '24px' }}>&Eacute;tape suivante&nbsp;:</strong>
            </p>
          </div>
          <div className="fr-col-3"></div>
        </div>
        {/* Procédure */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-4w process">
          <div className="fr-col-3"></div>
          <div className="fr-col-sm-10 fr-col-md-6 processText">
            <p>
              Rendez-vous sur la boîte de r&eacute;ception de votre mail Conseiller num&eacute;rique,
              et cliquez sur le lien de connexion &agrave; l&rsquo;espace Coop qui vous a &eacute;t&eacute; envoy&eacute;.
            </p>
          </div>
          <div className="fr-col-3"></div>
        </div>
        {/* Bouton webmail */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-9w buttonResponsive">
          <div className="fr-col-1"></div>
          <div className="fr-col-10" style={{ textAlign: 'center' }}>
            <p>
              <a href={process.env.REACT_APP_WEBMAIL_URL} className="fr-btn fr-text--bold big-btn finalButton" title="Acc&eacute;der au webmail">
                Acc&eacute;der au webmail
              </a>
            </p>
          </div>
          <div className="fr-col-1"></div>
        </div>
        {/* Titre Coordonnées Pro */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-6w coordonnees">
          <p style={{ textAlign: 'center' }}>
            <strong style={{ fontSize: '24px' }}>Vos coordonn&eacute;es professionnelles</strong>
          </p>
        </div>
        {/* Coordonnees */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-6w coordonnees">
          <div className="fr-col-3"></div>
          <div className="fr-col-6" style={{ textAlign: 'center', color: '#BFBFE3' }}>
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
            { structure?.insee?.adresse?.acheminement_postal?.l4 &&
            <p>
              <strong>{ structure?.insee?.adresse?.acheminement_postal?.l4 }</strong>
            </p>
            }
            { structure?.insee?.adresse?.acheminement_postal?.l5 &&
            <p>
              <strong>{ structure?.insee?.adresse?.acheminement_postal?.l5 }</strong>
            </p>
            }
            { structure?.insee?.adresse?.code_postal &&
            <p>
              <strong>{ structure?.insee?.adresse?.code_postal }</strong>
            </p>
            }
            { structure?.insee?.adresse?.libelle_commune &&
            <p style={{ textTransform: 'uppercase' }}>
              <strong>{ structure?.insee?.adresse?.libelle_commune }</strong>
            </p>
            }
          </div>
          <div className="fr-col-3"></div>
        </div>
        {/* Procédure */}
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-12w modifCoordonnees">
          <p style={{ textAlign: 'center' }}>
            Vous pourrez modifier vos coordonn&eacute;es professionnelles plus tard.
          </p>
        </div>
      </div>
      {/* End content */}
      <Footer type="support"/>
    </div>
  );

}

export default ValidationAccount;
