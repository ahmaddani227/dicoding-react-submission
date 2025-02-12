import { create } from "zustand";

type LanguageTypes = {
  language: "en" | "id";
  setLanguage: (language: "en" | "id") => void;
};

export const languageStore = create<LanguageTypes>((set) => ({
  language:
    (localStorage.getItem("language") as LanguageTypes["language"]) || "en",
  setLanguage: (language) => {
    localStorage.setItem("language", language);
    set({ language });
  },
}));
