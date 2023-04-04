import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const nom = slugify(`${user?.nom}`, { replacement: '-', lower: true, strict: true });
  const prenom = slugify(`${user?.prenom}`, { replacement: '-', lower: true, strict: true });
  const emailCnfs = `${prenom}.${nom}@conseiller-numerique.fr`;

  useEffect(() => {
    if (token) {
      dispatch(userActions.verifyToken(token));
    }
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

      <div className="fr-container-fluid">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 zone-titre">
            <div className="fr-container">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-10">
                  <h1 className="titre fr-my-2w fr-mb-md-5w ">Cr&eacute;ation de votre boîte mail <br className="br-titre" />
                  et acc&egrave;s &agrave; l&#39;Espace coop</h1>
                  {tokenVerified &&
                  <p className="sous-titre fr-mb-2w fr-mb-md-4w">
                    Bonjour <b>{user?.prenom} {user?.nom}</b>, vous &ecirc;tes sur le point de finaliser l&#39;acc&egrave;s &agrave; vos services en ligne
                    <br />Conseiller num&eacute;rique France Services
                  </p>}
                </div>
              </div>
            </div>
          </div>

          <div className="fr-col-12 zone-mot-de-passe">

            <div className="fr-container">
              <div className="fr-grid-row fr-grid-row--center">
                {tokenVerified === false &&
                  <div className="fr-mb-10w">
                    <div className="erreur-token">
                      <div className="invalid">
                        D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
                        &nbsp;Vous pouvez &nbsp;<Link to="/login" title="Se connecter" >vous connecter</Link>
                        &nbsp;ou &nbsp;<Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute;" >r&eacute;initialiser votre mot de passe</Link>.
                      </div>
                    </div>
                  </div>
                }
                {(verifyingToken || choosingPassword) &&
                  <div className="fr-mb-10w">
                    <div className="erreur-token">
                      <div className="chargement">Chargement...</div>
                    </div>
                  </div>
                }
                {tokenVerified &&
                  <>
                    <div className="fr-col-12 fr-col-md-5 fr-mt-2w fr-mt-md-4w">
                      <h2 className="titre fr-mb-4v">Choisissez un mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre fr-mb-3w">
                        Celui-ci servira &agrave; la fois pour votre connexion au mail, et pour vous identifier sur l’espace Coop
                        ainsi que sur le service de discussion en ligne, gardez-le pr&eacute;cieusement !
                      </p>
                      <p className="fr-mb-3w">
                        Une boîte mail {emailCnfs}&nbsp;
                        sera automatiquement cr&eacute;&eacute;e lorsque vous cliquerez sur Valider.
                      </p>
                      <p className="fr-mb-md-3w">Acc&eacute;dez ensuite &agrave; cette derni&egrave;re afin de pouvoir effectuer votre
                        premi&egrave;re connexion &agrave; l’espace Coop.
                      </p>
                    </div>

                    <div className="fr-col-12 fr-col-md-5">

                      { tokenVerified && !passwordChoosen &&
                        <div className="fr-mt-11v">
                          {/* Form */}
                          <div>
                            {error && <div className="invalid">{error.error}</div>}
                          </div>

                          <label className="fr-label">
                            Veuillez choisir votre mot de passe.
                            <br />
                            Celui-ci doit contenir au moins 8 caract&egrave;res dont une minuscule, une majuscule, un chiffre et un caract&egrave;re
                            sp&eacute;cial(!@#$%^&amp;*)

                            <input name="password" type="password" value={password}
                              onChange={handleChange} className={(submitted && !password ? ' is-invalid fr-input' : 'fr-input')}
                            />
                          </label>

                          {submitted && !password &&
                          <div className="fr-mt-2w fr-mb-n2w">
                            <div className="invalid">Mot de passe requis</div>
                          </div>
                          }
                          { password && !checkComplexity.test(password) &&
                            <div className="fr-mt-2w fr-mb-n2w">
                              <div className="invalid">Le mot de passe ne correspond pas aux exigences de s&eacute;curit&eacute;.</div>
                            </div>
                          }

                          <label className="fr-label fr-my-4w">
                            Confirmer le mot de passe

                            <input name="passwordConfirm" type="password" value={passwordConfirm}
                              onChange={handleChange} className={(submitted && passwordConfirm !== password ? ' is-invalid fr-input' : 'fr-input')}
                            />
                          </label>
                          {submitted && passwordConfirm !== password &&
                          <div className="fr-mb-2w fr-mt-n2w">
                            <div className="invalid fr-mt-2w">Les mots de passe ne correspondent pas. </div>
                          </div>
                          }

                          <button className="btn-connexion fr-mb-6w fr-mb-md-7w" onClick={handleSubmit} >Valider le mot de passe</button>
                        </div>
                      }
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          { tokenVerified &&
          <div className="fr-col-12 zone-recapitulatif">
            <div className="fr-container fr-mt-5w fr-mt-md-9w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w etape">&eacute;tape 1 :
                  <img src="/logos/mail-conseiller-numerique.svg" alt="Avatar conseiller" className="fr-ml-4v enveloppe" />
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w fr-mb-md-3w descriptif">
                  La cr&eacute;ation de votre compte mail <br className="br-mail" />
                  {emailCnfs}
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-5w fr-mb-md-9w recapitulatif">
                  Celui-ci vous permettra de recevoir et d’envoyer les courriels en lien <br className="br-mail" />
                  avec votre activit&eacute;. Il vous servira &eacute;galement d’identifiant  pour la <br />connexion &agrave; l’espace Coop.
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w etape">&eacute;tape 2 :
                  <img src="/avatars/avatar-conseiller.svg" alt="Avatar conseiller" className="avatar-pwd fr-ml-5v" />
                  <img src="/avatars/avatar-conseillere.svg" alt="Avatar conseillere" className="avatar-pwd" />
                  <img src="/avatars/avatar-conseillers.svg" alt="Avatar conseillers" className="avatar-pwd" />
                  <img src="/avatars/avatar-senior.svg" alt="Avatar senior" className="avatar-pwd" />
                  <img src="/avatars/avatar-coordinatrice.svg" alt="Avatar coordinatrice" className="avatar-pwd last" />
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w fr-mb-md-3w descriptif">
                  Votre premi&egrave;re connexion &agrave; votre espace personnel sur coop.conseillernumerique.fr
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-8w fr-mb-md-15w recapitulatif">
                  Votre boite mail&nbsp;
                  <strong>
                    {emailCnfs}
                  </strong>&nbsp;
                  sert d’identifiant<br />
                  Votre mot de passe de connexion est le m&ecirc;me.
                </div>
                <div className="fr-col-offset-md-3" ></div>

              </div>
            </div>
          </div>
          }
        </div>
      </div>
      <Footer type="support"/>
    </div>
  );

}

ChoosePassword.propTypes = {
  match: PropTypes.object
};

export default ChoosePassword;
