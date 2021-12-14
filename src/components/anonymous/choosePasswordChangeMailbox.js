import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { userActions } from '../../actions';
import Spinner from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ChoosePasswordMailBox({ match }) {
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
  const { loadingChangeMailbox, changeMailboxMessage, changeMailboxMessageError } = useSelector(state => state.createAccount);

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
      dispatch(userActions.choosePasswordMailBox(token, password));
    }
  }

  return (
    <div className="choosePassword">
      <Header />

      <div className="rf-container-fluid">
        <div className="rf-grid-row rf-grid-row--center">
          <div className="rf-col-12 zone-titre">
            <div className="rf-container">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-12 rf-col-md-10">
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Création de votre boîte mail<br className="br-titre" />et accès à l&rsquo;Espace coop</h1>
                  {tokenVerified && !changeMailboxMessage &&
                    <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                      Bonjour <b>{user?.prenom} {user?.nom}</b>, vous êtes sur le point de créer un nouvel accès à vos services en ligne
                      <br />Conseiller numérique France Services : <b>{user.support_cnfs.nouveauEmail}</b>
                    </p>
                  }
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
                    <div className="invalid">
                      Désolé mais le lien est invalide ou a déjà été utilisé.
                      Veuillez contactez le support si besoin.
                    </div>
                  </div>
                </div>
                }
                {verifyingToken &&
                <div className="rf-mb-10w">
                  <div className="erreur-token">
                    <div className="chargement">Chargement...</div>
                  </div>
                </div>
                }
                {tokenVerified &&
                <>
                  { loadingChangeMailbox === true &&
                <p className="rf-mt-10w">Veuillez patientez quelques secondes, cette action peut prendre un certain temps</p>
                  }
                  { changeMailboxMessageError &&
                  <h2 style={{ color: 'red' }}>{changeMailboxMessageError}</h2>
                  }
                  <Spinner
                    className="rf-mt-10w rf-mb-10w"
                    type="Oval"
                    color="#00BFFF"
                    height="100"
                    width="100"
                    visible={loadingChangeMailbox === true}
                  />

                  {changeMailboxMessage && !changeMailboxMessageError &&
                  <div className="rf-my-5w" style={{ textAlign: 'center' }}>
                    <h2><b>Félicitations ! Votre nouvelle adresse mail vient d&apos;être créée&nbsp;:&nbsp;<br/>{user.support_cnfs.nouveauEmail}</b></h2>
                    <p style={{ color: '#4F4840' }}>Votre ancienne adresse {user.name} a été supprimée</p>
                    <Link to="/login" title="Se connecter" >Se connecter</Link>
                  </div>
                  }
                  { loadingChangeMailbox !== true && !changeMailboxMessage && !changeMailboxMessageError &&
                  <>
                    <div className="rf-col-12 rf-col-md-5 rf-mt-2w rf-mt-md-4w">
                      <h2 className="titre rf-mb-4v">Saisissez un mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre rf-mb-3w">
                      Vous pouvez garder votre ancien mot de passe ou en choisir un nouveau.
                      </p>
                      <p className="sous-titre rf-mb-3w">
                      Celui-ci servira à la fois pour votre connexion au mail, et pour vous identifier sur l&rsquo;espace Coop
                      ainsi que sur le service de discussion en ligne, gardez-le précieusement !
                      </p>
                      <p className="rf-mb-3w">
                      Une boîte mail {user.support_cnfs.nouveauEmail}&nbsp;
                      sera automatiquement créée lorsque vous cliquerez sur Supprimer mon adresse actuelle et créer ma nouvelle adresse
                      </p>
                      <p className="rf-mb-md-3w">Accédez ensuite à cette dernière afin de pouvoir effectuer votre première connexion à l&rsquo;espace Coop.</p>
                    </div>

                    <div className="rf-col-12 rf-col-md-5">

                      { tokenVerified &&
                      <div className="rf-mt-11v">
                        {/* Form */}
                        <div>
                          {error && <div className="invalid">{error.error}</div>}
                        </div>
                        <p className="rf-label rf-mb-5v rf-mb-12v">Veuillez écrire votre mot de passe.</p>

                        <label className="rf-label">
                          Celui-ci doit contenir au moins 8 caractères dont une minuscule, une majuscule, un chiffre et un caractère spécial(!@#$%^&amp;*)
                        </label>
                        <input name="password" type="password" value={password}
                          onChange={handleChange} className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')}
                        />

                        {submitted && !password &&
                        <div className="rf-mb-n2w">
                          <div className="invalid">Mot de passe requis</div>
                        </div>
                        }
                        { password && !checkComplexity.test(password) &&
                          <div className="rf-mt-4w rf-mb-n2w">
                            <div className="invalid">Le mot de passe ne correspond pas aux exigences de sécurité.</div>
                          </div>
                        }

                        <label className="rf-label rf-my-2w">
                          Confirmer le mot de passe
                        </label>
                        <input name="passwordConfirm" type="password" value={passwordConfirm}
                          onChange={handleChange} className={(submitted && passwordConfirm !== password ? 'is-invalid rf-input' : 'rf-input')}
                        />
                        {submitted && passwordConfirm !== password &&
                        <div className="rf-mb-2w rf-mt-n2w">
                          <div className="invalid rf-mt-2w">Les mots de passe ne correspondent pas. </div>
                        </div>
                        }

                        <button style={{ width: '100%' }}
                          className="btn-connexion rf-mb-6w rf-mb-md-9w rf-mt-10v" onClick={handleSubmit} >
                          Supprimer mon adresse <br/>
                          actuelle et créer ma nouvelle adresse
                        </button>
                      </div>
                      }
                    </div>
                  </>
                  }
                </>
                }
              </div>
            </div>
          </div>
          { tokenVerified &&
          <div className="rf-col-12 zone-recapitulatif">
            <div className="rf-container rf-mt-5w rf-mt-md-9w">
              <div className="rf-grid-row rf-grid-row--center">
                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w etape">&Eacute;tape 1 :
                  <img src="/logos/mail-conseiller-numerique.svg" alt="Avatar conseiller" className="rf-ml-4v enveloppe" />
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w rf-mb-md-3w descriptif">
                  La création de votre compte mail <br className="br-mail" />
                  {user.support_cnfs.nouveauEmail}
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-5w rf-mb-md-9w recapitulatif">
                  Celui-ci vous permettra de recevoir et d&rsquo;envoyer les courriels en lien <br className="br-mail" />
                  avec votre activité. Il vous servira également d’identifiant  pour la<br />connexion à l&rsquo;espace Coop.
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w etape">&Eacute;tape 2 :
                  <img src="/avatars/avatar-conseiller.svg" alt="Avatar conseiller" className="avatar-pwd rf-ml-5v" />
                  <img src="/avatars/avatar-conseillere.svg" alt="Avatar conseillere" className="avatar-pwd" />
                  <img src="/avatars/avatar-conseillers.svg" alt="Avatar conseillers" className="avatar-pwd" />
                  <img src="/avatars/avatar-senior.svg" alt="Avatar senior" className="avatar-pwd" />
                  <img src="/avatars/avatar-coordinatrice.svg" alt="Avatar coordinatrice" className="avatar-pwd last" />
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-2w rf-mb-md-3w descriptif">
                  Connectez-vous à votre espace personnel sur coop.conseillernumerique.fr
                </div>
                <div className="rf-col-offset-md-3" ></div>

                <div className="rf-col-offset-md-3" ></div>
                <div className="rf-col-12 rf-col-md-6 rf-mb-8w rf-mb-md-15w recapitulatif">
                  Votre boîte mail&nbsp;
                  <strong>
                  </strong>&nbsp;
                  sert d&rsquo;identifiant<br />
                  Votre mot de passe de connexion est le même.
                </div>
                <div className="rf-col-offset-md-3" ></div>

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

ChoosePasswordMailBox.propTypes = {
  match: PropTypes.object
};

export default ChoosePasswordMailBox;
