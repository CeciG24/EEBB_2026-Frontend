import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export function Contacto() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío del formulario
    alert("Gracias por tu mensaje. Te contactaremos pronto.");
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Contacto</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Contáctanos por cualquiera de los siguientes medios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#002fbb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-[#002fbb]" size={24} />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Email</h3>
              <a 
            href="mailto:betzie.espinozah@alumno.buap.mx "
            className="text-[#002fbb] hover:underline"
          >
            betzie.espinozah@alumno.buap.mx
          </a>
          <br />
          <a 
            href="mailto:valeria.lozag@alumno.buap.mx "
            className="text-[#002fbb] hover:underline"
          >
            valeria.lozag@alumno.buap.mx
          </a>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#a0c519]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-[#a0c519]" size={24} />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Teléfono</h3>
              <a 
                href="tel:+52 2222295500 " 
                className="text-[#002fbb] hover:underline"
              >
                +52 (222) 2295500 
              </a>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-[#002fbb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-[#002fbb]" size={24} />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Dirección</h3>
              <p className="text-gray-600">
                Facultad de Ciencias Biológicas
Blvd. Valsequillo y Av. San Claudio, Edificio 112-A

Ciudad Universitaria, Col. Jardines de San Manuel,

Puebla, Pue. México, C. P. 72570
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <h3 className="text-gray-900 mb-6 text-center" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Envíanos un Mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input 
                      id="nombre" 
                      type="text" 
                      placeholder="Tu nombre" 
                      required 
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="tu@email.com" 
                      required 
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="asunto">Asunto</Label>
                  <Input 
                    id="asunto" 
                    type="text" 
                    placeholder="¿Sobre qué quieres escribirnos?" 
                    required 
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea 
                    id="mensaje" 
                    placeholder="Escribe tu mensaje aquí..." 
                    required 
                    rows={6}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#002fbb] hover:bg-[#001f8f]">
                  <Send size={18} className="mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 bg-gradient-to-r from-[#002fbb]/5 to-[#a0c519]/10 border border-[#002fbb]/20 rounded-lg p-6">
            <h3 className="text-gray-900 mb-2 text-center" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Horario de Atención</h3>
            <div className="text-center text-gray-600">
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM (PST)</p>
              <p className="mt-1">Tiempo de respuesta: 24-48 horas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
