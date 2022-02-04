import React from 'react';
import { useSelector } from 'react-redux';
import SquareButton from './Components/SquareButton';
import SmallCountRadioButton from './Components/SmallCountRadioButton';

function Statut() {

  let cra = useSelector(state => state.cra);

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className={`question ${cra?.printError && cra?.errorsRequired?.statut ? 'questionRequired' : ''}`}>
            Statut
          </span>
        </div>
        <div className="responsiveSquare1">
          {cra?.statut.etudiant === 0 &&
            <SquareButton
              type="statut"
              value="etudiant"
              label="&Eacute;tudiant(e)"
              cra= {cra}/>
          }
          {cra?.statut.etudiant > 0 &&
            <SmallCountRadioButton
              type="statut"
              typeKey="etudiant"
              typeValue={cra.statut.etudiant}
              typeLabel="&Eacute;tudiant(e)"/>
          }
        </div>
        <div className="responsiveSquare2">
          {cra?.statut.sansEmploi === 0 &&
            <SquareButton
              type="statut"
              value="sansEmploi"
              label="Sans emploi"
              cra= {cra}/>
          }
          {cra?.statut.sansEmploi > 0 &&
            <SmallCountRadioButton
              type="statut"
              typeKey="sansEmploi"
              typeValue={cra.statut.sansEmploi}
              typeLabel="Sans emploi"/>
          }
        </div>
        <div className="responsiveSquare3">
          {cra?.statut.enEmploi === 0 &&
            <SquareButton
              type="statut"
              value="enEmploi"
              label="En emploi"
              cra= {cra}/>
          }
          {cra?.statut.enEmploi > 0 &&
            <SmallCountRadioButton
              type="statut"
              typeKey="enEmploi"
              typeValue={cra.statut.enEmploi}
              typeLabel="En emploi"/>
          }
        </div>
        <div className="responsiveSquare4">
          {cra?.statut.retraite === 0 &&
            <SquareButton
              type="statut"
              value="retraite"
              label="Retrait&eacute;"
              cra= {cra}/>
          }
          {cra?.statut.retraite > 0 &&
            <SmallCountRadioButton
              type="statut"
              typeKey="retraite"
              typeValue={cra.statut.retraite}
              typeLabel="Retrait&eacute;"/>
          }
        </div>
        <div className="responsiveSquare5">
          {cra?.statut.heterogene === 0 &&
            <SquareButton
              type="statut"
              value="heterogene"
              label="Non renseign&eacute; ou h&eacute;t&eacute;rog&egrave;ne"
              cra= {cra}/>
          }
          {cra?.statut.heterogene > 0 &&
            <SmallCountRadioButton
              type="statut"
              typeKey="heterogene"
              typeValue={cra.statut.heterogene}
              typeLabel="NC ou h&eacute;t&eacute;rog&egrave;ne"/>
          }
        </div>
      </div>
    </>
  );
}

export default Statut;
