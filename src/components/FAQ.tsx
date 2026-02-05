import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "¿Cómo puedo inscribirme al congreso?",
    answer: "La inscripción se realiza a través de la página web oficial del evento, donde deberás completar el formulario de registro. Una vez confirmado el pago, recibirás un correo electrónico de confirmación con los detalles de tu participación."
  },
  {
    question: "¿Qué incluye mi inscripción?",
    answer: "El evento cuenta con diferentes modalidades de inscripción, según el nivel de participación. Todas incluyen acceso a las actividades académicas, kit del participante, coffee break, y constancia digital con valor curricular. Para conocer los beneficios específicos y costos de cada modalidad, consulta la sección de Costos e Inscripción en la página web del evento."
  },
  {
    question: "¿Puedo presentar mi investigación o proyecto?",
    answer: "Sí. El evento contará con el Concurso de Carteles Científicos y la Feria de Innovación Biotecnológica, espacios destinados a la presentación y difusión de investigaciones, desarrollos tecnológicos y propuestas innovadoras. Los lineamientos, requisitos y fechas de participación pueden consultarse en la convocatoria correspondiente, disponible en la página web oficial del evento."
  },
  {
    question: "¿Quiénes pueden participar en el congreso?",
    answer: "El congreso está dirigido a estudiantes, egresados y público interesado en conocer los alcances, aplicaciones e impacto de la biotecnología. El evento se concibe como un espacio de encuentro que promueve la interacción académica, la divulgación científica y el intercambio de experiencias entre personas con distintas trayectorias formativas y profesionales.Asimismo, busca visibilizar el trabajo estudiantil, fomentar el liderazgo académico y fortalecer la comunidad biotecnológica mediante una cultura de colaboración interdisciplinaria, contribuyendo a la preparación frente a futuros retos científicos y profesionales."
  },
  {
    question: "¿Recibiré un certificado de asistencia o participación?",
    answer: "Sí. Todos los participantes inscritos recibirán una constancia digital de asistencia con valor curricular. "
  },
  {
    question: "¿Habrá reconocimientos para los proyectos participantes?",
    answer: "Sí. Se otorgarán diversos reconocimientos a los proyectos que destaquen por su excelencia científica, impacto social y ambiental, viabilidad, innovación biotecnológica y presentación, así como un reconocimiento otorgado por el público."
  },
  {
    question: "¿El congreso será presencial, virtual o híbrido?",
    answer: "La modalidad del congreso será presencial y se llevará a cabo en las instalaciones de la Unidad de Seminarios de Ciudad Universitaria BUAP."
  },
  {
    question: "¿Dónde puedo consultar el programa y a los ponentes?",
    answer: "El programa académico, así como la lista de ponentes y actividades, estará disponible en la página web del congreso. "
  },
  {
    question: "¿Dónde puedo obtener más información o resolver dudas adicionales?",
    answer: "Para cualquier duda adicional, puedes comunicarte con el comité organizador a través del correo electrónico o redes sociales oficiales del congreso, disponibles en la sección de contacto."
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
        </div>
      </div>
    </section>
  );
}
