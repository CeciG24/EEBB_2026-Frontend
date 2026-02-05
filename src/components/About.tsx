import { Dna, Microscope, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Dna,
    title: "Formación Científica",
    description: "Conferencias y ponencias que fortalecen tu formación en biotecnología."
  },
  {
    icon: Microscope,
    title: "Experiencia Práctica",
    description: "Participa en carteles científicos, feria de innovación y actividades académicas."
  },
  {
    icon: Users,
    title: "Comunidad Biotecnológica",
    description: "Conecta con estudiantes, egresados e investigadores en un espacio de diálogo."
  },
  {
    icon: Award,
    title: "Reconocimientos Académicos",
    description: "Constancias con valor curricular y distinciones a proyectos destacados."
  }
];

export function About() {
  return (
    <section id="quienes-somos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Quiénes Somos</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Somos un evento estudiantil de la Licenciatura en Biotecnología BUAP que impulsa la integración, el intercambio académico y la creación de redes entre estudiantes. Un espacio para conectar generaciones, visibilizar el talento estudiantil y fortalecer la comunidad biotecnológica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#002fbb]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-[#002fbb]" size={24} />
                </div>
                <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}