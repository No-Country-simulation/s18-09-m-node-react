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
  getTechniques: TechniqueI[];
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
  isLoaderVisible: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  user: UserI | null;
  setUser: (user: UserI) => void;
  techniques: TechniqueI[] | null;
  setTechniques: (techniques: TechniqueI[]) => void;
}

export interface TechniqueI {
  name: string;
  description: string;
  focus_time: number;
  break_time: number;
  long_break_time: number;
  cycles_before_long_break: number;
  active_pause: boolean;
  logout: () => void;
}
