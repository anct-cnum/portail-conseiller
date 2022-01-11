import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Horaires({ horairesConseiller }) {
  const dispatch = useDispatch();
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);
  const erreurLundi = erreursFormulaire?.filter(erreur => erreur.name === 'lundi')[0];
  const erreurMardi = erreursFormulaire?.filter(erreur => erreur.name === 'mardi')[0];
  const erreurMercredi = erreursFormulaire?.filter(erreur => erreur.name === 'mercredi')[0];
  const erreurJeudi = erreursFormulaire?.filter(erreur => erreur.name === 'jeudi')[0];
  const erreurVendredi = erreursFormulaire?.filter(erreur => erreur.name === 'vendredi')[0];
  const erreurSamedi = erreursFormulaire?.filter(erreur => erreur.name === 'samedi')[0];
  const erreurDimanche = erreursFormulaire?.filter(erreur => erreur.name === 'dimanche')[0];

  const [inputs, setInputs] = useState({
    lundiMatinDebut: '', lundiMatinFin: '', lundiApresMidiDebut: '', lundiApresMidiFin: '',
    mardiMatinDebut: '', mardiMatinFin: '', mardiApresMidiDebut: '', mardiApresMidiFin: '',
    mercrediMatinDebut: '', mercrediMatinFin: '', mercrediApresMidiDebut: '', mercrediApresMidiFin: '',
    jeudiMatinDebut: '', jeudiMatinFin: '', jeudiApresMidiDebut: '', jeudiApresMidiFin: '',
    vendrediMatinDebut: '', vendrediMatinFin: '', vendrediApresMidiDebut: '', vendrediApresMidiFin: '',
    samediMatinDebut: '', samediMatinFin: '', samediApresMidiDebut: '', samediApresMidiFin: '',
    dimancheMatinDebut: 'Fermé', dimancheMatinFin: 'Fermé', dimancheApresMidiDebut: 'Fermé', dimancheApresMidiFin: 'Fermé'
  });

  const {
    lundiMatinDebut, lundiMatinFin, lundiApresMidiDebut, lundiApresMidiFin,
    mardiMatinDebut, mardiMatinFin, mardiApresMidiDebut, mardiApresMidiFin,
    mercrediMatinDebut, mercrediMatinFin, mercrediApresMidiDebut, mercrediApresMidiFin,
    jeudiMatinDebut, jeudiMatinFin, jeudiApresMidiDebut, jeudiApresMidiFin,
    vendrediMatinDebut, vendrediMatinFin, vendrediApresMidiDebut, vendrediApresMidiFin,
    samediMatinDebut, samediMatinFin, samediApresMidiDebut, samediApresMidiFin,
    dimancheMatinDebut, dimancheMatinFin, dimancheApresMidiDebut, dimancheApresMidiFin
  } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  useEffect(() => {
    if (horairesConseiller) {
      setInputs({
        lundiMatinDebut: horairesConseiller[0].lundi.matin[0], lundiMatinFin: horairesConseiller[0].lundi.matin[1],
        lundiApresMidiDebut: horairesConseiller[0].lundi.apresMidi[0], lundiApresMidiFin: horairesConseiller[0].lundi.apresMidi[1],
        mardiMatinDebut: horairesConseiller[1].mardi.matin[0], mardiMatinFin: horairesConseiller[1].mardi.matin[1],
        mardiApresMidiDebut: horairesConseiller[1].mardi.apresMidi[0], mardiApresMidiFin: horairesConseiller[1].mardi.apresMidi[1],
        mercrediMatinDebut: horairesConseiller[2].mercredi.matin[0], mercrediMatinFin: horairesConseiller[2].mercredi.matin[1],
        mercrediApresMidiDebut: horairesConseiller[2].mercredi.apresMidi[0], mercrediApresMidiFin: horairesConseiller[2].mercredi.apresMidi[1],
        jeudiMatinDebut: horairesConseiller[3].jeudi.matin[0], jeudiMatinFin: horairesConseiller[3].jeudi.matin[1],
        jeudiApresMidiDebut: horairesConseiller[3].jeudi.apresMidi[0], jeudiApresMidiFin: horairesConseiller[3].jeudi.apresMidi[1],
        vendrediMatinDebut: horairesConseiller[4].vendredi.matin[0], vendrediMatinFin: horairesConseiller[4].vendredi.matin[1],
        vendrediApresMidiDebut: horairesConseiller[4].vendredi.apresMidi[0], vendrediApresMidiFin: horairesConseiller[4].vendredi.apresMidi[1],
        samediMatinDebut: horairesConseiller[5].samedi.matin[0], samediMatinFin: horairesConseiller[5].samedi.matin[1],
        samediApresMidiDebut: horairesConseiller[5].samedi.apresMidi[0], samediApresMidiFin: horairesConseiller[5].samedi.apresMidi[1],
        dimancheMatinDebut: horairesConseiller[6].dimanche.matin[0], dimancheMatinFin: horairesConseiller[6].dimanche.matin[1],
        dimancheApresMidiDebut: horairesConseiller[6].dimanche.apresMidi[0], dimancheApresMidiFin: horairesConseiller[6].dimanche.apresMidi[1]
      });
    }
  }, [horairesConseiller]);

  return (
    <>
      <h2 className="sous-titre rf-col-12 rf-mb-4w">Horaires de mon lieu d&rsquo;activit&eacute;</h2>
      <div className="rf-col-12">
        <table className="rf-mb-9w">
          <thead>
            <tr>
              <th></th>
              <th><div className="rf-mr-md-2w">Matin</div></th>
              <th><div className="rf-mr-md-2w">Apr&egrave;s-midi</div></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={erreurLundi ? 'jour invalid' : 'jour'}>Lundi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={lundiMatinDebut}
                  required name="lundiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={lundiMatinFin}
                  required name="lundiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={lundiApresMidiDebut}
                  required name="lundiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={lundiApresMidiFin}
                  required name="lundiApresMidiFin" onChange={handleChange}/>
              </td>
              <td>
              </td>
            </tr>
            { erreurLundi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurLundi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurMardi ? 'jour invalid' : 'jour'}>Mardi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={mardiMatinDebut}
                  required name="mardiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={mardiMatinFin}
                  required name="mardiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={mardiApresMidiDebut}
                  required name="mardiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={mardiApresMidiFin}
                  required name="mardiApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurMardi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurMardi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurMercredi ? 'jour invalid' : 'jour'}>Mercredi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={mercrediMatinDebut}
                  required name="mercrediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={mercrediMatinFin}
                  required name="mercrediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={mercrediApresMidiDebut}
                  required name="mercrediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={mercrediApresMidiFin}
                  required name="mercrediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurMercredi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurMercredi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurJeudi ? 'jour invalid' : 'jour'}>Jeudi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={jeudiMatinDebut}
                  required name="jeudiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={jeudiMatinFin}
                  required name="jeudiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={jeudiApresMidiDebut}
                  required name="jeudiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={jeudiApresMidiFin}
                  required name="jeudiApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurJeudi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurJeudi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurVendredi ? 'jour invalid' : 'jour'}>Vendredi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={vendrediMatinDebut}
                  required name="vendrediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={vendrediMatinFin}
                  required name="vendrediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={vendrediApresMidiDebut}
                  required name="vendrediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={vendrediApresMidiFin}
                  required name="vendrediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurVendredi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurVendredi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurSamedi ? 'jour invalid' : 'jour'}>Samedi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={samediMatinDebut}
                  required name="samediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={samediMatinFin}
                  required name="samediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={samediApresMidiDebut}
                  required name="samediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={samediApresMidiFin}
                  required name="samediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurSamedi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurSamedi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurDimanche ? 'jour invalid' : 'jour'}>Dimanche</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time" value={dimancheMatinDebut}
                  required name="dimancheMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={dimancheMatinFin}
                  required name="dimancheMatinFin" onChange={handleChange}/>
              </td>
              <td>
                {dimancheApresMidiFin === 'Fermé' &&
                  <></>
                }
                <input className="horaires-debut rf-mb-md-1w" type="time" value={dimancheApresMidiDebut}
                  required name="dimancheApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time" value={dimancheApresMidiFin}
                  required name="dimancheApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurDimanche &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="text-error rf-mb-1w">{erreurDimanche.error}</p></td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

Horaires.propTypes = {
  horairesConseiller: PropTypes.array
};


export default Horaires;
