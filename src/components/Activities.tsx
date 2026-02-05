import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ActivityModal } from "./modals/ActivityModal";

type ActivityType = "charla" | "concurso" | "panel" | "feria";

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;

  // opcional según tipo
  speaker?: {
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };

  convocatoria?: {
    requirements: string[];
    fechas: string;
    registroUrl?: string;
  };
}

export function Actividades() {
    const activities: Activity[] = [
    {
      id: "1",
      title: "Conferencia Magistral",
      type: "charla",
        description: "Una charla inspiradora sobre el futuro de la biotecnología.",
      speaker: {
        name: "Ing. Daniel Domínguez Gómez",
        role: "CEO de Allbiotech · Director en Fundación iGEM",
        bio: "El Ing. Daniel Domínguez Gómez es un líder en el campo de la biotecnología con amplia experiencia en innovación y desarrollo de proyectos biotecnológicos a nivel internacional.",
        photo: "https://example.com/speaker_photo.jpg"
      }
      },
    {
      id: "2",
      title: "Biotecnología para comprender y transformar la vida",
      type: "charla",
        description: "Una charla inspiradora sobre el futuro de la biotecnología.",
      speaker: {
        name: "Dra. María Cristina González Vázquez",
        role: "Investigadora en el Instituto de Biotecnología, UNAM",
        bio: "La Dra. María Cristina González Vázquez es una experta en biotecnología con un enfoque en la investigación y desarrollo de soluciones innovadoras para la industria.",
        photo: "https://example.com/speaker_photo.jpg"
        }
      },
      {
      id: "3",
      title: "Biotecnología aplicada a la sociedad y el entorno",
      type: "charla",
        description: "Una charla inspiradora sobre el futuro de la biotecnología.",
      speaker: {
        name: "D.C. Vianney Marín Cevada",
        role: "Investigadora en el Instituto de Biotecnología, UNAM",
        bio: "La D.C. Vianney Marín Cevada es una experta en biotecnología con un enfoque en la investigación y desarrollo de soluciones innovadoras para la industria.",
        photo: "https://example.com/speaker_photo.jpg"
        }
      },
    {
      id: "4",
      title: "Biotecnología, innovación y futuro profesional",
      type: "charla",
      description: "Biotecnología, innovación y futuro profesional",
      speaker: {
        name: "Dr. Eric Reyes Cervantes",
        role: "Investigador en el Instituto de Biotecnología, UNAM",
        bio: "El Dr. Eric Reyes Cervantes es un destacado investigador en el campo de la biotecnología con múltiples publicaciones en revistas científicas.",
        photo: "https://example.com/speaker_photo.jpg"
      }
    },
    {
      id: "5",
      title: "¿Superhéroe o biotecnólogo?",
      type: "charla",
      description: "¿Superhéroe o biotecnólogo?",
      speaker: {
        name: " Dr. Luis Ramiro Caso Vargas",
        role: "Investigador en el Instituto de Biotecnología, UNAM",
        bio: "El Dr. Luis Ramiro Caso Vargas es un destacado investigador en el campo de la biotecnología con múltiples publicaciones en revistas científicas.",
        photo: "https://example.com/speaker_photo.jpg"
      },
    },
    {
      id: "6",
      title: "Feria de Innovación Biotecnológica y Vinculación",
      type: "feria",
      description: "Explora las últimas innovaciones en biotecnología y conecta con instituciones educativas y empresas del sector.",
      convocatoria: {
        fechas: "26 de Marzo, 2026 · 14:00 - 17:00",
        requirements: [
          "Exhibición de proyectos estudiantiles",
          "Módulos informativos universitarios",
          "Reconocimientos a innovación, impacto social y ambiental"
        ]
      }
    }
  ]
        
  const [selectedType, setSelectedType] = useState<"all" | ActivityType>("all");
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(
    a => selectedType === "all" || a.type === selectedType
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
          {filteredActivities.map(activity => (
            <Card key={activity.id} className="border-gray-200">
              <CardContent className="p-6">
                <Badge>{activity.type}</Badge>

                <h3 className="mt-4 mb-2">{activity.title}</h3>
                <p className="text-gray-600 mb-6">{activity.description}</p>

                <Button
                  variant="outline"
                  onClick={() => setActiveActivity(activity)}
                >
                  {activity.type === "concurso"
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
