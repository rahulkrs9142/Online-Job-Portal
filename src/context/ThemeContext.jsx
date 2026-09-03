import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return "dark";
    }
    return "light";
  });

  const applyThemeToDOM = (selectedTheme) => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (selectedTheme === "dark") {
      root.classList.add("dark");
      body.classList.add("dark");
      root.style.backgroundColor = "#020617";
      body.style.backgroundColor = "#020617";
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.style.backgroundColor = "#ffffff";
      body.style.backgroundColor = "#ffffff";
    }
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      applyThemeToDOM(newTheme);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
