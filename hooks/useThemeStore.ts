import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeState = {
  theme: "light" | "dark" | "system";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
};

// Set up persist with createJSONStorage wrapper for AsyncStorage
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
      },
      setTheme: (theme) => {
        set({ theme: theme === "system" ? "light" : theme });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      // optional: before hydration callback
      // onRehydrateStorage: () => (state, error) => { /* handle if needed */ },
    }
  )
);