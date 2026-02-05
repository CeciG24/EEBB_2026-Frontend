import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002fbb]/90 to-[#002fbb]/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1582719471327-5bd41fcf7f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW90ZWNobm9sb2d5JTIwbGFib3JhdG9yeSUyMHJlc2VhcmNofGVufDF8fHx8MTc2MTAxMzA4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Biotechnology Laboratory"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-[#a0c519]/90 hover:bg-[#a0c519] border-0">Congreso Anual</Badge>
          <h1 className="text-white mb-6" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            Encuentro Estudiantil de Biotecnología BUAP 2026
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8 max-w-2xl">
            Vive dos días de conferencias magistrales, charlas académicas, paneles profesionales
            y actividades estudiantiles donde la biotecnología se conecta con la innovación,
            la creatividad y el futuro profesional.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="text-[#a0c519]" size={20} />
              <span>26 y 27 de marzo de 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="text-[#a0c519]" size={20} />
              <span>Benemérita Universidad Autónoma de Puebla</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => scrollToSection("costos")} className="bg-[#a0c519] hover:bg-[#8bb015] text-white border-0">
              Inscríbete Ahora
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("cronograma")} className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              Ver Cronograma
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}