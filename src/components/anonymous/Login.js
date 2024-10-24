import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';
import { alerteActions, userActions } from '../../actions';
import ModalResetPassword from './ModalResetPassword';
import { Oval } from 'react-loader-spinner';
import ModalVerifyCode from './ModalVerifyCode';
import { pluralize } from '../../utils/functionFormats';
import Alerte from '../common/Alerte';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();
  const location = useLocation();

  const role = new URLSearchParams(location.search).get('role');
  const urlTableauDePilotage = import.meta.env.VITE_APP_TABLEAU_DE_PILOTAGE_URL;
  const [submitted, setSubmitted] = useState(false);
  const [showModalResetPassword, setShowModalResetPassword] = useState(false);
  const [showModalVerifyCode, setShowModalVerifyCode] = useState(false);
  const [countAttempt, setCountAttempt] = useState(3);
  const { username, password } = inputs;
  const loading = useSelector(state => state.authentication?.loading);
  const loadingCheckEmail = useSelector(state => state.checkMotDePasseOublie?.loading);
  const loadingSendEmail = useSelector(state => state.motDePasseOublie?.loading);
  const error = useSelector(state => state.authentication?.error);
  const errorEmail = useSelector(state => state.motDePasseOublie?.error);
  const successEmail = useSelector(state => state.motDePasseOublie?.success);
  const hiddenEmail = useSelector(state => state.checkMotDePasseOublie?.hiddenEmail);
  const errorCheckEmail = useSelector(state => state.checkMotDePasseOublie?.error);
  const messageCodeVerified = useSelector(state => state.authentication?.messageCodeVerified);
  const formatRole = role => role?.replace(/(^\w{1})|([\s,-]+\w{1})/g, letter => letter.toUpperCase());
  const urlFaq = import.meta.env.VITE_APP_AIDE_URL;
  const urlNouvelleVersionCoop =
  'https://lesbases.anct.gouv.fr/ressources/l-espace-coop-devient-la-coop-de-la-mediation-numerique-quels-changements-quelles-nouveautes';

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

  useEffect(() => {
    if (error?.resetPasswordCnil) {
      if (hiddenEmail) {
        setShowModalResetPassword(true);
      } else {
        dispatch(userActions.checkForgottenPasswordEmail(username));
      }
    } else if (error?.attemptFail) {
      setCountAttempt(3 - error?.attemptFail);
    } else if (error?.openPopinVerifyCode) {
      setShowModalVerifyCode(true);
    }
  }, [error, hiddenEmail]);

  useEffect(() => {
    if (successEmail) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: <p>Un e-mail vous a été envoyé</p>,
      }));
    }
    if (messageCodeVerified) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'valid',
        message: messageCodeVerified,
      }));
    }
  }, [successEmail, messageCodeVerified]);

  useEffect(() => {
    if (errorEmail || errorCheckEmail) {
      dispatch(alerteActions.getMessageAlerte({
        type: 'invalid',
        message: errorCheckEmail || errorEmail,
      }));
    }
  }, [errorEmail, errorCheckEmail]);

  return (
    <div className="Login">
      <div className="spinnerCustom">
        <Oval
          color="#00BFFF"
          height={100}
          width={100}
          visible={loadingSendEmail}
        />
      </div>
      <Alerte />
      {error?.attemptFail === 3 &&
        <p className="fr-label flashBag invalid">
          Vous avez saisi un mot de passe incorrect &agrave; 3 reprises. Nous avons temporairement verrouill&eacute; votre compte.<br />
          R&eacute;essayez dans 10 min. Si vous l&rsquo;avez oubli&eacute;, cliquez sur&nbsp;
          &quot;<Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute;&nbsp;?" >Mot de passe oubli&eacute;&nbsp;?</Link>&quot;
        </p>
      }
      {showModalResetPassword &&
        <ModalResetPassword username={username} hiddenEmail={hiddenEmail} setShowModalResetPassword={setShowModalResetPassword} />
      }
      {showModalVerifyCode &&
        <ModalVerifyCode setShowModalVerifyCode={setShowModalVerifyCode} email={username} />
      }
      {['admin', 'structure', 'hub'].includes(role ?? error?.role) &&
        <dialog aria-labelledby="fr-modal-confirm-siret" role="dialog" id="fr-modal-confirm-siret" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header"></div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                      L&rsquo;espace Coop {formatRole(role ?? error?.role)} &eacute;volue et devient &quot;Le tableau de pilotage&quot;
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
          <div className="fr-callout fr-icon-information-line">
            <h3 className="fr-callout__title">Votre Espace Coop fait peau neuve !</h3>
            <p className="fr-callout__text">
              A partir du 15.11.2024, l&lsquo;espace coop cèdera sa place à un nouvel outil : La Coop de la médiation.
              Retrouvez les nouveautés de cette nouvelle version <a href={urlNouvelleVersionCoop}>ici</a>.
              <br /><br />
              Pour que le transfert de votre compte soit effectif, nous vous invitons à renseigner votre adresse e-mail
              professionnelle dans la rubrique &quot;Mes informations&quot;.
              L&lsquo;adresse e-mail renseignée vous permettra de vous connecter à la Coop de la médiation dès le 15.11.2024.
              Pour plus d&lsquo;informations, consultez le <a
                href={`${urlFaq}/article/fin-de-la-messagerie-conseiller-numeriquefr-mettre-a-jour-mon-adresse-professionnelle-15v1vlk/`}>
                tutoriel</a>.
            </p>
          </div>
          <div className="margeLeft"></div>
          {/* Title */}
          <div className="fr-col-xs-12 fr-col-sm-12 fr-col-md-5 fr-mt-xs-1w fr-mt-md-8w">
            <div className="headPart">
              <img
                src="/logos/logo-conseiller-numerique-nb.svg"
                alt="logo Conseiller Num&eacute;rique"
                className="logoCnfs" />
              <h1 className="titrage fr-mt-xs-3w fr-mt-md-9w fr-mb-6w">
                {role === 'admin' &&
                  <>Administration<br className="fr-mb-2w" /></>
                }
                Espace Coop
              </h1>
            </div>
            {role !== 'admin' &&
              <>
                <p className="fr-service__tagline labNetworkCnfs">Le r&eacute;seau des conseillers num&eacute;riques.</p>
                <div className="fr-my-9w personas1">
                  <img src="/logos/personas-hexagones.svg" width="100%" alt="Avatars conseillers" />
                </div>
              </>
            }
          </div>
          <div className="fr-my-4w connexion">
            <div className="fr-px-2w fr-mb-2w">
              <label className="fr-label email" htmlFor="email">E-mail Conseiller num&eacute;rique</label>
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
              <button
                className="fr-btn fr-text--bold big-btn"
                onClick={handleSubmit}
                disabled={loading || loadingCheckEmail}
                style={{ background: 'white' }}>
                Connexion
              </button>
              <br />{loading && <span style={{ color: 'black' }}>Connexion en cours...</span>}
            </div>
            <div>
              {error && <span className="invalid">
                {error.errorActivation === true ?
                  <Fragment>
                    <a
                      href={import.meta.env.VITE_APP_AIDE_URL + `/article/quand-vais-je-recevoir-mon-acces-a-lespace-coop-1acxbw6/`}
                      target="blank"
                      rel="noopener noreferrer">
                      Merci d&rsquo;activer votre compte coop <span className="fr-fi-external-link-line fr-link--icon"></span>
                    </a>
                  </Fragment> :
                  error.error?.toString()
                }
                {error?.attemptFail < 3 &&
                  <div style={{ width: '280px', margin: 'auto auto' }}>
                    <b>Mot de passe incorrect</b>, il vous<br />
                    reste&nbsp;
                    <b>
                      {pluralize('tentative', 'tentative', 'tentatives', countAttempt, true)}
                    </b>&nbsp;avant<br />
                    le verrouillage de votre<br />
                    compte.</div>
                }
              </span>
              }
            </div>
            {role !== 'admin' &&
              <div className="mot-de-passe-oublie">
                <Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute; ?" >Mot de passe oubli&eacute; ?</Link>
              </div>
            }
          </div>

        </div>
        {role !== 'admin' &&
          <div className="fr-grid-row fr-pb-12w personas2" style={{ textAlign: 'center' }}>
            <div className="fr-col-12">
              <div className="mot-de-passe-oublie-sm">
                <Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute; ?">Mot de passe oubli&eacute; ?</Link>
              </div>
              <img src="/logos/personas-hexagones.svg" width="90%" alt="Avatars conseillers" />
            </div>
          </div>
        }
      </div>
      <Footer />
    </div>
  );
}

export default Login;
