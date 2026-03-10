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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Josefin Sans, sans-serif" }}>
                Detalle de inscripción
              </h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <dl className="space-y-3 text-sm mb-6">
              {[
                { label: "Alumno",      value: selected.alumno.name },
                { label: "Email",       value: selected.alumno.email },
                { label: "Institución", value: selected.alumno.institucion },
                { label: "Carrera",     value: selected.alumno.licenciatura },
                { label: "Semestre",    value: selected.alumno.semestre ? `${selected.alumno.semestre}°` : "—" },
                { label: "Plan",        value: TIPO_LABEL[selected.tipo] },
                { label: "Monto",       value: `$${selected.monto.toFixed(2)} MXN` },
                { label: "Validado por", value: selected.validador?.name ?? "Sin validar" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1 border-b border-gray-50">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="text-gray-900 font-medium text-right max-w-[60%]">{value}</dd>
                </div>
              ))}
            </dl>

            {selected.comprobante_url && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-3">Comprobante de pago:</p>
                
                {/* Vista previa */}
                <div className="mb-3 p-3 bg-white rounded-lg border border-blue-100 min-h-48">
                  {isImageFile(selected.ruta_comprobante || "") ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        style={{ maxHeight: "400px" }}
                        src={selected.comprobante_url}
                        alt="Comprobante"
                        className="max-w-full max-h-64 rounded object-contain"
                      />
                    </div>
                  ) : isPdfFile(selected.ruta_comprobante || "") ? (
                    <div className="flex flex-col items-center gap-2">
                      <iframe
                        src={`${selected.comprobante_url}#toolbar=0`}
                        title="PDF Preview"
                        className="w-full h-64 rounded border border-gray-200"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-8 justify-center">
                      <FileText size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {!selected.comprobante_url && (
              <p className="text-center text-gray-400 text-sm mb-4 py-4 bg-gray-50 rounded-lg">Sin comprobante subido</p>
            )}

            {/* Estado actual */}
            <div className="mb-4 p-3 rounded-lg" style={{backgroundColor: selected.estado === "confirmado" ? "#dcfce7" : selected.estado === "rechazado" ? "#fee2e2" : "#fef3c7"}}>
              <p className="text-xs font-semibold mb-1" style={{color: selected.estado === "confirmado" ? "#166534" : selected.estado === "rechazado" ? "#991b1b" : "#92400e"}}>
                Estado actual:
              </p>
              <p className="text-sm font-bold" style={{color: selected.estado === "confirmado" ? "#166534" : selected.estado === "rechazado" ? "#991b1b" : "#92400e"}}>
                {selected.estado === "confirmado" && "Confirmado"}
                {selected.estado === "rechazado" && " Rechazado"}
                {selected.estado === "pendiente" && "Pendiente de validación"}
              </p>
              {selected.validador && (
                <p className="text-xs mt-1" style={{color: selected.estado === "confirmado" ? "#16a34a" : selected.estado === "rechazado" ? "#dc2626" : "#666"}}>
                  Validado por: {selected.validador.name}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {selected.estado !== "confirmado" && (
                <Button
                  variant="outline"
                  className="flex-1 border-green-300 text-green-600 hover:bg-green-50 disabled:opacity-50"
                  disabled={updatingId === selected.id}
                  onClick={() => cambiarEstado(selected.id, "confirmado")}
                >
                  {updatingId === selected.id ? "Confirmando..." : <><XCircle size={14} className="mr-2" /> Confirmar</>}
                </Button>
              )}
              {selected.estado !== "rechazado" && (
                <Button
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  disabled={updatingId === selected.id}
                  onClick={() => cambiarEstado(selected.id, "rechazado")}
                >
                  {updatingId === selected.id ? "Rechazando..." : <><XCircle size={14} className="mr-2" /> Rechazar</>}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}