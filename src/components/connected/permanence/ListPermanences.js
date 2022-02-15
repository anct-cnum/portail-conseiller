import React from 'react';
import PropTypes from 'prop-types';

function ListPermanences({ isAdresseCachee }) {

  const listPermanences = [
    { '_id': '4s5df456sfdsfd45sfd5sfd45', 'nomStructure': 'Espace numérique sud Laon', 'codePostal': '02000', 'ville': 'LAON' },
    { '_id': 'kopkpok94u56t5hh5fd5sfd45', 'nomStructure': 'Solidarité formation Médiation de Chauny', 'codePostal': '02300', 'ville': 'CHAUNY' },
    { '_id': '4s5df456sfd8sdf855dsf4245', 'nomStructure': 'CCAS de Saint-Quentin', 'codePostal': '02100', 'ville': 'SAINT-QUENTIN' },
    { '_id': '4poi456kjh5erfu5sfd5sfd45', 'nomStructure': 'Communauté d’agglomération du Beauvais', 'codePostal': '60000', 'ville': 'BEAUVAIS' },
  ];
  return (
    <>
      {!isAdresseCachee &&
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
                        <hr />
                        <div className="rf-fieldset__content">
                          <div className="rf-radio-group">
                            <input type="radio" id={permanence._id} name="permancenceSecondaire" value={permanence._id}
                              defaultChecked={permanence._id} required="required"/>
                            <label className="rf-label rf-my-2w" htmlFor={permanence._id}>
                              <span className="rf-container rf-container--fluid">
                                <span className="rf-grid-row">
                                  <span className="rf-col-3">{permanence.ville.toUpperCase()}</span>
                                  <span className="rf-col-2">{permanence.codePostal}</span>
                                  <span className="rf-col-7">{permanence.nomStructure}</span>
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>
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
      }
    </>
  );
}

ListPermanences.propTypes = {
  isAdresseCachee: PropTypes.bool,
};

export default ListPermanences;
