import React from 'react';
import PropTypes from 'prop-types';
import RedirectionButton from './RedirectionButton';

function ListeAccompagnements({ organismes, deletable = false }) {
  let spanWidth = organismes?.length * 218 + 35;
  let textAlign = organismes?.length === 1 ? 'center' : 'left';

  return (
    <>
      {organismes?.length > 0 &&
        <div className="listeOrganismesSelected" style={{ borderTop: '1px solid #3558a2', textAlign: textAlign }}>
          <div className="fresqueOrganismes" style={{ width: spanWidth + 'px' }}>
            {organismes?.map((organisme, key) => {
              return <span key={key} >
                <RedirectionButton organisme={organisme} firstElement={key === 0} deletable={deletable}/>
              </span>;
            })}
          </div>
        </div>
      }
    </>
  );
}

ListeAccompagnements.propTypes = {
  organismes: PropTypes.array,
  deletable: PropTypes.bool,
};

export default ListeAccompagnements;
