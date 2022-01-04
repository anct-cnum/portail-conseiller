
const initialState = {
  isAdresseCachee: true
};
export default function filtersAndSorts(state = initialState, action) {
  switch (action.type) {
    case 'CACHER_ADRESSE':
      return {
        ...state,
        isAdresseCachee: action.input
      };
    default:
      return state;
  }
}
