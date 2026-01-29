import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "¿Cómo puedo inscribirme al congreso?",
    answer: "Puedes inscribirte directamente a través de nuestra página web haciendo clic en el botón 'Inscribirse Ahora' en cualquiera de las opciones de pago. También puedes contactarnos por correo electrónico para asistencia personalizada."
  },
  {
    question: "¿Hay descuentos disponibles?",
    answer: "Sí, ofrecemos descuentos early bird hasta el 1 de octubre de 2025 (20% de descuento). También contamos con descuentos grupales para inscripciones de 5 o más personas. Los estudiantes tienen una tarifa especial reducida."
  },
  {
    question: "¿Qué incluye mi inscripción?",
    answer: "Tu inscripción incluye acceso a todas las sesiones plenarias, talleres, materiales del congreso, pausas para café, y comidas según el tipo de inscripción elegida. Las categorías Académico e Industria también incluyen acceso a la cena de gala y eventos especiales de networking."
  },
  {
    question: "¿Puedo presentar mi investigación?",
    answer: "Sí, aceptamos presentaciones orales y pósters. La fecha límite para enviar resúmenes es el 15 de enero de 2025. Los resúmenes aceptados serán notificados antes del 15 de febrero de 2025."
  },
  {
    question: "¿Cómo llego al campus de Stanford?",
    answer: "El campus está ubicado en Stanford, California. El aeropuerto más cercano es San Francisco (SFO) a 30 millas, y San José (SJC) a 15 millas. Ofrecemos servicio de shuttle desde ambos aeropuertos. También hay opciones de tren (Caltrain) y transporte local."
  },
  {
    question: "¿Hay alojamiento disponible?",
    answer: "Hemos negociado tarifas especiales con hoteles cercanos. Usa el código 'BIOTECH2025' al reservar. Los precios van desde $189/noche. Las opciones incluyen Stanford Park Hotel, Sheraton Palo Alto y Westin Palo Alto."
  },
  {
    question: "¿Recibiré un certificado de asistencia?",
    answer: "Sí, todos los participantes inscritos recibirán un certificado de asistencia digital al finalizar el congreso. Los certificados se enviarán por correo electrónico dentro de una semana después del evento."
  },
  {
    question: "¿Qué medidas de seguridad sanitaria están implementadas?",
    answer: "Seguimos todas las regulaciones sanitarias vigentes. Contamos con espacios amplios y bien ventilados, estaciones de desinfección en todo el venue, y protocolos de limpieza reforzados. Actualizaremos las medidas según sea necesario."
  },
  {
    question: "¿Puedo cancelar mi inscripción?",
    answer: "Las cancelaciones realizadas hasta 30 días antes del evento recibirán un reembolso del 80%. Cancelaciones entre 15-30 días antes recibirán 50% de reembolso. No se otorgan reembolsos para cancelaciones con menos de 15 días de anticipación."
  },
  {
    question: "¿Habrá oportunidades de networking?",
    answer: "Sí, hemos planificado múltiples sesiones de networking incluyendo pausas para café, almuerzos, una cena de gala, y eventos sociales específicamente diseñados para facilitar la conexión entre participantes, investigadores e industria."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>Preguntas Frecuentes</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre el congreso.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="text-gray-900" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center bg-[#a0c519]/10 border border-[#a0c519]/30 rounded-lg p-6">
          <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>¿No encuentras tu respuesta?</h3>
          <p className="text-gray-600 mb-4">
            Nuestro equipo está aquí para ayudarte. No dudes en contactarnos.
          </p>
          <a 
            href="mailto:congreso@universidad.edu"
            className="text-[#002fbb] hover:underline"
          >
            congreso@universidad.edu
          </a>
        </div>
      </div>
    </section>
  );
}
