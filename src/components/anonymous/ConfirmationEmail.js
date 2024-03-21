import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formInformationsActions } from '../../actions/informations.actions';
import Header from '../Header';
import { useParams } from 'react-router-dom';

function EmailConfirmer() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const tokenVerified = useSelector(state => state.formulaireInformations?.tokenError);

  useEffect(() => {
    dispatch(formInformationsActions.confirmConseillerEmail(token));
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
              <p className="fr-label flashBagError labelError" style={{ fontSize: '16px' }}>
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

export default EmailConfirmer;
