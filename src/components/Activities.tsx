import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ActivityModal } from "./modals/ActivityModal";

export type ActivityType = "BioTalk" | "Convocatoria" | "Panel" | "Ponencia"|"Actividad";

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;

  speaker?: {
    // singular — para actividades con 1 speaker
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };
  speakers?: Array<{
    // plural — para paneles con varios
    name: string;
    role: string;
    bio: string;
    photo?: string;
  }>;

  convocatoria?: {
    registroUrl?: string;
    pdfUrl?: string;
    why?: string[];
    awards?: string[];
  };
}

export function Actividades() {
  const activities: Activity[] = [
    {
      id: "1",
      title:
        "Conferencia Magistral: “Biologizar el Futuro: tendencias y señales para el futuro de la biotecnología",
      type: "Ponencia",
      description:
        "Una visión estratégica sobre el ecosistema biotecnológico en Latinoamérica y los retos de la próxima generación de líderes científicos",
      speaker: {
        name: "Ing. Daniel Domínguez Gómez",
        role: "CEO de Allbiotech · Director en Fundación iGEM",
        bio: "Líder global en bioeconomía y biología sintética. Daniel encabeza la red de jóvenes talentos más influyente de la región, conectando la academia con la industria para impulsar la transferencia tecnológica a nivel internacional",
        photo: "/speakers/IngDaniel.jpg",
      },
    },
    {
      id: "2",
      title: "Biotecnología para comprender y transformar la vida",
      type: "BioTalk",
      description:
        "Transforma la curiosidad en impacto real. Desde la biología molecular hasta la bioinformática, descubre cómo entender los sistemas biológicos nos permite rediseñar nuestro mundo de manera responsable",
      speaker: {
        name: "Dra. María Cristina González Vázquez",
        role: "Investigadora del Centro de Investigación en Ciencias Microbiológicas de la Benemérita Universidad Autónoma de Puebla",
        bio: "Experta en el estudio de sistemas biológicos con enfoque en la interacción planta-patógeno y bioprocesos. La Dra. González Vázquez integra herramientas de biología molecular y bioinformática para el desarrollo de soluciones sostenibles, promoviendo una visión de la biotecnología como motor de cambio responsable para la ciencia y la sociedad.",
        photo: "/speakers/DraMaria.jpg",
      },
    },
    {
      id: "3",
      title: "Biotecnología aplicada a la sociedad y el entorno",
      type: "BioTalk",
      description:
        "¿Puede la ciencia resolver los problemas más urgentes del mundo? Descubre cómo la biotecnología genera soluciones reales para la salud, la alimentación y el medio ambiente.",
      speaker: {
        name: "D.C. Vianney Marín Cevada",
        role: "Investigadora en el Centro de Investigaciones en Ciencias Microbiológicas BUAP",
        bio: "Experta en el desarrollo de soluciones biotecnológicas para los sectores agrícola y ambiental. Con formación posdoctoral en Alemania, la Dra. Marín Cevada se especializa en el uso de microorganismos para la protección del entorno y la generación de innovaciones que impulsan el desarrollo social y la sostenibilidad.",
        photo: "/speakers/DraVianney.jpg",
      },
    },
    {
      id: "4",
      title: "Biotecnología, innovación y futuro profesional",
      type: "BioTalk",
      description:
        "¿Qué lugar ocuparás en el mundo de la biotecnología? Descubre cómo conectar tu conocimiento con un propósito claro y explorar las oportunidades que ofrece este campo más allá del laboratorio.",
      speaker: {
        name: "Dr. Eric Reyes Cervantes",
        role: "Jefe de área Proyectos Especiales de DITCo y Manager de FABLAB BUAP.",
        bio: "Entusiasta de la ciencia y la tecnología, con un enfoque multi e interdisciplinario aplicado a la innovación, fomado como Ingeniero químico, con maestría en Bioquímica y Genética, candidato a doctor en Biotecnología Aplicada, diplomados en metalúrgia, Design Thinking, Innovación y Proyectos. ",
        photo: "/speakers/DrEric.jpg",
      },
    },
    {
      id: "5",
      title: "¿Superhéroe o biotecnólogo?",
      type: "BioTalk",
      description:
        "¿Debes salvar al mundo para ser un buen biotecnólogo? Descubre cómo el verdadero impacto de la ciencia no siempre requiere una capa, sino constancia, ética y pequeñas acciones que, desde la investigación y la industria, transforman nuestra realidad cotidiana.",
      speaker: {
        name: " Dra. Julia María Alatorre Cruz ",
        role: "Investigadora en el Centro de Investigaciones en Ciencias Microbiológicas de la BUAP",
        bio: "Experta en microbiología molecular y ecología microbiana, con especial énfasis en la seguridad alimentaria y la sustentabilidad ambiental. La Dra. Alatorre Cruz se especializa en el estudio de microorganismos benéficos, la biorremediación de metales pesados y el análisis de la microbiota intestinal. Su labor científica integra el desarrollo de soluciones biotecnológicas para el sector agrícola con investigaciones sobre la influencia de la dieta y los microorganismos en la salud humana, impulsando innovaciones para la conservación natural y el bienestar social.",
        photo: "/speakers/DraJulia.jpg",
      },
    },
    {
      id: "6",
      title: "Feria de Innovación Biotecnológica y Vinculación",
      type: "Convocatoria",
      description:
        "Explora el talento de los estudiantes de la Licenciatura en Biotecnología, conoce proyectos de vanguardia y conecta con las dependencias que impulsan tu formación integral y profesional.",
      convocatoria: {
        why: [
          "Descubre: Proyectos reales de salud, medio ambiente y bioeconomía creados por tus compañeros.",
          "Conecta: Resuelve tus dudas sobre intercambios, servicio social y bolsa de trabajo en un solo lugar.",
          "Vota: Ayuda a elegir al ganador del Reconocimiento del Público.",
        ],
        awards: [
          "Se otorgarán distintivos en 6 categorías, incluyendo Innovación, Impacto Ambiental y Viabilidad.",
        ],
        pdfUrl: "/convocatorias/feria-de-innovacion.pdf",
      },
    },
    {
      id: "7",
      title: "Exposición y Concurso de Carteles Científicos",
      type: "Convocatoria",
      description:
        "¿Listo para comunicar tus hallazgos? Presenta tu investigación ante la comunidad, sométela a evaluación académica y demuestra tu rigor metodológico en el foro científico más importante de nuestra licenciatura.",
      convocatoria: {
        why: [
          "Impulsa tu Perfil: Comparte tus resultados de investigación, estancias, servicio social o revisiones bibliográficas.",
          "Evaluación Profesional: Recibe retroalimentación de la Sociedad Estudiantil de Biotecnología y Bioingeniería BUAP.",
          "Networking: Genera diálogos académicos con docentes, investigadores y compañeros interesados en tu área.",
        ],
        awards: [
          "Gana Reconocimiento: Compite por el 1er, 2do y 3er lugar y obtén tu constancia oficial de participación.",
        ],
        pdfUrl: "/convocatorias/carteles.pdf",
      },
    },
    {
      id: "8",
      title: "Muro de Arte",
      type: "Convocatoria",
      description:
        "¿Cómo ves la ciencia tú? Convierte tu visión en arte y forma parte de esta exposición colectiva donde la biotecnología y la vida universitaria se encuentran con la creatividad visual. Un espacio de libre expresión diseñado para fortalecer nuestra identidad a través de la fotografía, el dibujo y el diseño.",
      convocatoria: {
        why: [
          "Exprésate: Muestra tu talento en fotografía, ilustración, dibujo o collage. ",
          "Impacta: Tu obra será parte del ambiente visual de todo el evento.",
          "Sin presión: El Staff se encarga del montaje; tú solo entregas tu obra y disfrutas el evento.",
        ],
        awards: [
          "Gana: Los asistentes votarán vía QR por sus 3 obras favoritas para ser premiadas en la clausura.",
        ],
        pdfUrl: "/convocatorias/muro-de-arte.pdf",
      },
    },

    {
      id: "9",
      title: "Micro Charlas",
      type: "Ponencia",
      description:
        "¿Buscas laboratorio, tesis o servicio social? Conoce de primera mano qué están investigando los doctores de nuestra universidad. En presentaciones de 7 minutos, descubre las oportunidades que existen para integrarte tempranamente al mundo de la ciencia.",
      convocatoria: {
        why: [
          "Vinculación Directa: Conecta con investigadores de la BUAP y conoce sus proyectos actuales.",
          "Exploración de Intereses: Identifica áreas de aplicación que te apasionen para tu futura titulación o estancias.",
          "Interacción Real: Espacio de preguntas y respuestas para resolver tus dudas sobre el trabajo en laboratorio",
        ],
        pdfUrl: "/convocatorias/microcharlas.pdf",
      },
    },
    // Actividad 10 actualizada
    {
      id: "10",
      title: "Panel: Rutas Profesionales en Biotecnología",
      type: "Ponencia",
      description:
        "¿Qué sigue después de la licenciatura? Escucha a egresadas que están transformando el sector en la industria, el emprendimiento y la investigación de alto nivel...",
      speakers: [
        {
          name: "Dra. Victoria Conde Ávila",
          role: "Co-fundadora de la Start-up MicroIn · LBT",
          bio: "",
          photo: "/speakers/DraVictoria.jpg",
        },
        {
          name: "Dra. Ana Paula Acevedo Negrete",
          role: "GRIDX Scientific Explorer México · IBT",
          bio: "",
          photo: "/speakers/DraAnaPaula.jpg",
        },
        {
          name: "Dra. Elaine Belén Nolasco Díaz",
          role: "Investigación, Innovación y desarrollo en la industria de alimentos y nuevos compuestos para la salud",
          bio: "",
          photo: "/speakers/DraElaine.jpg",
        },
        {
          name: "M.C Alejandra Paulina Pérez González",
          role: "Candidata a Doctora en Ciencias Biomédicas · UNAM",
          bio: "",
          photo: "/speakers/DraAlejandra.jpg",
        },
        {
          name: "M.C Agustín Reyes Martínez",
          role: "Investigador en sector privado de Microbiología y Biotecnología Industrial",
          bio: "",
          photo: "/speakers/MCAgustin.jpg",
        },
      ],
    },
    {
      id: "11",
      title: "Cápsula del Tiempo: Carta al futuro biotecnólogo que seré",
      type: "Actividad",
      description:
        "¿Dónde te ves en cinco años? Detén el tiempo por un momento y escribe tus metas, miedos y aspiraciones. Esta carta es un compromiso contigo mismo que viajará por el tiempo hasta encontrarte convertido en un profesional. (La logística será detallada durante el evento)",
    },
  ];

  const [selectedType, setSelectedType] = useState<"all" | ActivityType>("all");
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(
    (a) => selectedType === "all" || a.type === selectedType,
  );

  return (
    <section id="actividades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4">Actividades y Charlas</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explora las actividades académicas, concursos y charlas que formarán
            parte del Encuentro Estudiantil de Biotecnología BUAP 2026.
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {/* botones tipo */}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="border-gray-200">
              <CardContent className="p-6">
                <Badge>{activity.type}</Badge>

                <h3 className="mt-4 mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-6">{activity.description}</p>

                <Button
                  variant="outline"
                  onClick={() => {
                    console.log("Click en actividad:", activity);
                    setActiveActivity(activity);
                  }}
                >
                  {activity.type === "Convocatoria"
                    ? "Ver convocatoria"
                    : "Ver detalles"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MODAL / DRAWER */}
        {activeActivity && (
          <ActivityModal
            activity={activeActivity}
            onClose={() => setActiveActivity(null)}
          />
        )}
      </div>
    </section>
  );
}
