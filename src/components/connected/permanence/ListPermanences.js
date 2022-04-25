import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { permanenceActions } from '../../../actions';

function ListPermanences({ prefixId, conseillerId }) {
  const dispatch = useDispatch();

  const listPermanences = useSelector(state => state.permanence?.permanences);
  const loadingHoraires = useSelector(state => state.permanence?.loadingHoraires);
  const fields = useSelector(state => state.permanence?.fields);

  const [showList, setShowList] = useState(0);

  const handleClick = e => {
    const permanence = listPermanences.find(permanence => permanence._id === e.target.value);

    dispatch(permanenceActions.updateField(prefixId + 'idPermanence', permanence?._id));
    dispatch(permanenceActions.updateField(prefixId + 'nomEnseigne', permanence?.nomEnseigne));
    dispatch(permanenceActions.updateField(prefixId + 'siret', permanence?.siret));
    dispatch(permanenceActions.updateField(prefixId + 'checkboxSiret', e.target.value === 'nouveau' ? false : !permanence?.siret));
    dispatch(permanenceActions.updateField(prefixId + 'numeroVoie', permanence?.adresse.numeroRue));
    dispatch(permanenceActions.updateField(prefixId + 'rueVoie', permanence?.adresse.rue));
    dispatch(permanenceActions.updateField(prefixId + 'codePostal', permanence?.adresse.codePostal));
    dispatch(permanenceActions.updateField(prefixId + 'ville', permanence?.adresse.ville.toUpperCase()));
    dispatch(permanenceActions.updateField(prefixId + 'location', permanence?.location));
    dispatch(permanenceActions.updateField(prefixId + 'numeroTelephone', permanence?.numeroTelephone));
    dispatch(permanenceActions.updateField(prefixId + 'email', permanence?.email));
    dispatch(permanenceActions.updateField(prefixId + 'siteWeb', permanence?.siteWeb));
    dispatch(permanenceActions.updateField(prefixId + 'horaires', { [prefixId + 'horaires']: permanence?.horaires }));
    dispatch(permanenceActions.updateField(prefixId + 'conseillers', permanence?.conseillers));
    permanence?.typeAcces.forEach(type => {
      dispatch(permanenceActions.updateField(prefixId + type, true));
    });

    if (prefixId === 'principal_') {
      dispatch(permanenceActions.updateField('lieuPrincipalPour', permanence?.lieuPrincipalPour));
      loadingHoraires[0] = true;
    } else {
      dispatch(permanenceActions.updateField(prefixId + 'conseillersItinerants', permanence?.conseillersItinerants));
      const id = 0;
      loadingHoraires[id + 1] = true;
    }

    dispatch(permanenceActions.setHorairesLoading(loadingHoraires));
    dispatch(permanenceActions.disabledField(prefixId, e.target.value !== 'nouveau'));
  };

  useEffect(() => {
    let nbPermanences = 0;
    if (listPermanences !== undefined && listPermanences?.length > 0) {
      listPermanences.forEach(permanence => {
        if (permanence?.conseillers.includes(conseillerId) === false && permanence?.estStructure === false) {
          nbPermanences++;
        }
      });
    }
    setShowList(nbPermanences);
  }, [listPermanences]);

  return (
    <>
      {showList > 0 &&
      <>
        {((prefixId !== 'principal_') ||
        (prefixId === 'principal_' && fields?.filter(field => field.name === 'estStructure')[0]?.value === false)) &&
          <>
            <div className="rf-col-offset-1 rf-col-11">
              S&eacute;lectionnez votre lieu d&rsquo;activit&eacute;, s&rsquo;il n&rsquo;apparaît pas dans cette liste,
              cochez la puce &laquo;&nbsp;Ajouter un nouveau lieu d&rsquo;activit&eacute;&nbsp;&raquo;.
              <span className="baseline">
                Cette liste correspond aux lieux d&rsquo;activit&eacute; d&eacute;j&agrave; enregistr&eacute;s par les
                conseillers num&eacute;riques de votre structure d&rsquo;accueil.<br/>
                En s&eacute;l&eacute;ctionnant un &eacute;l&eacute;ment existant, les champs seront remplis avec informations pr&eacute;-enregistr&eacute;es
                par vos collaborateurs.
              </span>
            </div>
            <div className="rf-col-offset-1 rf-col-8">
              <fieldset className="rf-fieldset rf-mt-4w">
                <div className="emplacement-permanences">
                  {listPermanences.map(((permanence, idx) => {
                    return (
                      <div key={idx}>
                        {permanence?.conseillers.includes(conseillerId) === false &&
                        <>
                          <hr />
                          <div className="rf-fieldset__content">
                            <div className="rf-radio-group">
                              <input type="radio" id={prefixId + permanence?._id} className="permanence-existante"
                                name={prefixId + 'permancenceSecondaire'} value={permanence?._id} required="required" onClick={handleClick}/>
                              <label className="rf-label rf-my-2w permanence-existante" htmlFor={prefixId + permanence?._id}>
                                <span className="rf-container rf-container--fluid">
                                  <span className="rf-grid-row">
                                    <span className="rf-col-3">{permanence?.adresse.ville.toUpperCase()}</span>
                                    <span className="rf-col-2">{permanence?.adresse.codePostal}</span>
                                    <span className="rf-col-7">{permanence?.nomEnseigne}</span>
                                  </span>
                                </span>
                              </label>
                            </div>
                          </div>
                        </>
                        }
                      </div>);
                  })) }
                </div>

                <hr />
                <div className="rf-fieldset__content rf-mt-5w rf-mb-9w">
                  <div className="rf-radio-group">
                    <input type="radio" id={prefixId + 'nouveau'} name={prefixId + 'permancenceSecondaire'} value="nouveau"
                      defaultChecked={true} required="required" onClick={handleClick}/>
                    <label className="rf-label rf-my-2w" htmlFor={prefixId + 'nouveau'} >
                      Ajouter un nouveau lieu d&rsquo;activit&eacute;
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </>
        }
      </>
      }
    </>
  );
}

ListPermanences.propTypes = {
  prefixId: PropTypes.string,
  conseillerId: PropTypes.string,
};

export default ListPermanences;