import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { craActions } from '../../../../actions';

function SelectPermanence() {
  const dispatch = useDispatch();
  const permanenceId = sessionStorage.getItem('permanenceId');
  let cra = useSelector(state => state.cra);
  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const listPermanences = useSelector(state => state.permanence?.mesPermanences);

  const [mesPermanences, setMesPermanences] = useState([]);
  const onClickButton = permanence => {
    dispatch(craActions.getPermanence(permanence));
  };

  const onClickButtonFilled = () => {
    dispatch(craActions.getButtonPermanences());
  };

  //Tri pour obtenir le lieu principal en premier
  useEffect(() => {
    if (listPermanences) {
      setMesPermanences(Array.from({ length: listPermanences?.length }, () => ({})));
      for (let i = 0; i < listPermanences.length; i++) {
        if (listPermanences[i]?.lieuPrincipalPour.includes(conseiller._id) === true) {
          mesPermanences[0] = listPermanences[i];
        } else {
          mesPermanences[i + 1] = listPermanences[i];
        }
      }
      setMesPermanences(mesPermanences);
      if (permanenceId) {
        dispatch(craActions.getPermanence(listPermanences.find(permanence => permanence._id === permanenceId)));
      }
    }
  }, [listPermanences, permanenceId]);

  return (
    <>
      {cra?.permanenceId &&
        <button className="buttonPermanence-filled" onClick={onClickButtonFilled}>
          <span className="logoRattachementSelected"></span>
          <span>{cra.nomEnseigne.toUpperCase()}</span>
        </button>
      }
      {!cra?.permanenceId &&
        <div id="buttonPermanences" className={`dropdown ${cra?.buttonPermanences ? 'show' : ''}`}
          style={{ height: listPermanences?.length ? listPermanences?.length * 56 + 85 + 'px' : '144px' }}>
          <div className="listButtonPermanence">
            {listPermanences && listPermanences?.length > 0 && mesPermanences?.map((permanence, idx) => {
              return (
                <button className="buttonPermanence" key={idx} onClick={() => {
                  onClickButton(permanence);
                }}>
                  <span className="logoRattachementActif"></span>
                  <span style={{ display: 'inline-block' }}>
                    <div className="nomEnseigne">{permanence.nomEnseigne.toUpperCase()}</div>
                    <div className="adresse">
                      {permanence.adresse.numeroRue !== 'null' ? permanence.adresse.numeroRue : ''}
                      {
                        ' ' + permanence.adresse.rue.toUpperCase() + ' ' +
                        permanence.adresse.codePostal + ' ' +
                        permanence.adresse.ville.toUpperCase()
                      }
                    </div>
                  </span>
                </button>
              );
            })}
            {!listPermanences || listPermanences?.length === 0 &&
              <div className="lieuActiviteAbsent">
                Aucun lieu d&rsquo;activit&eacute; enregistr&eacute;
              </div>
            }
          </div>
          <div className="lienPermanence">
            <Link to="/mon-nouveau-lieu-activite" >Ajouter un nouveau lieu d&rsquo;activit&eacute;</Link>
          </div>
        </div>
      }
    </>
  );

}

export default SelectPermanence;
