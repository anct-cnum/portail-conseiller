import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';

import { userActions } from '../../actions';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const role = new URLSearchParams(location.search).get('role');
  const urlTableauDePilotage = process.env.REACT_APP_TABLEAU_DE_PILOTAGE_URL;
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const error = useSelector(state => state.authentication.error);


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
      {role === 'structure' &&
        <dialog aria-labelledby="fr-modal-confirm-siret" role="dialog" id="fr-modal-confirm-siret" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header"></div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                      A partir de maintenant l&rsquo;espace Coop structure &eacute;volue et devient &quot;Le tableau de pilotage&quot;
                    </h1>
                    <p>
                      <strong>Pourquoi un changement de nom et d&rsquo;interface ?</strong><br />
                      <span>Votre espace &eacute;volue pour mieux r&eacute;pondre &agrave; vos attentes !</span>
                      <p className="fr-mb-2w fr-mt-2w">
                        Le tableau de pilotage vous propose une identit&eacute; visuelle personnalis&eacute;e ainsi qu&rsquo;un nouvel
                        univers int&eacute;grant de nouvelles fonctionnalit&eacute;s et donn&eacute;es.
                      </p>
                      <p className="fr-mb-2w">
                        <strong>Ce qui ne change pas</strong><br />
                        <span>Notre philosophie centr&eacute;e utilisateur</span>
                      </p>
                      <p>
                        <strong>Comment acc&eacute;der au Tableau de pilotage ?</strong><br />
                        <span>En cliquant sur le <a href={`${urlTableauDePilotage}/login`}>lien</a></span>
                      </p>
                      <span className="fr-mt-4w">L&rsquo;&eacute;quipe Conseiller num&eacute;rique</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      }
      {/* Start content */}
      <div className="fr-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="fr-grid-row fr-grid-row--gutters fr-py-xs-1w fr-py-md-8w" style={{ marginBottom: 0 }}>
          <div className="margeLeft"></div>
          {/* Title */}
          <div className="fr-col-xs-12 fr-col-sm-12 fr-col-md-5 fr-mt-xs-1w fr-mt-md-8w">
            <div className="headPart">
              <img
                src="/logos/logo-conseiller-numerique-nb.svg"
                alt="logo Conseiller Num&eacute;rique France Services"
                className="logoCnfs"/>
              <h1 className="titrage fr-mt-xs-3w fr-mt-md-9w fr-mb-6w">
                { role === 'admin' &&
                  <>Administration<br className="fr-mb-2w"/></>
                }
                Espace Coop
              </h1>
            </div>
            { role !== 'admin' &&
              <>
                <p className="fr-service__tagline labNetworkCnfs">Le r&eacute;seau des conseillers num&eacute;riques France Services.</p>
                <div className="fr-my-9w personas1">
                  <img src="/logos/personas-hexagones.svg" width="100%" alt="Avatars conseillers"/>
                </div>
              </>
            }
          </div>
          <div className="fr-my-4w connexion">
            <div className="fr-px-2w fr-mb-2w">
              <label className="fr-label email" htmlFor="email">E-mail Conseiller num&eacute;rique France Services</label>
              <input
                id="email"
                name="username"
                value={username}
                onChange={handleChange}
                className={`fr-input fr-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
              {submitted && !username &&
                  <div className="invalid">Identifiant requis</div>
              }
            </div>
            <div className="fr-px-2w fr-mb-4w">
              <label className="fr-label password" htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className={`fr-input fr-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
              {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
              }
            </div>
            <div>
              <button className="fr-btn fr-text--bold big-btn" onClick={handleSubmit} style={{ background: 'white' }}>Connexion</button>
              <br/>{loggingIn && <span style={{ color: 'black' }}>Connexion en cours...</span>}
            </div>
            <div>
              {error && <span className="invalid">{
                error.errorActivation === true ?
                  <Fragment>
                    <a
                      href={process.env.REACT_APP_AIDE_URL + `/article/quand-vais-je-recevoir-mon-acces-a-lespace-coop-1acxbw6/`}
                      target="blank"
                      rel="noopener noreferrer">
                        Merci d&rsquo;activer votre compte coop <span className="fr-fi-external-link-line fr-link--icon"></span>
                    </a>
                  </Fragment> :
                  error.error
              }</span>}
            </div>
            { role !== 'admin' &&
              <div className="mot-de-passe-oublie">
                <Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute; ?" >Mot de passe oubli&eacute; ?</Link>
              </div>
            }
          </div>

        </div>
        { role !== 'admin' &&
          <div className="fr-grid-row fr-pb-12w personas2" style={{ textAlign: 'center' }}>
            <div className="fr-col-12">
              <div className="mot-de-passe-oublie-sm">
                <Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute; ?">Mot de passe oubli&eacute; ?</Link>
              </div>
              <img src="/logos/personas-hexagones.svg" width="90%" alt="Avatars conseillers"/>
            </div>
          </div>
        }
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
