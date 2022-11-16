import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiqueActions } from '../../../../actions';
import PropTypes from 'prop-types';

function ElementCodePostal({ idStructure = '' }) {

  const dispatch = useDispatch();
  const listeCodesPostaux = useSelector(state => state.statistique?.listeCodesPostaux);
  const setCodePostal = e => {
    const codePostal = e.target.value.split(' - ')[0];
    const ville = e.target.value.split(' - ')[1];
    dispatch(statistiqueActions.changeCodePostalStats(codePostal, ville));
  };

  useEffect(() => {
    if (!listeCodesPostaux) {
      if (idStructure) {
        dispatch(statistiqueActions.getCodesPostauxCrasConseillerStructure(idStructure));
      } else {
        dispatch(statistiqueActions.getCodesPostauxCrasConseiller());
      }
    }
  });

  return (
    <select className="fr-select code-postal-select fr-my-2w" onChange={setCodePostal}>
      <option value="">TOUS CODES POSTAUX</option>
      {idStructure.length > 0 && listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
      {idStructure.length === 0 && listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<optgroup key={idx} label={codePostal.id}>
          {codePostal?.codePostal?.length > 1 &&
            <option value={codePostal.id}>{codePostal.id} - TOUTES COMMUNES </option>
          }
          {codePostal?.codePostal?.map((ligne, idxbis) => {
            return (<option key={idxbis} value={ligne}>{ligne.toUpperCase()}</option>);
          })}
        </optgroup>);
      })}
    </select>
  );
}

ElementCodePostal.propTypes = {
  idStructure: PropTypes.string,
};
export default ElementCodePostal;
