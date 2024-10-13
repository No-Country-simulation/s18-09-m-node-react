// services Types

export interface QueryProps {
  [key: string]: string;
}

export interface FuntionProps<T> {
  url?: string | number;
  querys?: QueryProps;
  body?: T;
}

// Loader types

export interface LoadStateI {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}




export interface ServiceTypes {
  registerUser: { email: string, password: string }
  loginUser: { email: string, password: string },
  getUserById: string, 
  getWeatherForecast: Record<string,string>,

}