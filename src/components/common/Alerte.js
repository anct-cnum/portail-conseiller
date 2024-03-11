import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alerteActions } from '../../actions/alerte.actions';

export default function Alerte() {

  const dispatch = useDispatch();

  const alerte = useSelector(state => state?.alerte?.alerte);

  useEffect(() => {
    if (alerte?.type) {
      setTimeout(() => {
        dispatch(alerteActions.resetMessageAlerte());
      }, 5000);
    }
  }, [alerte]);

  return (
    <>
      {alerte?.type &&
        <div className={'fr-my-6w fr-container'} >
          <div className="fr-grid-row">
            <div className="fr-col-12">
              <p className={`fr-label flashBag ${alerte?.type}`}>
                {alerte?.message}
                {alerte?.icon &&
                  <i className={`fr-ml-1w ${alerte.icon}`} style={{ verticalAlign: 'middle' }}></i>
                }
                {alerte?.description &&
                  <>
                    <br />
                    <span style={{ color: 'initial' }}>
                      {alerte.description}
                    </span>
                  </>
                }
              </p>
            </div>
          </div>
        </div>
      }
    </>
  );
}
