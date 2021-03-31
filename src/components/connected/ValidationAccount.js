import React, { useEffect } from 'react';
import { history } from '../../helpers/history';
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

  function handleSubmit() {
    history.push('/statistiques'); //Go home stats
  }

  return (
    <div className="validationAccount">
      <Header linkAccount={user?.name}/>
      {/* Start content */}
      <div className="rf-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-5w">
          <div className="rf-col-1"></div>
          {/* Title */}
          <div className="rf-col-10 rf-mt-12w" style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '0' }}>Vos coordonnées professionnelles</h2>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-mb-7w">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center' }}>
            <p>
              <strong>Vous y êtes presque ! Après votre validation, vous accéderez à la visualisation intéractive des conseillers numériques France Services,
                ainsi qu&rsquo;aux ressources qui vous permettront de démarrer votre activité dans les meilleures conditions.
                Une fois que vous êtes connecté(e), il vous est également possible de modifier vos données personnelles (nom, prénom).
              </strong>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-pb-12w">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center', color: '#BFBFE3' }}>
            <p className="rf-mb-4w">
              <strong>
                <span style={{ textTransform: 'capitalize' }}>
                  {conseiller?.prenom}&nbsp;{conseiller?.nom}
                </span>
              </strong>
            </p>
            <p className="rf-mb-4w">
              <strong>{ structure?.nom }</strong>
            </p>
            <p className="rf-mb-4w">
              {/*TODO ADDRESSE <strong>{ structure?.adresse }</strong> */}
            </p>
            <p className="rf-mb-4w">
              <strong>{ structure?.codePostal }</strong>
            </p>
            <p className="rf-mb-7w" style={{ textTransform: 'uppercase' }}>
              {/*TODO NOM VILLE <strong>{ structure?.nomVille }</strong> */}
            </p>
            <p className="rf-pb-3w">
              <button className="rf-btn rf-text--bold big-btn finalButton" onClick={handleSubmit}
                style={{ background: 'white', width: '50%' }}>Finaliser mon accès</button>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
      </div>
      {/* End content */}
      <Footer type="support"/>
    </div>
  );

}

export default ValidationAccount;
