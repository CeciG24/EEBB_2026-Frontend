import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin } from "lucide-react";

const scheduleData = {
  day1: [
    {
      time: "08:00 - 09:00",
      title: "Registro y Café de Bienvenida",
      location: "Salón Principal",
      type: "registration"
    },
    {
      time: "09:00 - 10:30",
      title: "Ceremonia de Apertura y Conferencia Magistral: Aplicaciones de CRISPR en Medicina",
      speaker: "Dra. Sarah Chen",
      location: "Auditorio A",
      type: "keynote"
    },
    {
      time: "10:30 - 11:00",
      title: "Pausa para Café y Networking",
      location: "Área de Exposición",
      type: "break"
    },
    {
      time: "11:00 - 12:30",
      title: "Panel: El Futuro de la Ingeniería Genética",
      location: "Auditorio A",
      type: "panel"
    },
    {
      time: "12:30 - 14:00",
      title: "Almuerzo y Sesión de Pósters",
      location: "Comedor",
      type: "break"
    },
    {
      time: "14:00 - 16:00",
      title: "Talleres Paralelos: Terapia Génica y Biología Sintética",
      location: "Laboratorios 1-3",
      type: "workshop"
    },
    {
      time: "16:00 - 17:30",
      title: "Presentaciones de Investigación",
      location: "Salas Múltiples",
      type: "presentation"
    }
  ],
  day2: [
    {
      time: "09:00 - 10:30",
      title: "Conferencia Magistral: Biología Sintética y Aplicaciones Futuras",
      speaker: "Dr. James Rodríguez",
      location: "Auditorio A",
      type: "keynote"
    },
    {
      time: "10:30 - 11:00",
      title: "Pausa para Café",
      location: "Área de Exposición",
      type: "break"
    },
    {
      time: "11:00 - 12:30",
      title: "Foco en la Industria: Startups de Biotecnología",
      location: "Auditorio B",
      type: "panel"
    },
    {
      time: "12:30 - 14:00",
      title: "Almuerzo de Networking",
      location: "Comedor",
      type: "break"
    },
    {
      time: "14:00 - 16:00",
      title: "Talleres Avanzados: Técnicas CRISPR",
      location: "Laboratorios de Investigación",
      type: "workshop"
    },
    {
      time: "16:00 - 18:00",
      title: "Competencia de Pósters y Premios",
      location: "Área de Exposición",
      type: "presentation"
    },
    {
      time: "19:00 - 22:00",
      title: "Cena de Gala y Networking",
      location: "Centro Universitario",
      type: "social"
    }
  ],
  day3: [
    {
      time: "09:00 - 10:30",
      title: "Conferencia Magistral: Innovaciones en Terapia Génica",
      speaker: "Dra. Amara Okafor",
      location: "Auditorio A",
      type: "keynote"
    },
    {
      time: "10:30 - 11:00",
      title: "Pausa para Café",
      location: "Área de Exposición",
      type: "break"
    },
    {
      time: "11:00 - 12:30",
      title: "Mesa Redonda: Ética en Biotecnología",
      location: "Sala de Conferencias",
      type: "panel"
    },
    {
      time: "12:30 - 14:00",
      title: "Almuerzo de Clausura",
      location: "Comedor",
      type: "break"
    },
    {
      time: "14:00 - 15:30",
      title: "Premios al Mejor Trabajo y Ceremonia de Clausura",
      location: "Auditorio A",
      type: "keynote"
    }
  ]
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "keynote":
      return "bg-[#002fbb]/10 text-[#002fbb] border-[#002fbb]/30";
    case "workshop":
      return "bg-[#a0c519]/10 text-[#a0c519] border-[#a0c519]/30";
    case "panel":
      return "bg-[#002fbb]/20 text-[#002fbb] border-[#002fbb]/40";
    case "presentation":
      return "bg-[#a0c519]/20 text-[#7ca010] border-[#a0c519]/40";
    case "social":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export function Schedule() {
  return (
    <section id="cronograma" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Cronograma del Evento</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Tres días llenos de charlas inspiradoras, talleres prácticos y oportunidades de networking.
          </p>
        </div>

        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="day1">Día 1</TabsTrigger>
            <TabsTrigger value="day2">Día 2</TabsTrigger>
            <TabsTrigger value="day3">Día 3</TabsTrigger>
          </TabsList>

          {Object.entries(scheduleData).map(([day, events], dayIndex) => (
            <TabsContent key={day} value={day} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-900" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{15 + dayIndex} de Marzo, 2025</p>
              </div>
              {events.map((event, index) => (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-center gap-2 text-gray-600 md:w-32 flex-shrink-0">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <h3 className="text-gray-900" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{event.title}</h3>
                          <Badge className={`w-fit ${getTypeColor(event.type)}`}>
                            {event.type}
                          </Badge>
                        </div>
                        {event.speaker && (
                          <p className="text-[#002fbb] mb-2">{event.speaker}</p>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}