import * as actionTypes from "./actionTypes";
import { getSailors, saveSailor, deleteSailor } from "../../services/sailorService";

export const setSailors = (sailors) => {
  return {
    type: actionTypes.FETCH_SAILORS,
    sailors: sailors,
  };
};

export const AddSailor = (sailor) => {
    saveSailor(sailor);
  return {
    type: actionTypes.ADD_SAILOR,
    sailor: sailor,
  };
};

export const removeSailor = (sailorId) => {
    deleteSailor(sailorId);
  return {
    type: actionTypes.REMOVE_SAILOR,
    sailorId: sailorId,
  };
};

export const updateSailor = (sailor) => {
    saveSailor(sailor);
  return {
    type: actionTypes.UPDATE_SAILOR,
    sailor: sailor,
  };
};

export const fetchSailors = () => {
  return (dispatch) => {
    getSailors().then((response) => {
      dispatch(setSailors(response.data.model));
    });
  };
};
