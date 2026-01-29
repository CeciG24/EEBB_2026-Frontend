import { Dna, Microscope, Users, Award } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Dna,
    title: "Investigación de Vanguardia",
    description: "Explora los últimos avances en ingeniería genética, tecnología CRISPR y biología molecular."
  },
  {
    icon: Microscope,
    title: "Talleres Prácticos",
    description: "Participa en sesiones prácticas dirigidas por expertos de la industria e investigadores reconocidos."
  },
  {
    icon: Users,
    title: "Red Global",
    description: "Conecta con más de 500 profesionales de 40+ países y construye colaboraciones duraderas."
  },
  {
    icon: Award,
    title: "Premios de Excelencia",
    description: "Reconoce contribuciones sobresalientes a la investigación e innovación en biotecnología."
  }
];

export function About() {
  return (
    <section id="quienes-somos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Quiénes Somos</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            bioconecta reúne a las mentes más brillantes en biotecnología 
            para compartir conocimiento, fomentar la innovación y avanzar en el campo a través de la colaboración.
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