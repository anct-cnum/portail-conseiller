import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { craActions } from '../../../../actions';
import PropTypes from 'prop-types';
import Pluralize from 'react-pluralize';
import { getCraValue } from '../utils/CraFunctions';

function BigRadioButton({ type, label, value, image, classDiv }) {

  const dispatch = useDispatch();
  const cra = useSelector(state => state.cra);
  const { nbParticipants, organismes, nbAccompagnementRedirection } = cra;
  let controlSelected = getCraValue(type);

  //Gestion du style du bouton
  let styleClass = 'radioRattachement';
  switch (type) {
    case 'canal':
      if (cra?.canal === 'domicile') {
        if (value === 'rattachement') {
          styleClass = 'disabled';
        } else {
          styleClass += cra?.errorsRequired.cp ? ' buttonError' : '';
        }
      } else if (!cra?.idPermanence && cra?.canal === 'rattachement' && value === 'rattachement') {
        styleClass += ' buttonError';
      }
      styleClass += cra?.canal === 'distance' && cra?.errorsRequired.cp ? ' buttonError' : '';
      break;
    case 'activite':
      styleClass += controlSelected === value ? ' radioRattachement-selected' : '';
      break;
    default:
      break;
  }

  const onClickRadio = () => {
    switch (type) {
      case 'canal':
        if (cra?.canal !== 'distance' && cra?.canal !== 'domicile') {
          dispatch(craActions.updateCanal(value));
        }
        if (value === 'autre lieu') {
          dispatch(craActions.getButtonCP());
          document.getElementById('lieuRattachement').style.zIndex = 1;
          setTimeout(() => {
            if (document.getElementById('dropdown')) {
              document.getElementById('dropdown').style.display = 'block';
            }
            if (document.getElementById('buttonCP')) {
              document.getElementById('buttonCP').style.zIndex = 3;
              document.getElementById('buttonCP').focus();
            }
          }, 100);
        } else if (value === 'rattachement') {
          dispatch(craActions.getButtonPermanences());
          document.getElementById('lieuRattachement').style.zIndex = -100;
          setTimeout(() => {
            if (document.getElementById('dropdown')) {
              document.getElementById('dropdown').style.display = 'none';
            }
            if (document.getElementById('buttonPermanences')) {
              document.getElementById('buttonPermanences').style.zIndex = 3;
              document.getElementById('buttonPermanences').focus();
            }
          }, 100);
        }
        break;
      case 'activite':
        dispatch(craActions.updateActivite(value));
        break;
      case 'accompagnement':
        let { nbParticipantsAccompagnement, nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme } = cra;
        if (nbParticipants && value === 'redirection') {
          dispatch(craActions.updateOrganisme(null));
          dispatch(craActions.showSelectRedirection(true));
          nbOrganisme++;
          dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, nbOrganisme));
        } else if (nbParticipants && nbParticipants > nbParticipantsAccompagnement) {
          if (value === 'individuel') {
            nbAccompagnementIndividuel++;
          } else if (value === 'atelier') {
            nbAccompagnementAtelier++;
          }
          dispatch(craActions.updateAccompagnement(nbAccompagnementIndividuel, nbAccompagnementAtelier, nbAccompagnementRedirection, 0));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="radioButton2" onClick={onClickRadio} value={value}>
      {type === 'canal' &&
        <div className="gradient-box">
          <button id={classDiv} className={styleClass} value={value} disabled={cra?.canal === 'domicile' && value === 'rattachement'}>
            <div value={value}>
              <div className={classDiv !== undefined ? classDiv : '' } value={value}>
                <span className={image}></span>
              </div>
              <span className="fr-label labelBigRadioCustom" value={value}>
                {label}
              </span>
            </div>
          </button>
        </div>
      }
      {(type === 'accompagnement' || type === 'activite') &&
        <div className="gradient-box" value={value}>
          {(value === 'redirection' && organismes?.length > 0) &&
            <button className="radioRattachement gradient-box-redirection">
              <span className={image} value={value}></span>
              <span className={`fr-label`} value={value}>
                <Pluralize
                  zero={'personne redirigée'}
                  singular={'personne redirigée'}
                  plural={'personnes redirigées'}
                  count={nbAccompagnementRedirection}
                  showCount={true} />
              </span>
            </button>
          }
          {(value !== 'redirection' || organismes?.length === 0) &&
            <button className={styleClass} value={value}>
              <span className={image} value={value}></span>
              <span className={`fr-label`} value={value}>
                {label}
              </span>
            </button>
          }
        </div>
      }

    </div>
  );
}

BigRadioButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  image: PropTypes.string,
  imageSelected: PropTypes.string,
  heightImage: PropTypes.string,
  classDiv: PropTypes.string,
};

export default BigRadioButton;
