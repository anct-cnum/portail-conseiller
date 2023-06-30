import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LieuxRedirection from '../../../../data/LieuxRedirection.json';
import { craActions } from '../../../../actions';
import ListeAccompagnements from './ListeAccompagnements';

function SelectAccompagnement() {
  const dispatch = useDispatch();

  const { lieuxReorientation } = LieuxRedirection;
  const [listeFiltreLieux, setListeFiltreLieux] = useState();

  const nbParticipantsAccompagnement = useSelector(state => state.cra?.nbParticipantsAccompagnement);
  const nbParticipants = useSelector(state => state.cra?.nbParticipants);
  const showSelect = useSelector(state => state.cra?.showSelectRedirection);
  const nbOrganisme = useSelector(state => state.cra?.nbOrganisme);
  let organismes = useSelector(state => state.cra?.organismes);
  const organisme = useSelector(state => state.cra?.organisme);

  const heightListeOrganisme = organismes?.length > 0 ? 72 : 0;
  const heightBtnEnregistrer = organisme?.length > 0 ? 36 : 0;
  const heightListeChoix = 300 - heightBtnEnregistrer - heightListeOrganisme + 'px';

  const handleLieuRedirectionList = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
  };

  const handleLieuRedirectionInput = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
  };

  const filtrage = (array, value) => array.filter(function(item) {
    return item !== value;
  });

  const submitLieuRedirection = () => {
    if (organisme) {
      if (organismes === null) {
        organismes = [];
      }
      organismes?.push({ [organisme]: nbOrganisme });
      dispatch(craActions.updateOrganismes(organismes));
      let lieuxFiltrer = lieuxReorientation;
      organismes?.forEach(organisme => {
        lieuxFiltrer = filtrage(lieuxFiltrer, Object.keys(organisme)[0]);
      });
      setListeFiltreLieux(lieuxFiltrer);
    }
  };

  useEffect(() => {
    setListeFiltreLieux(lieuxReorientation);
  }, [organismes]);

  return (
    <>
      {showSelect &&
        <div className="gradient-box-blue selectAccompagnementRedirection">
          <div className="blockListe">
            <ul className="listRedirection" style={{ height: heightListeChoix }}>
              {listeFiltreLieux?.map((lieu, key) =>
                <li key={key} className="selecteurList" onClick={() => {
                  handleLieuRedirectionList(lieu);
                }}>
                  {lieu}
                </li>
              )}
              <li style={{ paddingBottom: '0px' }}>
                <input
                  className="styleInputAutre" placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection"
                  onChange={e => handleLieuRedirectionInput(e.target.value)}/>
              </li>
            </ul>

            <ListeAccompagnements organismes={organismes} deletable={true}/>

            <div style={{ borderBottom: '1px solid #3558a2' }}>
              {(organisme && nbParticipants >= nbParticipantsAccompagnement) &&
                <div className="styleLiButtonEnregistrer">
                  <button className="styleButtonEnregistrer" onClick={() => {
                    submitLieuRedirection();
                  }}>
                    Ajouter
                  </button>
                </div>
              }
              {(organisme && nbParticipants < nbParticipantsAccompagnement) &&
                <div className="styleLiButtonEnregistrerDisabled">
                  <button className="styleButtonEnregistrerDisabled">
                    Ajouter
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default SelectAccompagnement;
