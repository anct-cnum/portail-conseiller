import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
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
      <Header/>
      {/* Start content */}
      <div className="rf-container" style={{ backgroundColor: '#2a2a2a', margin: '0px', maxWidth: 'unset' }}>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-6w">
          <div className="rf-col-1"></div>
          {/* Title */}
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <h1 className="titrage" style={{ margin: '0' }}>Bienvenue sur le Portail<br/>de la communauté des conseillers<br/>numériques France Services</h1>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-mb-6w">
          <div className="rf-col-1"></div>
          {/* Avatars */}
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <img src="/avatars/avatar-conseiller.svg" width="125px" alt="Avatar conseiller" className="rf-ml-4w rf-mr-4w avatar avatarConseiller"/>
            <img src="/avatars/avatar-conseillere.svg" width="125px" alt="Avatar conseillere" className="rf-mr-4w avatar"/>
            <img src="/avatars/avatar-conseillers.svg" width="125px" alt="Avatar conseillers" className="rf-mr-4w avatar"/>
            <img src="/avatars/avatar-senior.svg" width="125px" alt="Avatar senior" className="rf-mr-4w avatar"/>
            <img src="/avatars/avatar-coordinatrice.svg" width="125px" alt="Avatar coordinatrice" className="avatar avatarCoordinatrice"/>
          </div>
          <div className="rf-col-1"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-pb-7w">
          <div className="rf-col-sm-1 rf-col-lg-4"></div>
          {/* Form */}
          <div className="rf-col-sm-8 rf-col-lg-4" style={{ textAlign: 'center' }}>
            <div>
              {error && <span className="invalid">{error.error}</span>}
            </div>
            <div className="rf-mb-3w">
              <label className="rf-label">Adresse email</label>
              <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !username &&
                  <div className="invalid">Identifiant requis</div>
              }
            </div>
            <div className="rf-mb-5w">
              <label className="rf-label">Mot de passe</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
              }
            </div>
            <div>
              <button className="rf-btn rf-text--bold big-btn" onClick={handleSubmit} style={{ background: 'white' }}>Se connecter</button>
              <br/>{loggingIn && <span>Connexion en cours...</span>}
            </div>
          </div>
          <div className="rf-col-sm-1 rf-col-lg-4"></div>
        </div>
      </div>
      {/* End content */}
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Login;
