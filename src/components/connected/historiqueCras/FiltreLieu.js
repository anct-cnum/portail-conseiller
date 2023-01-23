import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { historiqueCrasActions } from '../../../actions';
import PropTypes from 'prop-types';

function FiltreLieu({ optionList }) {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.historiqueCras?.selectedCra);

  const setCodePostal = e => {
    const codePostal = e.target.value.split('-')[0];
    const ville = e.target.value.split('-')[1] ?? '';
    const selected = e.target.value;
    dispatch(historiqueCrasActions.changeCraCodePostal(codePostal, ville, selected));
  };

  return (
    <select className="fr-select fr-my-2w" onChange={setCodePostal} value={selected}>
      <option value="">codes postaux, villes</option>
      {optionList?.map((option, idx) => {
        return (
          <option key={idx} value={option.value}>
            {option?.marge}{option.text}
          </option>
        );
      })
      }
    </select>
  );
}

FiltreLieu.propTypes = {
  optionList: PropTypes.array,
};
export default FiltreLieu;
