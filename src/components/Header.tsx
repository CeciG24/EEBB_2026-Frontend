import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#002fbb] to-[#a0c519] rounded-lg flex items-center justify-center">
              <span className="text-white" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>BC</span>
            </div>
            <span className="text-gray-900" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>bioconecta</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("quienes-somos")} className="text-gray-600 hover:text-gray-900 transition-colors">
              Quiénes Somos
            </button>
            <button onClick={() => scrollToSection("objetivos")} className="text-gray-600 hover:text-gray-900 transition-colors">
              Objetivos
            </button>
            <button onClick={() => scrollToSection("cronograma")} className="text-gray-600 hover:text-gray-900 transition-colors">
              Cronograma
            </button>
            <button onClick={() => scrollToSection("premios")} className="text-gray-600 hover:text-gray-900 transition-colors">
              Premios
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </button>
            <Button onClick={() => scrollToSection("costos")}>Inscríbete</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("quienes-somos")} className="text-gray-600 hover:text-gray-900 text-left">
                Quiénes Somos
              </button>
              <button onClick={() => scrollToSection("objetivos")} className="text-gray-600 hover:text-gray-900 text-left">
                Objetivos
              </button>
              <button onClick={() => scrollToSection("donde")} className="text-gray-600 hover:text-gray-900 text-left">
                ¿Dónde Será?
              </button>
              <button onClick={() => scrollToSection("cronograma")} className="text-gray-600 hover:text-gray-900 text-left">
                Cronograma
              </button>
              <button onClick={() => scrollToSection("premios")} className="text-gray-600 hover:text-gray-900 text-left">
                Premios
              </button>
              <button onClick={() => scrollToSection("costos")} className="text-gray-600 hover:text-gray-900 text-left">
                Costos
              </button>
              <button onClick={() => scrollToSection("faq")} className="text-gray-600 hover:text-gray-900 text-left">
                Preguntas Frecuentes
              </button>
              <Button onClick={() => scrollToSection("contacto")} className="w-full">
                Contacto
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}