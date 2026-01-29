import { Target, Lightbulb, Network, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const objetivos = [
  {
    icon: Target,
    title: "Fomentar la Innovación",
    description: "Impulsar el desarrollo de nuevas tecnologías y metodologías en el campo de la biotecnología."
  },
  {
    icon: Lightbulb,
    title: "Compartir Conocimiento",
    description: "Facilitar el intercambio de investigaciones y descubrimientos científicos entre profesionales del sector."
  },
  {
    icon: Network,
    title: "Crear Colaboraciones",
    description: "Establecer redes de colaboración entre instituciones académicas, centros de investigación y empresas."
  },
  {
    icon: TrendingUp,
    title: "Impulsar el Desarrollo",
    description: "Promover el crecimiento sostenible de la industria biotecnológica y su impacto en la sociedad."
  }
];

export function Objetivos() {
  return (
    <section id="objetivos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Objetivos del Evento</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Nuestro congreso tiene como misión crear un espacio único para el avance de la biotecnología 
            a través de la colaboración, innovación y excelencia científica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {objetivos.map((objetivo, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#002fbb] to-[#a0c519] rounded-lg flex items-center justify-center flex-shrink-0">
                    <objetivo.icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-3" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{objetivo.title}</h3>
                    <p className="text-gray-600">{objetivo.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#002fbb]/5 to-[#a0c519]/10 rounded-xl p-8 border border-[#002fbb]/20">
          <h3 className="text-gray-900 mb-4 text-center" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Impacto Esperado</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-[#002fbb] mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>+100</div>
              <p className="text-gray-600">Nuevas colaboraciones internacionales</p>
            </div>
            <div>
              <div className="text-[#002fbb] mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>+50</div>
              <p className="text-gray-600">Presentaciones científicas</p>
            </div>
            <div>
              <div className="text-[#002fbb] mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>+20</div>
              <p className="text-gray-600">Proyectos de investigación iniciados</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
