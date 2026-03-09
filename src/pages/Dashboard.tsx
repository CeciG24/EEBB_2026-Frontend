import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  User, FileText, Upload, CheckCircle,
  XCircle, Clock, LogOut,
} from "lucide-react";

interface Inscripcion {
  id: number;
  tipo: string;
  tipo_label: string;
  nivel: string | null;
  monto: number;
  estado: "pendiente" | "confirmado" | "rechazado";
  estado_badge: { label: string; color: string };
  ruta_comprobante: string | null;
  comprobante_url: string | null;
  fecha_confirmacion: string | null;
  validador: { id: number; name: string } | null;
}

const TIPO_LABEL: Record<string, string> = {
  asistente:           "Asistente",
  participante_activo: "Participante Activo",
  experiencia_total:   "Experiencia Total",
};

const ESTADO_STYLES = {
  pendiente:  { icon: <Clock size={14} />,       bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  confirmado: { icon: <CheckCircle size={14} />, bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200"  },
  rechazado:  { icon: <XCircle size={14} />,     bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200"    },
};

export default function Dashboard() {
  const { user, logout, authFetch } = useAuth();

  const [inscripcion, setInscripcion]     = useState<Inscripcion | null>(null);
  const [loadingData, setLoadingData]     = useState(true);
  const [uploading, setUploading]         = useState(false);
  const [uploadError, setUploadError]     = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchInscripcion = async () => {
      try {
        const res = await authFetch("/inscripciones");
        if (res.status === 404) {
          setInscripcion(null);
          return;
        }
        const data = await res.json();
        setInscripcion(data);
      } catch {
        setInscripcion(null);
      } finally {
        setLoadingData(false);
      }
    };
    fetchInscripcion();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const form = new FormData();
    form.append("comprobante", file);

    try {
      const token = localStorage.getItem("token");
      const res   = await fetch("http://localhost:8000/api/inscripciones/comprobante", {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        body:    form,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.message || "Error al subir el archivo");
        return;
      }

      setInscripcion((prev) =>
        prev ? { ...prev, comprobante_url: data.comprobante_url, estado: "pendiente" } : prev
      );
      setUploadSuccess(true);
    } catch (error) {
      setUploadError("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Navbar propia del dashboard ─────────────────── */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">
            Panel del Alumno
          </p>
          <h1
            className="text-lg font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            EEBB 2026
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2 text-gray-600 text-sm"
          >
            <LogOut size={15} />
            Salir
          </Button>
        </div>
      </nav>

      {/* ── Contenido ───────────────────────────────────── */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10 pt-16 pb-8">

        <div className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Bienvenido, {user?.name.split(" ")[0]}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Aquí puedes revisar tu inscripción y subir tu comprobante de pago.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Card: Mis datos ────────────────────────── */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User size={16} className="text-[#002fbb]" />
                </div>
                <h3 className="font-semibold text-gray-900">Mis datos</h3>
              </div>

              <dl className="space-y-3 text-sm">
                {[
                  { label: "Institución", value: user?.institucion },
                  { label: "Nivel",       value: user?.nivel },
                  { label: "Carrera",     value: user?.licenciatura },
                  { label: "Semestre",    value: user?.semestre ? `${user.semestre}°` : "—" },
                  { label: "Modalidad",   value: TIPO_LABEL[user?.tipo_inscripcion ?? ""] ?? "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-gray-50">
                    <dt className="text-gray-400">{label}</dt>
                    <dd className="text-gray-900 font-medium text-right max-w-[60%]">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          {/* ── Card: Mi inscripción ───────────────────── */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText size={16} className="text-[#002fbb]" />
                </div>
                <h3 className="font-semibold text-gray-900">Mi inscripción</h3>
              </div>

              {loadingData ? (
                <p className="text-gray-400 text-sm">Cargando...</p>
              ) : !inscripcion ? (
                <p className="text-gray-500 text-sm">
                  Aún no tienes una inscripción registrada.
                </p>
              ) : (
                <dl className="space-y-3 text-sm">
                  {[
                    { label: "Plan",   value: TIPO_LABEL[inscripcion.tipo] },
                    { label: "Monto",  value: `$${inscripcion.monto.toFixed(2)} MXN` },
                    { label: "Nivel",  value: inscripcion.nivel ?? "—" },
                    { label: "Fecha confirmación",  value: inscripcion.fecha_confirmacion
                        ? new Date(inscripcion.fecha_confirmacion).toLocaleDateString("es-MX")
                        : "—"
                    },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-1.5 border-b border-gray-50">
                      <dt className="text-gray-400">{label}</dt>
                      <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                  ))}

                  {/* Badge estado */}
                  <div className="flex justify-between items-center pt-2">
                    <dt className="text-gray-400">Estado</dt>
                    <dd>
                      {(() => {
                        const s = ESTADO_STYLES[inscripcion.estado];
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
                            {s.icon}
                            {inscripcion.estado.charAt(0).toUpperCase() + inscripcion.estado.slice(1)}
                          </span>
                        );
                      })()}
                    </dd>
                  </div>
                </dl>
              )}
            </CardContent>
          </Card>

          {/* ── Card: Comprobante (ancho completo) ────────── */}
          {inscripcion && inscripcion.estado !== "confirmado" && (
            <Card className="border-gray-200 bg-white md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Upload size={16} className="text-[#002fbb]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Comprobante de pago</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Sube tu comprobante de transferencia o depósito para confirmar tu inscripción
                    </p>
                  </div>
                </div>

                {/* Ya tiene comprobante */}
                {inscripcion.comprobante_url && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 flex items-center justify-between">
                    <span>Ya tienes un comprobante subido.</span>
                    <a
                      href={inscripcion.comprobante_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline font-medium ml-2 hover:text-blue-900"
                    >
                      Ver archivo →
                    </a>
                  </div>
                )}

                {/* Rechazado */}
                {inscripcion.estado === "rechazado" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    ❌ Tu comprobante fue rechazado. Por favor sube uno nuevo.
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                    ✅ Comprobante subido correctamente. En espera de validación del administrador.
                  </div>
                )}

                {uploadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {uploadError}
                  </div>
                )}

                {/* Zona de subida */}
                <label className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition
                  ${uploading
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                    : "border-gray-300 hover:border-[#002fbb] hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Upload
                    size={24}
                    className={`mb-2 ${uploading ? "text-gray-300" : "text-gray-400"}`}
                  />
                  <p className={`text-sm font-medium ${uploading ? "text-gray-300" : "text-gray-600"}`}>
                    {uploading
                      ? "Subiendo archivo..."
                      : inscripcion.comprobante_url
                        ? "Haz clic para reemplazar el comprobante"
                        : "Haz clic para subir tu comprobante"
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG o PNG · máx. 5 MB</p>
                </label>

              </CardContent>
            </Card>
          )}

          {/* ── Card: Confirmado ──────────────────────────── */}
          {inscripcion?.estado === "confirmado" && (
            <Card className="border-green-200 bg-green-50 md:col-span-2">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">
                    ¡Inscripción confirmada!
                  </h3>
                  <p className="text-green-700 text-sm mt-1">
                    Tu pago fue validado el{" "}
                    {inscripcion.fecha_confirmacion
                      ? new Date(inscripcion.fecha_confirmacion).toLocaleDateString("es-MX", {
                          year: "numeric", month: "long", day: "numeric",
                        })
                      : "—"
                    }. ¡Nos vemos en el EEBB 2026! 🎉
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
}