import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InputCheckbox from './Components/InputCheckbox';

function TypeAcces({ islieuPrincipal, prefixId }) {

  const fields = useSelector(state => state.permanence?.fields);
  const estCoordinateur = fields?.filter(field => field.name === 'estCoordinateur')[0]?.value;
  const erreursFormulaire = useSelector(state => state.permanence.errorsFormulaire?.errors);
  const erreurTypeAcces = erreursFormulaire?.filter(erreur => erreur?.[prefixId + 'typeAcces'])[0]?.[prefixId + 'typeAcces'];

  return (
    <>
      <div className="fr-col-offset-1 fr-col-11">
        <div className={erreurTypeAcces ? 'fr-col-12 invalid fr-mb-6w' : 'fr-col-12 fr-mb-6w'}>
          Type d&rsquo;acc&egrave;s <span className="obligatoire">*</span>
          <span className="baseline">Comment les usagers acc&egrave;dent-ils &agrave; la structure ?</span>

          <fieldset className="fr-fieldset fr-fieldset--inline fr-mt-2w">
            <div className="fr-fieldset__content">
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
            <p className="text-error fr-mb-n3w">{erreurTypeAcces}</p>
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
