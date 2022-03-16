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
    dispatch(craActions.showSelectRedirection(false));
  };

  const handleLieuRedirectionInput = lieu => {
    dispatch(craActions.updateOrganisme(lieu));
  };

  return (
    <>
      {showSelect &&
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
          </ul>
        </div>
      }
    </>
  );
}

export default SelectAccompagnement;
