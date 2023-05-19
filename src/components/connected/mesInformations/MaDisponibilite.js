import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { candidatActions } from '../../../actions';
import dayjs from 'dayjs';
import MaDisponibiliteModal from './MaDisponibiliteModal';

function MaDisponibilite() {
  const dispatch = useDispatch();

  const conseiller = useSelector(state => state.conseiller?.conseiller);
  const errorDisponibilite = useSelector(state => state.conseiller?.errorDisponibilite);

  const [isDisponible, setIsDisponible] = useState(conseiller?.disponible ?? false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickDisponibilite = () => {
    if (conseiller) {
      setIsDisponible(!conseiller.disponible);
      dispatch(candidatActions.updateDisponibilite(conseiller._id, !conseiller.disponible));
      if (conseiller.disponible === false) {
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    if (conseiller) {
      setIsDisponible(conseiller?.disponible);
    }
  }, [conseiller]);

  return (
    <div className="fr-container">
      {isModalOpen &&
        <MaDisponibiliteModal conseiller={conseiller} setIsModalOpen={setIsModalOpen}/>
      }
      <div className="fr-grid-row">
        <div className="fr-col-3">
          <div className="fr-toggle fr-toggle--label-left" style={{ width: '260px' } }>
            <input type="checkbox" className={`fr-toggle__input ${isDisponible ? 'disponibilite-valide' : ''}`}
              aria-describedby="disponibilite" id="toggle-disponibilite"
              checked={isDisponible} onChange={() => {
                onClickDisponibilite();
              }} />
            <label className="fr-toggle__label" htmlFor="toggle-disponibilite">
              D&eacute;clarer ma disponibilit&eacute;&nbsp;:
            </label>
          </div>
        </div>
        {!isDisponible &&
        <div className="fr-col-3 label-indisponible" onClick={() => {
          onClickDisponibilite();
        }}>indisponible</div>
        }
        {isDisponible &&
          <div className="fr-col-3 label-disponible" onClick={() => {
            onClickDisponibilite();
          }}>disponible {conseiller?.dateDisponibilite ? 'à partir du ' + dayjs(conseiller?.dateDisponibilite).format('DD/MM/YYYY') : ''}.</div>
        }
      </div>
      {errorDisponibilite &&
        <p className="text-error">{errorDisponibilite}</p>
      }
    </div>
  );
}

export default MaDisponibilite;
