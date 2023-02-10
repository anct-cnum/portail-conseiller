import React from 'react';
import PropTypes from 'prop-types';

function CheckboxButton({ labels, values, clickSousTheme, craSousThemes }) {
  return (
    <>
      {values?.map((value, key) => {
        const checked = craSousThemes ? craSousThemes.includes(value) : false;
        return <span key={key}>
          <input type="checkbox" id={value} name={value} data-sous-theme={value} onClick={clickSousTheme} defaultChecked={checked}/>
          <label className="fr-label" htmlFor={value}>{labels[key]}</label>
        </span>;
      })}
    </>
  );
}

CheckboxButton.propTypes = {
  labels: PropTypes.array,
  values: PropTypes.array,
  clickSousTheme: PropTypes.func,
  craSousThemes: PropTypes.array,
};

export default CheckboxButton;
