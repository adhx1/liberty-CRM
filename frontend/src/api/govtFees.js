import api from "./axios";

export const getGovtFees = () =>
  api.get("/api/govt-fees/");

export const createGovtFee = (data) =>
  api.post("/api/govt-fees/", data);

export const updateGovtFee = (id, data) =>
  api.put(`/api/govt-fees/${id}/`, data);

export const deleteGovtFee = (id) =>
  api.delete(`/api/govt-fees/${id}/`);
