import { MapPin, Calendar, Clock, Building2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function Donde() {
  return (
    <section id="donde" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>¿Dónde Será?</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            El congreso se llevará a cabo en la Benemerita Universidad Autonoma de Puebla, una de las instituciones de investigación 
            más prestigiosas del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg overflow-hidden h-96">
            <img
              src="https://www.ifuap.buap.mx/eventos/TSimulacion_Mol2013/archivos/UnidadSeminarios.jpg"
              alt="Unidad de Seminarios BUAP"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#002fbb]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-[#002fbb]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Ubicación</h3>
                    <p className="text-gray-600">
                      Benemerita Universidad Autonoma de Puebla<br />
                      Unidad de Seminarios<br />
                      Ciudad Universitaria<br />
                      Puebla, México
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#a0c519]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-[#a0c519]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Fechas</h3>
                    <p className="text-gray-600">
                      26 - 27 de Marzo, 2026<br />
                      2 días de conferencias, actividades y networking
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#002fbb]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-[#002fbb]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Instalaciones</h3>
                    <p className="text-gray-600">
                      Auditorio principal con capacidad para 800 personas<br />
                      Salas de talleres completamente equipadas<br />
                      Área de exposición y networking
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-[#a0c519]/10 border border-[#a0c519]/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Clock className="text-[#002fbb] flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Horario del Evento</h3>
              <p className="text-gray-600">
                Sesiones matutinas: 9:00 AM - 12:30 PM<br />
                Almuerzo y networking: 12:30 PM - 2:00 PM<br />
                Sesiones vespertinas: 2:00 PM - 6:00 PM<br />
                Eventos sociales: 7:00 PM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
