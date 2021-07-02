import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions';

import Header from '../Header';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

function ForgottenPassword({ match = null }) {

  const dispatch = useDispatch();
  const token = match.params.token;

  /* Etape 1*/
  const [inputEmail, setInputsEmail] = useState({
    username: ''
  });
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const { username } = inputEmail;
  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setInputsEmail(inputEmail => ({ ...inputEmail, [name]: value }));
  }
  function handleSubmitEmail() {
    setSubmittedEmail(true);
    if (username) {
      dispatch(userActions.forgottenPassword(username));
    }
  }
  const errorEmail = useSelector(state => state.motDePasseOublie.error);
  const validEmail = useSelector(state => state.motDePasseOublie.user);

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

  const checkComplexity = password => password.length >= 6;

  function handleSubmitPassword() {
    setSubmittedPassword(true);
    if (password && confirmPassword === password && checkComplexity(password)) {
      dispatch(userActions.choosePassword(token, password, 'renouvellement'));
    }
  }

  return (
    <div className="forgotten-password">
      <Header/>
      {/* Start content */}
      {!token &&
      /* Etape 1 */
      <div className="rf-container-fluid">
        <div className="rf-grid-row rf-grid-row--center">

          <div className="rf-col-12 zone-titre">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-12 rf-col-md-10">
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Mot de passe oublié ?</h1>
                  <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                    Bonjour, vous êtes sur le point de demander le renouvellement de votre mot de passe
                    <br/>Conseiller numérique France Services
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rf-col-12 zone-mot-de-passe">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">

                <div className="rf-col-12 rf-col-md-5 rf-mt-2w rf-mt-md-4w">
                  <h2 className="titre rf-mb-4v">Entrez votre adresse e-mail <img className="cle" src="/logos/cle.svg"/></h2>
                  <p className="sous-titre rf-mb-3w">
                    Nous allons vous envoyer un e-mail afin de vous permettre de modifier votre mot de passe.
                  </p>
                </div>

                <div className="rf-col-12 rf-col-md-5">
                  <div className="rf-mt-11v">
                    <label className="rf-label rf-my-4w">Adresse email
                      <input name="username" value={username} onChange={handleChangeEmail}
                        className={(submittedEmail && !username ? ' is-invalid rf-input' : 'rf-input')}
                      />
                    </label>
                    {submittedEmail && validEmail &&
                      <div className="rf-mb-2w rf-mt-n2w">
                        <div className="valid rf-mt-2w">L&#39;e-mail de renouvellement de mot de passe a pu être envoyé sur : {validEmail.persoEmail} !</div>
                      </div>
                    }
                    {submittedEmail && errorEmail === 'User not found' &&
                      <div className="rf-mb-2w rf-mt-n2w">
                        <div className="invalid rf-mt-2w">
                          L&#39;e-mail de renouvellement de mot de passe n&#39;a pas pu être envoyé, vérifiez votre adresse e-mail !
                        </div>
                      </div>
                    }
                    {submittedEmail && !username &&
                      <div className="rf-mb-2w rf-mt-n2w">
                        <div className="invalid rf-mt-2w">Adresse email requise</div>
                      </div>
                    }
                    <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSubmitEmail}>Poursuivre</button>
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
              Bonjour <b>{user?.name}</b>, vous êtes sur le point de finaliser votre renouvellement de mot de passe
              <br/>Conseiller numérique France Services
            </p>
          </div>

          <div className="rf-col-12 zone-mot-de-passe">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">

                <div className="rf-col-12 rf-col-md-5 rf-mt-2w rf-mt-md-4w">
                  <h2 className="titre rf-mb-4v">Renouveler votre mot de passe <img className="cle" src="/logos/cle.svg"/></h2>
                  <p className="sous-titre rf-mb-3w">
                    Celui-ci servira à la fois pour votre connexion au mail, pour vous identifier sur l’espace Coop
                    ainsi que sur le service de discussion en ligne, gardez-le précieusement !
                  </p>
                  <p className="rf-mb-3w">
                    Un e-mail de validation sera envoyé à l’adresse {user?.persoEmail} lorsque vous cliquerez sur Valider.
                  </p>
                  <p className="rf-mb-md-3w">
                    Accédez ensuite à cette dernière afin de pouvoir effectuer votre première connexion à l’espace Coop.
                  </p>
                </div>

                <div className="rf-col-12 rf-col-md-5">

                  { verifyingToken || choosingPassword &&
                    <div className="chargement">
                      Chargement...
                    </div>
                  }
                  { tokenVerified === false &&
                    <div className="erreur-token">
                      <div className="invalid">Désolé mais le lien est invalide.</div>
                    </div>
                  }

                  { tokenVerified && !passwordChoosen &&
                    <div className="rf-mt-11v">
                      {/* Form */}
                      <div>
                        {errorPassword && <div className="invalid">{errorPassword.error}</div>}
                      </div>

                      <label className="rf-label">
                        Veuillez choisir votre mot de passe.
                        <br/>Celui-ci doit contenir au moins six caractères

                        <input name="password" type="password" value={password}
                          onChange={handleChangePassword} className={(submittedPassword && !password ? ' is-invalid rf-input' : 'rf-input')}
                        />
                      </label>

                      {submittedPassword && !password &&
                      <div className="rf-mt-2w rf-mb-n2w">
                        <div className="invalid">Mot de passe requis</div>
                      </div>
                      }
                      { password && !checkComplexity(password) &&
                        <div className="rf-mt-2w rf-mb-n2w">
                          <div className="invalid">Le mot de passe doit contenir au moins six caractères.</div>
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
                  { passwordChoosen &&
                    <div className="rf-mb-12w rf-mt-md-12w sous-titre">
                      Votre mot de passe a été renouvelé avec succès. <Link to={`/login`}>Vous pouvez vous connecter</Link>.
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
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </div>
  );


}

ForgottenPassword.propTypes = {
  match: PropTypes.object
};

export default ForgottenPassword;
