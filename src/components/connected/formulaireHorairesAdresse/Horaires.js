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
    samediMatinDebut: 'Fermé', samediMatinFin: 'Fermé', samediApresMidiDebut: 'Fermé', samediApresMidiFin: 'Fermé',
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

  const [ouvertureFermeture, setOuvertureFermeture] = useState({
    lundiAm: true, lundiPm: true, mardiAm: true, mardiPm: true, mercrediAm: true, mercrediPm: true, jeudiAm: true,
    jeudiPm: true, vendrediAm: true, vendrediPm: true, samediAm: false, samediPm: false, dimancheAm: false, dimanchePm: false
  });

  const { lundiAm, lundiPm, mardiAm, mardiPm, mercrediAm, mercrediPm, jeudiAm,
    jeudiPm, vendrediAm, vendrediPm, samediAm, samediPm, dimancheAm, dimanchePm } = ouvertureFermeture;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value === '' ? 'Fermé' : value }));
    dispatch(formulaireHorairesAdresseActions.updateField(name, value === '' ? 'Fermé' : value));

    setOuvertureFermeture({
      lundiAm: inputs.lundiMatinDebut !== 'Fermé' || inputs.lundiMatinFin !== 'Fermé',
      lundiPm: inputs.lundiApresMidiDebut !== 'Fermé' || inputs.lundiApresMidiFin !== 'Fermé',
      mardiAm: inputs.mardiMatinDebut !== 'Fermé' || inputs.mardiMatinFin !== 'Fermé',
      mardiPm: inputs.mardiApresMidiDebut !== 'Fermé' || inputs.mardiApresMidiFin !== 'Fermé',
      mercrediAm: inputs.mercrediMatinDebut !== 'Fermé' || inputs.mercrediMatinFin !== 'Fermé',
      mercrediPm: inputs.mercrediApresMidiDebut !== 'Fermé' || inputs.mercrediApresMidiFin !== 'Fermé',
      jeudiAm: inputs.jeudiMatinDebut !== 'Fermé' || inputs.jeudiMatinFin !== 'Fermé',
      jeudiPm: inputs.jeudiApresMidiDebut !== 'Fermé' || inputs.jeudiApresMidiFin !== 'Fermé',
      vendrediAm: inputs.vendrediMatinDebut !== 'Fermé' || inputs.vendrediMatinFin !== 'Fermé',
      vendrediPm: inputs.vendrediApresMidiDebut !== 'Fermé' || inputs.vendrediApresMidiFin !== 'Fermé',
      samediAm: inputs.samediMatinDebut !== 'Fermé' || inputs.samediMatinFin !== 'Fermé',
      samediPm: inputs.samediApresMidiDebut !== 'Fermé' || inputs.samediApresMidiFin !== 'Fermé',
      dimancheAm: inputs.dimancheMatinDebut !== 'Fermé' || inputs.dimancheMatinFin !== 'Fermé',
      dimanchePm: inputs.dimancheApresMidiDebut !== 'Fermé' || inputs.dimancheApresMidiFin !== 'Fermé',
    });
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
      setOuvertureFermeture({
        lundiAm: horairesConseiller[0].lundi.matin[0] !== 'Fermé',
        lundiPm: horairesConseiller[0].lundi.apresMidi[0] !== 'Fermé',
        mardiAm: horairesConseiller[1].mardi.matin[0] !== 'Fermé',
        mardiPm: horairesConseiller[1].mardi.apresMidi[0] !== 'Fermé',
        mercrediAm: horairesConseiller[2].mercredi.matin[0] !== 'Fermé',
        mercrediPm: horairesConseiller[2].mercredi.apresMidi[0] !== 'Fermé',
        jeudiAm: horairesConseiller[3].jeudi.matin[0] !== 'Fermé',
        jeudiPm: horairesConseiller[3].jeudi.apresMidi[0] !== 'Fermé',
        vendrediAm: horairesConseiller[4].vendredi.matin[0] !== 'Fermé',
        vendrediPm: horairesConseiller[4].vendredi.apresMidi[0] !== 'Fermé',
        samediAm: horairesConseiller[5].samedi.matin[0] !== 'Fermé',
        samediPm: horairesConseiller[5].samedi.apresMidi[0] !== 'Fermé',
        dimancheAm: horairesConseiller[6].dimanche.matin[0] !== 'Fermé',
        dimanchePm: horairesConseiller[6].dimanche.apresMidi[0] !== 'Fermé',
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
                {lundiAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={lundiMatinDebut}
                      required name="lundiMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={lundiMatinFin}
                      required name="lundiMatinFin" onChange={handleChange}/>
                  </>
                }
                {!lundiAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, lundiAm: true });
                    setInputs({ ...inputs, lundiMatinDebut: '', lundiMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {lundiPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={lundiApresMidiDebut}
                      required name="lundiApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={lundiApresMidiFin}
                      required name="lundiApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!lundiPm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, lundiPm: true });
                    setInputs({ ...inputs, lundiApresMidiDebut: '', lundiApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {mardiAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={mardiMatinDebut}
                      required name="mardiMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={mardiMatinFin}
                      required name="mardiMatinFin" onChange={handleChange}/>
                  </>
                }
                {!mardiAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, mardiAm: true });
                    setInputs({ ...inputs, mardiMatinDebut: '', mardiMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {mardiPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={mardiApresMidiDebut}
                      required name="mardiApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={mardiApresMidiFin}
                      required name="mardiApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!mardiPm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, mardiPm: true });
                    setInputs({ ...inputs, mardiApresMidiDebut: '', mardiApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {mercrediAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={mercrediMatinDebut}
                      required name="mercrediMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={mercrediMatinFin}
                      required name="mercrediMatinFin" onChange={handleChange}/>
                  </>
                }
                {!mercrediAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, mercrediAm: true });
                    setInputs({ ...inputs, mercrediMatinDebut: '', mercrediMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {mercrediPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={mercrediApresMidiDebut}
                      required name="mercrediApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={mercrediApresMidiFin}
                      required name="mercrediApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!mercrediPm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, mercrediPm: true });
                    setInputs({ ...inputs, mercrediApresMidiDebut: '', mercrediApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {jeudiAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={jeudiMatinDebut}
                      required name="jeudiMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={jeudiMatinFin}
                      required name="jeudiMatinFin" onChange={handleChange}/>
                  </>
                }
                {!jeudiAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, jeudiAm: true });
                    setInputs({ ...inputs, jeudiMatinDebut: '', jeudiMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {jeudiPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={jeudiApresMidiDebut}
                      required name="jeudiApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={jeudiApresMidiFin}
                      required name="jeudiApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!jeudiPm &&
                  <div className="horaires-fermeture" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, jeudiPm: true });
                    setInputs({ ...inputs, jeudiApresMidiDebut: '', jeudiApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {vendrediAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={vendrediMatinDebut}
                      required name="vendrediMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={vendrediMatinFin}
                      required name="vendrediMatinFin" onChange={handleChange}/>
                  </>
                }
                {!vendrediAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, vendrediAm: true });
                    setInputs({ ...inputs, vendrediMatinDebut: '', vendrediMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {vendrediPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={vendrediApresMidiDebut}
                      required name="vendrediApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={vendrediApresMidiFin}
                      required name="vendrediApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!vendrediPm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, vendrediPm: true });
                    setInputs({ ...inputs, vendrediApresMidiDebut: '', vendrediApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {samediAm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={samediMatinDebut}
                      required name="samediMatinDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={samediMatinFin}
                      required name="samediMatinFin" onChange={handleChange}/>
                  </>
                }
                {!samediAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, samediAm: true });
                    setInputs({ ...inputs, samediMatinDebut: '', samediMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {samediPm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={samediApresMidiDebut}
                      required name="samediApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={samediApresMidiFin}
                      required name="samediApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!samediPm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, samediPm: true });
                    setInputs({ ...inputs, samediApresMidiDebut: '', samediApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
                {dimancheAm &&
                <>
                  <input className="horaires-debut rf-mb-md-1w" type="time" value={dimancheMatinDebut}
                    required name="dimancheMatinDebut" onChange={handleChange}/>
                  <input className="horaires-fin rf-mr-2w" type="time" value={dimancheMatinFin}
                    required name="dimancheMatinFin" onChange={handleChange}/>
                </>
                }
                {!dimancheAm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, dimancheAm: true });
                    setInputs({ ...inputs, dimancheMatinDebut: '', dimancheMatinFin: '' });
                  }} >Fermé</div>
                }
              </td>
              <td>
                {dimanchePm &&
                  <>
                    <input className="horaires-debut rf-mb-md-1w" type="time" value={dimancheApresMidiDebut}
                      required name="dimancheApresMidiDebut" onChange={handleChange}/>
                    <input className="horaires-fin rf-mr-2w" type="time" value={dimancheApresMidiFin}
                      required name="dimancheApresMidiFin" onChange={handleChange}/>
                  </>
                }
                {!dimanchePm &&
                  <div className="horaires-fermeture rf-mb-md-1w" onClick={() => {
                    setOuvertureFermeture({ ...ouvertureFermeture, dimanchePm: true });
                    setInputs({ ...inputs, dimancheApresMidiDebut: '', dimancheApresMidiFin: '' });
                  }} >Fermé</div>
                }
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
