import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LieuxRedirection from '../../../../data/LieuxRedirection.json';
import { craActions } from '../../../../actions';
import RedirectionButton from './RedirectionButton';

function SelectAccompagnement() {
  const dispatch = useDispatch();

  const { lieuxReorientation } = LieuxRedirection;
  const [choixReorientation, setChoixReorientation] = useState([]);

  const showSelect = useSelector(state => state.cra?.showSelectRedirection);
  const accompagnement = useSelector(state => state.cra?.accompagnement);
  const nbRedirection = useSelector(state => state.cra?.nbRedirection);
  let nbParticipantsAccompagnement = useSelector(state => state.cra?.nbParticipantsAccompagnement);
  const organismes = useSelector(state => state.cra?.organismes);
  const organisme = useSelector(state => state.cra?.organisme);

  const handleLieuRedirectionList = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
    document.getElementById('buttonEnregistrer').scrollIntoView({ behavior: 'smooth' });
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

  return (
    <>
      {showSelect &&
        <div className="gradient-box">
          <div className="selectAccompagnementRedirection" >
            <ul id="listRedirection" className="listRedirection dropdown-expanded scrollOptions">
              {lieuxReorientation.map((lieu, key) =>
                <li key={key} className="selecteurList" onClick={() => {
                  handleLieuRedirectionList(lieu);
                }}>
                  {lieu}
                </li>
              )}
              <li >
                <input
                  className="styleInputAutre" placeholder="Autre" type="text" id="autre-redirection" name="autre-redirection"
                  onChange={e => handleLieuRedirectionInput(e.target.value)}/>
              </li>
              <li style={{ textAlign: 'center' }}>
                <button id="buttonEnregistrer" className="styleButtonEnregistrer" onClick={() => {
                  submitLieuRedirection();
                }}>Enregistrer</button>
              </li>
              <li className="">
                {organismes?.map((organisme, key) => {
                  return <span key={key} >
                    <RedirectionButton organisme={organisme} firstElement={key === 0}/>
                  </span>;
                })}
              </li>
            </ul>
          </div>
        </div>
      }
    </>
  );
}

export default SelectAccompagnement;
