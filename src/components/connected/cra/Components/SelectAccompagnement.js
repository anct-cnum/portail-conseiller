import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LieuxRedirection from '../../../../data/LieuxRedirection.json';
import { craActions } from '../../../../actions';
import ListeAccompagnements from './ListeAccompagnements';

function SelectAccompagnement() {
  const dispatch = useDispatch();

  const { lieuxReorientation } = LieuxRedirection;
  const [listeFiltreLieux, setListeFiltreLieux] = useState(lieuxReorientation);

  let nbParticipantsAccompagnement = useSelector(state => state.cra?.nbParticipantsAccompagnement);
  const nbParticipants = useSelector(state => state.cra?.nbParticipants);
  const showSelect = useSelector(state => state.cra?.showSelectRedirection);
  const accompagnement = useSelector(state => state.cra?.accompagnement);
  const nbRedirection = useSelector(state => state.cra?.nbRedirection);
  const organismes = useSelector(state => state.cra?.organismes);
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

  const submitLieuRedirection = () => {
    if (organisme) {
      organismes.push({ [organisme]: nbRedirection });
      nbParticipantsAccompagnement -= nbRedirection;
      dispatch(craActions.updateOrganismes(organismes, nbRedirection, accompagnement, nbParticipantsAccompagnement));
    }
  };

  const filtrage = (array, value) => array.filter(function(item) {
    return item !== value;
  });

  useEffect(() => {
    if (organismes?.length > 0) {
      let lieuxFiltrer = lieuxReorientation;
      organismes.forEach(organisme => {
        lieuxFiltrer = filtrage(lieuxFiltrer, Object.keys(organisme)[0]);
      });
      setListeFiltreLieux(lieuxFiltrer);
    } else {
      setListeFiltreLieux(lieuxReorientation);
    }
  }, [organismes]);

  return (
    <>
      {showSelect &&
        <div className="gradient-box" style={{ width: '270px',
          height: nbParticipantsAccompagnement === nbParticipants && organismes.length > 0 ? '120px' : '350px',
          marginBottom: '-27px' }}>
          <div style={{ width: '270px', height: nbParticipantsAccompagnement === nbParticipants && organismes?.length > 0 ? '120px' : '350px',
            borderRadius: '20px', backgroundColor: '#ffffff' }}>
            {nbParticipantsAccompagnement < nbParticipants && organismes.length === 0 &&
            <ul className="listRedirection" style={{ height: heightListeChoix, overflow: 'auto' }}>
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
            }
            <ListeAccompagnements organismes={organismes} borderTop="1px solid #3558a2" deletable={true}/>
            <div style={{ borderTop: '1px solid #3558a2', borderBottom: '1px solid #3558a2' }}>
              {organisme &&
              <div className="styleLiButtonEnregistrer">
                <button className="styleButtonEnregistrer" onClick={() => {
                  submitLieuRedirection();
                }}>Enregistrer</button>
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
