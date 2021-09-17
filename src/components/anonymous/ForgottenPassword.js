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
      <Header/>
      {/* Start content */}
      {!token && !validEmail &&
      /* Etape 1a */
      <div className="rf-container-fluid">
        <div className="rf-grid-row rf-grid-row--center">

          <div className="rf-col-12 zone-titre">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-12 rf-col-md-10">
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Récupération de mot de passe</h1>
                  <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                    Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l&#39;espace Coop,
                    <br />l&#39;espace de discussion, ainsi que votre mail professionnel prenom.nom@conseiller-numerique.fr
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rf-col-12 zone-mot-de-passe">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">

                <div className="rf-col-6 fr-col-offset-3 fr-col-offset-3--right rf-mt-7w">
                  <div className="rf-mt-11v">
                    <p className="titre rf-mb-4v">Entrez votre adresse e-mail prenom.nom@conseiller-numerique.fr</p>
                    <label className="rf-label rf-mt-4w rf-mb-2w">
                      <input name="username" value={username} onChange={handleChangeEmail}
                        className={(submittedEmail && !username ? ' is-invalid rf-input' : 'rf-input')}
                      />
                    </label>
                    {submittedEmail && validEmail &&
                      <div className="rf-mb-2w rf-mt-n2w">
                        <div className="valid rf-mt-2w">L&#39;e-mail de renouvellement de mot de passe a pu être envoyé sur votre adresse personnelle !</div>
                      </div>
                    }
                    {submittedEmail && errorEmail === 'User not found' &&
                      <div className="rf-mb-2w rf-mt-n2w">
                        <div className="invalid rf-my-2w">
                          Cette adresse e-mail n&#39;existe pas dans la base de données.
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
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Récupération de mot de passe</h1>
                  <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                    Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l&#39;espace Coop,
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
                    <h2 className="titre rf-mb-4v">Réinitialiser le mot de passe <img className="cle" src="/logos/cle.svg"/></h2>
                    <p className="rf-mb-3w">
                      Votre adresse {username} est bien renseignée dans la base de données.
                    </p>
                    <p className="rf-mb-3w">
                      En cliquant sur &laquo;&nbsp;Envoyer le lien&nbsp;&raquo;, vous allez recevoir un message sur votre adresse e-mail personnelle
                      (celle qui vous a servi à candidater au dispositif Conseiller numérique) qui vous permettra de réinitialiser votre mot de passe.
                    </p>
                    <p className="rf-mb-md-3w"><b>Votre adresse e-mail personnelle :</b>
                      <br /><b>{hiddenEmail}</b>
                    </p>

                    <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSendEmail}>Envoyer le lien</button>

                    <p>Si vous avez toujours un problème, si cette adresse n&#39;est pas la votre, cliquez sur contacter le support en bas de page.</p>
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
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Récupération de mot de passe</h1>
                  <p className="sous-titre rf-mb-4w rf-mb-md-4w">
                    Votre mot de passe a une triple utilité et vous sert à accéder à trois services : l&#39;espace Coop,
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
                    <h2 className="titre rf-mb-4v">Un e-mail vient d&rsquo;être envoyé à votre adresse
                      <br />{hiddenEmail}
                    </h2>
                    <p>Votre mot de passe est unique et servira à la fois pour votre connexion au mail
                      <br />@conseiller-numerique.fr, pour vous identifier sur l&rsquo;espace Coop et de discussion.
                    </p>

                    <p><img className="cle" src="/logos/cle-precieuse.svg"/></p>

                    <p className="rf-mb-3w">Notez-le en lieu sûr et gardez-le précieusement&nbsp;!</p>

                    <p className="rf-mb-3w">Si vous avez toujours un problème, si cette adresse n&#39;est pas la votre,
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
                      <div className="invalid">Désolé mais le lien est invalide ou a déjà été utilisé.</div>
                    </div>
                  }

                  { tokenVerified && !passwordChoosen &&
                    <div className="rf-mt-11v">
                      {/* Form */}

                      <label className="rf-label">
                        Veuillez choisir votre mot de passe.
                        <br/>Celui-ci doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial(!@#$%^&amp;*)

                        <input name="password" type="password" value={password}
                          onChange={handleChangePassword} className={(submittedPassword && !password ? ' is-invalid rf-input' : 'rf-input')}
                        />
                      </label>

                      {submittedPassword && !password &&
                      <div className="rf-mt-2w rf-mb-n2w">
                        <div className="invalid">Mot de passe requis</div>
                      </div>
                      }
                      { password && !checkComplexity.test(password) &&
                        <div className="rf-mt-2w rf-mb-n2w">
                          <div className="invalid">Le mot de passe ne correspond pas aux exigences de sécurité.</div>
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

                  {errorPassword && !tokenVerified && !passwordChoosen &&
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
      <Footer type="support" titreBouton="Donner mon avis sur cette page"/>
    </div>
  );


}

ForgottenPassword.propTypes = {
  match: PropTypes.object
};

export default ForgottenPassword;
