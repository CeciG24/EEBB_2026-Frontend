import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#002fbb] to-[#a0c519] rounded-lg flex items-center justify-center">
                <span
                  className="text-white"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  BC
                </span>
              </div>
              <span
                className="text-white"
                style={{ fontFamily: "Josefin Sans, sans-serif" }}
              >
                Encuentro Estudiantil Biotecnologia BUAP
              </span>
            </div>
            <p className="text-gray-400">
              Avanzando en la investigación biotecnológica a través de la
              colaboración y la innovación.
            </p>
          </div>

          <div>
            <h3
              className="text-white mb-4"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("quienes-somos")}
                  className="hover:text-white transition-colors"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("objetivos")}
                  className="hover:text-white transition-colors"
                >
                  Objetivos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cronograma")}
                  className="hover:text-white transition-colors"
                >
                  Cronograma
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("premios")}
                  className="hover:text-white transition-colors"
                >
                  Premios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("costos")}
                  className="hover:text-white transition-colors"
                >
                  Inscripción
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className="text-white mb-4"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Síguenos
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/eebbuap?igsh=MWc0ZWkzZmNvcHZvcQ=="
                className="hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} bioconecta. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}