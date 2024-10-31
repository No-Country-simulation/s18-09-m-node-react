import { AppStoreI, ModalSettingsI, SessionI, TechniqueI, UserI } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const appStore = create<AppStoreI>()(
  persist(
    (set) => ({
      techniques: null,
      setTechniques: (techniques: TechniqueI[]) =>
        set(() => ({ techniques: techniques })),
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
      logout: () => set(() => ({ user: null })),
      sessions: null,
      setSessions: (sessions: SessionI[]) => set(() => ({ sessions })),
      modalSettings: {
        profileInfo: false,
        configPreferences: false,
        usageHistory: false,
        statsSummary: false,
        statsChars: false,
        export: false,
        notifications: false,
        security: false,
        faq: false,
        tutorialsAndGuides: false,
        supportContact: false
      },
      setModalSettings: (modalSettings: ModalSettingsI) => set(() => ({ modalSettings })),
      resetModalSettings: () => set(() => ({
        modalSettings: {
          profileInfo: false,
          configPreferences: false,
          usageHistory: false,
          statsSummary: false,
          statsChars: false,
          export: false,
          notifications: false,
          security: false,
          faq: false,
          tutorialsAndGuides: false,
          supportContact: false,
        },
      })),
    }),
    {
      name: "appStore",
      partialize: (state) => ({
        user: state.user,
        techniques: state.techniques,
      }), // Solo persiste el estado del usuario y las técnicas.
    }
  )
);
