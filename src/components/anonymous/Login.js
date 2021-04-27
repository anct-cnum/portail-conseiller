import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer';

import { userActions } from '../../actions';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const error = useSelector(state => state.authentication.error);
  const dispatch = useDispatch();
  const location = useLocation();

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

  return (
    <div className="Login">
      {/* Start content */}
      <div className="rf-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="rf-grid-row rf-grid-row--gutters rf-py-xs-1w rf-py-md-8w" style={{ marginBottom: 0 }}>
          <div className="margeLeft"></div>
          {/* Title */}
          <div className="rf-col-xs-12 rf-col-sm-12 rf-col-md-5 rf-mt-xs-1w rf-mt-md-8w">
            <div className="headPart">
              <img
                src="/logos/logo-conseiller-numerique-nb.svg"
                alt="logo Conseiller Numérique France Services"
                className="logoCnfs"/>
              <h1 className="titrage rf-mt-xs-3w rf-mt-md-9w rf-mb-6w">Espace Coop</h1>
            </div>
            <p className="rf-service__tagline labNetworkCnfs">Le réseau des conseillers numériques France Services.</p>
            <div className="rf-my-9w personas1">
              <img src="/logos/personas-hexagones.svg" width="100%" alt="Avatars conseillers"/>
            </div>
          </div>
          <div className="rf-my-4w connexion">
            <div className="rf-px-2w rf-mb-2w">
              <label className="rf-label email">E-mail Conseiller numérique France Services</label>
              <input
                name="username"
                value={username}
                onChange={handleChange}
                className={`rf-input rf-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
              {submitted && !username &&
                  <div className="invalid">Identifiant requis</div>
              }
            </div>
            <div className="rf-px-2w rf-mb-4w">
              <label className="rf-label password">Mot de passe</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className={`rf-input rf-input-custom ${submitted && !password ? ' is-invalid' : ''}`} />
              {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
              }
            </div>
            <div>
              <button className="rf-btn rf-text--bold big-btn" onClick={handleSubmit} style={{ background: 'white' }}>Connexion</button>
              <br/>{loggingIn && <span style={{ color: 'black' }}>Connexion en cours...</span>}
            </div>
            <div>
              {error && <span className="invalid">{error.error}</span>}
            </div>
          </div>
        </div>
        <div className="rf-grid-row rf-pb-12w personas2" style={{ textAlign: 'center' }}>
          <div className="rf-col-12">
            <img src="/logos/personas-hexagones.svg" width="90%" alt="Avatars conseillers"/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
