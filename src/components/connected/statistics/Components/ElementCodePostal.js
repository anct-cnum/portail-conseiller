import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statistiqueActions } from '../../../../actions';

function ElementCodePostal() {

  const dispatch = useDispatch();
  const listeCodesPostaux = useSelector(state => state.statistique?.listeCodesPostaux);

  const setCodePostal = e => {
    dispatch(statistiqueActions.changeCodePostalStats(e.target.value));
  };

  useEffect(() => {
    if (!listeCodesPostaux) {
      dispatch(statistiqueActions.getCodesPostauxCrasConseiller());
    }
  });

  return (
    <select className="rf-select code-postal-select rf-my-2w" onChange={setCodePostal}>
      <option value="">Tous codes postaux</option>
      {listeCodesPostaux && listeCodesPostaux?.map((codePostal, idx) => {
        return (<option key={idx} value={codePostal}>{codePostal}</option>);
      })}
    </select>
  );
}

export default ElementCodePostal;
