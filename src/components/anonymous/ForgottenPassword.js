import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import Header from '../Header';
import Footer from '../Footer';
import { Link, useLocation } from 'react-router-dom';

function ForgottenPassword({ match = null }) {

  const dispatch = useDispatch();
  const location = useLocation();
  const { fromModifPassword = false } = location.state || {};

  const token = match.params.token;

  /* Etape 1*/
  const [inputEmail, setInputsEmail] = useState({
    username: ''
  });
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const { username } = inputEmail;
  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setInputsEmail(inputEmail => ({ ...inputEmail, [name]: value }));
  }
  function handleSubmitEmail() {
    setSubmittedEmail(true);
    if (username) {
      dispatch(userActions.checkForgottenPasswordEmail(username));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function handleSendEmail() {
    setSentEmail(true);
    if (username) {
      dispatch(userActions.forgottenPassword(username));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const errorEmail = useSelector(state => state.checkMotDePasseOublie.error);
  const validEmail = useSelector(state => state.checkMotDePasseOublie.success);
  const hiddenEmail = useSelector(state => state.checkMotDePasseOublie.hiddenEmail);

  /* Etape 2 */
  const [inputsPassword, setInputsPassword] = useState({
    password: '',
    confirmPassword: ''
  });

  const [submittedPassword, setSubmittedPassword] = useState(false);
  const { password, confirmPassword } = inputsPassword;

  const user = useSelector(state => state.createAccount.user);
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);

  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);
  let passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const errorPassword = useSelector(state => state.createAccount.error);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setInputsPassword(inputsPassword => ({ ...inputsPassword, [name]: value }));
  }

  //Contrainte Mattermost : Must be at least 8 characters long and less than 200, have at least one lower char, one upper char, one digit and one special char
  //Source Regex : https://stackoverflow.com/questions/23699919/regular-expression-for-password-complexity
  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,199})/);

  function handleSubmitPassword() {
    setSubmittedPassword(true);
    if (password && confirmPassword === password && checkComplexity.test(password)) {
      dispatch(userActions.choosePassword(token, password, 'renouvellement'));
    }
  }

  return (
    <div className="forgotten-password">
      <Header />
      {/* Start content */}
      {!token && !validEmail &&
        /* Etape 1a */
        <div className="rf-container-fluid">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 zone-titre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-10">
                    {fromModifPassword ?
                      <h1 className="titre rf-my-2w rf-mb-md-5w ">Modification de votre mot de passe</h1> :
                      <h1 className="titre rf-my-2w rf-mb-md-5w ">R&eacute;cup&eacute;ration de mot de passe</h1>
                    }
                    <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                      Votre mot de passe a une triple utilit&eacute; et vous sert &agrave; acc&eacute;der &agrave; trois services : l&rsquo;espace Coop,
                      <br />l&rsquo;espace de discussion, ainsi que votre mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rf-col-12 zone-mot-de-passe">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-6 rf-mt-7w">
                    <div className="rf-mt-11v">
                      <p className="titre rf-mb-4v">Entrez votre adresse e-mail prenom.nom@conseiller-numerique.fr</p>
                      <label className="rf-label rf-mt-4w rf-mb-2w">
                        <input name="username" value={username} onChange={handleChangeEmail}
                          className={(submittedEmail && !username ? ' is-invalid rf-input' : 'rf-input')}
                        />
                      </label>
                      {submittedEmail && validEmail &&
                        <div className="rf-mb-2w rf-mt-n2w">
                          <div className="valid rf-mt-2w">L&rsquo;e-mail de renouvellement de mot de passe a pu &ecirc;tre envoy&eacute;
                            sur votre adresse personnelle !</div>
                        </div>
                      }
                      {submittedEmail && errorEmail &&
                        <div className="rf-mb-2w rf-mt-n2w">
                          <div className="invalid rf-my-2w">
                            {errorEmail === 'User not found' ? <>Cette adresse e-mail n&rsquo;existe pas dans la base de donn&eacute;es.</> : errorEmail}
                          </div>
                        </div>
                      }
                      {submittedEmail && !username &&
                        <div className="rf-mb-2w rf-mt-n2w">
                          <div className="invalid rf-mt-2w">Adresse email requise</div>
                        </div>
                      }
                      <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSubmitEmail}>Rechercher</button>
                    </div>
                    <div className="rf-col-12" style={{ textAlign: 'center' }}>
                      <a className="btn-besoin-aide rf-mb-6w rf-mb-md-7w"
                        href="https://aide.conseiller-numerique.gouv.fr/fr/category/espace-coop-1q1nuga/" target="blank" rel="noopener">
                        J&rsquo;ai besoin d&rsquo;aide <span className="rf-fi-external-link-line rf-link--icon"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {validEmail && !sentEmail &&
        /* Etape 1b */
        <div className="rf-container-fluid">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 zone-titre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-10">
                    <h1 className="titre rf-my-2w rf-mb-md-5w ">R&eacute;cup&eacute;ration de mot de passe</h1>
                    <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                      Votre mot de passe a une triple utilit&eacute; et vous sert &agrave; acc&eacute;der &agrave; trois services : l&#39;espace Coop,
                      <br />l&#39;espace de discussion, ainsi que votre mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rf-col-12 zone-mot-de-passe">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-8 fr-col-offset-2 fr-col-offset-2--right rf-mt-7w">
                    <div className="zone-etape1b">
                      <h2 className="titre rf-mb-4v">R&eacute;initialiser le mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="rf-mb-3w">
                        Votre adresse {username} est bien renseign&eacute;e dans la base de donn&eacute;es.
                      </p>
                      <p className="rf-mb-3w">
                        En cliquant sur &laquo;&nbsp;Envoyer le lien&nbsp;&raquo;, vous allez recevoir un message sur votre adresse e-mail personnelle
                        (celle qui vous a servi &agrave; candidater au dispositif Conseiller num&eacute;rique) qui vous permettra de
                        r&eacute;initialiser votre mot de passe.
                      </p>
                      <p className="rf-mb-md-3w"><b>Votre adresse e-mail personnelle :</b>
                        <br /><b>{hiddenEmail}</b>
                      </p>

                      <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSendEmail}>Envoyer le lien</button>

                      <p>Si vous avez toujours un probl&egrave;me, si cette adresse n&#39;est pas la votre, cliquez sur contacter le support en bas de page.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {sentEmail &&
        /* Etape 1c */
        <div className="rf-container-fluid">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 zone-titre">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  <div className="rf-col-12 rf-col-md-10">
                    <h1 className="titre rf-my-2w rf-mb-md-5w ">R&eacute;cup&eacute;ration de mot de passe</h1>
                    <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                      Votre mot de passe a une triple utilit&eacute; et vous sert &agrave; acc&eacute;der &agrave; trois services : l&#39;espace Coop,
                      <br />l&#39;espace de discussion, ainsi que votre mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rf-col-12 zone-mot-de-passe">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">

                  <div className="rf-col-8 fr-col-offset-2 fr-col-offset-2--right rf-mt-7w">
                    <div className="zone-etape1c">
                      <h2 className="titre rf-mb-4v">Un e-mail vient d&rsquo;&ecirc;tre envoy&eacute; &agrave; votre adresse
                        <br />{hiddenEmail}
                      </h2>
                      <p>Votre mot de passe est unique et servira &agrave; la fois pour votre connexion au mail
                        <br />@conseiller-numerique.fr, pour vous identifier sur l&rsquo;espace Coop et de discussion.
                      </p>
                      <h5 className="rf-mb-4v">
                        Pensez à retourner sur votre boite mail
                        <br /> pour valider votre nouveau mot de passe
                      </h5>
                      <p><img className="cle" src="/logos/cle-precieuse.svg" /></p>

                      <p className="rf-mb-3w">Notez-le en lieu sûr et gardez-le pr&eacute;cieusement&nbsp;!</p>

                      <p className="rf-mb-3w">Si vous avez toujours un probl&egrave;me, si cette adresse n&#39;est pas la votre,
                        cliquez sur contacter le support en bas de page.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {token &&
        /* Etape 2 */
        <div className="rf-container-fluid">
          <div className="rf-grid-row rf-grid-row--center">

            <div className="rf-col-12 zone-titre">
              <h1 className="titre rf-my-2w rf-mb-md-5w ">Renouveler votre mot de passe</h1>
              <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                Bonjour <b>{user?.name}</b>, vous &ecirc;tes sur le point de finaliser votre renouvellement de mot de passe
                <br />Conseiller num&eacute;rique France Services
              </p>
            </div>

            <div className="rf-col-12 zone-mot-de-passe">
              <div className="rf-container">
                <div className="rf-grid-row rf-grid-row--center">
                  {passwordChoosen !== undefined || tokenVerified &&
                    <div className="rf-col-12 rf-col-md-5 rf-mt-2w rf-mt-md-4w">
                      <h2 className="titre rf-mb-4v">Renouveler votre mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre rf-mb-3w">
                        Celui-ci servira &agrave; la fois pour votre connexion au mail, pour vous identifier sur l&rsquo;espace Coop
                        ainsi que sur le service de discussion en ligne, gardez-le pr&eacute;cieusement !
                      </p>
                      <p className="rf-mb-3w">
                        Un e-mail de validation sera envoy&eacute; &agrave; l’adresse {user?.persoEmail} lorsque vous cliquerez sur Valider.
                      </p>
                      <p className="rf-mb-md-3w">
                        Acc&eacute;dez ensuite &agrave; cette derni&egrave;re afin de pouvoir effectuer
                        votre premi&egrave;re connexion &agrave; l&rsquo;espace Coop.
                      </p>
                    </div>
                  }
                  <div className="rf-col-12 rf-col-md-5">

                    {verifyingToken || choosingPassword &&
                      <div className="chargement">
                        Chargement...
                      </div>
                    }
                    {passwordChoosen &&
                      <div className="rf-mb-12w rf-mt-md-12w sous-titre">
                        <p style={{ textAlign: 'center' }} >
                          <img className="cle" src="/logos/cle-precieuse.svg" />
                        </p>
                        <h6>Votre mot de passe a &eacute;t&eacute; renouvel&eacute; avec succ&egrave;s.</h6>
                        <p>Un email vous a &eacute;t&eacute; envoyer pour vous confirmer cela !
                          <br />Vous pouvez dès maintenant vous connecter via le bouton ci-dessous :
                        </p>
                        <Link className="btn-connexion rf-mb-6w rf-mb-md-11w rf-p-5v" to={`/login`} style={{ textAlign: 'center' }}>
                          Accéder à mon espace
                        </Link>
                      </div>
                    }
                    {tokenVerified === false &&
                      <div className="rf-mb-12w rf-mt-md-12w">
                        <h6 style={{ color: '#e0000f' }}>
                          D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
                        </h6>
                        <div>
                          <p>Si vous avez rescement changer votre mot de passe :</p>
                          <Link className="btn-connexion rf-mb-2w rf-mb-md-6w rf-p-5v" to={`/login`} style={{ textAlign: 'center' }}>
                            Acc&eacute;der à mon espace
                          </Link>
                          <p>Si vous avez oublier votre mot de passe:</p>
                          <Link className="btn-connexion rf-mb-2w rf-mb-md-6w rf-p-5v" to={`/mot-de-passe-oublie`}
                            style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            R&eacute;initialiser mon mot de passe
                          </Link>
                        </div>
                      </div>
                    }
                    {tokenVerified && !passwordChoosen &&
                      <div className="rf-mt-11v">
                        {/* Form */}

                        <label className="rf-label">
                          Veuillez choisir votre mot de passe.
                          <br />Celui-ci doit contenir au moins 8 caract&egrave;res dont une minuscule, une majuscule, un chiffre et un
                          caract&egrave;re sp&eacute;cial(!@#$%^&amp;*)

                          <input name="password" type="password" value={password}
                            onChange={handleChangePassword} className={(submittedPassword && !password ? ' is-invalid rf-input' : 'rf-input')}
                          />
                        </label>

                        {submittedPassword && !password &&
                          <div className="rf-mt-2w rf-mb-n2w">
                            <div className="invalid">Mot de passe requis</div>
                          </div>
                        }
                        {password && !checkComplexity.test(password) &&
                          <div className="rf-mt-2w rf-mb-n2w">
                            <div className="invalid">Le mot de passe ne correspond pas aux exigences de s&eacute;curit&eacute;.</div>
                          </div>
                        }

                        <label className="rf-label rf-my-4w">
                          Confirmer le mot de passe

                          <input name="confirmPassword" type="password" value={confirmPassword}
                            onChange=
                              {handleChangePassword} className={(submittedPassword && confirmPassword !== password ? ' is-invalid rf-input' : 'rf-input')}
                          />
                        </label>
                        {submittedPassword && confirmPassword !== password &&
                          <div className="rf-mb-2w rf-mt-n2w">
                            <div className="invalid rf-mt-2w">Les mots de passe ne correspondent pas. </div>
                          </div>
                        }

                        <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSubmitPassword} >Valider le mot de passe</button>
                      </div>
                    }
                    {errorPassword && !tokenVerified && !passwordChoosen && errorPassword !== 'User not found' &&
                      <div className="rf-mb-12w rf-mt-md-12w sous-titre">
                        <div className="invalid">{errorPassword}</div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* End content */}
      <Footer type="support" />
    </div>
  );


}

ForgottenPassword.propTypes = {
  match: PropTypes.object
};

export default ForgottenPassword;
