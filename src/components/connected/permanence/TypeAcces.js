import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InputCheckbox from './Components/InputCheckbox';
import { permanenceActions } from '../../../actions';

function TypeAcces({ islieuPrincipal, prefixId, isUpdate, permanence }) {
  const dispatch = useDispatch();
  const fields = useSelector(state => state.permanence?.fields);
  const estCoordinateur = fields?.filter(field => field.name === 'estCoordinateur')[0]?.value;
  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeAcces = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'typeAcces'])[0]?.[prefixId + 'typeAcces'];

  useEffect(() => {
    if (permanence && isUpdate) {
      permanence?.typeAcces?.forEach(type => {
        dispatch(permanenceActions.updateField(prefixId + type, true));
      });
      dispatch(permanenceActions.updateField(prefixId + 'typeAcces', permanence?.typeAcces));
    }
  }, [permanence]);

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11">
        <div className={erreurTypeAcces ? 'rf-col-12 invalid rf-mb-6w' : 'rf-col-12 rf-mb-6w'}>
          Type d&rsquo;acc&egrave;s <span className="obligatoire">*</span>
          <span className="baseline">Comment les usagers acc&egrave;dent-ils &agrave; la structure ?</span>

          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <InputCheckbox textLabel="Acc&egrave;s libre" errorInput={erreurTypeAcces}
                idInput={prefixId + 'libre'} prefixId={prefixId} nameInput="libre"/>

              <InputCheckbox textLabel="Sur rendez-vous" errorInput={erreurTypeAcces}
                idInput={prefixId + 'rdv'} prefixId={prefixId} nameInput="rdv"/>

              {(!islieuPrincipal || estCoordinateur) &&
              <InputCheckbox textLabel="La structure n&rsquo;accueille pas de public" errorInput={erreurTypeAcces}
                idInput={prefixId + 'prive'} prefixId={prefixId} nameInput="prive" />
              }
            </div>
          </fieldset>

          { erreurTypeAcces &&
            <p className="text-error rf-mb-n3w">{erreurTypeAcces}</p>
          }
        </div>
      </div>
    </>
  );
}

TypeAcces.propTypes = {
  islieuPrincipal: PropTypes.bool,
  prefixId: PropTypes.string,
  isUpdate: PropTypes.bool,
  permanence: PropTypes.object,
};

export default TypeAcces;
