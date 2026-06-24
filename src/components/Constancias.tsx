import { useEffect, useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Constancia = {
  nombre: string;
  archivo: string;
};

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]/g, " ")
    .trim();
}

function nombreDesdeArchivo(archivo: string) {
  return archivo
    .replace(/\.pdf$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
}

export function Constancias() {
  const [constancias, setConstancias] = useState<Constancia[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/constancias/index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el indice de constancias.");
        }

        return response.json();
      })
      .then((data: Constancia[]) => {
        setConstancias(data);
        setError(false);
      })
      .catch(() => {
        setConstancias([]);
        setError(true);
      });
  }, []);

  const resultados = useMemo(() => {
    const texto = normalizar(busqueda);

    if (texto.length < 3) {
      return [];
    }

    return constancias.filter((constancia) =>
      normalizar(constancia.nombre).includes(texto),
    );
  }, [busqueda, constancias]);

  return (
    <section id="constancias" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Descarga de Constancias
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Escribe tu nombre para encontrar y descargar tu constancia de
            participacion.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
              placeholder="Buscar por nombre"
              className="pl-10 h-11"
              aria-label="Buscar constancia por nombre"
            />
          </div>

          <div className="mt-6 space-y-3">
            {error && (
              <p className="text-sm text-red-600">
                No se pudo cargar la lista de constancias. Revisa que exista el
                archivo public/constancias/index.json.
              </p>
            )}

            {!error && busqueda.trim().length > 0 && busqueda.trim().length < 3 && (
              <p className="text-sm text-gray-500">
                Escribe al menos 3 letras para buscar.
              </p>
            )}

            {!error && busqueda.trim().length >= 3 && resultados.length === 0 && (
              <p className="text-sm text-gray-500">
                No encontramos una constancia con ese nombre.
              </p>
            )}

            {resultados.map((constancia) => (
              <div
                key={constancia.archivo}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-gray-100 rounded-lg p-4"
              >
                <span className="text-gray-900 font-medium">
                  {constancia.nombre || nombreDesdeArchivo(constancia.archivo)}
                </span>

                <Button asChild>
                  <a
                    href={`/constancias/${encodeURIComponent(constancia.archivo)}`}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Download size={16} />
                    Descargar
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
