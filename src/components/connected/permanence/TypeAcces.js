import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InputRadio from './Components/InputRadio';

function TypeAcces({ islieuPrincipal, prefixId }) {
  const fields = useSelector(state => state.permanence?.fields);
  const estCoordinateur = fields?.filter(field => field.name === 'estCoordinateur')[0]?.value;
  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeAcces = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'typeAcces'])[0]?.[prefixId + 'typeAcces'];

  return (
    <>
      <div className="rf-col-offset-1 rf-col-11">
        <div className={erreurTypeAcces ? 'rf-col-12 invalid rf-mb-6w' : 'rf-col-12 rf-mb-6w'}>
          Type d’acc&egrave;s <span className="obligatoire">*</span>
          <span className="baseline">Comment les usagers acc&egrave;dent-ils &agrave; la structure ?</span>

          <fieldset className="rf-fieldset rf-fieldset--inline rf-mt-2w">
            <div className="rf-fieldset__content">
              <InputRadio textLabel="Acc&egrave;s libre" errorInput={erreurTypeAcces}
                idInput={prefixId + 'libre'} nameInput={prefixId + 'typeAcces'} valueInput="libre"/>

              <InputRadio textLabel="Sur rendez-vous" errorInput={erreurTypeAcces}
                idInput={prefixId + 'rdv'} nameInput={prefixId + 'typeAcces'} valueInput="rdv"/>

              {(!islieuPrincipal || estCoordinateur) &&
                <InputRadio textLabel="La structure n&rsquo;accueille pas de public" errorInput={erreurTypeAcces}
                  idInput={prefixId + 'prive'} nameInput={prefixId + 'typeAcces'} valueInput="prive"/>
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
};

export default TypeAcces;
