import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';

function SelectPermanence({ voirInformation }) {
  const dispatch = useDispatch();
  const idPermanence = sessionStorage.getItem('idPermanence');
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
      for (let i = 0; i < listPermanences?.length; i++) {
        if (listPermanences[i]?.lieuPrincipalPour.includes(conseiller?._id) === true) {
          mesPermanences[0] = listPermanences[i];
        } else {
          mesPermanences[i + 1] = listPermanences[i];
        }
      }
      setMesPermanences(mesPermanences);
      if (idPermanence || cra?.idPermanence) {
        const idPermanenceToFind = cra?.idPermanence ?? idPermanence;
        dispatch(craActions.getPermanence(listPermanences.find(permanence => permanence._id === idPermanenceToFind)));
      }
    }
  }, [listPermanences, idPermanence]);

  return (
    <>
      {cra?.idPermanence &&
        <button className={`buttonPermanence-filled ${voirInformation ? 'force-width' : ''}`} onClick={onClickButtonFilled}>
          <span className="logoRattachementSelected"></span>
          <span>{cra?.nomEnseigne?.length > 40 ? cra?.nomEnseigne?.toUpperCase().substring(0, 40) + ' [...]' : cra?.nomEnseigne?.toUpperCase()}</span>
        </button>
      }
      {!cra?.idPermanence &&
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
                    <div className="nomEnseigne">{permanence.nomEnseigne?.length > 40 ?
                      permanence.nomEnseigne?.toUpperCase().substring(0, 40) + ' [...]' : permanence.nomEnseigne?.toUpperCase()}</div>
                    <div className="adresse">
                      {permanence?.adresse?.numeroRue !== 'null' ? permanence?.adresse?.numeroRue : ''}
                      {
                        ' ' + permanence?.adresse?.rue?.toUpperCase() + ' ' +
                        permanence?.adresse?.codePostal + ' ' +
                        permanence?.adresse?.ville?.toUpperCase()
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
            <Link to={!listPermanences || listPermanences?.length === 0 ? '/mes-lieux-activite' : '/mon-nouveau-lieu-activite'} >
              Ajouter un nouveau lieu d&rsquo;activit&eacute;
            </Link>
          </div>
        </div>
      }
    </>
  );

}

SelectPermanence.propTypes = {
  voirInformation: PropTypes.bool,
};

export default SelectPermanence;
