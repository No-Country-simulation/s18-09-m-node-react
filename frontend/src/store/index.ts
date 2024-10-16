import { AppStoreI, UserI } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const appStore = create<AppStoreI>()(
  persist(
    (set) => ({
      isLoaderVisible: false,
      showLoader: () =>
        set(() => ({
          isLoaderVisible: true,
        })),
      hideLoader: () =>
        set(() => ({
          isLoaderVisible: false,
        })),
      user: null,
      setUser: (user: UserI) => set(() => ({ user })),
    }),
    {
      name: "appStore",
      partialize: (state) => ({ user: state.user }), // Solo persiste el estado del usuario.
    }
  )
);
