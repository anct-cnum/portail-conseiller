import React from 'react';
import { useSelector } from 'react-redux';
import SmallCountRadioButton from './Components/SmallCountRadioButton';
import SquareButton from './Components/SquareButton';

function Age() {

  let cra = useSelector(state => state.cra);

  return (
    <>
      <div className="rf-grid-row rf-grid-row--gutters rf-grid-row--middle rf-mb-7w">
        <div className="rf-col-xs-11 rf-col-sm-11 rf-col-md-2 questionResponsive">
          <span className={`question ${cra?.printError && cra?.errorsRequired?.age ? 'questionRequired' : ''}`}>
            Cat&eacute;gorie d&rsquo;âge ou âge moyen du groupe
          </span>
        </div>
        <div className="responsiveSquare1">
          {cra?.age.moins12ans === 0 &&
            <SquareButton
              type="age"
              value="moins12ans"
              label="-12 ans"
              cra={cra}/>
          }
          {cra?.age.moins12ans > 0 &&
            <SmallCountRadioButton
              type="age"
              typeKey="moins12ans"
              typeLabel="-12 ans"
              typeValue={cra?.age.moins12ans}/>
          }
        </div>
        <div className="responsiveSquare2">
          {cra?.age.de12a18ans === 0 &&
            <SquareButton
              type="age"
              value="de12a18ans"
              label="12 - 18 ans"
              cra={cra}/>
          }
          {cra?.age.de12a18ans > 0 &&
            <SmallCountRadioButton
              type="age"
              typeKey="de12a18ans"
              typeLabel="12 - 18 ans"
              typeValue={cra?.age.de12a18ans}/>
          }
        </div>
        <div className="responsiveSquare3">
          {cra?.age.de18a35ans === 0 &&
            <SquareButton
              type="age"
              value="de18a35ans"
              label="18 - 35 ans"
              cra={cra}/>
          }
          {cra?.age.de18a35ans > 0 &&
            <SmallCountRadioButton
              type="age"
              typeKey="de18a35ans"
              typeLabel="18 - 35 ans"
              typeValue={cra?.age.de18a35ans}/>
          }
        </div>
        <div className="responsiveSquare4">
          {cra?.age.de35a60ans === 0 &&
            <SquareButton
              type="age"
              value="de35a60ans"
              label="35 - 60 ans"
              cra={cra}/>
          }
          {cra?.age.de35a60ans > 0 &&
            <SmallCountRadioButton
              type="age"
              typeKey= "de35a60ans"
              typeLabel="35 - 60 ans"
              typeValue={cra?.age.de35a60ans}
            />
          }
        </div>
        <div className="responsiveSquare5">
          {cra?.age.plus60ans === 0 &&
            <SquareButton
              type="age"
              value="plus60ans"
              label="Plus de 60 ans"
              cra={cra}/>
          }
          {cra?.age.plus60ans > 0 &&
            <SmallCountRadioButton
              type="age"
              typeKey="plus60ans"
              typeLabel="Plus de 60 ans"
              typeValue={cra?.age.plus60ans}/>
          }
        </div>
      </div>
    </>
  );
}

export default Age;
