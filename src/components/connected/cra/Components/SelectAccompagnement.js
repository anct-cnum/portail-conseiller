import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LieuxRedirection from '../../../../data/LieuxRedirection.json';
import { craActions } from '../../../../actions';

function SelectAccompagnement() {
  const dispatch = useDispatch();

  const { lieuxReorientation } = LieuxRedirection;
  const showSelect = useSelector(state => state.cra.showSelectRedirection);

  const handleLieuRedirectionList = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
  };

  const handleLieuRedirectionInput = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
  };

  const submitLieuRedirection = () => {
    dispatch(craActions.updateOrganismes());
  };

  return (
    <>
      {showSelect &&
        <div className="gradient-box">
          <div className="selectAccompagnementRedirection" >
            <ul className="listRedirection dropdown-expanded scrollOptions">
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
                  onChange={e => handleLieuRedirectionInput(e.target.value)} />
              </li>
              <li style={{ textAlign: 'center' }}>
                <button className="styleButtonEnregistrer" onClick={() => {
                  submitLieuRedirection();
                }}>Enregistrer</button>
              </li>
            </ul>
          </div>
        </div>
      }
    </>
  );
}

export default SelectAccompagnement;
