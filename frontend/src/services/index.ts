// import { QueryProps } from "@/types";
import api from "./api";
// import createQuerys from "@/utils/createQuerys";

// User services
const registerUser = async <T>(body: T) =>
  await api.post("/auth/register", body);

const loginUser = async <T>(body: T) => await api.post("/auth/login", body);

const resetPassword = async <T>(body: T) => await api.post("/auth/forgetpassword", body);

const getUserById = async <T>(url: T) => await api.get(`/data/${url}`);

const getTechniques = async () => await api.get("/techniques");

const getSessions = async <T>(url: T) => await api.get(`/sessions/${url}`);

const createSession = async <T>(body: T) => await api.post("/sessions/register", body);

// Default export
const services = {
  registerUser,
  loginUser,
  getUserById,
  getTechniques,
  getSessions,
  resetPassword,
  createSession
};

export default services;
