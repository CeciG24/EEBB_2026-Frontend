import { Card, CardContent } from "./ui/card";

const comite = [
  {
    photo: "/comite/Bet.jpg",
    name: "Betzie G. Espinoza Herrera",
    role: "Presidenta del Comité Organizador",
    description:
      "Estudiante de Biotecnología interesada en la investigación en biotecnología aplicada, con experiencia en microbiología, química y evaluación de compuestos bioactivos. Actualmente enfocada en el estudio y caracterización de metabolitos y procesos biotecnológicos mediante técnicas microbiológicas, químicas y bioanalíticas..",
  },
  {
    photo: "/comite/Valeria.jpg",
    name: "Valeria Helena Loza Gaspar",
    role: "Vicepresidenta del Comité Organizador",
    description:
      "Estudiante de Biotecnología con formación en el área médica, con especialización en el estudio de la microbiota intestinal y su impacto en el sistema endocrino. Actualmente enfocada en la investigación de patologías hormonales complejas, como el SOP y la endometriosis, analizando el papel de la nutrición funcional en la regulación metabólica e inmunológica.",
  },
  {
    photo: "/comite/Yolanda.jpg",
    name: "Yolanda Mirón López ",
    role: "Tesorera del Comité Organizador",
    description:
      "Estudiante de Biotecnología interesada en el diagnóstico molecular, el desarrollo de soluciones biomédicas sostenibles y la divulgación científica, con participación en la publicación de un artículo sobre un biosensor para la detección de lactato en saliva.el papel de la nutrición funcional en la regulación metabólica e inmunológica.",
  },
  {
    photo: "/comite/Maria.jpg",
    name: "María Guadalupe Juárez Hernández  ",
    role: "Coordinadora académica",
    description:
      "Estudiante de Biotecnología interesada en la bioinformática y el desarrollo de vectores genéticos para la degradación de pesticidas derivados de la agricultura, con interés en la biopolítica y la regulación biotecnológica.",
  },
  {
    photo: "/comite/Esther.jpg",
    name: "María Esther Hernández Huerta  ",
    role: "Coordinación de logística",
    description:
      "Estudiante de Biotecnología interesada en la biotecnología de alimentos, enfocada en el desarrollo e innovación de productos funcionales y en procesos de formulación de alimentos.",
  },
  {
    photo: "/comite/Azul.jpg",
    name: "Azul Crystal Urbano Hernández",
    role: "Coordinación de participantes",
    description:
      "Estudiante de Biotecnología interesada en bioprocesos industriales y fisicoquímica aplicada, particularmente en biorreactores, optimización de cultivos y aplicaciones de inteligencia artificial en sistemas biotecnológicos, así como en biorremediación para el tratamiento de problemáticas ambientales.",
  },
  {
    photo: "/comite/Laura.jpg",
    name: "Laura Jazmín Hernández Aguirre ",
    role: "Coordinación de vinculacion",
    description:
      "Estudiante de Biotecnología interesada en la medicina ambiental y el desarrollo de biosensores, con especial interés en los efectos de los contaminantes en el ambiente, enfocada en la innovación para su detección y eliminación.",
  },
];

export function Committee() {
  return (
    <section id="comite" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Comité Organizador
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Conoce a los miembros del comité organizador que hacen posible este
            evento, liderando la planificación, coordinación y ejecución de
            todas las actividades para garantizar una experiencia académica
            enriquecedora y exitosa.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {comite.map((miembro, index) => (
            <Card
              key={index}
              className="border-gray-200 hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-8 flex flex-col items-center">
                {/* Contenedor con tamaño fijo e imagen absoluta — garantiza círculo perfecto */}
                <div
                  style={{
                    position: "relative",
                    width: "160px",
                    height: "160px",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "4px solid #d1d5db",
                    background: "#e5e7eb",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={miembro.photo}
                    alt={miembro.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                </div>
                <h3
                  className="text-gray-900 mb-2 text-center"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  {miembro.name}
                </h3>
                <p className="text-gray-800 text-center">{miembro.role}</p>
                <br />
                <p className="text-gray-600 text-center">
                  {miembro.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
