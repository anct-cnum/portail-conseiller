import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { permanenceActions } from '../../../actions/permanence.actions';
import PropTypes from 'prop-types';

function Horaires({ prefixId }) {

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreursHoraires = erreursFormulaire?.filter(erreur => erreur?.horaires)[0]?.horaires;

  const dispatch = useDispatch();

  /* V2 gestion des horaires */
  const jourSemaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const [horaires, setHoraires] = useState([
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [false, false] }, // lundi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [false, false] }, // mardi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [false, false] }, // mercredi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [false, false] }, // jeudi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [false, false] }, // vendredi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [true, true] }, // samedi
    { matin: ['Fermé', 'Fermé'], apresMidi: ['Fermé', 'Fermé'], fermeture: [true, true] }, // dimanche
  ]);

  function handleChange(e, idJour, jour, partie) {
    const { value } = e.target;
    horaires[idJour][jour][partie] = value === '' ? 'Fermé' : value;
    horaires[idJour].fermeture[jour === 'matin' ? 0 : 1] = horaires[idJour][jour][0] === 'Fermé' && horaires[idJour][jour][1] === 'Fermé';
    setHoraires(horaires => [...horaires]);
    dispatch(permanenceActions.updateHoraires(horaires));
    if (erreursHoraires) {
      erreursHoraires.forEach((erreur, idErreur) => {
        if (erreur === idJour) {
          erreursHoraires.splice(idErreur);
        }
      });
    }
  }

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11 rf-mb-4w">Horaires de la structure&nbsp;<span className="obligatoire">*</span></div>
      <div className="rf-col-offset-1 rf-col-11">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><div className="rf-mr-md-2w">Matin</div></th>
              <th><div className="rf-mr-md-2w">Apr&egrave;s-midi</div></th>
            </tr>
          </thead>
          {jourSemaine.map((jour, idx) => {
            return (
              <tbody key={idx}>
                <tr>
                  <td className={erreursHoraires?.includes(idx) ? 'invalid jour' : 'jour'} >
                    {jour.charAt(0).toUpperCase() + jour.substring(1)}
                  </td>
                  <td>
                    {!horaires[idx].fermeture[0] &&
                      <>
                        <input className="horaires-debut rf-mb-md-1w" type="time" value={horaires[idx].matin[0]}
                          required name={prefixId + jour + 'MatinDebut'} onChange={e => {
                            handleChange(e, idx, 'matin', 0);
                          }}/>
                        <input className="horaires-fin rf-mr-2w" type="time" value={horaires[idx].matin[1]}
                          required name={prefixId + jour + 'MatinFin'} onChange={e => {
                            handleChange(e, idx, 'matin', 1);
                          }}/>
                      </>
                    }
                    {horaires[idx].fermeture[0] &&
                      <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                        horaires[idx].fermeture[0] = false;
                        setHoraires(horaires => [...horaires]);
                      }} >Fermé</div>
                    }
                  </td>
                  <td>
                    {!horaires[idx].fermeture[1] &&
                      <>
                        <input className="horaires-debut rf-mb-md-1w" type="time" value={horaires[idx].apresMidi[0]}
                          required name={prefixId + jour + 'ApresMidiDebut'} onChange={e => {
                            handleChange(e, idx, 'apresMidi', 0);
                          }}/>
                        <input className="horaires-fin rf-mr-2w" type="time" value={horaires[idx].apresMidi[1]}
                          required name={prefixId + jour + 'ApresMidiFin'} onChange={e => {
                            handleChange(e, idx, 'apresMidi', 1);
                          }}/>
                      </>
                    }
                    {horaires[idx].fermeture[1] &&
                      <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                        horaires[idx].fermeture[1] = false;
                        setHoraires(horaires => [...horaires]);
                      }} >Fermé</div>
                    }
                  </td>
                </tr>
                <tr>
                  { erreursHoraires?.includes(idx) &&
                  <>
                    <td></td>
                    <td colSpan={2}><p className="text-error rf-mb-1w">Il y a une incohérence sur les heures saisies</p></td>
                  </>
                  }
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
}

Horaires.propTypes = {
  prefixId: PropTypes.string,
};

export default Horaires;
