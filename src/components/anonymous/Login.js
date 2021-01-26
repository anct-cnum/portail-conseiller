import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

  function handleSubmit(e) {
    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div className="Login">
      <h2>Connexion</h2>
      <div>
        <div>
          {error && <span>`{error.error}`</span>}
        </div>

        <div>
          <label className="rf-label" for="username">Identifiant</label>
          <input id="username" name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid rf-input' : 'rf-input')} />
          {submitted && !username &&
            <div className="invalid">Identifiant requis</div>
          }
        </div>

        <div>
          <label class="rf-label" for="password">Mot de passe</label>
          <input id="password" name="password" type="password" value={password} onChange={handleChange} className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')} />
          {submitted && !password &&
            <div className="invalid">Mot de passe requis</div>
          }
        </div>
        {loggingIn && <span>Connexion en cours...</span>}
        <button className="rf-btn" onClick={handleSubmit}>Se connecter</button>
      </div>
    </div>
  );
}

export default Login;
