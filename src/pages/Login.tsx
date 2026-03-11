import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { translateError } from "../utils/errorTranslations";

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      // useAuth redirige a /dashboard o /admin automáticamente
    } catch (err) {
      setError(translateError((err as Error).message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow py-20 bg-gray-50 flex items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow w-full"
        >
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Iniciar Sesión
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mb-4 bg-[#002fbb] hover:bg-[#001f8f]"
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>

          <p className="text-center text-gray-600 text-sm">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#002fbb] hover:underline">
              Regístrate aquí
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}