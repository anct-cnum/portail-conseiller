import React from 'react';
import { useSelector } from 'react-redux';
import SquareButton from './Components/SquareButton';
import SmallCountRadioButton from './Components/SmallCountRadioButton';

function Statut() {

  const cra = useSelector(state => state.cra);
  const statut = cra?.statut;
  return (
    <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
      <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.statut ? 'questionRequired' : ''}`}>
          Statut
        </span>
      </div>
      <div className="responsiveSquare1">
        {statut?.etudiant === 0 &&
          <SquareButton
            type="statut"
            value="etudiant"
            label="&Eacute;tudiant(e)"
            cra= {cra}/>
        }
        {statut?.etudiant > 0 &&
          <SmallCountRadioButton
            type="statut"
            typeKey="etudiant"
            typeValue={statut?.etudiant}
            typeLabel="&Eacute;tudiant(e)"/>
        }
      </div>
      <div className="responsiveSquare2">
        {statut?.sansEmploi === 0 &&
          <SquareButton
            type="statut"
            value="sansEmploi"
            label="Sans emploi"
            cra= {cra}/>
        }
        {statut?.sansEmploi > 0 &&
          <SmallCountRadioButton
            type="statut"
            typeKey="sansEmploi"
            typeValue={statut?.sansEmploi}
            typeLabel="Sans emploi"/>
        }
      </div>
      <div className="responsiveSquare3">
        {statut?.enEmploi === 0 &&
          <SquareButton
            type="statut"
            value="enEmploi"
            label="En emploi"
            cra= {cra}/>
        }
        {statut?.enEmploi > 0 &&
          <SmallCountRadioButton
            type="statut"
            typeKey="enEmploi"
            typeValue={statut?.enEmploi}
            typeLabel="En emploi"/>
        }
      </div>
      <div className="responsiveSquare4">
        {statut?.retraite === 0 &&
          <SquareButton
            type="statut"
            value="retraite"
            label="Retrait&eacute;"
            cra= {cra}/>
        }
        {statut?.retraite > 0 &&
          <SmallCountRadioButton
            type="statut"
            typeKey="retraite"
            typeValue={statut?.retraite}
            typeLabel="Retrait&eacute;"/>
        }
      </div>
      <div className="responsiveSquare5">
        {statut?.heterogene === 0 &&
          <SquareButton
            type="statut"
            value="heterogene"
            label="Non renseign&eacute; ou h&eacute;t&eacute;rog&egrave;ne"
            cra= {cra}/>
        }
        {statut?.heterogene > 0 &&
          <SmallCountRadioButton
            type="statut"
            typeKey="heterogene"
            typeValue={statut?.heterogene}
            typeLabel="NC ou h&eacute;t&eacute;rog&egrave;ne"/>
        }
      </div>
    </div>
  );
}

export default Statut;
