import { useSelector } from 'react-redux';

//Get value of CRA type
export function getCraValue(type) {

  let cra = useSelector(state => state.cra);

  switch (type) {
    case 'canal':
      return cra?.canal;
    case 'activite':
      return cra?.activite;
    case 'age':
      return cra?.age;
    default:
      return '';
  }
}
