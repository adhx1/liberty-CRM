import api from "./axios";

export const getExpenses = () =>
  api.get("/api/expenses/");

export const createExpense = (data) =>
  api.post("/api/expenses/", data);

export const updateExpense = (id, data) =>
  api.put(`/api/expenses/${id}/`, data);

export const deleteExpense = (id) =>
  api.delete(`/api/expenses/${id}/`);
