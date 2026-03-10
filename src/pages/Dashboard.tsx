import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  User, FileText, Upload, CheckCircle,
  XCircle, Clock, LogOut, Check, Trash2,
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

  // Función para refrescar la inscripción
  const refreshInscripcion = async () => {
    try {
      const res = await authFetch("/mi-inscripcion");
      if (res.status === 404) {
        console.log("📍 No tiene inscripción después del refresco");
        setInscripcion(null);
        return;
      }
      const data = await res.json();
      console.log("🔄 Inscripción refrescada:", {
        id: data.id,
        estado: data.estado,
        comprobante_url: data.comprobante_url,
        ruta_comprobante: data.ruta_comprobante,
      });
      setInscripcion(data);
    } catch (error) {
      console.error(" Error al refrescar inscripción:", error);
    }
  };

  useEffect(() => {
    const fetchInscripcion = async () => {
      try {
        const res = await authFetch("/mi-inscripcion");
        if (res.status === 404) {
          console.log("📍 No tiene inscripción");
          setInscripcion(null);
          return;
        }
        const data = await res.json();
        console.log("Inscripción cargada:", {
          id: data.id,
          estado: data.estado,
          tipo: data.tipo,
          monto: data.monto,
          comprobante_url: data.comprobante_url,
        });
        setInscripcion(data);
      } catch (error) {
        console.error(" Error al cargar inscripción:", error);
        setInscripcion(null);
      } finally {
        setLoadingData(false);
      }
    };
    fetchInscripcion();
    
    // Refrescar inscripción cada 5 segundos para detectar cambios de admin
    const interval = setInterval(refreshInscripcion, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("⚠️ No file selected");
      return;
    }

    console.log("📁 File selected:", {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString(),
    });

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const form = new FormData();
    form.append("ruta_comprobante", file);

    // Verificar que el FormData tiene el archivo
    console.log("📋 FormData creado - verificación:");
    console.log("  - instanceof FormData:", form instanceof FormData);
    console.log("  - tiene 'ruta_comprobante':", form.has("ruta_comprobante"));
    
    // Mostrar el archivo en el FormData
    const entries = Array.from(form.entries());
    console.log("  - entries en FormData:", entries.map(([key, val]) => ({
      key,
      value: val instanceof File ? `File(${val.name}, ${val.size} bytes)` : val
    })));

    console.log("📤 Enviando archivo al servidor...");

    try {
      const res = await authFetch("/mi-inscripcion", {
        method: "POST",
        body: form,
      });

      console.log("Respuesta del servidor:", {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
      });

      const data = await res.json();

      console.log("Datos recibidos:", data);

      if (!res.ok) {
        console.error(" Error en respuesta:", data.message || "Error al subir el archivo");
        setUploadError(data.message || "Error al subir el archivo");
        return;
      }

      console.log("🎉 Inscripción actualizada con comprobante_url:", data.inscripcion?.comprobante_url);
      console.log("   - ruta_comprobante:", data.inscripcion?.ruta_comprobante);
      console.log("   - estado:", data.inscripcion?.estado);
      
      setInscripcion(data.inscripcion);
      setUploadSuccess(true);

      // Refrescar después de 1 segundo para asegurar que cualquier cambio de admin se vea
      setTimeout(() => {
        refreshInscripcion();
      }, 1000);

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("💥 Error en handleUpload:", error);
      setUploadError("Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  };

  const getFileType = (filename: string): string => {
    if (!filename) return "";
    const ext = filename.split(".").pop()?.toLowerCase();
    return ext || "";
  };

  const isImageFile = (filename: string): boolean => {
    const ext = getFileType(filename);
    return ["jpg", "jpeg", "png"].includes(ext);
  };

  const isPdfFile = (filename: string): boolean => {
    return getFileType(filename) === "pdf";
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
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-900">Comprobante subido:</span>
                    </div>

                    {/* Vista previa */}
                    <div className="mb-3 p-3 bg-white rounded-lg border border-blue-100 min-h-64">
                      {isImageFile(inscripcion.ruta_comprobante || "") ? (
                        <div className="flex flex-col items-center gap-3">
                          <img
                            style={{ maxHeight: "400px" }}
                            src={inscripcion.comprobante_url}
                            alt="Comprobante"
                            className="max-w-full max-h-96 rounded object-contain"
                          />
              
                        </div>
                      ) : isPdfFile(inscripcion.ruta_comprobante || "") ? (
                        <div className="flex flex-col items-center gap-3 h-full justify-center">
                          <iframe
                            src={`${inscripcion.comprobante_url}#toolbar=0`}
                            title="PDF Preview"
                            className="w-full h-96 rounded border border-gray-200"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 py-8 justify-center">
                          <FileText size={48} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-blue-600">
                      Si deseas reemplazar este comprobante, haz click en el área de abajo para subir uno nuevo. El anterior será eliminado automáticamente al subir el nuevo archivo.
                    </p>
                  </div>
                )}

                {/* Rechazado */}
                {inscripcion.estado === "rechazado" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900">Comprobante rechazado</h4>
                        <p className="text-sm text-red-700 mt-1">
                          El administrador ha rechazado tu comprobante porque no cumple los requisitos. 
                          Por favor revisa que sea un comprobante válido de transferencia o depósito.
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-red-600 font-medium">
                      🔄 Sube un nuevo comprobante a continuación para reenviar tu inscripción a validación.
                    </p>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-900 text-sm">
                          {inscripcion.estado === "pendiente" 
                            ? "✅ Comprobante re-enviado a validación"
                            : "✅ Comprobante subido correctamente"
                          }
                        </p>
                        <p className="text-xs text-green-700 mt-1">
                          {inscripcion.estado === "pendiente"
                            ? "Tu comprobante ha sido reenviado al administrador. Te notificaremos cuando sea validado."
                            : "En espera de validación del administrador."
                          }
                        </p>
                      </div>
                    </div>
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
                      : inscripcion.estado === "rechazado"
                        ? "Haz clic para subir un nuevo comprobante"
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