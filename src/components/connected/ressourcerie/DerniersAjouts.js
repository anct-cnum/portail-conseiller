import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

function DerniersAjouts({ ressources }) {

  return (
    <div className="derniersAjouts">
      <h2 className="rf-mb-3w sous-titre">Derniers ajouts</h2>
      <div className="rf-container--fluid">
        <div className="rf-grid-row">
          {ressources?.slice(0, 12)?.map((ressource, idx) => {
            return (
              <div key={idx} className="rf-col-12 rf-col-md-6 rf-mb-3w">
                <div className="date"><hr />{dayjs(ressource.created_at).format('DD / MM / YY')}</div>
                <div className="description rf-mr-1w">{ressource.description}</div>
              </div>
            );
          })
          }
        </div>
      </div>
    </div>
  );
}

DerniersAjouts.propTypes = {
  ressources: PropTypes.array,
};

export default DerniersAjouts;
