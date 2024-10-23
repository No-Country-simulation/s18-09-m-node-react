import { QueryProps } from "@/types";
import api from "./api";
import createQuerys from "@/utils/createQuerys";

// User services
const registerUser = async <T>(body: T) =>
  await api.post("/auth/register", body);

const loginUser = async <T>(body: T) => await api.post("/auth/login", body);

const getUserById = async <T>(url: T) => await api.get(`/data/${url}`);

// const getTechniques = async () => await api.get(`/techniques`);

const getTechniques = async () => await api.get("/techniques");

const getSessions = async <T>(url: T) => await api.get(`/sessions/${url}`);

// Clima services

const getWeatherForecast = async <T>(querys: T) =>
  await api.get(`/clima/forescast?${createQuerys(querys as QueryProps)}`);

// Default export
const services = {
  registerUser,
  loginUser,
  getUserById,
  getWeatherForecast,
  getTechniques,
  getSessions,
};

export default services;
