import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  User, FileText, Upload, CheckCircle,
  XCircle, Clock, LogOut, Check,
} from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────
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

interface Trabajo {
  id: number;
  tipo_convocatoria: "concurso_carteles" | "feria_innovacion" | "muro_arte";
  tipo_label: string;
  archivo_url: string;
  ruta_archivo: string;
  estado: "pendiente" | "aceptado" | "rechazado";
  comentario_admin: string | null;
  fecha_revision: string | null;
}

// ── Helpers ────────────────────────────────────────────────
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

const TRABAJO_ESTADO_STYLES = {
  pendiente: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", label: "En revisión"  },
  aceptado:  { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  label: "Aceptado ✓"   },
  rechazado: { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    label: "Rechazado"    },
};

const CONVOCATORIAS: {
  tipo: "concurso_carteles" | "feria_innovacion" | "muro_arte";
  label: string;
  descripcion: string;
  accept: string;
  formatLabel: string;
}[] = [
  {
    tipo:        "concurso_carteles",
    label:       "Concurso de Carteles",
    descripcion: "Sube tu resumen en PDF o imagen",
    accept:      ".pdf,.jpg,.jpeg,.png",
    formatLabel: "PDF, JPG, PNG · máx. 10 MB",
  },
  {
    tipo:        "feria_innovacion",
    label:       "Feria de Innovación",
    descripcion: "Sube tu resumen en PDF o imagen",
    accept:      ".pdf,.jpg,.jpeg,.png",
    formatLabel: "PDF, JPG, PNG · máx. 10 MB",
  },
  {
    tipo:        "muro_arte",
    label:       "Muro de Arte",
    descripcion: "Sube un archivo con tu descripción y obra",
    accept:      ".pdf,.jpg,.jpeg,.png",
    formatLabel: "PDF, JPG, PNG · máx. 10 MB",
  },
];

const getFileType = (f: string) => f?.split(".").pop()?.toLowerCase() ?? "";
const isImageFile = (f: string) => ["jpg", "jpeg", "png"].includes(getFileType(f));
const isPdfFile   = (f: string) => getFileType(f) === "pdf";

