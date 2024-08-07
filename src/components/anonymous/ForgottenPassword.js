import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';
import Header from '../Header';
import Footer from '../Footer';
import { Link, useLocation, useParams } from 'react-router-dom';

function ForgottenPassword() {

  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useParams();
  const { fromModifPassword = false } = location.state || {};

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
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const errorPassword = useSelector(state => state.createAccount.error);

  useEffect(() => {
    if (token) {
      dispatch(userActions.verifyToken(token));
    }
  }, []);

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setInputsPassword(inputsPassword => ({ ...inputsPassword, [name]: value }));
  }

  //Contrainte Mattermost : Must be at least 12 characters long and less than 200, have at least one lower char, one upper char, one digit and one special char
  //Source Regex : https://stackoverflow.com/questions/23699919/regular-expression-for-password-complexity
  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,199})/);

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
        <div className="fr-container-fluid">
          <div className="fr-grid-row fr-grid-row--center">

            <div className="fr-col-12 zone-titre">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-12 fr-col-md-10">
                    {fromModifPassword ?
                      <h1 className="titre fr-my-2w fr-mb-md-5w ">Modification de votre mot de passe</h1> :
                      <h1 className="titre fr-my-2w fr-mb-md-5w ">Récupération de mot de passe</h1>
                    }
                    <p className="sous-titre fr-mb-4w fr-mb-md-4w">
                      Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l’espace Coop,
                      <br />l’espace de discussion, ainsi que votre e-mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fr-col-12 zone-mot-de-passe">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">

                  <div className="fr-col-6 fr-mt-7w">
                    <div className="fr-mt-11v">
                      <p className="titre fr-mb-4v">Entrez votre adresse e-mail prenom.nom@conseiller-numerique.fr</p>
                      <label className="fr-label fr-mt-4w fr-mb-2w">
                        <input name="username" value={username} onChange={handleChangeEmail}
                          className={(submittedEmail && !username ? ' is-invalid fr-input' : 'fr-input')}
                        />
                      </label>
                      {submittedEmail && validEmail &&
                        <div className="fr-mb-2w fr-mt-n2w">
                          <div className="valid fr-mt-2w">L’e-mail de renouvellement de mot de passe a pu être envoyé
                            sur votre adresse personnelle !</div>
                        </div>
                      }
                      {submittedEmail && errorEmail &&
                        <div className="fr-mb-2w fr-mt-n2w">
                          <div className="invalid fr-my-2w">
                            {errorEmail === 'User not found' ? <>Cette adresse e-mail n’existe pas dans la base de données.</> : errorEmail}
                          </div>
                        </div>
                      }
                      {submittedEmail && !username &&
                        <div className="fr-mb-2w fr-mt-n2w">
                          <div className="invalid fr-mt-2w">Adresse e-mail requise</div>
                        </div>
                      }
                      <button className="btn-connexion fr-mb-6w fr-mb-md-7w" onClick={handleSubmitEmail}>Rechercher</button>
                    </div>
                    <div className="fr-col-12" style={{ textAlign: 'center' }}>
                      <a className="btn-besoin-aide fr-mb-6w fr-mb-md-7w"
                        href="https://aide.conseiller-numerique.gouv.fr/fr/category/espace-coop-1q1nuga/" target="blank" rel="noopener">
                        J’ai besoin d’aide <span className="fr-fi-external-link-line fr-link--icon"></span>
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
        <div className="fr-container-fluid">
          <div className="fr-grid-row fr-grid-row--center">

            <div className="fr-col-12 zone-titre">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-12 fr-col-md-10">
                    <h1 className="titre fr-my-2w fr-mb-md-5w ">Récupération de mot de passe</h1>
                    <p className="sous-titre fr-mb-4w fr-mb-md-4w">
                      Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l’espace Coop,
                      <br />l’espace de discussion, ainsi que votre e-mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 zone-mot-de-passe">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">

                  <div className="fr-col-8 fr-col-offset-2 fr-col-offset-2--right fr-mt-7w">
                    <div className="zone-etape1b">
                      <h2 className="titre fr-mb-4v">Réinitialiser le mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="fr-mb-3w">
                        Votre adresse {username} est bien renseignée dans la base de données.
                      </p>
                      <p className="fr-mb-3w">
                        En cliquant sur &laquo;&nbsp;Envoyer le lien&nbsp;&raquo;, vous allez recevoir un message sur votre adresse e-mail personnelle
                        (celle qui vous a servi à candidater au dispositif Conseiller numérique) qui vous permettra de
                        réinitialiser votre mot de passe.
                      </p>
                      <p className="fr-mb-md-3w"><b>Votre adresse e-mail personnelle :</b>
                        <br /><b>{hiddenEmail}</b>
                      </p>

                      <button className="btn-connexion fr-mb-6w fr-mb-md-7w" onClick={handleSendEmail}>Envoyer le lien</button>

                      <p>Si vous avez toujours un probl&egrave;me, si cette adresse n’est pas la votre, cliquez sur contacter le support en bas de page.</p>
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
        <div className="fr-container-fluid">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 zone-titre">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-12 fr-col-md-10">
                    <h1 className="titre fr-my-2w fr-mb-md-5w ">Récupération de mot de passe</h1>
                    <p className="sous-titre fr-mb-4w fr-mb-md-4w">
                      Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l’espace Coop,
                      <br />l’espace de discussion, ainsi que votre e-mail professionnel prenom.nom@conseiller-numerique.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 zone-mot-de-passe">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-8 fr-col-offset-2 fr-col-offset-2--right fr-mt-7w">
                    <div className="zone-etape1c">
                      <h2 className="titre fr-mb-4v">Un e-mail vient d’être envoyé à votre adresse
                        <br />{hiddenEmail}
                      </h2>
                      <p>Votre mot de passe est unique et servira à la fois pour votre connexion au mail
                        <br />@conseiller-numerique.fr, pour vous identifier sur l’espace Coop et de discussion.
                      </p>
                      <h5 className="fr-mb-4v">
                        Pensez à retourner sur votre boite mail
                        <br /> pour valider votre nouveau mot de passe
                      </h5>
                      <p><img className="cle" src="/logos/cle-precieuse.svg" /></p>

                      <p className="fr-mb-3w">Notez-le en lieu sûr et gardez-le précieusement&nbsp;!</p>

                      <p className="fr-mb-3w">Si vous avez toujours un probl&egrave;me, si cette adresse n’est pas la votre,
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
        <div className="fr-container-fluid">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 zone-titre">
              <h1 className="titre fr-my-2w fr-mb-md-5w ">Renouveler votre mot de passe</h1>
              <p className="sous-titre fr-mb-2w fr-mb-md-4w">
                Bonjour <b>{user?.name}</b>, vous êtes sur le point de finaliser votre renouvellement de mot de passe
                <br />Conseiller numérique
              </p>
            </div>

            <div className="fr-col-12 zone-mot-de-passe">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  {passwordChoosen !== undefined || tokenVerified &&
                    <div className="fr-col-12 fr-col-md-5 fr-mt-2w fr-mt-md-4w">
                      <h2 className="titre fr-mb-4v">Renouveler votre mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre fr-mb-3w">
                        Celui-ci servira à la fois pour votre connexion au mail, pour vous identifier sur l’espace Coop
                        ainsi que sur le service de discussion en ligne, gardez-le précieusement !
                      </p>
                      <p className="fr-mb-3w">
                        Un e-mail de validation sera envoyé à l’adresse {user?.persoEmail} lorsque vous cliquerez sur Valider.
                      </p>
                      <p className="fr-mb-md-3w">
                        Accédez ensuite à cette derni&egrave;re afin de pouvoir effectuer
                        votre premi&egrave;re connexion à l’espace Coop.
                      </p>
                    </div>
                  }
                  <div className="fr-col-12 fr-col-md-5">
                    {verifyingToken || choosingPassword &&
                      <div className="chargement">
                        Chargement...
                      </div>
                    }
                    {passwordChoosen &&
                      <div className="fr-mb-12w fr-mt-md-12w sous-titre">
                        <p style={{ textAlign: 'center' }} >
                          <img className="cle" src="/logos/cle-precieuse.svg" />
                        </p>
                        <h6>Votre mot de passe a été renouvelé avec succ&egrave;s.</h6>
                        <p>Un e-mail vous a été envoyé pour vous confirmer cela !
                          <br />Vous pouvez dès maintenant vous connecter via le bouton ci-dessous :
                        </p>
                        <Link className="btn-connexion fr-mb-6w fr-mb-md-11w fr-p-5v" to={`/login`} style={{ textAlign: 'center' }}>
                          Accéder à mon espace
                        </Link>
                      </div>
                    }
                    {tokenVerified === false &&
                      <div className="fr-mb-12w fr-mt-md-12w">
                        <h6 style={{ color: '#e0000f' }}>
                          Désolé mais le lien est invalide ou a déjà été utilisé.
                        </h6>
                        <div>
                          <p>Si vous avez rescement changer votre mot de passe :</p>
                          <Link className="btn-connexion fr-mb-2w fr-mb-md-6w fr-p-5v" to={`/login`} style={{ textAlign: 'center' }}>
                            Accéder à mon espace
                          </Link>
                          <p>Si vous avez oublier votre mot de passe:</p>
                          <Link className="btn-connexion fr-mb-2w fr-mb-md-6w fr-p-5v" to={`/mot-de-passe-oublie`}
                            style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                            Réinitialiser mon mot de passe
                          </Link>
                        </div>
                      </div>
                    }
                    {tokenVerified && !passwordChoosen &&
                      <div className="fr-mt-11v">
                        {/* Form */}

                        <label className="fr-label">
                          Veuillez choisir votre mot de passe.
                          <br />Celui-ci doit contenir au moins 12 caract&egrave;res dont une minuscule, une majuscule, un chiffre et un
                          caract&egrave;re spécial(!@#$%^&amp;*)

                          <input name="password" type="password" value={password}
                            onChange={handleChangePassword} className={(submittedPassword && !password ? ' is-invalid fr-input' : 'fr-input')}
                          />
                        </label>

                        {submittedPassword && !password &&
                          <div className="fr-mt-2w fr-mb-n2w">
                            <div className="invalid">Mot de passe requis</div>
                          </div>
                        }
                        {password && !checkComplexity.test(password) &&
                          <div className="fr-mt-2w fr-mb-n2w">
                            <div className="invalid">Le mot de passe ne correspond pas aux exigences de sécurité.</div>
                          </div>
                        }

                        <label className="fr-label fr-my-4w">
                          Confirmer le mot de passe

                          <input name="confirmPassword" type="password" value={confirmPassword}
                            onChange=
                              {handleChangePassword} className={(submittedPassword && confirmPassword !== password ? ' is-invalid fr-input' : 'fr-input')}
                          />
                        </label>
                        {submittedPassword && confirmPassword !== password &&
                          <div className="fr-mb-2w fr-mt-n2w">
                            <div className="invalid fr-mt-2w">Les mots de passe ne correspondent pas. </div>
                          </div>
                        }

                        <button className="btn-connexion fr-mb-6w fr-mb-md-7w" onClick={handleSubmitPassword} >Valider le mot de passe</button>
                      </div>
                    }
                    {errorPassword && !tokenVerified && !passwordChoosen && errorPassword !== 'User not found' &&
                      <div className="fr-mb-12w fr-mt-md-12w sous-titre">
                        <div className="invalid">{errorPassword?.toString()}</div>
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

export default ForgottenPassword;
