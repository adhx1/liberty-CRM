import api from "./axios";

export const getDashboardData = () =>
  api.get("/api/dashboard/");