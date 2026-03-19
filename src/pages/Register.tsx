import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { translateError } from "../utils/errorTranslations";

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

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  // Traducir el error si existe
  const translatedError = error ? translateError(error) : undefined;
  
  return (
    <div className="mb-4">
      <Label htmlFor={id} className={translatedError ? "text-red-600" : ""}>
        {label}
      </Label>
      <div className={`mt-1 rounded-md ${translatedError ? "ring-2 ring-red-400" : ""}`}>
        {children}
      </div>
      {translatedError && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
          <AlertCircle size={12} /> {translatedError}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  const { register } = useAuth();

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
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
      // useAuth redirige a /dashboard automáticamente
    } catch (err) {
      setErrors(err as LaravelErrors);
      setTimeout(() => {
        document.querySelector(".ring-red-400")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const fe = (field: string) => errors[field]?.[0];
  const hasErrors = Object.values(errors).some((e) => e.length > 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow py-20 bg-gray-50 flex items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow w-full"
        >
          <h2
            className="text-2xl font-bold mb-2 text-center"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Registro al EEBB 2026
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Completa todos los campos para inscribirte
          </p>

          {/* ── Banner error general ───────────────────── */}
          {hasErrors && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-700 text-sm font-semibold">
                  No se pudo completar el registro
                </p>
                <p className="text-red-600 text-xs mt-0.5">
                  Revisa los campos marcados en rojo y vuelve a intentarlo.
                </p>
                {fe("general") && (
                  <p className="text-red-600 text-xs mt-1">{translateError(fe("general")!)}</p>
                )}
              </div>
            </div>
          )}

          {/* ── Banner éxito ───────────────────────────── */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-sm font-semibold">
                ¡Registro exitoso! Redirigiendo...
              </p>
            </div>
          )}

          {/* ══ Datos personales ══════════════════════════ */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Datos personales
          </p>

          <Field id="name" label="Nombre completo" error={fe("name")}>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className={fe("name") ? "border-red-300 focus:ring-red-400" : ""}
            />
          </Field>

          <Field id="email" label="Correo electrónico" error={fe("email")}>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={fe("email") ? "border-red-300 focus:ring-red-400" : ""}
            />
          </Field>

          <Field id="password" label="Contraseña" error={fe("password")}>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={fe("password") ? "border-red-300 focus:ring-red-400" : ""}
            />
          </Field>

          <Field
            id="password_confirmation"
            label="Confirmar contraseña"
            error={fe("password_confirmation")}
          >
            <Input
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              className={
                fe("password_confirmation") ? "border-red-300 focus:ring-red-400" : ""
              }
            />
          </Field>

          {/* ══ Datos académicos ══════════════════════════ */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 mt-2">
            Datos académicos
          </p>

          <Field id="institucion" label="Institución" error={fe("institucion")}>
            <Input
              id="institucion"
              type="text"
              placeholder="Ej. BUAP, UNAM, IPN..."
              value={formData.institucion}
              onChange={handleChange}
              required
              className={fe("institucion") ? "border-red-300 focus:ring-red-400" : ""}
            />
          </Field>

          <Field id="nivel" label="Nivel educativo" error={fe("nivel")}>
            <select
              id="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${fe("nivel")
                  ? "border-red-300 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#002fbb]"
                }`}
            >
              <option value="">Selecciona un nivel</option>
              <option value="preparatoria">Bachillerato / Preparatoria</option>
              <option value="universidad">Universidad / Licenciatura</option>
            </select>
          </Field>

          <Field id="licenciatura" label="Carrera / Programa" error={fe("licenciatura")}>
            <Input
              id="licenciatura"
              type="text"
              placeholder="Ej. Ingeniería en Biotecnología"
              value={formData.licenciatura}
              onChange={handleChange}
              required
              className={fe("licenciatura") ? "border-red-300 focus:ring-red-400" : ""}
            />
          </Field>

          {/* Semestre solo aparece si eligió universidad */}
          {formData.nivel === "universidad" && (
            <Field id="semestre" label="Semestre" error={fe("semestre")}>
              <select
                id="semestre"
                value={formData.semestre}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${fe("semestre")
                    ? "border-red-300 focus:ring-red-400"
                    : "border-gray-300 focus:ring-[#002fbb]"
                  }`}
              >
                <option value="">Selecciona tu semestre</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <option key={s} value={s}>
                    {s}° semestre
                  </option>
                ))}
              </select>
            </Field>
          )}

          <Field
            id="tipo_inscripcion"
            label="Tipo de inscripción"
            error={fe("tipo_inscripcion")}
          >
            <select
              id="tipo_inscripcion"
              value={formData.tipo_inscripcion}
              onChange={handleChange}
              required
              className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2
                ${fe("tipo_inscripcion")
                  ? "border-red-300 focus:ring-red-400"
                  : "border-gray-300 focus:ring-[#002fbb]"
                }`}
            >
              <option value="">Selecciona una modalidad</option>
              <option value="asistente">
                Asistente — $150 prepa / $300 uni
              </option>
              <option value="participante_activo">
                Participante Activo — $450
              </option>
              <option value="experiencia_total">
                Experiencia Total — $600
              </option>
              <option value="admin">
                Admin
              </option>
            </select>
          </Field>

          <Button
            type="submit"
            disabled={loading || success}
            className="w-full mb-4 bg-[#002fbb] hover:bg-[#001f8f] mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Registrando...
              </span>
            ) : (
              "Registrarse"
            )}
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