import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { craActions } from '../../../../actions';
import { getCraValue } from '../utils/CraFunctions';
import ListeAccompagnements from './ListeAccompagnements';

function SmallRadioButton({ type, label, value, image, imageSelected, heightImage }) {

  const dispatch = useDispatch();

  const cra = useSelector(state => state.cra);
  const organismes = cra?.organismes;
  let controlSelected = getCraValue(type);
  const onClickRadio = e => {
    switch (type) {
      case 'canal':
        dispatch(craActions.updateCanal(e.target.getAttribute('value')));
        break;
      case 'activite':
        dispatch(craActions.updateActivite(e.target.getAttribute('value')));
        break;
      case 'accompagnement':
        let { nbParticipants, nbParticipantsAccompagnement, nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme } = cra;
        if (nbParticipants && nbParticipants > nbParticipantsAccompagnement) {
          dispatch(craActions.updateOrganisme(null));
          dispatch(craActions.showSelectRedirection(true));
          nbOrganisme++;
          dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton2" onClick={onClickRadio} value={value}>
      <div className="gradient-box">
        {(type === 'accompagnement' || type === 'activite') &&
          <div className="gradient-box" value={value} >
            {(value === 'redirection' && organismes?.length > 0) &&
              <div className="radioRattachement gradient-box-redirection">
                <ListeAccompagnements organismes={organismes} deletable={true} borderTop="0px"/>
              </div>
            }
            {(value !== 'redirection' || organismes?.length === 0) &&
              <button className="radioRattachement" value={value} style={{ height: '73px' }}>
                <span className={image} value={value} style={{ display: 'inline-block' }}></span>
                <span className={`fr-label`} style={{ display: 'inline-block', marginLeft: '15px', position: 'relative', top: '-20px' }} value={value}>
                  {label}
                </span>
              </button>
            }
          </div>
        }
        {type !== 'accompagnement' && type !== 'activite' &&
          <button id="radioRattachement"
            className={`radioRattachement ${value === 'redirection' ? 'logoRedirection' : ''} ${controlSelected === value ? 'radioRattachement-selected' : ''}`}
            style={value === 'redirection' ? { height: '115px' } : { height: '73px' }}
            value={value}>
            <div value={value}>
              <img
                src={controlSelected !== value ? image : imageSelected}
                alt={label} height={heightImage}
                style={{ marginTop: '0.2rem', marginRight: '14px' }}
                value={value}/>
              <span
                className={`fr-label labelSmallRadioCustom ${controlSelected === value ? 'radioRattachement-selected' : ''}`}
                style={{ display: 'inline-block', verticalAlign: 'bottom', lineHeight: '36px' }}
                value={value}>
                {label}
              </span>
            </div>
          </button>
        }
      </div>
    </div>
  );
}

SmallRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
};

export default SmallRadioButton;
