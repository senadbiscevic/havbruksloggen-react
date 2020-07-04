import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/sailor";

function sailorUrl(id) {
  return `${apiEndpoint}/sailor?sailorId=${id}`;
}

export function getSailors() {
  return http.get(apiEndpoint + '/sailors');
}

export function getSailor(sailorId) {
  return http.get(sailorUrl(sailorId));
}

export function saveSailor(sailor) {
  if (sailor.sailorId) {
    const body = { ...sailor };
    delete body._id;
    return http.put(apiEndpoint + "/sailor", body);
  }

  return http.post(apiEndpoint + "/sailor", sailor);
}

export function deleteSailor(sailorId) {
  return http.delete(sailorUrl(sailorId));
}
