import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formulaireHorairesAdresseActions } from '../../../actions/formulaireHorairesAdresse.actions';

function Horaires() {
  const dispatch = useDispatch();
  const erreursFormulaire = useSelector(state => state.horairesAdresse.errorsFormulaire);
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch(formulaireHorairesAdresseActions.updateField(name, value));
  }

  const erreurLundi = erreursFormulaire?.filter(erreur => erreur.name === 'lundi')[0];
  const erreurMardi = erreursFormulaire?.filter(erreur => erreur.name === 'mardi')[0];
  const erreurMercredi = erreursFormulaire?.filter(erreur => erreur.name === 'mercredi')[0];
  const erreurJeudi = erreursFormulaire?.filter(erreur => erreur.name === 'jeudi')[0];
  const erreurVendredi = erreursFormulaire?.filter(erreur => erreur.name === 'vendredi')[0];
  const erreurSamedi = erreursFormulaire?.filter(erreur => erreur.name === 'samedi')[0];
  const erreurDimanche = erreursFormulaire?.filter(erreur => erreur.name === 'dimanche')[0];


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
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="lundiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="lundiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="lundiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="lundiApresMidiFin" onChange={handleChange}/>
              </td>
              <td>
              </td>
            </tr>
            { erreurLundi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurLundi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurMardi ? 'jour invalid' : 'jour'}>Mardi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="mardiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="mardiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="mardiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="mardiApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurMardi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurMardi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurMercredi ? 'jour invalid' : 'jour'}>Mercredi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="mercrediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="mercrediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="mercrediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="mercrediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurMercredi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurMercredi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurJeudi ? 'jour invalid' : 'jour'}>Jeudi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="jeudiMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="jeudiMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="jeudiApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="jeudiApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurJeudi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurJeudi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurVendredi ? 'jour invalid' : 'jour'}>Vendredi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="vendrediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="vendrediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="vendrediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="vendrediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurVendredi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurVendredi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurSamedi ? 'jour invalid' : 'jour'}>Samedi</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="samediMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="samediMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="samediApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="samediApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurSamedi &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurSamedi.error}</p></td>
            </tr>
            }
            <tr>
              <td className={erreurDimanche ? 'jour invalid' : 'jour'}>Dimanche</td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="dimancheMatinDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="dimancheMatinFin" onChange={handleChange}/>
              </td>
              <td>
                <input className="horaires-debut rf-mb-md-1w" type="time"
                  required name="dimancheApresMidiDebut" onChange={handleChange}/>
                <input className="horaires-fin rf-mr-2w" type="time"
                  required name="dimancheApresMidiFin" onChange={handleChange}/>
              </td>
            </tr>
            { erreurDimanche &&
            <tr>
              <td></td>
              <td colSpan="2"><p className="invalid rf-mb-1w">{erreurDimanche.error}</p></td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Horaires;
