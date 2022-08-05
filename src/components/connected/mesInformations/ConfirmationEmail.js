import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formInfoPersonnelActions } from '../../../actions/infoPersonnel.actions';
import PropTypes from 'prop-types';
import Header from '../../Header';

function EmailConfirmer({ match }) {
  const token = match.params.token;
  const dispatch = useDispatch();
  const tokenVerified = useSelector(state => state.formulaireInfoPersonnel?.tokenError);

  useEffect(() => {
    dispatch(formInfoPersonnelActions.confirmConseillerEmail(token));
  }, []);
  return (
    <div>
      <Header />
      <div className="">
        <div className="fr-grid-row fr-grid-row--center fr-mt-3w">
          <div className="fr-col-offset-3" />
          <div style={{ width: '50%', textAlign: 'center' }}>
            {tokenVerified === false &&
              <div>
                <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                  La confirmation de votre e-mail a été effectuée avec succès
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                <h4>Vous pouvez fermer cette fen&ecirc;tre</h4>
              </div>
            }
            {tokenVerified === true &&
              <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
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
