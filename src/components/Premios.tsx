import { Trophy, Star, Award, Medal } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const premios = [
  {
    icon: Trophy,
    title: "Reconocimiento a la Innovación Biotecnológica",
    description: "Otorgado al proyecto que sobresalga por su originalidad, creatividad y aporte científico dentro del campo de la biotecnología.",
    color: "from-[#a0c519] to-[#8bb015]"
  },
  {
    icon: Star,
    title: "Reconocimiento al Impacto Social",
    description: "Dirigido a la propuesta que demuestre un beneficio significativo para la sociedad, comunidades o sectores vulnerables, promoviendo el bienestar social.",
    color: "from-[#002fbb] to-[#001f8f]"
  },
  {
    icon: Award,
    title: "Reconocimiento al Impacto Ambiental",
    description: "Concedido al proyecto que contribuya a la sostenibilidad, la conservación del medio ambiente o la mitigación de problemáticas ambientales.",
    color: "from-[#a0c519] to-[#8bb015]"
  },
  {
    icon: Medal,
    title: "Reconocimiento a la Viabilidad del Proyecto",
    description: "Destinado a la propuesta con mayor potencial de implementación, escalamiento o aplicación práctica en contextos reales.",
    color: "from-[#002fbb] to-[#001f8f]"
  },
  {
    icon: Award,
    title: "Reconocimiento del Público",
    description: "Asignado mediante votación de los asistentes, con el objetivo de fomentar la participación y el interés de la comunidad académica.",
    color: "from-[#a0c519] to-[#8bb015]"
  },
  {
    icon: Medal,
    title: "Reconocimiento a la Presentación del Proyecto",
    description: "Otorgado al equipo que destaque por la claridad, organización y comunicación efectiva de su propuesta durante la exposición.",
    color: "from-[#002fbb] to-[#001f8f]"
  }
];

export function Premios() {
  return (
    <section id="premios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Feria de Innovación Biotecnológica y Vinculación Universitaria</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Reconocemos la excelencia científica, la innovación biotecnológica y el compromiso académico de los proyectos participantes mediante distinciones que destacan su contribución al avance del conocimiento científico, su impacto social y ambiental, así como su aporte al fortalecimiento del bioemprendimiento, del ecosistema biotecnológico en México y del desarrollo de la bioeconomía.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {premios.map((premio, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${premio.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <premio.icon className="text-white" size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{premio.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{premio.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#002fbb]/5 to-[#a0c519]/10 rounded-xl p-8 border border-[#002fbb]/20">
          <h3 className="text-gray-900 mb-4 text-center" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Criterios de Evaluación</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <i className="fa-solid fa-chart-column text-[#002fbb]" aria-hidden="true" />
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Originalidad</p>
              <p className="text-gray-600">Innovación y creatividad</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <i className="fa-solid fa-microscope text-[#002fbb]" aria-hidden="true" />
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Rigor Científico</p>
              <p className="text-gray-600">Metodología robusta</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <i className="fa-solid fa-lightbulb text-[#002fbb]" aria-hidden="true" />
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Impacto</p>
              <p className="text-gray-600">Relevancia y aplicabilidad</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <i className="fa-solid fa-bullhorn text-[#002fbb]" aria-hidden="true" />
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Comunicación</p>
              <p className="text-gray-600">Claridad y presentación</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Los ganadores serán anunciados durante la ceremonia de clausura el 27 de marzo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
