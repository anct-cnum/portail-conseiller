import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { permanenceActions } from '../../../actions/permanence.actions';
import horairesInitiales from '../../../data/horairesInitiales.json';
function Horaires({ prefixId, horairesId }) {

  const dispatch = useDispatch();

  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreursHoraires = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'horaires'])[0]?.[prefixId + 'horaires'];
  const loadingHoraires = useSelector(state => state.permanence?.loadingHoraires);
  const fields = useSelector(state => state.permanence?.fields);

  let horairesFields = fields?.filter(field => field.name === prefixId + 'horaires')[0]?.value;
  const idFields = fields?.filter(field => field.name === prefixId + 'idPermanence')[0]?.value;

  const jourSemaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  const [horaires, setHoraires] = useState({ [prefixId + 'horaires']: horairesInitiales });

  function handleChange(e, idJour, jour, partie) {
    const { value } = e.target;

    horaires[prefixId + 'horaires'][idJour][jour][partie] = value === '' ? 'Fermé' : value;
    horaires[prefixId + 'horaires'][idJour].fermeture[jour === 'matin' ? 0 : 1] =
      horaires[prefixId + 'horaires'][idJour][jour][0] === 'Fermé' && horaires[prefixId + 'horaires'][idJour][jour][1] === 'Fermé';

    setHoraires(horaires);
    dispatch(permanenceActions.updateField(prefixId + 'horaires', horaires));

    if (erreursHoraires) {
      erreursHoraires.forEach((erreur, idErreur) => {
        if (erreur === idJour) {
          erreursHoraires.splice(idErreur);
        }
      });
    }
  }

  const onCLick = (idx, fermer) => {
    horaires[prefixId + 'horaires'][idx].fermeture[fermer] = false;
    setHoraires(horaires);
    dispatch(permanenceActions.updateField(prefixId + 'horaires', horaires));
  };

  const onCLickFermeture = (idx, fermer) => {
    horaires[prefixId + 'horaires'][idx].fermeture[fermer] = true;
    horaires[prefixId + 'horaires'][idx][fermer === 0 ? 'matin' : 'apresMidi'][0] = 'Fermé';
    horaires[prefixId + 'horaires'][idx][fermer === 0 ? 'matin' : 'apresMidi'][1] = 'Fermé';
    setHoraires(horaires);
    dispatch(permanenceActions.updateField(prefixId + 'horaires', horaires));
  };

  useEffect(() => {
    if (horairesFields && idFields && loadingHoraires[horairesId] === true) {

      const newHoraires = [];
      horairesFields[prefixId + 'horaires']?.forEach(horairesField => {
        if (horairesField?.fermeture === undefined) {
          horairesField.fermeture = [null, null];
        }
        if (horairesField.matin[0].length === 4) {
          horairesField.matin[0] = '0' + horairesField.matin[0];
        }
        if (horairesField.matin[1].length === 4) {
          horairesField.matin[1] = '0' + horairesField.matin[1];
        }
        if (horairesField.matin[0] === 'Fermé' && horairesField.matin[1] === 'Fermé') {
          horairesField.fermeture[0] = true;
        }
        if (horairesField.apresMidi[0].length === 4) {
          horairesField.apresMidi[0] = '0' + horairesField.apresMidi[0];
        }
        if (horairesField.apresMidi[1].length === 4) {
          horairesField.apresMidi[1] = '0' + horairesField.apresMidi[1];
        }
        if (horairesField.apresMidi[0] === 'Fermé' && horairesField.apresMidi[1] === 'Fermé') {
          horairesField.fermeture[1] = true;
        }
        newHoraires.push(horairesField);
      });
      setHoraires({ [prefixId + 'horaires']: newHoraires });
      loadingHoraires[horairesId] = false;
      dispatch(permanenceActions.setHorairesLoading(loadingHoraires));
    }
  }, [horairesFields]);

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11 rf-mb-4w">Horaires de la structure&nbsp;<span className="obligatoire">*</span></div>
      <div className="rf-col-offset-1 rf-col-11">
        <table>
          <thead>
            <tr>
              <th></th>
              <th><div className="rf-mx-md-2w jour">Matin</div></th>
              <th><div className="rf-mx-md-2w jour">Apr&egrave;s-midi</div></th>
            </tr>
          </thead>
          {jourSemaine.map((jour, idx) => {
            return (
              <tbody key={idx}>
                <tr className="tr-horaires">
                  <td className={erreursHoraires?.includes(idx) ? 'invalid jour position-jour' : 'jour position-jour'}>
                    {jour.charAt(0).toUpperCase() + jour.substring(1)}
                  </td>
                  <td>
                    {!horaires[prefixId + 'horaires'][idx]?.fermeture[0] &&
                      <>
                        <input className="horaires-debut without_ampm" type="time" value={horaires[prefixId + 'horaires'][idx]?.matin[0]}
                          required name={prefixId + jour + 'MatinDebut'} min="06:00" max="13:00" onChange={e => {
                            handleChange(e, idx, 'matin', 0);
                          }}/>
                        <input className="horaires-fin without_ampm" type="time" value={horaires[prefixId + 'horaires'][idx]?.matin[1]}
                          required name={prefixId + jour + 'MatinFin'} min="06:00" max="13:00" onChange={e => {
                            handleChange(e, idx, 'matin', 1);
                          }}/>
                        <button className="fermeture-btn rf-mb-md-1w" onClick={() => {
                          onCLickFermeture(idx, 0);
                        }}>Fermé ?</button>
                      </>
                    }
                    {horaires[prefixId + 'horaires'][idx]?.fermeture[0] &&
                      <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                        onCLick(idx, 0);
                      }} >Fermé</div>
                    }
                  </td>
                  <td>
                    {!horaires[prefixId + 'horaires'][idx]?.fermeture[1] &&
                      <>
                        <input className="horaires-debut without_ampm" type="time" value={horaires[prefixId + 'horaires'][idx]?.apresMidi[0]}
                          required name={prefixId + jour + 'ApresMidiDebut'} min="13:00" max="22:00" onChange={e => {
                            handleChange(e, idx, 'apresMidi', 0);
                          }}/>
                        <input className="horaires-fin without_ampm" type="time" value={horaires[prefixId + 'horaires'][idx]?.apresMidi[1]}
                          required name={prefixId + jour + 'ApresMidiFin'} min="13:00" max="22:00" onChange={e => {
                            handleChange(e, idx, 'apresMidi', 1);
                          }}/>
                        <button className="fermeture-btn rf-mb-md-1w" onClick={() => {
                          onCLickFermeture(idx, 1);
                        }}>Fermé ?</button>
                      </>
                    }{horaires[prefixId + 'horaires'][idx]?.fermeture[1]}
                    {horaires[prefixId + 'horaires'][idx]?.fermeture[1] &&
                      <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                        onCLick(idx, 1);
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
  horairesId: PropTypes.number,
};

export default Horaires;
