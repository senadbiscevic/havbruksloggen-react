import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  boats: [],
  selectedBoat: null
};

const fetchBoats = (state, action) => {
  return updateObject(state, {
    boats: action.boats,
  });
};

// const addBoat = (state, action) => {};

const removeBoat = (state, action) => {
  const updatedBoats = state.boats.filter((m) => m.boatId !== action.boatId);

  const updatedState = {
    ...state,
    boats: updatedBoats
  };

  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOATS:
      return fetchBoats(state, action);
    // case actionTypes.ADD_BOAT: return addBoat( state, action );
    case actionTypes.REMOVE_BOAT:
      return removeBoat(state, action);
    default:
      return state;
  }
};

export default reducer;
