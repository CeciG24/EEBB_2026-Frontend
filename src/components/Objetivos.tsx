import {
  Target,
  Lightbulb,
  Network,
  TrendingUp,
  Users,
  GraduationCap,
  Sparkles,
  Compass
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

/* ===== OBJETIVOS DEL EVENTO ===== */
const objetivos = [
  {
    icon: Target,
    title: "Fortalecer la Formación Académica",
    description:
      "Complementar la formación de estudiantes mediante conferencias, charlas y actividades académicas en biotecnología."
  },
  {
    icon: Lightbulb,
    title: "Impulsar la Innovación Estudiantil",
    description:
      "Promover la creatividad, el pensamiento crítico y la generación de ideas a través de concursos y espacios de divulgación."
  },
  {
    icon: Network,
    title: "Vincular a la Comunidad Biotecnológica",
    description:
      "Conectar a estudiantes con docentes, egresados, investigadores y representantes del sector académico e industrial."
  },
  {
    icon: TrendingUp,
    title: "Orientar el Desarrollo Profesional",
    description:
      "Brindar herramientas y referentes que ayuden a los estudiantes a definir su ruta académica y profesional."
  }
];

/* ===== BENEFICIOS DE ASISTIR ===== */
const beneficios = [
  {
    icon: Users,
    title: "Networking",
    description:
      "Conecta con estudiantes de todos los semestres, docentes y profesionales del área de la biotecnología."
  },
  {
    icon: GraduationCap,
    title: "Orientación Académica",
    description:
      "Conoce laboratorios, opciones de movilidad, estancias académicas y proyectos de investigación."
  },
  {
    icon: Compass,
    title: "Habilidades Profesionales",
    description:
      "Fortalece habilidades como liderazgo, comunicación y trabajo en equipo mediante actividades colaborativas."
  },
  {
    icon: Sparkles,
    title: "Inspiración",
    description:
      "Descubre trayectorias profesionales reales que te ayudarán a definir tu camino en la biotecnología."
  }
];

export function Objetivos() {
  return (
    <section id="objetivos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Objetivos del Evento
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            El Encuentro Estudiantil de Biotecnología BUAP 2026 busca crear un
            espacio formativo, participativo y de vinculación para el desarrollo
            académico y profesional de los estudiantes.
          </p>
        </div>

        {/* ===== OBJETIVOS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {objetivos.map((objetivo, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#002fbb] to-[#a0c519] rounded-lg flex items-center justify-center flex-shrink-0">
                    <objetivo.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3
                      className="text-gray-900 mb-3"
                      style={{
                        fontFamily: "Josefin Sans, sans-serif"
                      }}
                    >
                      {objetivo.title}
                    </h3>
                    <p className="text-gray-600">{objetivo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== BENEFICIOS ===== */}
        <div className="text-center py-4 mb-12">
          <h3
            className="text-gray-900 mb-6"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Beneficios de Asistir
          </h3>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Participar en el EEBB 2026 te permitirá crecer académica y
            profesionalmente mientras formas parte de una comunidad activa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:shadow-lg transition-shadow text-center"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 mx-auto mb-4 bg-[#002fbb]/10 rounded-full flex items-center justify-center">
                  <beneficio.icon className="text-[#002fbb]" size={28} />
                </div>
                <h4
                  className="text-gray-900 mb-3"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  {beneficio.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {beneficio.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
