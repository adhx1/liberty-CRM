import api from "./axios";

export const getPayments = () =>
  api.get("/api/payments/");

export const createPayment = (data) =>
  api.post("/api/payments/", data);

export const updatePayment = (id, data) =>
  api.put(`/api/payments/${id}/`, data);

export const deletePayment = (id) =>
  api.delete(`/api/payments/${id}/`);