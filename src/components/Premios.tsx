import { Trophy, Star, Award, Medal } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const premios = [
  {
    icon: Trophy,
    title: "Mejor Investigación del Año",
    prize: "$10,000 USD",
    description: "Reconocimiento a la investigación más innovadora presentada en el congreso.",
    color: "from-[#a0c519] to-[#8bb015]"
  },
  {
    icon: Star,
    title: "Premio a la Innovación",
    prize: "$7,500 USD",
    description: "Para proyectos que demuestren aplicaciones novedosas de la biotecnología.",
    color: "from-[#002fbb] to-[#001f8f]"
  },
  {
    icon: Award,
    title: "Mejor Presentación de Póster",
    prize: "$5,000 USD",
    description: "Otorgado a la presentación de póster más destacada y comunicativa.",
    color: "from-[#a0c519] to-[#8bb015]"
  },
  {
    icon: Medal,
    title: "Premio al Investigador Joven",
    prize: "$3,000 USD",
    description: "Reconocimiento especial para investigadores menores de 35 años.",
    color: "from-[#002fbb] to-[#001f8f]"
  }
];

export function Premios() {
  return (
    <section id="premios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Premios y Reconocimientos</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Celebramos la excelencia en investigación e innovación con premios valorados en más de $25,000 USD.
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
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${premio.color} inline-block mb-2`} style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                      {premio.prize}
                    </div>
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
                <span>📊</span>
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Originalidad</p>
              <p className="text-gray-600">Innovación y creatividad</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span>🔬</span>
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Rigor Científico</p>
              <p className="text-gray-600">Metodología robusta</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span>💡</span>
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Impacto</p>
              <p className="text-gray-600">Relevancia y aplicabilidad</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <span>📢</span>
              </div>
              <p className="text-gray-900 mb-1" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Comunicación</p>
              <p className="text-gray-600">Claridad y presentación</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Los ganadores serán anunciados durante la ceremonia de clausura el 17 de marzo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
