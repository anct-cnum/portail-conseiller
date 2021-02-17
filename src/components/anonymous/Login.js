import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const error = useSelector(state => state.authentication.error);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div className="Login">
      {/* Header Part */}
      <header className="rf-header" role="banner">
        <div className="rf-container">
          <div className="rf-grid-row rf-grid-row--top">
            <div className="rf-col-1"></div>
            <div className="rf-col-10">
              <div className="rf-header__body">
                <a className="rf-header__operator" href="/" style={{ boxShadow: 'none' }}>
                  <img src="/logos/logo-conseiller-numérique-nb.svg" alt="logo Conseiller Numérique France Services" style={{ height: '50px' }}/>
                </a>
                <div className="rf-header__navbar" style={{ marginBottom: '17px' }}>
                  <div className="rf-service">
                    <a className="rf-service__title" href="/" title="Portail Conseiller Numérique">
                      Portail Conseiller Numérique
                    </a>
                    <p className="rf-service__tagline">Réseau des conseillers numériques France Services</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rf-col-1"></div>
          </div>
        </div>
      </header>
      {/* Content */}
      <div className="rf-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-6w">
          <div className="rf-col-1"></div>
          {/* Title */}
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <h1 style={{ margin: '0' }}>Bienvenue sur le Portail<br/>de la communauté des conseillers<br/>numériques France Service</h1>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-6w">
          <div className="rf-col-1"></div>
          {/* Avatars */}
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <img src="/avatars/avatar-conseiller.svg" width="75px" alt="Avatar conseiller" className="rf-mr-4w"/>
            <img src="/avatars/avatar-conseillere.svg" width="75px" alt="Avatar conseillere" className="rf-mr-4w"/>
            <img src="/avatars/avatar-conseillers.svg" width="75px" alt="Avatar conseillers" className="rf-mr-4w"/>
            <img src="/avatars/avatar-senior.svg" width="75px" alt="Avatar senior" className="rf-mr-4w"/>
            <img src="/avatars/avatar-coordinatrice.svg" width="75px" alt="Avatar coordinatrice"/>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-pb-7w">
          <div className="rf-col-5"></div>
          {/* Form */}
          <div className="rf-col-2" style={{ textAlign: 'center' }}>
            <div>
              {error && <span style={{ color: '#FF3333' }}>`{error.error}`</span>}
            </div>
            <div className="rf-mb-3w">
              <label className="rf-label">Adresse email</label>
              <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !username &&
                  <div className="invalid">Identifiant requis</div>
              }
            </div>
            <div className="rf-mb-5w">
              <label className="rf-label">Mot de passe</label>
              <input name="password" type="password" value={password} onChange={handleChange} className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
              }
            </div>
            <div>
              <button className="rf-btn rf-text--bold big-btn" onClick={handleSubmit} style={{ background: 'white' }}>Se connecter</button>
              <br/>{loggingIn && <span>Connexion en cours...</span>}
            </div>
          </div>
          <div className="rf-col-5"></div>
        </div>
      </div>
      <div>
        {/* Footer Part */}
        <footer className="rf-footer" role="contentinfo" id="footer">
          <div className="rf-container">
            <div className="rf-grid-row">
              <div className="rf-col-1"></div>
              <div className="rf-col-10">
                <div className="rf-footer__body">
                  <div className="rf-container">
                    <div className="rf-grid-row rf-grid-row--bottom">
                      <div>
                        <div className="rf-footer__brand">
                          <a className="rf-footer__brand-link" href="/">
                            <div className="rf-mr-4w" style={{display: 'inline-block' }} >
                              <img src="/logos/logo-rf-nb.svg" alt="logo République Française" style={{ height: '80px' }}/>
                            </div>
                            <div className="rf-mr-4w" style={{display: 'inline-block' }} >
                              <img src="/logos/logo-anct-nb.svg" alt="logo Agence Nationale De La Cohésion Des Territoires" style={{ height: '59px' }}/>
                            </div>
                            <div className="rf-mr-4w" style={{display: 'inline-block' }} >
                              <img src="/logos/logo-banque-des-territoires-nb.svg" alt="logo Banque Des Territoires" style={{ height: '35px', marginBottom: '27px' }}/>
                            </div>
                            <div style={{display: 'inline-block' }} >
                              <img src="/logos/logo-france-relance-nb.svg" alt="logo France Relance" style={{ height: '5rem' }}/>
                            </div>
                          </a>
                        </div>
                        <div className="rf-footer__content rf-mt-3w">
                          <p className="rf-footer__content-desc">Conseiller numérique France Services est un dispositif financé par l&rsquo;Etat dans le cadre de France Relance. Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires et opéré par la Banque des territoires</p>
                        </div>
                        <div>
                          <ul className="rf-footer__content-list" style={{ justifyContent: 'flex-end' }}>
                            <li >
                              <a className="rf-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
                            </li>
                            <li >
                              <a className="rf-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
                            </li>
                            <li >
                              <a className="rf-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
                            </li>
                          </ul>
                        </div>
                        <div className="rf-footer__bottom">
                          <ul className="rf-footer__bottom-list">
                            <li className="rf-footer__bottom-item">
                              <a className="rf-footer__bottom-link rf-px-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
                            </li>
                            <li className="rf-footer__bottom-item">
                              <a className="rf-footer__bottom-link rf-px-1w" href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilité: non conforme</a>
                            </li>
                            <li className="rf-footer__bottom-item">
                              <a className="rf-footer__bottom-link rf-px-1w" href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions légales</a>
                            </li>
                            <li className="rf-footer__bottom-item">
                              <a className="rf-footer__bottom-link rf-px-1w" href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">Données personnelles</a>
                            </li>
                            <li className="rf-footer__bottom-item">
                              <a className="rf-footer__bottom-link rf-px-1w" href="https://cellar-c2.services.clever-cloud.com/conseiller-numerique/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">Conditions générales d&rsquo;utilisation</a>
                            </li>
                          </ul>
                          <div className="rf-footer__bottom-copy">
                                © République Française 2021
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rf-col-1"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
