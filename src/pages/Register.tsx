import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  institucion: string;
  nivel: string;
  licenciatura: string;
  semestre: string;
  tipo_inscripcion: string;
}

interface LaravelErrors {
  [field: string]: string[];
}

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    institucion: "",
    nivel: "",
    licenciatura: "",
    semestre: "",
    tipo_inscripcion: "",
  });

  const [errors, setErrors]   = useState<LaravelErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await register({
        ...formData,
        semestre: formData.semestre ? Number(formData.semestre) : null,
      });
      // useAuth redirige a /dashboard automáticamente
    } catch (err) {
      setErrors(err as LaravelErrors);
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (field: string) => errors[field]?.[0];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow py-20 bg-gray-50 flex items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow w-full"
        >
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Registro al EEBB 2026
          </h2>

          {fieldError("general") && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {fieldError("general")}
            </div>
          )}

          {/* ── Datos personales ───────────────────────── */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Datos personales
          </p>

          <div className="mb-4">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {fieldError("name") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("name")}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {fieldError("email") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("email")}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {fieldError("password") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("password")}</p>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>

          {/* ── Datos académicos ───────────────────────── */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Datos académicos
          </p>

          <div className="mb-4">
            <Label htmlFor="institucion">Institución</Label>
            <Input
              id="institucion"
              type="text"
              placeholder="Ej. BUAP, UNAM, IPN..."
              value={formData.institucion}
              onChange={handleChange}
              required
            />
            {fieldError("institucion") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("institucion")}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="nivel">Nivel educativo</Label>
            <select
              id="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002fbb]"
            >
              <option value="">Selecciona un nivel</option>
              <option value="preparatoria">Bachillerato / Preparatoria</option>
              <option value="universidad">Licenciatura / Universidad / Posgrado</option>
            </select>
            {fieldError("nivel") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("nivel")}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="licenciatura">Carrera / Programa</Label>
            <Input
              id="licenciatura"
              type="text"
              placeholder="Ej. Ingeniería en Biotecnología"
              value={formData.licenciatura}
              onChange={handleChange}
              required
            />
            {fieldError("licenciatura") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("licenciatura")}</p>
            )}
          </div>

          {formData.nivel === "universidad" && (
            <div className="mb-4">
              <Label htmlFor="semestre">Semestre</Label>
              <select
                id="semestre"
                value={formData.semestre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002fbb]"
              >
                <option value="">Selecciona tu semestre</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <option key={s} value={s}>{s}° semestre</option>
                ))}
              </select>
              {fieldError("semestre") && (
                <p className="text-red-500 text-xs mt-1">{fieldError("semestre")}</p>
              )}
            </div>
          )}

          <div className="mb-6">
            <Label htmlFor="tipo_inscripcion">Tipo de inscripción</Label>
            <select
              id="tipo_inscripcion"
              value={formData.tipo_inscripcion}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002fbb]"
            >
              <option value="">Selecciona una modalidad</option>
              <option value="asistente">Asistente — $150 prepa / $300 uni</option>
              <option value="participante_activo">Participante Activo — $450</option>
              <option value="experiencia_total">Experiencia Total — $600</option>
            </select>
            {fieldError("tipo_inscripcion") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("tipo_inscripcion")}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mb-4 bg-[#002fbb] hover:bg-[#001f8f]"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>

          <p className="text-center text-gray-600 text-sm">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-[#002fbb] hover:underline">
              Inicia sesión aquí
            </a>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}