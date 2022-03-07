import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { permanenceActions } from '../../../actions';

function ListPermanences({ prefixId }) {
  const dispatch = useDispatch();

  const permanences = useSelector(state => state.permanence);
  const listPermanences = useSelector(state => state.permanence?.permanences);
  const isAdresseCachee = useSelector(state => state.permanence?.isAdresseCachee);

  const handleClick = e => {
    const permanence = listPermanences.find(permanence => permanence._id === e.target.value);
    dispatch(permanenceActions.updateField('nomEnseigne', permanence?.nomEnseigne));
    dispatch(permanenceActions.updateField('siret', permanence?.siret));
    dispatch(permanenceActions.initAdresse(prefixId, permanence?.adresse));
  };
console.log(permanences);
  return (
    <>
      <div className="rf-col-offset-1 rf-col-11">
        S&eacute;lectionnez votre lieu d&rsquo;activit&eacute;, s&rsquo;il n&rsquo;apparaît pas dans cette liste,
        cochez la puce « Ajouter un nouveau lieu d&rsquo;activit&eacute; ».
        <span className="baseline">
          Cette liste correspond aux lieux d&rsquo;activit&eacute; d&eacute;j&agrave; enregistr&eacute;s par les
          conseillers num&eacute;riques de votre structure d&rsquo;accueil.
        </span>
      </div>
      <div className="rf-col-offset-1 rf-col-8">
        <fieldset className="rf-fieldset rf-mt-4w">
          {listPermanences?.length > 0 &&
            <div className="emplacement-permanences">
              {listPermanences.map(((permanence, idx) => {
                return (

                  <div key={idx}>
                    {!permanence.estStructure &&
                    <>
                      <hr />
                      <div className="rf-fieldset__content">
                        <div className="rf-radio-group">
                          <input type="radio" id={permanence._id} className="permanence-existante" name="permancenceSecondaire" value={permanence._id}
                            defaultChecked={permanence._id} required="required" onClick={handleClick}/>
                          <label className="rf-label rf-my-2w permanence-existante" htmlFor={permanence._id}>
                            <span className="rf-container rf-container--fluid">
                              <span className="rf-grid-row">
                                <span className="rf-col-3">{permanence.adresse.ville.toUpperCase()}</span>
                                <span className="rf-col-2">{permanence.adresse.codePostal}</span>
                                <span className="rf-col-7">{permanence.nomEnseigne}</span>
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
          }
          <hr />
          <div className="rf-fieldset__content rf-mt-5w rf-mb-9w">
            <div className="rf-radio-group">
              <input type="radio" id="nouveau" name="permancenceSecondaire" value="nouveau" defaultChecked={true} required="required"/>
              <label className="rf-label rf-my-2w" htmlFor="nouveau">
                Ajouter un nouveau lieu d&rsquo;activit&eacute;
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </>
  );
}

ListPermanences.propTypes = {
  prefixId: PropTypes.string,
};

export default ListPermanences;
