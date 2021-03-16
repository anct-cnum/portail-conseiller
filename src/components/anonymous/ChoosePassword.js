import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { history } from '../../helpers/history';
import Header from '../Header';
import Footer from '../Footer';

function ChoosePassword() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { passwordConfirm, password } = inputs;
  const error = useSelector(state => state.authentication.error);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (passwordConfirm && password) {
      history.push('/validation');
    }
  }

  return (
    <div className="choosePassword">
      <Header linkAccount="noConnected"/>
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
        <div className="rf-grid-row rf-grid-row--center rf-mb-5w">
          <div className="rf-col-2"></div>
          <div className="rf-col-8" style={{ textAlign: 'center' }}>
            <p>
              Vous vous apprêtez à finaliser la création de votre compte avec votre adresse mail :<br/>
              <strong>test@gmail.com</strong>
            </p>
          </div>
          <div className="rf-col-2"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-mb-3w">
          <div className="rf-col-3"></div>
          <div className="rf-col-6" style={{ textAlign: 'center' }}>
            <p>
              <strong>Veuillez créer votre mot de passe</strong>
            </p>
          </div>
          <div className="rf-col-3"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--top rf-grid-row--center rf-pb-7w">
          <div className="rf-col-sm-1 rf-col-lg-4"></div>
          {/* Form */}
          <div className="rf-col-sm-8 rf-col-lg-4" style={{ textAlign: 'center' }}>
            <div>
              {error && <span className="invalid">{error.error}</span>}
            </div>
            <div className="rf-mb-3w">
              <label className="rf-label">Mot de passe</label>
              <input name="password"
                type="password"
                value={password}
                onChange={handleChange} className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !password &&
                  <div className="invalid">Mot de passe requis</div>
              }
            </div>
            <div className="rf-mb-5w">
              <label className="rf-label">Confirmer le mot de passe</label>
              <input
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                onChange={handleChange} className={(submitted && passwordConfirm !== password ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && passwordConfirm !== password &&
                  <div className="invalid">La confirmation du mot de passe doit correspondre</div>
              }
            </div>
            <div>
              <button className="rf-btn rf-text--bold big-btn" onClick={handleSubmit} style={{ background: 'white' }}>C&rsquo;est parti !</button>
              <br/>
            </div>
          </div>
          <div className="rf-col-sm-1 rf-col-lg-4"></div>
        </div>
        <div className="rf-grid-row rf-grid-row--center rf-pb-12w">
          <div className="rf-col-1"></div>
          <div className="rf-col-10" style={{ textAlign: 'center' }}>
            <p>
              <strong>Accédez aux ressources utiles pour bien démarrer votre activité en quelques clics,<br/>
                entrez en contact avec les autres conseillers numériques France Services de votre territoire</strong>
            </p>
          </div>
          <div className="rf-col-1"></div>
        </div>
      </div>
      {/* End content */}
      <Footer/>
    </div>
  );

}

export default ChoosePassword;
