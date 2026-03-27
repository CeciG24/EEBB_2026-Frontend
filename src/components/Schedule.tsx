import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin } from "lucide-react";

const scheduleData = {
  day1: [
    {
      time: "08:30 - 09:00",
      title: "Registro de Asistentes",
      location: "Unidad de Seminarios",
      type: "registro",
    },
    {
      time: "09:00 - 09:30",
      title: "Ceremonia de Inauguración",
      location: "Unidad de seminarios",
      type: "inauguracion",
    },
    {
      time: "09:30 - 10:30",
      title: "Conferencia Magistral",
      speaker:
        "Ing. Daniel Domínguez Gómez · CEO de Allbiotech · Director en Fundación iGEM",
      location: "Unidad de seminarios",
      type: "keynote",
    },
    {
      time: "10:45 - 12:30",
      title: "BioTalks",
      speaker: [
        "“Biotecnología para comprender y transformar la vida” · Dra. María Cristina González Vázquez",
        "“Biotecnología aplicada a la sociedad y el entorno” · D.C. Vianney Marín Cevada",
        "“Biotecnología, innovación y futuro profesional” · Dr. Eric Reyes Cervantes",
        "“¿Superhéroe o biotecnólogo?” · Dra. Julia María Alatorre Cruz",
      ],
      location: "Unidad de seminarios",
      type: "talks",
    },
    {
      time: "12:30 - 13:30",
      title: "Receso",
      location: "Unidad de seminarios",
      type: "break",
    },
    {
      time: "13:40 - 16:30",
      title: "Feria de Innovación Biotecnológica y Vinculación",
      location: "Explanada Unidad de seminarios",
      type: "fair",
    },
    {
      time: "16:30 - 17:00",
      title: "Cierre del primer día",
      location: "Unidad de seminarios",
      type: "closing",
    },
  ],

  day2: [
    {
      time: "09:00 - 11:00",
      title: "Concurso de Carteles Científicos",
      location: "Explanada Unidad de seminarios",
      type: "contest",
    },
    {
      time: "11:00 - 11:30",
      title: "Receso",
      location: "Unidad de seminarios",
      type: "break",
    },
    {
      time: "11:30 - 13:00",
      title: "Micro Charlas: Líneas de Investigación",
      speaker:
        "Charlas breves (5–7 min) de investigadores sobre sus laboratorios y oportunidades para estudiantes",
      location: "Unidad de seminarios",
      type: "talks",
    },
    {
      time: "13:15 - 14:30",
      title: "Panel: Rutas profesionales en biotecnología",
      speaker: [
        "Posgrado / Investigación · Mtro. Agustín Martínez Reyes (Egresado BUAP)",
        "Industria · Nutravia",
        "Emprendimiento / Divulgación · Ana Paula Acevedo Negrete (GRIDX Scientific Explorer México)",
      ],
      location: "Unidad de seminarios",
      type: "panel",
    },
    {
      time: "14:30 - 15:00",
      title: "Clausura y Premiación",
      location: "Unidad de seminarios",
      type: "closing",
    },
  ],
};

const getBadgeConfig = (type: string) => {
  switch (type) {
    case "registro":
      return {
        label: "Registro",
        className: "bg-gray-100 text-gray-700 border-gray-200"
      };
    case "inauguracion":
      return {
        label: "Inauguración",
        className: "bg-gray-100 text-gray-700 border-gray-200"
      };
    case "keynote":
      return {
        label: "Conferencia Magistral",
        className: "bg-[#002fbb]/10 text-[#002fbb] border-[#002fbb]/30"
      };
    case "talks":
      return {
        label: "Charlas",
        className: "bg-[#002fbb]/20 text-[#002fbb] border-[#002fbb]/40"
      };
    case "panel":
      return {
        label: "Panel",
        className: "bg-[#002fbb]/15 text-[#002fbb] border-[#002fbb]/40"
      };
    case "fair":
      return {
        label: "Feria",
        className: "bg-[#a0c519]/10 text-[#7ca010] border-[#a0c519]/30"
      };
    case "contest":
      return {
        label: "Concurso",
        className: "bg-[#a0c519]/20 text-[#7ca010] border-[#a0c519]/40"
      };
    case "closing":
      return {
        label: "Clausura",
        className: "bg-gray-200 text-gray-800 border-gray-300"
      };
    default:
      return {
        label: "Actividad",
        className: "bg-gray-100 text-gray-700 border-gray-200"
      };
  }
};

export function Schedule() {
  return (
    <section id="cronograma" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Cronograma del Evento
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Dos días de actividades académicas, divulgación científica y
            participación estudiantil.
          </p>
        </div>

        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="day1">Día 1 · Jueves 16</TabsTrigger>
            <TabsTrigger value="day2">Día 2 · Viernes 17</TabsTrigger>
          </TabsList>

          {Object.entries(scheduleData).map(([day, events]) => (
            <TabsContent key={day} value={day} className="space-y-4">
              {events.map((event, index) => {
                const badge = getBadgeConfig(event.type);

                return (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex items-center gap-2 text-gray-600 md:w-36 flex-shrink-0">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <h3
                              className="text-gray-900"
                              style={{
                                fontFamily:
                                  "Josefin Sans, sans-serif"
                              }}
                            >
                              {event.title}
                            </h3>
                            <Badge className={`w-fit ${badge.className}`}>
                              {badge.label}
                            </Badge>
                          </div>

                          {event.speaker &&
                            (Array.isArray(event.speaker) ? (
                              <ul className="list-disc pl-5 text-gray-600 mb-2 space-y-1">
                                {event.speaker.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-[#002fbb] mb-2">
                                {event.speaker}
                              </p>
                            ))}

                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
