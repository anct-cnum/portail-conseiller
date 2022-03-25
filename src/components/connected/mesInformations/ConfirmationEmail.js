import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import PropTypes from 'prop-types';
import Header from '../../Header';
import { useHistory } from 'react-router-dom';

function EmailConfirmer({ match }) {
  let history = useHistory();
  const token = match.params.token;
  const dispatch = useDispatch();
  const tokenVerified = useSelector(state => state.formulaireInfoPersonnel?.tokenError);
  setTimeout(() => {
    history.push(`/login`);
  }, 7000);

  useEffect(() => {
    dispatch(formInfoPersonnelActions.confirmConseillerEmail(token));
  }, []);
  return (
    <div>
      <Header />
      <div className="">
        <div className="rf-grid-row rf-grid-row--center rf-mt-3w">
          <div className="rf-col-offset-3" />
          <div style={{ width: '50%', textAlign: 'center' }}>
            {tokenVerified === false &&
              <div>
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                <h4>Nous allons vous rediriger sur la page de connexion...</h4>
              </div>
            }
            {tokenVerified === true &&
              <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                La confirmation de votre e-mail a échoué, <br />
                veuillez réessayer plus tard
              </p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
EmailConfirmer.propTypes = {
  match: PropTypes.object
};

export default EmailConfirmer;
