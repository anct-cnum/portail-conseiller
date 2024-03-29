import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiqueActions } from '../../../../actions';
import PropTypes from 'prop-types';

function ElementCodePostal({ idStructure = '' }) {
  const dispatch = useDispatch();
  const labelSelectPrint = useSelector(state => state.statistique?.labelSelectPrint);
  const listeCodesPostaux = useSelector(state => state.statistique?.listeCodesPostaux);
  const setCodePostal = e => {
    const codePostal = e.target.value.split('-')[0];
    const ville = e.target.value.includes('-') ? e.target.value.substring(e.target.value.indexOf('-') + 1) : null;
    const listCp = listeCodesPostaux?.find(i => i.id === codePostal)?.codeCommune;
    const codeCommune = listCp?.find(e => e.ville === ville)?.codeCommune;
    const label = e.nativeEvent?.target[e.target.selectedIndex]?.text?.replace('- -', `${codePostal} -`);
    dispatch(statistiqueActions.changeCodePostalStats(codePostal, ville, codeCommune));
    dispatch(statistiqueActions.changeLabelSelectPrint(label === 'codes postaux, villes' ? 'Tous les codes Postaux' : label));
  };
  const [optionList, setOptionList] = useState([]);
  useEffect(() => {
    if (!listeCodesPostaux) {
      if (idStructure) {
        dispatch(statistiqueActions.getCodesPostauxCrasConseillerStructure(idStructure));
      } else {
        dispatch(statistiqueActions.getCodesPostauxCrasConseiller());
      }
    } else if (listeCodesPostaux && optionList?.length === 0) {
      listeCodesPostaux.forEach(codePostal => {
        if (codePostal.villes?.length === 1) {
          optionList.push({
            text: codePostal.id + ' - ' + codePostal.villes[0]?.toUpperCase(),
            value: codePostal.id + '-' + codePostal.villes[0]
          });
        } else if (codePostal.villes?.length > 1) {
          optionList.push({
            text: codePostal.id + ' - TOUTES COMMUNES',
            value: codePostal.id
          });
          codePostal.villes.forEach(ville => {
            optionList.push({
              text: ville,
              value: codePostal.id + '-' + ville,
              marge: '- - '
            });
          });
        }
      });
      setOptionList(optionList);
    }
  });

  return (
    <>
      <div className="only-print code-postal-select fr-my-3w">
        {labelSelectPrint}
      </div>
      <select className="fr-select code-postal-select fr-my-2w dont-print" onChange={setCodePostal}>
        <option value="">codes postaux, villes</option>
        {idStructure.length > 0 && listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
          return (<option key={idx} value={codePostal}>{codePostal}</option>);
        })}
        {idStructure.length === 0 && listeCodesPostaux && optionList?.map((option, idx) => {
          return (
            <option key={idx} value={option.value}>
              {option?.marge}{option.text}
            </option>
          );
        })
        }
      </select>
    </>
  );
}

ElementCodePostal.propTypes = {
  idStructure: PropTypes.string,
};
export default ElementCodePostal;
