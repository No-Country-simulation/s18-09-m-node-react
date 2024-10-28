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
  resetPassword: { email: string; };
  getUserById: string;
  getTechniques: null;
  getSessions: string;
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
  logout: () => void;
  isLoaderVisible: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  user: UserI | null;
  setUser: (user: UserI) => void;
  techniques: TechniqueI[] | null;
  setTechniques: (techniques: TechniqueI[]) => void;
  sessions: SessionI[] | null;
  setSessions: (sessions: SessionI[]) => void;
  modalSettings: ModalSettingsI,
  setModalSettings: (modalConfig: ModalSettingsI) => void;
  resetModalSettings: () => void
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

export interface StatsDataI {
  start_time: string;
  real_break_count: number;
  real_focus_time: string;
  real_break_time: string;
}

interface BreakTime {
  time: string;
  isLongBreak: boolean;
}

interface ScheduleItem {
  start_working: string;
  break_time: BreakTime;
}

export interface SessionI {
  _id: string;
  user_id: string;
  technique_id: string;
  start_time: string;
  end_time: string;
  expected_total_time: number;
  expected_focus_time: number;
  expected_break_time: number;
  schedule: ScheduleItem[];
  real_focus_time: number;
  real_break_time: number;
  real_break_count: number;
  finished: boolean;
  score: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ModalSettingsI {
  profileInfo: boolean,
  configPreferences: boolean,
  usageHistory: boolean,
  statsSummary: boolean,
  statsChars: boolean,
  export: boolean,
  notifications: boolean,
  security: boolean,
  faq: boolean,
  tutorialsAndGuides: boolean,
  supportContact: boolean
}
