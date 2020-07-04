import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/boat";

function boatUrl(id) {
  return `${apiEndpoint}/boat?boatId=${id}`;
}

export function getBoats() {
  return http.get(apiEndpoint + '/boats');
}

export function getBoat(boatId) {
  return http.get(boatUrl(boatId));
}

export function saveBoat(boat) {
  if (boat.boatId) {
    const body = { ...boat };
    return http.put(apiEndpoint + "/boat", body);
  }

  return http.post(apiEndpoint + "/boat", boat);
}

export function deleteBoat(boatId) {
  return http.delete(boatUrl(boatId));
}
