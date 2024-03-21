import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { userActions } from '../../actions';
import { Oval } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';

function ChoosePasswordMailBox() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { passwordConfirm, password } = inputs;
  const error = useSelector(state => state.authentication.error);
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const user = useSelector(state => state.createAccount.user);
  const { loadingChangeMailbox, changeMailboxMessage, changeMailboxMessageError } = useSelector(state => state.createAccount);

  useEffect(() => {
    if (token) {
      dispatch(userActions.verifyToken(token));
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  //Contrainte Mattermost : Must be at least 12 characters long and less than 200, have at least one lower char, one upper char, one digit and one special char
  //Source Regex : https://stackoverflow.com/questions/23699919/regular-expression-for-password-complexity
  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{12,199})/);

  function handleSubmit() {
    setSubmitted(true);
    if (password && passwordConfirm === password && checkComplexity.test(password)) {
      dispatch(userActions.choosePasswordMailBox(token, password));
    }
  }

  return (
    <div className="choosePassword">
      <Header />

      <div className="fr-container-fluid">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 zone-titre">
            <div className="fr-container">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-10">
                  <h1 className="titre fr-my-2w fr-mb-md-5w ">Cr&eacute;ation de votre boîte mail<br className="br-titre" />
                  et acc&egrave;s &agrave; l&rsquo;Espace coop</h1>
                  {tokenVerified && !changeMailboxMessage &&
                    <p className="sous-titre fr-mb-2w fr-mb-md-4w">
                      Bonjour <b>{user?.prenom} {user?.nom}</b>, vous &ecirc;tes sur le point de cr&eacute;er un nouvel acc&egrave;s &agrave; vos services en
                      ligne
                      <br />Conseiller num&eacute;rique : <b>{user.support_cnfs.nouveauEmail}</b>
                    </p>
                  }
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
                      Veuillez contactez le support si besoin.
                    </div>
                  </div>
                </div>
                }
                {verifyingToken &&
                <div className="fr-mb-10w">
                  <div className="erreur-token">
                    <div className="chargement">Chargement...</div>
                  </div>
                </div>
                }
                {tokenVerified &&
                <>
                  { loadingChangeMailbox === true &&
                <p className="fr-mt-10w">Veuillez patientez quelques secondes, cette action peut prendre un certain temps</p>
                  }
                  { changeMailboxMessageError &&
                  <h2 style={{ color: 'red' }}>{changeMailboxMessageError}</h2>
                  }
                  <Oval
                    className="fr-mt-10w fr-mb-10w"
                    color="#00BFFF"
                    height="100"
                    width="100"
                    visible={loadingChangeMailbox === true}
                  />

                  {changeMailboxMessage && !changeMailboxMessageError &&
                  <div className="fr-my-5w" style={{ textAlign: 'center' }}>
                    <h2><b>F&eacute;licitations ! Votre nouvelle adresse mail vient d&apos;&ecirc;tre cr&eacute;&eacute;e&nbsp;:&nbsp;<br/>
                      {user.support_cnfs.nouveauEmail}</b>
                    </h2>
                    <p style={{ color: '#4F4840' }}>Votre ancienne adresse {user.name} a &eacute;t&eacute; supprim&eacute;e</p>
                    <Link to="/login" title="Se connecter" >Se connecter</Link>
                  </div>
                  }
                  { loadingChangeMailbox !== true && !changeMailboxMessage && !changeMailboxMessageError &&
                  <>
                    <div className="fr-col-12 fr-col-md-5 fr-mt-2w fr-mt-md-4w">
                      <h2 className="titre fr-mb-4v">Saisissez un mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                      <p className="sous-titre fr-mb-3w">
                      Vous pouvez garder votre ancien mot de passe ou en choisir un nouveau.
                      </p>
                      <p className="sous-titre fr-mb-3w">
                      Celui-ci servira &agrave; la fois pour votre connexion au mail, et pour vous identifier sur l&rsquo;espace Coop
                      ainsi que sur le service de discussion en ligne, gardez-le pr&eacute;cieusement !
                      </p>
                      <p className="fr-mb-3w">
                      Une boîte mail {user.support_cnfs.nouveauEmail}&nbsp;
                      sera automatiquement cr&eacute;&eacute;e lorsque vous cliquerez sur Supprimer mon adresse actuelle et cr&eacute;er ma nouvelle adresse
                      </p>
                      <p className="fr-mb-md-3w">Acc&eacute;dez ensuite &agrave; cette derni&egrave;re afin de pouvoir effectuer votre premi&egrave;re
                        connexion &agrave; l&rsquo;espace Coop.
                      </p>
                    </div>

                    <div className="fr-col-12 fr-col-md-5">

                      { tokenVerified &&
                      <div className="fr-mt-11v">
                        {/* Form */}
                        <div>
                          {error && <div className="invalid">{error.error}</div>}
                        </div>
                        <p className="fr-label fr-mb-5v fr-mb-12v">Veuillez &eacute;crire votre mot de passe.</p>

                        <label className="fr-label">
                          Celui-ci doit contenir au moins 12 caract&egrave;res dont une minuscule, une majuscule, un chiffre et un caract&egrave;re
                          sp&eacute;cial(!@#$%^&amp;*)
                        </label>
                        <input name="password" type="password" value={password}
                          onChange={handleChange} className={(submitted && !password ? ' is-invalid fr-input' : 'fr-input')}
                        />

                        {submitted && !password &&
                        <div className="fr-mb-n2w">
                          <div className="invalid">Mot de passe requis</div>
                        </div>
                        }
                        { password && !checkComplexity.test(password) &&
                          <div className="fr-mt-4w fr-mb-n2w">
                            <div className="invalid">Le mot de passe ne correspond pas aux exigences de s&eacute;curit&eacute;.</div>
                          </div>
                        }

                        <label className="fr-label fr-my-2w">
                          Confirmer le mot de passe
                        </label>
                        <input name="passwordConfirm" type="password" value={passwordConfirm}
                          onChange={handleChange} className={(submitted && passwordConfirm !== password ? 'is-invalid fr-input' : 'fr-input')}
                        />
                        {submitted && passwordConfirm !== password &&
                        <div className="fr-mb-2w fr-mt-n2w">
                          <div className="invalid fr-mt-2w">Les mots de passe ne correspondent pas. </div>
                        </div>
                        }

                        <button style={{ width: '100%' }}
                          className="btn-connexion fr-mb-6w fr-mb-md-9w fr-mt-10v" onClick={handleSubmit} >
                          Supprimer mon adresse <br/>
                          actuelle et cr&eacute;er ma nouvelle adresse
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
          <div className="fr-col-12 zone-recapitulatif">
            <div className="fr-container fr-mt-5w fr-mt-md-9w">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w etape">&Eacute;tape 1 :
                  <img src="/logos/mail-conseiller-numerique.svg" alt="Avatar conseiller" className="fr-ml-4v enveloppe" />
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w fr-mb-md-3w descriptif">
                  La cr&eacute;ation de votre compte mail <br className="br-mail" />
                  {user.support_cnfs.nouveauEmail}
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-5w fr-mb-md-9w recapitulatif">
                  Celui-ci vous permettra de recevoir et d&rsquo;envoyer les courriels en lien <br className="br-mail" />
                  avec votre activit&eacute;. Il vous servira &eacute;galement d’identifiant  pour la<br />connexion &agrave; l&rsquo;espace Coop.
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w etape">&Eacute;tape 2 :
                  <img src="/avatars/avatar-conseiller.svg" alt="Avatar conseiller" className="avatar-pwd fr-ml-5v" />
                  <img src="/avatars/avatar-conseillere.svg" alt="Avatar conseillere" className="avatar-pwd" />
                  <img src="/avatars/avatar-conseillers.svg" alt="Avatar conseillers" className="avatar-pwd" />
                  <img src="/avatars/avatar-senior.svg" alt="Avatar senior" className="avatar-pwd" />
                  <img src="/avatars/avatar-coordinatrice.svg" alt="Avatar coordinatrice" className="avatar-pwd last" />
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-2w fr-mb-md-3w descriptif">
                  Connectez-vous &agrave; votre espace personnel sur coop.conseillernumerique.fr
                </div>
                <div className="fr-col-offset-md-3" ></div>

                <div className="fr-col-offset-md-3" ></div>
                <div className="fr-col-12 fr-col-md-6 fr-mb-8w fr-mb-md-15w recapitulatif">
                  Votre boîte mail&nbsp;
                  <strong>
                  </strong>&nbsp;
                  sert d&rsquo;identifiant<br />
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

export default ChoosePasswordMailBox;
