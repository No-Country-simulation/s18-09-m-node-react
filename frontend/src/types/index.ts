// services Types

export interface QueryProps {
  [key: string]: string;
}

export interface FuntionProps<T> {
  url?: string | number;
  querys?: QueryProps;
  body?: T;
}

export interface ServiceTypes {
  registerUser: { email: string; password: string };
  loginUser: { email: string; password: string };
  getUserById: string;
  getWeatherForecast: Record<string, string>;
}

export interface UserI {
  userData: {
    _id: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
}

export interface AppStoreI {
  user: UserI | null;
  setUser: (user: UserI) => void;
}
