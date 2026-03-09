import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  onlyAdmin?: boolean;
}

export function ProtectedRoute({ children, onlyAdmin = false }: Props) {
  const { isLogged, esAdmin, loading } = useAuth();

  // Mientras verifica el localStorage, no renderiza nada
  if (loading) return null;

  // No autenticado → login
  if (!isLogged) return <Navigate to="/login" />;

  // Ruta solo para admin y el usuario es alumno
  if (onlyAdmin && !esAdmin) return <Navigate to="/dashboard" />;

  return <>{children}</>;
}