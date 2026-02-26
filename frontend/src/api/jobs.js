import api from "./axios";

// GET all jobs
export const getJobs = () => {
  return api.get("/api/jobs/");
};

// CREATE job
export const createJob = (data) => {
  return api.post("/api/jobs/", data);
};

export const generateBill = (jobId) => {
  return api.get(`/api/jobs/${jobId}/bill/`);
};

export const updateJob = (id, data) =>
  api.put(`/api/jobs/${id}/`, data);

export const deleteJob = (id) =>
  api.delete(`/api/jobs/${id}/`);