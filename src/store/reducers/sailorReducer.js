import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  sailors: [],
  currentPage: 1,
  pageSize: 10,
  searchQuery: "",
  selectedSailor: null,
  sortColumn: { path: "title", order: "asc" },
};

const fetchSailors = (state, action) => {
  return updateObject(state, {
    sailors: action.sailors,
  });
};

// const addSailor = (state, action) => {};

const removeSailor = (state, action) => {
  const updatedSailors = state.sailors.filter((m) => m.sailorId !== action.sailorId);

  const updatedState = {
    ...state,
    sailors: updatedSailors
  };

  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SAILORS:
      return fetchSailors(state, action);
    // case actionTypes.ADD_SAILOR: return addSailor( state, action );
    case actionTypes.REMOVE_SAILOR:
      return removeSailor(state, action);
    default:
      return state;
  }
};

export default reducer;
