import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Eye,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────
interface Alumno {
  id: number;
  name: string;
  email: string;
  institucion: string;
  nivel: string;
  licenciatura: string;
  semestre: number | null;
}

interface Inscripcion {
  id: number;
  tipo: string;
  nivel: string | null;
  monto: number;
  estado: "pendiente" | "confirmado" | "rechazado";
  ruta_comprobante: string | null;
  comprobante_url: string | null;
  fecha_confirmacion: string | null;
  created_at: string;
  alumno: Alumno;
  validador: { id: number; name: string } | null;
}

interface Estadisticas {
  total: number;
  pendientes: number;
  confirmados: number;
  rechazados: number;
  recaudado: number;
  por_tipo: { tipo: string; total: number }[];
}

interface Paginacion {
  data: Inscripcion[];
  current_page: number;
  last_page: number;
  total: number;
}

// ── Helpers ────────────────────────────────────────────────
const TIPO_LABEL: Record<string, string> = {
  asistente:           "Asistente",
  participante_activo: "Participante Activo",
  experiencia_total:   "Experiencia Total",
};

const ESTADO_STYLES: Record<string, { icon: React.ReactNode; bg: string; text: string; border: string }> = {
  pendiente:  { icon: <Clock size={12} />,       bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  confirmado: { icon: <CheckCircle size={12} />, bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200"  },
  rechazado:  { icon: <XCircle size={12} />,     bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200"    },
};

// ── Helpers para vista previa de archivos ──────────────────
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

// ── Componente principal ───────────────────────────────────
export default function Admin() {
  const { user, logout, authFetch } = useAuth();

  const [stats, setStats]                   = useState<Estadisticas | null>(null);
  const [paginacion, setPaginacion]         = useState<Paginacion | null>(null);
  const [filtroEstado, setFiltroEstado]     = useState<string>("");
  const [filtroTipo, setFiltroTipo]         = useState<string>("");
  const [pagina, setPagina]                 = useState(1);
  const [loadingData, setLoadingData]       = useState(true);
  const [selected, setSelected]             = useState<Inscripcion | null>(null);
  const [updatingId, setUpdatingId]         = useState<number | null>(null);

  // ── Cargar estadísticas ────────────────────────────────
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res  = await authFetch("/admin/inscripciones/estadisticas");
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          console.error("Error fetching stats:", res.status, data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // ── Cargar inscripciones con filtros ───────────────────
  useEffect(() => {
    const fetchInscripciones = async () => {
      setLoadingData(true);
      try {
        const params = new URLSearchParams();
        if (filtroEstado) params.set("estado", filtroEstado);
        if (filtroTipo)   params.set("tipo",   filtroTipo);
        params.set("page", String(pagina));

        const res  = await authFetch(`/admin/inscripciones?${params}`);
        const data = await res.json();
        
        if (res.ok) {
          setPaginacion(data);
        } else {
          console.error("Error fetching inscripciones:", res.status, data);
          setPaginacion(null);
        }
      } catch (error) {
        console.error("Error fetching inscripciones:", error);
        setPaginacion(null);
      } finally {
        setLoadingData(false);
      }
    };
    fetchInscripciones();
  }, [filtroEstado, filtroTipo, pagina]);

  // ── Cambiar estado de una inscripción ──────────────────
  const cambiarEstado = async (id: number, estado: "confirmado" | "rechazado") => {
    console.log("Cambiando estado de inscripción:", { id, nuevo_estado: estado });
    setUpdatingId(id);
    try {
      const res  = await authFetch(`/admin/inscripciones/${id}/estado`, {
        method: "PATCH",
        body:   JSON.stringify({ estado }),
      });
      const data = await res.json();

      console.log("Respuesta del servidor:", {
        ok: res.ok,
        status: res.status,
        message: data.message,
        inscripcion_estado: data.inscripcion?.estado,
      });

      if (!res.ok) {
        console.error("Error cambiando estado:", data.message || data.error);
        return;
      }

      console.log("Estado cambiado exitosamente:", {
        id: data.inscripcion?.id,
        estado_anterior: paginacion?.data.find((i) => i.id === id)?.estado,
        estado_nuevo: data.inscripcion?.estado,
      });

      // Actualizar lista y detalle sin recargar
      setPaginacion((prev) =>
        prev
          ? {
              ...prev,
              data: prev.data.map((i) =>
                i.id === id ? { ...i, ...data.inscripcion } : i
              ),
            }
          : prev
      );
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, ...data.inscripcion } : prev);

      // Actualizar stats localmente
      setStats((prev) => {
        if (!prev) return prev;
        const estadoAnterior = paginacion?.data.find((i) => i.id === id)?.estado;
        return {
          ...prev,
          pendientes:  prev.pendientes  - (estadoAnterior === "pendiente"  ? 1 : 0),
          confirmados: prev.confirmados + (estado === "confirmado" ? 1 : 0) - (estadoAnterior === "confirmado" ? 1 : 0),
          rechazados:  prev.rechazados  + (estado === "rechazado"  ? 1 : 0) - (estadoAnterior === "rechazado"  ? 1 : 0),
        };
      });
    } catch (error) {
      console.error("Error cambiando estado:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── Navbar del admin (reemplaza el Header público) ── */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Panel de Administración</p>
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

      {/* ── Contenido principal ─────────────────────────── */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-16 pb-10">

        {/* ── Estadísticas ──────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total inscritos", value: stats?.total       ?? "—", icon: <Users size={20} />,       color: "text-[#002fbb]",  bg: "bg-blue-50"   },
            { label: "Pendientes",      value: stats?.pendientes  ?? "—", icon: <Clock size={20} />,        color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Confirmados",     value: stats?.confirmados ?? "—", icon: <CheckCircle size={20} />, color: "text-green-600",  bg: "bg-green-50"  },
            {
              label: "Recaudado",
              value: stats ? `$${stats.recaudado.toLocaleString("es-MX")}` : "—",
              icon: <DollarSign size={20} />,
              color: "text-[#a0c519]",
              bg: "bg-lime-50",
            },
          ].map(({ label, value, icon, color, bg }) => (
            <Card key={label} className="border-gray-200 bg-white">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                  <span className={color}>{icon}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-0.5">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Filtros ────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <p className="text-sm font-semibold text-gray-700 mr-2">Filtrar por:</p>
          <select
            value={filtroEstado}
            onChange={(e) => { setFiltroEstado(e.target.value); setPagina(1); }}
            className="border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002fbb]"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="rechazado">Rechazado</option>
          </select>

          <select
            value={filtroTipo}
            onChange={(e) => { setFiltroTipo(e.target.value); setPagina(1); }}
            className="border border-gray-300 bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002fbb]"
          >
            <option value="">Todos los planes</option>
            <option value="asistente">Asistente</option>
            <option value="participante_activo">Participante Activo</option>
            <option value="experiencia_total">Experiencia Total</option>
          </select>
        </div>

        {/* ── Tabla ──────────────────────────────────────── */}
        <Card className="border-gray-200 bg-white mb-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    {["Alumno", "Institución", "Plan", "Monto", "Estado", "Registro", "Acciones"].map((h) => (
                      <th key={h} className="px-5 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wide bg-gray-50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loadingData ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                        Cargando inscripciones...
                      </td>
                    </tr>
                  ) : !paginacion || !paginacion.data || paginacion.data.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                        No hay inscripciones con estos filtros
                      </td>
                    </tr>
                  ) : (
                    paginacion.data.map((ins) => {
                      const s = ESTADO_STYLES[ins.estado];
                      return (
                        <tr key={ins.id} className="hover:bg-gray-50 transition-colors">

                          <td className="px-5 py-4">
                            <p className="font-medium text-gray-900">{ins.alumno.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{ins.alumno.email}</p>
                          </td>

                          <td className="px-5 py-4 text-gray-600 text-xs">
                            <p>{ins.alumno.institucion}</p>
                            <p className="text-gray-400">{ins.alumno.licenciatura}</p>
                          </td>

                          <td className="px-5 py-4 text-gray-700 text-xs">
                            {TIPO_LABEL[ins.tipo]}
                          </td>

                          <td className="px-5 py-4 font-medium text-gray-900">
                            ${ins.monto.toFixed(2)}
                          </td>

                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text} ${s.border}`}>
                              {s.icon}
                              {ins.estado.charAt(0).toUpperCase() + ins.estado.slice(1)}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-gray-400 text-xs">
                            {new Date(ins.created_at).toLocaleDateString("es-MX", {
                              day: "2-digit", month: "short", year: "numeric"
                            })}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setSelected(ins)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                                title="Ver detalle"
                              >
                                <Eye size={15} />
                              </button>
                              {ins.estado !== "confirmado" && (
                                <button
                                  onClick={() => cambiarEstado(ins.id, "confirmado")}
                                  disabled={updatingId === ins.id}
                                  className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors disabled:opacity-40"
                                  title="Confirmar pago"
                                >
                                  <CheckCircle size={15} />
                                </button>
                              )}
                              {ins.estado !== "rechazado" && (
                                <button
                                  onClick={() => cambiarEstado(ins.id, "rechazado")}
                                  disabled={updatingId === ins.id}
                                  className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors disabled:opacity-40"
                                  title="Rechazar"
                                >
                                  <XCircle size={15} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ── Paginación ─────────────────────────────────── */}
        {paginacion && paginacion.last_page > 1 && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>
              Página {paginacion.current_page} de {paginacion.last_page} · {paginacion.total} registros
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"
                onClick={() => setPagina((p) => p - 1)}
                disabled={paginacion.current_page === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Anterior
              </Button>
              <Button variant="outline" size="sm"
                onClick={() => setPagina((p) => p + 1)}
                disabled={paginacion.current_page === paginacion.last_page}
                className="flex items-center gap-1"
              >
                Siguiente <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* ── Modal detalle ───────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden my-8 border-2 border-gray-100"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-[#002fbb] to-[#0040dd] px-5 py-3">
              <div className="flex2 items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                    Detalle de Inscripción
                  </h3>
                  <p className="text-blue-200 text-[10px]">ID: #{selected.id}</p>
                </div>
                <button 
                  onClick={() => setSelected(null)} 
                  className="text-white hover:bg-white/20 rounded-full p-1.5 transition-all duration-200 hover:rotate-90"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4l10 10M4 14L14 4"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-5 py-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>

            {/* Información del alumno */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-3 mb-3 border border-gray-100">
              <h4 className="text-[10px] font-bold text-[#002fbb] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users size={12} />
                Información del Participante
              </h4>
              <dl className="grid grid-cols-2 gap-2">
                {[
                  { label: "Alumno",      value: selected.alumno.name, col2: false },
                  { label: "Email",       value: selected.alumno.email, col2: false },
                  { label: "Institución", value: selected.alumno.institucion, col2: true },
                  { label: "Carrera",     value: selected.alumno.licenciatura, col2: true },
                  { label: "Semestre",    value: selected.alumno.semestre ? `${selected.alumno.semestre}°` : "—", col2: false },
                  { label: "Plan",        value: TIPO_LABEL[selected.tipo], col2: false },
                  { label: "Monto",       value: `$${selected.monto.toFixed(2)} MXN`, col2: false },
                  { label: "Validado por", value: selected.validador?.name ?? "Sin validar", col2: false },
                ].map(({ label, value, col2 }) => (
                  <div key={label} className={`${col2 ? 'col-span-2' : ''} bg-white rounded-lg px-2.5 py-1.5 border border-gray-100`}>
                    <dt className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</dt>
                    <dd className="text-[11px] text-gray-900 font-medium break-words">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Comprobante de pago */}
            <div className="mb-3">
              <h4 className="text-[10px] font-bold text-[#002fbb] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText size={12} />
                Comprobante de Pago
              </h4>
              
              {selected.comprobante_url ? (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 border-2 border-blue-200 rounded-xl p-3 shadow-sm">
                  <div className="bg-white rounded-lg border border-blue-100 overflow-hidden shadow-inner">
                    {isImageFile(selected.ruta_comprobante || "") ? (
                      <div className="flex justify-center items-center p-2">
                        <img
                          src={selected.comprobante_url}
                          alt="Comprobante"
                          className="max-w-full max-h-48 rounded object-contain shadow-lg"
                        />
                      </div>
                    ) : isPdfFile(selected.ruta_comprobante || "") ? (
                      <iframe
                        src={`${selected.comprobante_url}#toolbar=0`}
                        title="PDF Preview"
                        className="w-full h-48 border-0"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1.5 py-6">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText size={24} className="text-blue-500" />
                        </div>
                        <p className="text-gray-500 text-[10px]">Archivo adjunto</p>
                      </div>
                    )}
                  </div>
                  <a 
                    href={selected.comprobante_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#002fbb] hover:text-[#0040dd] font-semibold transition-colors"
                  >
                    <Eye size={12} />
                    Ver en tamaño completo
                  </a>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-1.5">
                    <FileText size={20} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-[10px] font-medium">Sin comprobante subido</p>
                  <p className="text-gray-400 text-[9px] mt-0.5">El participante aún no ha adjuntado un comprobante</p>
                </div>
              )}
            </div>

            {/* Estado actual */}
            <div className={`mb-3 p-3 rounded-xl border-2 shadow-sm ${
              selected.estado === "confirmado" 
                ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300" 
                : selected.estado === "rechazado" 
                ? "bg-gradient-to-br from-red-50 to-rose-50 border-red-300" 
                : "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300"
            }`}>
                
                <div className="flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selected.estado === "confirmado" 
                      ? "bg-green-100" 
                      : selected.estado === "rechazado" 
                      ? "bg-red-100" 
                      : "bg-yellow-100"
                  }`}>
                    {selected.estado === "confirmado" && <CheckCircle size={14} className="text-green-600" />}
                    {selected.estado === "rechazado" && <XCircle size={14} className="text-red-600" />}
                    {selected.estado === "pendiente" && <Clock size={14} className="text-yellow-600" />}
                  </div>
                  <p className={`text-[11px] font-bold text-center uppercase tracking-wider mb-0.5 ${
                    selected.estado === "confirmado" 
                      ? "text-green-600" 
                      : selected.estado === "rechazado" 
                      ? "text-red-600" 
                      : "text-yellow-700"
                  }`}>
                    Estado de la Inscripción
                  </p>
                  <p className={`text-xs font-bold ${
                    selected.estado === "confirmado" 
                      ? "text-green-800" 
                      : selected.estado === "rechazado" 
                      ? "text-red-800" 
                      : "text-yellow-800"
                  }`}>
                    {selected.estado === "confirmado" && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-check" aria-hidden="true" />
                        Confirmado
                      </span>
                    )}
                    {selected.estado === "rechazado" && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
                        Rechazado
                      </span>
                    )}
                    {selected.estado === "pendiente" && (
                      <span className="inline-flex items-center gap-1.5">
                        <i className="fa-solid fa-hourglass-half" aria-hidden="true" />
                        Pendiente de Validación
                      </span>
                    )}
                  </p>
                  {selected.validador && (
                    <p className={`text-[9px] mt-1 font-medium ${
                      selected.estado === "confirmado" 
                        ? "text-green-700" 
                        : selected.estado === "rechazado" 
                        ? "text-red-700" 
                        : "text-yellow-700"
                    }`}>
                      <span className="inline-flex items-center gap-1">
                        <i className="fa-solid fa-user" aria-hidden="true" />
                        Validado por: <span className="font-bold">{selected.validador.name}</span>
                      </span>
                    </p>
                  )}
                </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-2">
              {selected.estado !== "confirmado" && (
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-bold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 text-xs"
                  disabled={updatingId === selected.id}
                  onClick={() => cambiarEstado(selected.id, "confirmado")}
                >
                  {updatingId === selected.id ? (
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Confirmando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      Confirmar Pago
                    </span>
                  )}
                </Button>
              )}
              {selected.estado !== "rechazado" && (
                <Button
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-black font-bold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-0 text-xs"
                  disabled={updatingId === selected.id}
                  onClick={() => cambiarEstado(selected.id, "rechazado")}
                >
                  {updatingId === selected.id ? (
                    <span className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Rechazando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <XCircle size={14} />
                      Rechazar Pago
                    </span>
                  )}
                </Button>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}