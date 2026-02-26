import api from "./axios";

// GET all customers
export const getCustomers = () => {
  return api.get("/api/customers/");
};

// POST new customer
export const createCustomer = (data) => {
  return api.post("/api/customers/", data);
};

export const updateCustomer = (id, data) =>
  api.put(`/api/customers/${id}/`, data);

export const deleteCustomer = (id) =>
  api.delete(`/api/customers/${id}/`);