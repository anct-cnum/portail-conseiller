import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import PropTypes from 'prop-types';
import { userActions } from '../../actions';

function ChoosePasswordHub({ match }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    password: '',
    passwordConfirm: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const { passwordConfirm, password } = inputs;
  const error = useSelector(state => state.authentication.error);

  const token = match.params.token;
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  const checkComplexity = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,199})/);

  function handleSubmit() {
    setSubmitted(true);
    if (password && passwordConfirm === password && checkComplexity.test(password)) {
      dispatch(userActions.choosePassword(token, password, 'bienvenue'));
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
                  <h1 className="titre rf-my-2w rf-mb-md-5w ">Activer votre espace administrateur coop num&eacute;riques France Services</h1>
                  {tokenVerified &&
                  <p className="sous-titre rf-mb-2w rf-mb-md-4w">
                    Bonjour, vous &ecirc;tes sur le point de finaliser votre accès !
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
                      <div className="invalid">
                        D&eacute;sol&eacute; mais le lien est invalide ou a d&eacute;j&agrave; &eacute;t&eacute; utilis&eacute;.
                        &nbsp;Vous pouvez &nbsp;<Link to="/login" title="Se connecter" >vous connecter</Link>
                        &nbsp;ou &nbsp;<Link to="/mot-de-passe-oublie" title="Mot de passe oubli&eacute;" >r&eacute;initialiser votre mot de passe</Link>.
                      </div>
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
                    <div className="rf-col-12">
                      <h2 className="titre rf-my-4v">Choisissez un mot de passe <img className="cle" src="/logos/cle.svg" /></h2>
                    </div>

                    <div className="rf-col-12 rf-col-md-5">

                      {!passwordChoosen &&
                        <div className="rf-mt-11v">
                          {/* Form */}
                          <div>
                            {error && <div className="invalid">{error.error}</div>}
                          </div>

                          <label className="rf-label">
                            Veuillez choisir votre mot de passe.
                            <br />
                            Celui-ci doit contenir au moins 8 caract&egrave;res dont une minuscule, une majuscule, un chiffre et un caract&egrave;re
                            sp&eacute;cial(!@#$%^&amp;*)

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
                              <div className="invalid">Le mot de passe ne correspond pas aux exigences de s&eacute;curit&eacute;.</div>
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
                            <div className="invalid rf-mt-2w">Les mots de passe ne correspondent pas.</div>
                          </div>
                          }

                          <button className="btn-connexion rf-mb-6w rf-mb-md-7w" onClick={handleSubmit} >Valider le mot de passe</button>
                        </div>
                      }
                    </div>
                  </>
                }
                {passwordChoosen &&
                  <div className="rf-col-12 rf-my-5w">
                    <p>
                      <b>
                        Votre mot de passe a bien &eacute;t&eacute; enregistr&eacute; et un email de confirmation vous a &eacute;t&eacute; envoy&eacute; !
                      </b>
                    </p>
                    <br />
                    Vous pouvez d&eacute;sorsmais vous connecter sur <a href="/login"><b>l&rsquo;espace admin coop</b></a>.
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

ChoosePasswordHub.propTypes = {
  match: PropTypes.object
};

export default ChoosePasswordHub;