// ── Componente principal ───────────────────────────────────
export default function Dashboard() {
  const { user, logout, authFetch } = useAuth();

  const [inscripcion, setInscripcion]           = useState<Inscripcion | null>(null);
  const [trabajos, setTrabajos]                 = useState<Trabajo[]>([]);
  const [loadingData, setLoadingData]           = useState(true);
  const [uploading, setUploading]               = useState(false);
  const [uploadError, setUploadError]           = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess]       = useState(false);
  const [uploadingTrabajo, setUploadingTrabajo] = useState<string | null>(null);
  const [trabajoError, setTrabajoError]         = useState<string | null>(null);

  // ── Cargar datos al montar ─────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resInsc, resTrab] = await Promise.all([
          authFetch("/mi-inscripcion"),
          authFetch("/trabajos"),
        ]);
        if (resInsc.ok) setInscripcion(await resInsc.json());
        if (resTrab.ok) setTrabajos(await resTrab.json());
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();

    // Polling cada 10s para detectar cambios del admin
    const interval = setInterval(async () => {
      try {
        const [resInsc, resTrab] = await Promise.all([
          authFetch("/mi-inscripcion"),
          authFetch("/trabajos"),
        ]);
        if (resInsc.ok) setInscripcion(await resInsc.json());
        if (resTrab.ok) setTrabajos(await resTrab.json());
      } catch { /* silencioso */ }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ── Subir comprobante ──────────────────────────────────
  const handleUploadComprobante = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    const form = new FormData();
    form.append("ruta_comprobante", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/mi-inscripcion", {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        body:    form,
      });
      const data = await res.json();
      if (!res.ok) { setUploadError(data.message || "Error al subir el archivo"); return; }
      setInscripcion(data.inscripcion);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch {
      setUploadError("No se pudo conectar con el servidor");
    } finally {
      setUploading(false);
    }
  };

  // ── Subir trabajo ──────────────────────────────────────
  const handleUploadTrabajo = async (
    tipo: "concurso_carteles" | "feria_innovacion" | "muro_arte",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTrabajo(tipo);
    setTrabajoError(null);

    const form = new FormData();
    form.append("tipo_convocatoria", tipo);
    form.append("archivo", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/trabajos", {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        body:    form,
      });
      const data = await res.json();
      if (!res.ok) {
        const backendFieldError = data?.errors?.archivo?.[0];
        setTrabajoError(
          data?.error ||
          data?.message ||
          backendFieldError ||
          "Error al subir el trabajo"
        );
        return;
      }
      setTrabajos((prev) => [...prev.filter((t) => t.tipo_convocatoria !== tipo), data]);
    } catch {
      setTrabajoError("No se pudo conectar con el servidor");
    } finally {
      setUploadingTrabajo(null);
      input.value = "";
    }
  };

  // ── Convocatorias visibles según plan ──────────────────
  const convocatoriasVisibles = () => {
    if (!inscripcion) return [];
    if (inscripcion.tipo === "experiencia_total") return CONVOCATORIAS;
    if (inscripcion.tipo === "participante_activo") {
      // Si ya subió un trabajo, solo muestra esa convocatoria
      if (trabajos.length > 0)
        return CONVOCATORIAS.filter((c) => c.tipo === trabajos[0].tipo_convocatoria);
      // Aún no ha elegido, muestra las 3
      return CONVOCATORIAS;
    }
    return [];
  };

  const puedeSubirTrabajos =
    inscripcion &&
    ["participante_activo", "experiencia_total"].includes(inscripcion.tipo) &&
    inscripcion.estado === "confirmado";

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Panel del Alumno</p>
          <h1
            className="text-lg font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            EEBB 2026
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout}
            className="flex items-center gap-2 text-gray-600 text-sm"
          >
            <LogOut size={15} /> Salir
          </Button>
        </div>
      </nav>

      {/* ── Contenido ─────────────────────────────────────── */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">

        <div className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-900"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Bienvenido, {user?.name.split(" ")[0]}{" "}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Aquí puedes revisar tu inscripción y subir tus documentos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ── Card: Mis datos ──────────────────────────── */}
          <Card className="border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <User size={16} className="text-[#002fbb]" />
                </div>
                <h3 className="font-semibold text-gray-900">Mis datos</h3>
              </div>
              <dl className="space-y-1 text-sm">
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

          {/* ── Card: Mi inscripción ─────────────────────── */}
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
                <p className="text-gray-500 text-sm">Aún no tienes una inscripción registrada.</p>
              ) : (
                <dl className="space-y-1 text-sm">
                  {[
                    { label: "Plan",          value: TIPO_LABEL[inscripcion.tipo] },
                    { label: "Monto",         value: `$${inscripcion.monto.toFixed(2)} MXN` },
                    { label: "Nivel",         value: inscripcion.nivel ?? "—" },
                    { label: "Confirmación",  value: inscripcion.fecha_confirmacion
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

          {/* ── Card: Comprobante ────────────────────────── */}
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

                {/* Vista previa del comprobante actual */}
                {inscripcion.comprobante_url && (
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm font-medium text-blue-900 mb-3">Comprobante subido:</p>
                    <div className="bg-white rounded-lg border border-blue-100 overflow-hidden mb-3">
                      {isImageFile(inscripcion.ruta_comprobante ?? "") ? (
                        <img
                          src={inscripcion.comprobante_url}
                          alt="Comprobante"
                          className="w-full max-h-80 object-contain"
                        />
                      ) : isPdfFile(inscripcion.ruta_comprobante ?? "") ? (
                        <iframe
                          src={`${inscripcion.comprobante_url}#toolbar=0`}
                          title="PDF"
                          className="w-full h-72"
                        />
                      ) : (
                        <div className="flex items-center justify-center py-8">
                          <FileText size={40} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-blue-600">
                      Para reemplazarlo, sube un nuevo archivo en el área de abajo.
                    </p>
                  </div>
                )}

                {/* Rechazado */}
                {inscripcion.estado === "rechazado" && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <XCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 text-sm">Comprobante rechazado</p>
                      <p className="text-red-700 text-xs mt-1">
                        El administrador rechazó tu comprobante. Por favor sube uno nuevo válido.
                      </p>
                    </div>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                    <Check size={16} className="text-green-600" />
                    <p className="text-green-700 text-sm">
                      Comprobante subido. En espera de validación del administrador.
                    </p>
                  </div>
                )}

                {uploadError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {uploadError}
                  </div>
                )}

                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition
                  ${uploading
                    ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                    : "border-gray-300 hover:border-[#002fbb] hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleUploadComprobante}
                    className="hidden"
                    disabled={uploading}
                  />
                  <Upload size={22} className={`mb-2 ${uploading ? "text-gray-300" : "text-gray-400"}`} />
                  <p className={`text-sm font-medium ${uploading ? "text-gray-300" : "text-gray-600"}`}>
                    {uploading
                      ? "Subiendo..."
                      : inscripcion.comprobante_url
                        ? "Reemplazar comprobante"
                        : "Subir comprobante"
                    }
                  </p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG o PNG · máx. 5 MB</p>
                </label>
              </CardContent>
            </Card>
          )}

          {/* ── Card: Inscripción confirmada ─────────────── */}
          {inscripcion?.estado === "confirmado" && (
            <Card className="border-green-200 bg-green-50 md:col-span-2">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 text-lg">¡Inscripción confirmada!</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Tu pago fue validado el{" "}
                    {inscripcion.fecha_confirmacion
                      ? new Date(inscripcion.fecha_confirmacion).toLocaleDateString("es-MX", {
                          year: "numeric", month: "long", day: "numeric",
                        })
                      : "—"}. ¡Nos vemos en el EEBB 2026!{" "}
                    <i className="fa-solid fa-party-horn text-amber-500" aria-hidden="true"></i>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ── Card: Trabajos ───────────────────────────── */}
          {puedeSubirTrabajos && (
            <Card className="border-gray-200 bg-white md:col-span-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText size={16} className="text-[#002fbb]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Mis trabajos</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {inscripcion?.tipo === "participante_activo"
                        ? "Elige una convocatoria y sube tu trabajo"
                        : "Puedes participar en las 3 convocatorias disponibles"
                      }
                    </p>
                  </div>
                </div>

                {trabajoError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                    {trabajoError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {convocatoriasVisibles().map((conv) => {
                    const trabajo     = trabajos.find((t) => t.tipo_convocatoria === conv.tipo);
                    const isUploading = uploadingTrabajo === conv.tipo;
                    const estadoStyle = trabajo ? TRABAJO_ESTADO_STYLES[trabajo.estado] : null;

                    return (
                      <div key={conv.tipo} className="border border-gray-200 rounded-xl p-4 bg-gray-50/50 flex flex-col">

                        {/* Título + descripción */}
                        <p className="font-semibold text-gray-900 text-sm">{conv.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5 mb-3">{conv.descripcion}</p>

                        {/* Badge de estado */}
                        {trabajo && estadoStyle && (
                          <div className={`flex items-center justify-between px-3 py-2 rounded-lg border mb-3 ${estadoStyle.bg} ${estadoStyle.border}`}>
                            <span className={`text-xs font-semibold ${estadoStyle.text}`}>
                              {estadoStyle.label}
                            </span>

                            <a
                              href={trabajo.archivo_url}
                              target="_blank"
                              rel="noreferrer"
                              className={`text-xs underline font-medium ${estadoStyle.text}`}
                            >
                              Ver →
                            </a>
                          </div>
                        )}

                        {/* Comentario del admin si fue rechazado */}
                        {trabajo?.estado === "rechazado" && trabajo.comentario_admin && (
                          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-xs font-semibold text-red-700 mb-1">Motivo del rechazo:</p>
                            <p className="text-xs text-red-600"> {trabajo.comentario_admin}</p>
                          </div>
                        )}

                        {/* Zona de subida */}
                        {(!trabajo || trabajo.estado === "rechazado") && (
                          <>
                            <label className={`flex flex-col items-center justify-center h-20 border-2 border-dashed rounded-xl cursor-pointer transition mt-3
                            ${isUploading
                              ? "border-gray-200 bg-white cursor-not-allowed"
                              : "border-gray-300 hover:border-[#002fbb] hover:bg-blue-50"
                            }`}
                            >
                              <input
                                type="file"
                                accept={conv.accept}
                                onChange={(e) => handleUploadTrabajo(conv.tipo, e)}
                                className="hidden"
                                disabled={!!uploadingTrabajo}
                              />
                              <Upload size={18} className={`mb-1 ${isUploading ? "text-gray-300" : "text-gray-400"}`} />
                              <p className={`text-xs font-medium text-center px-2 ${isUploading ? "text-gray-300" : "text-gray-600"}`}>
                                {isUploading ? "Subiendo..." : trabajo ? "Reemplazar archivo" : "Subir archivo"}
                              </p>
                            </label>
                            <p className="text-[10px] text-gray-400 mt-1 text-center px-2">
                              {conv.formatLabel}
                            </p>
                          </>
                        )}

                        {/* Aceptado */}
                        {trabajo?.estado === "aceptado" && (
                          <p className="text-xs text-center text-gray-400 mt-2 py-2 bg-white rounded-lg border border-gray-100">
                            <i className="fa-solid fa-circle-check text-green-600 mr-1" aria-hidden="true"></i>
                            Trabajo aceptado. Ya no puede modificarse.
                          </p>
                        )}

                        {/* Pendiente: en revisión */}
                        {trabajo?.estado === "pendiente" && (
                          <p className="text-xs text-center text-yellow-600 mt-2">
                            Tu trabajo está siendo revisado por el equipo.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Aviso participante activo que ya eligió */}
                {inscripcion?.tipo === "participante_activo" && trabajos.length > 0 && (
                  <p className="text-xs text-gray-400 mt-4 text-center">
                    Tu plan <strong>Participante Activo</strong> te permite participar en una sola convocatoria.
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* ── Aviso para asistentes ────────────────────── */}
          {inscripcion?.tipo === "asistente" && inscripcion.estado === "confirmado" && (
            <Card className="border-blue-100 bg-blue-50 md:col-span-2">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-[#002fbb]" />
                </div>
                <p className="text-sm text-blue-700">
                  Tu plan <strong>Asistente</strong> incluye acceso al evento pero no participación
                  en convocatorias. Si deseas participar, contacta a la organización para cambiar tu plan.
                </p>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
}