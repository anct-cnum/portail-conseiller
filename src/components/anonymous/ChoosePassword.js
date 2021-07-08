import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';
import slugify from 'slugify';

function ChoosePassword({ match }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { passwordConfirm, password } = inputs;
  const error = useSelector(state => state.authentication.error);


  const token = match.params.token;
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const user = useSelector(state => state.createAccount.user);
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  //Contrainte Mattermost : Must be at least 8 characters long and less than 200, have at least one lower char, one upper char, one digit and one special char
  //Source Regex : https://stackoverflow.com/questions/23699919/regular-expression-for-password-complexity
  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,199})/);

  function handleSubmit() {
    setSubmitted(true);
    if (password && passwordConfirm === password && checkComplexity.test(password)) {
      dispatch(userActions.choosePassword(token, password, 'bienvenue'));
    }
  }

  //Go to validation page only if passwordChoosen is success
  useEffect(() => {
    if (passwordChoosen === true) {
      dispatch(userActions.login(user.name, password, '/validation'));
    }
  }, [passwordChoosen]);

  return (
    <div className="choosePassword">
      <Header />

      <div className="rf-container-fluid">
        <div className="rf-grid-row rf-grid-row--center">

          <div className="rf-col-12 zone-titre">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-12 rf-col-md-10">
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Création de votre boîte mail <br className="br-titre" />et accès à l&#39;Espace coop</h1>
                  {tokenVerified &&
                  <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                    Bonjour <b>{user?.name}</b>, vous êtes sur le point de finaliser l&#39;accès à vos services en ligne
                    <br />Conseiller numérique France Services
                  </p>}
                </div>
              </div>
            </div>
          </div>

          <div className="rf-col-12 zone-mot-de-passe">


            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                {tokenVerified === false &&
                  <div className="rf-mb-10w">
                    <div className="erreur-token">
                      <div className="invalid">Désolé mais le lien est invalide.</div>
                    </div>
                  </div>
                }
                {(verifyingToken || choosingPassword) &&
                  <div className="rf-mb-10w">
                    <div className="erreur-token">
                      <div className="chargement">Chargement...</div>
                    </div>
                  </div>
                }
                {tokenVerified &&
                  <>
                    <div className="rf-col-12 rf-col-md-5 rf-mt-2w rf-mt-md-4w">
                      <h2 className="titre rf-mb-4v">Choisissez un mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre rf-mb-3w">
                        Celui-ci servira à la fois pour votre connexion au mail, et pour vous identifier sur l’espace Coop
                        ainsi que sur le service de discussion en ligne, gardez-le précieusement !
                      </p>
                      <p className="rf-mb-3w">
                        Une boîte mail {slugify(`${user?.prenom} ${user?.nom}`, { replacement: '.', lower: true, strict: true })}@conseiller-numerique.fr
                        sera automatiquement créée lorsque vous cliquerez sur Valider.
                      </p>
                      <p className="rf-mb-md-3w">Accédez ensuite à cette dernière afin de pouvoir effectuer votre première connexion à l’espace Coop.</p>
                    </div>
                    <div className="rf-col-12 rf-col-md-5">

                      { tokenVerified && !passwordChoosen &&
                        <div className="rf-mt-11v">
                          {/* Form */}
                          <div>
                            {error && <div className="invalid">{error.error}</div>}
                          </div>

                          <label className="rf-label">
                            Veuillez choisir votre mot de passe.
                            <br />
                            Celui-ci doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial(!@#$%^&amp;*)

                            <input name="password" type="password" value={password}
                              onChange={handleChange} className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')}
                            />
                          </label>

                          {submitted && !password &&
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

                            <input name="passwordConfirm" type="password" value={passwordConfirm}
                              onChange={handleChange} className={(submitted && passwordConfirm !== password ? ' is-invalid rf-input' : 'rf-input')}
                            />
                          </label>
                          {submitted && passwordConfirm !== password &&
                          <div className="rf-mb-2w rf-mt-n2w">
                            <div className="invalid rf-mt-2w">Les mots de passe ne correspondent pas. </div>
                          </div>
                          }

                          <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSubmit} >Valider le mot de passe</button>
                        </div>
                      }
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {tokenVerified &&
          <div className="rf-col-12 zone-recapitulatif">
            <div className="rf-container rf-mt-5w rf-mt-md-9w">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w etape">Étape 1 :
                  <img src="/logos/mail-conseiller-numerique.svg" alt="Avatar conseiller" className="rf-ml-4v enveloppe" />
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w rf-mb-md-3w descriptif">
                  La création de votre compte mail <br className="br-mail" />
                  {slugify(`${user?.prenom} ${user?.nom}`, { replacement: '.', lower: true, strict: true })}@conseiller-numerique.fr
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-5w rf-mb-md-9w recapitulatif">
                  Celui-ci vous permettra de recevoir et d’envoyer les courriels en lien <br className="br-mail" />
                  avec votre activité. Il vous servira également d’identifiant  pour la <br />connexion à l’espace Coop.
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w etape">Étape 2 :
                  <img src="/avatars/avatar-conseiller.svg" alt="Avatar conseiller" className="avatar-pwd rf-ml-5v" />
                  <img src="/avatars/avatar-conseillere.svg" alt="Avatar conseillere" className="avatar-pwd" />
                  <img src="/avatars/avatar-conseillers.svg" alt="Avatar conseillers" className="avatar-pwd" />
                  <img src="/avatars/avatar-senior.svg" alt="Avatar senior" className="avatar-pwd" />
                  <img src="/avatars/avatar-coordinatrice.svg" alt="Avatar coordinatrice" className="avatar-pwd last" />
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w rf-mb-md-3w descriptif">
                  Votre première connexion à votre espace personnel sur coop.conseillernumerique.fr
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-8w rf-mb-md-15w recapitulatif">Votre boite mail <strong>{slugify(`${user?.prenom} ${user?.nom}`, { replacement: '.', lower: true, strict: true })}@conseiller-numerique.fr</strong> sert d’identifiant<br />
                  Votre mot de passe de connexion est le même.
                </div>
                <div className="rf-col-offset-md-3" ></div>

              </div>
            </div>
          </div>
          }
        </div>
      </div>
      <Footer type="support" titreBouton="Donner mon avis sur cette page" />
    </div>
  );

}

ChoosePassword.propTypes = {
  match: PropTypes.object
};

export default ChoosePassword;
