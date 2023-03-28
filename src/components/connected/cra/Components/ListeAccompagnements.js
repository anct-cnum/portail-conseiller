import React from 'react';
import PropTypes from 'prop-types';
import RedirectionButton from './RedirectionButton';

function ListeAccompagnements({ organismes, borderTop, deletable = false }) {
  let spanWidth = organismes?.length * 218 + 35;
  let textAlign = organismes?.length === 1 ? 'center' : 'left';

  return (
    <>
      {organismes?.length > 0 &&
        <div style={{ width: '268px', overflow: 'auto', borderTop: borderTop, textAlign: textAlign }}>
          <div style={{ height: '72px', padding: '20px 0', width: spanWidth + 'px' }}>
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
  borderTop: PropTypes.string,
  deletable: PropTypes.bool,
};

export default ListeAccompagnements;
