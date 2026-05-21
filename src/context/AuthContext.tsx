import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        const data = await response.json();
        const tokenValue = data.token || "authenticated";
        localStorage.setItem("admin_token", tokenValue);
        setIsAuthenticated(true);
        setToken(tokenValue);
        return true;
      }
      return false;
    } catch {
      // DEV-ONLY fallback: allows local development without Netlify CLI
      if (import.meta.env.DEV) {
        const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (envPassword && password === envPassword) {
          const tokenValue = "authenticated";
          localStorage.setItem("admin_token", tokenValue);
          setIsAuthenticated(true);
          setToken(tokenValue);
          return true;
        }
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
