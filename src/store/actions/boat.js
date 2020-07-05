import * as actionTypes from "./actionTypes";
import { getBoats, saveBoat, deleteBoat } from "../../services/boatService";

export const setBoats = (boats) => {
  return {
    type: actionTypes.FETCH_BOATS,
    boats: boats,
  };
};

export const AddBoat = (boat) => {
    saveBoat(boat);
  return {
    type: actionTypes.ADD_BOAT,
    boat: boat,
  };
};

export const removeBoat = (boatId) => {
  deleteBoat(boatId);
  return {
    type: actionTypes.REMOVE_BOAT,
    boatId: boatId,
  };
};

export const updateBoat = (boat) => {
    saveBoat(boat);
  return {
    type: actionTypes.UPDATE_BOAT,
    boat: boat,
  };
};

export const fetchBoats = () => {
  return (dispatch) => {
    getBoats().then((response) => {
      dispatch(setBoats(response.data.model));
    });
  };
};
