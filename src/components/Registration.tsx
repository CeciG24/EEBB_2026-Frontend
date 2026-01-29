import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

export function Registration() {
  const [level, setLevel] = useState<"prepa" | "uni">("uni");

  const assistantPrice = level === "prepa" ? "$150" : "$300";

  return (
    <section id="costos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-gray-900 text-2xl font-bold mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Costos de Inscripción
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            El Encuentro Estudiantil de Biotecnología BUAP (EEBB 2026) ofrece
            distintas modalidades de inscripción, pensadas para que cada
            asistente elija la experiencia que mejor se adapte a su nivel de
            participación.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* ASISTENTE */}
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  Asistente
                </h3>

                {/* Selector */}
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setLevel("prepa")}
                    className={`px-4 py-1 rounded-full text-sm border transition
                      ${
                        level === "prepa"
                          ? "bg-[#002fbb] text-white border-[#002fbb]"
                          : "border-gray-300 text-gray-600"
                      }`}
                  >
                    Preparatoria
                  </button>
                  <button
                    onClick={() => setLevel("uni")}
                    className={`px-4 py-1 rounded-full text-sm border transition
                      ${
                        level === "uni"
                          ? "bg-[#002fbb] text-white border-[#002fbb]"
                          : "border-gray-300 text-gray-600"
                      }`}
                  >
                    Universidad
                  </button>
                </div>

                <div
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  {assistantPrice}
                </div>

                <p className="text-gray-600">Acceso completo a:</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Conferencias magistrales",
                  "Ponencias temáticas",
                  "Mesas redondas con egresados",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className="text-[#a0c519] flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">
                Inscribirse Ahora
              </Button>
            </CardContent>
          </Card>

          {/* PARTICIPANTE ACTIVO */}
          <Card className="border-gray-200 relative ring-2 ring-[#002fbb]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#a0c519] text-white px-4 py-1 rounded-full text-sm">
                Más Popular
              </div>
            </div>

            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  Participante Activo
                </h3>
                <div
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  $450
                </div>
                <p className="text-gray-600">
                  Incluye todo lo del nivel Asistente, más:
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Feria de Innovación",
                  "Exposición de Carteles Científicos",
                  "Muro de Arte Biotecnológico",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className="text-[#a0c519] flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-[#002fbb] hover:bg-[#001f8f]">
                Inscribirse Ahora
              </Button>
            </CardContent>
          </Card>

          {/* EXPERIENCIA TOTAL */}
          <Card className="border-gray-200">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  Experiencia Total
                </h3>
                <div
                  className="text-gray-900 mb-2"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  $600
                </div>
                <p className="text-gray-600">Incluye:</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Acceso completo al evento",
                  "Participación en todas las convocatorias",
                  "Constancia con mención especial como Participante Integral EEBB 2026",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className="text-[#a0c519] flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full">
                Inscribirse Ahora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
