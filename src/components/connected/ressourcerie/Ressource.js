import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import FlashMessage from 'react-flash-message';

function Ressource({ ressource }) {

  const [lienCopie, setLienCopie] = useState(false);

  const copierLien = () => {
    navigator.clipboard.writeText(process.env.REACT_APP_RESSOURCERIE_URL + '/' + ressource?.lien);
    setLienCopie(true);
    setTimeout(() => {
      setLienCopie(false);
    }, 3000);
  };

  return (
    <div className="rf-col-12 rf-col-sm-6 rf-col-lg-3 rf-mb-9w">
      <div className="hauteur-texte">
        {ressource?.tags?.map((tag, idx) => {
          return <div key={idx} className="tags" style={{ display: 'inline' }}>
            <span className="hashtag">#</span>
            <span className="ressource-tag">{tag.toUpperCase()}</span>
          </div>;
        })}
        <div className="description">{ressource.description}</div>
      </div>
      <div className="telechargement">
        <a className="pdf-btn" href={process.env.REACT_APP_RESSOURCERIE_URL + '/' + ressource?.lien}>
          <img className="pdf-image" src="/logos/bouton-fichier.svg" />
          <span className="pdf-texte">{ressource?.lien ? ressource?.lien.split('.').pop().toUpperCase() : ''}</span>
        </a>
        <div className="lien-btn">
          <img className="lien-image" src="/logos/partager-lien.svg" />
          <a className="lien-texte" title="copier le lien" onClick={copierLien}>lien</a>
        </div>
        <div className="date">{dayjs(ressource.created_at).format('DD / MM / YY')}</div>
        {lienCopie &&
        <FlashMessage duration={3000} >
          <span className="succes-lien-copie">
            Lien copi&eacute; !
          </span>
        </FlashMessage>
        }
      </div>

    </div>
  );
}

Ressource.propTypes = {
  ressource: PropTypes.object,
};

export default Ressource;
