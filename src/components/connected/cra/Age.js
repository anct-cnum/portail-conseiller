import React from 'react';
import { useSelector } from 'react-redux';
import SmallCountRadioButton from './Components/SmallCountRadioButton';
import SquareButton from './Components/SquareButton';

function Age() {

  const cra = useSelector(state => state.cra);
  const age = cra?.age;

  return (
    <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle espacement">
      <div className="fr-col-xs-11 fr-col-sm-11 fr-col-md-2 questionResponsive">
        <span className={`question ${cra?.printError && cra?.errorsRequired?.age ? 'questionRequired' : ''}`}>
          Cat&eacute;gorie d&rsquo;âge ou âge moyen du groupe
        </span>
      </div>
      <div className="responsiveSquare1">
        {age?.moins12ans === 0 &&
          <SquareButton
            type="age"
            value="moins12ans"
            label="-12 ans"
            cra={cra}/>
        }
        {age?.moins12ans > 0 &&
          <SmallCountRadioButton
            type="age"
            typeKey="moins12ans"
            typeLabel="-12 ans"
            typeValue={age?.moins12ans}/>
        }
      </div>
      <div className="responsiveSquare2">
        {age?.de12a18ans === 0 &&
          <SquareButton
            type="age"
            value="de12a18ans"
            label="12 - 18 ans"
            cra={cra}/>
        }
        {age?.de12a18ans > 0 &&
          <SmallCountRadioButton
            type="age"
            typeKey="de12a18ans"
            typeLabel="12 - 18 ans"
            typeValue={age?.de12a18ans}/>
        }
      </div>
      <div className="responsiveSquare3">
        {age?.de18a35ans === 0 &&
          <SquareButton
            type="age"
            value="de18a35ans"
            label="18 - 35 ans"
            cra={cra}/>
        }
        {age?.de18a35ans > 0 &&
          <SmallCountRadioButton
            type="age"
            typeKey="de18a35ans"
            typeLabel="18 - 35 ans"
            typeValue={age?.de18a35ans}/>
        }
      </div>
      <div className="responsiveSquare4">
        {age?.de35a60ans === 0 &&
          <SquareButton
            type="age"
            value="de35a60ans"
            label="35 - 60 ans"
            cra={cra}/>
        }
        {age?.de35a60ans > 0 &&
          <SmallCountRadioButton
            type="age"
            typeKey= "de35a60ans"
            typeLabel="35 - 60 ans"
            typeValue={age?.de35a60ans}
          />
        }
      </div>
      <div className="responsiveSquare5">
        {age?.plus60ans === 0 &&
          <SquareButton
            type="age"
            value="plus60ans"
            label="Plus de 60 ans"
            cra={cra}/>
        }
        {age?.plus60ans > 0 &&
          <SmallCountRadioButton
            type="age"
            typeKey="plus60ans"
            typeLabel="Plus de 60 ans"
            typeValue={age?.plus60ans}/>
        }
      </div>
    </div>
  );
}

export default Age;
