import React from 'react';
import PropTypes from 'prop-types';
import labelsCorrespondance from '../../../data/labelsCorrespondance.json';
import { htmlDecode } from '../../../utils/functionEncodeDecode';

function FiltreCra({ texte, css, datas, setDatas }) {
  return (
    <nav id={`filtre-cra-${css}`} className="fr-nav" role="navigation" aria-label={`Filtre ${css}`}>
      <ul className="fr-nav__list">
        <li className="fr-nav__item">
          <button className="fr-nav__btn btn-cra" aria-expanded="false"
            aria-controls={`filtre-${css}`} aria-current="true">
            {texte}
          </button>
          <div className="fr-collapse fr-menu" id={`filtre-${css}`}>
            <ul className="fr-menu__list">
              <li className="fr-nav__item">
                <button className="fr-nav__link" onClick={() => {
                  setDatas(null);
                }} target="_self">
                  Afficher Tout
                </button>
              </li>
              {datas?.length > 0 &&
                <li className="fr-nav__item">
                  {datas?.map((data, idx) =>
                    <button key={idx} className="fr-nav__link" onClick={() => {
                      setDatas(data);
                    }} target="_self">
                      {htmlDecode(labelsCorrespondance.find(label => label.nom === data)?.correspondance)}
                    </button>
                  )}
                </li>
              }
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

FiltreCra.propTypes = {
  texte: PropTypes.string,
  css: PropTypes.string,
  datas: PropTypes.array,
  setDatas: PropTypes.func
};

export default FiltreCra;
