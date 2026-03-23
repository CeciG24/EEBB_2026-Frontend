import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Tipos que coinciden con el modelo User de Laravel
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  institucion: string;
  nivel: string;
  licenciatura: string;
  semestre: number | null;
  tipo_inscripcion: string;
  rol: "admin" | "alumno";
  created_at: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  institucion: string;
  nivel: string;
  licenciatura: string;
  semestre?: number | null;
  tipo_inscripcion: string;
}

export function useAuth() {
  const navigate = useNavigate();

  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // true al inicio para verificar sesión

  const rawApi = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").trim();
  const withProtocol = /^https?:\/\//i.test(rawApi) ? rawApi : `https://${rawApi}`;
  const baseApi = withProtocol.replace(/\/$/, "");
  const API = /\/api$/i.test(baseApi) ? baseApi : `${baseApi}/api`;

  // ── Leer usuario guardado al montar ──────────────────────
  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token  = localStorage.getItem("token");

    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);
//Nota: el bloque comentado es el mismo que el actual, pero con un mock temporal para desarrollo sin backend. Se deja aquí para referencia, pero se recomienda usar el bloque activo para evitar confusiones y asegurar que la autenticación funcione correctamente una vez que el backend esté listo.
/*useEffect(() => {
  const stored = localStorage.getItem("user");
  const token  = localStorage.getItem("token");

  if (stored && token) {
    setUser(JSON.parse(stored));
  } else {
    // ── MOCK TEMPORAL — borrar cuando el backend esté listo ──
    setUser({
      id: 1,
      name: "Juan Pérez García",
      email: "juan@buap.mx",
      institucion: "BUAP",
      nivel: "licenciatura",
      licenciatura: "Ingeniería en Biotecnología",
      semestre: 6,
      tipo_inscripcion: "participante_activo",
      rol: "admin",
      created_at: "2026-01-01T00:00:00.000Z",
    });
    // ── FIN MOCK ─────────────────────────────────────────────
  }
  setLoading(false);
}, []);*/

  // ── Helper: fetch con token automático ───────────────────
  const authFetch = (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    
    // Detectar si estamos enviando FormData
    const isFormData = options.body instanceof FormData;
    
    return fetch(`${API}${endpoint}`, {
      ...options,
      headers: {
        // Si es FormData, NO establecer Content-Type (el navegador lo hace automáticamente)
        // Si es otro tipo, usar application/json
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        "Accept": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  };

  // ── Login ─────────────────────────────────────────────────
  const login = async (data: LoginData) => {
    const res = await authFetch("/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Credenciales incorrectas");
    }

    localStorage.setItem("token", json.token);
    localStorage.setItem("user", JSON.stringify(json.user));
    setUser(json.user);

    // Redirigir según rol
    json.user.rol === "admin" ? navigate("/admin") : navigate("/dashboard");
  };

  // ── Register ──────────────────────────────────────────────
  const register = async (data: RegisterData) => {
    const res = await authFetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      // Lanza los errores de validación de Laravel (422)
      // para que el form los maneje campo por campo
      throw json.errors ?? { general: [json.message] };
    }

    localStorage.setItem("token", json.token);
    localStorage.setItem("user", JSON.stringify(json.user));
    setUser(json.user);
    json.user.rol === "admin" ? navigate("/admin") : navigate("/dashboard");
  };

  // ── Logout ────────────────────────────────────────────────
  const logout = async () => {
    try {
      await authFetch("/logout", { method: "POST" });
    } finally {
      // Limpiar siempre, aunque falle la petición
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    }
  };

  // ── Refrescar datos del usuario desde la API ──────────────
  const refreshUser = async () => {
    try {
      const res  = await authFetch("/user");
      const json = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        setUser(json);
      }
    } catch {
      // Si falla (token expirado), cerramos sesión
      logout();
    }
  };

  // ── Helpers de rol ────────────────────────────────────────
  const esAdmin  = user?.rol === "admin";
  const esAlumno = user?.rol === "alumno";
  const isLogged = !!user;

  return {
    user,
    loading,
    isLogged,
    esAdmin,
    esAlumno,
    login,
    register,
    logout,
    refreshUser,
    authFetch, // lo exportamos para usarlo en otros servicios
  };
}