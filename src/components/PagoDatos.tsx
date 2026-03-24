import { CreditCard, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const datos = [
  { label: "Titular", value: "BUAP EC BIOLOGIA" },
  { label: "Número de cuenta", value: "4057087025" },
  { label: "CLABE interbancaria", value: "021650040570870256" },
  { label: "Número de cliente", value: "11689469" },
  { label: "RFC", value: "UAP370423PP3" },
  { label: "Banco", value: "HSBC" },
];

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-0.5">
          {label}
        </p>
        <p className="text-gray-900 font-mono font-semibold text-sm sm:text-base">
          {value}
        </p>
      </div>
      <button
        onClick={handleCopy}
        title={`Copiar ${label}`}
        className="flex-shrink-0 p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-400 hover:text-gray-700"
      >
        {copied ? (
          <CheckCircle size={16} className="text-green-500" />
        ) : (
          <Copy size={16} />
        )}
      </button>
    </div>
  );
}

export function PagoDatos() {
  return (
    <section id="pago" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h2
            className="text-gray-900 mb-4"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            Datos de Pago
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Los pagos se realizarán a la cuenta de la Facultad de Ciencias
            Biológicas. Favor de conservar su boucher en original porque se
            recibirán durante el registro del primer día
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-4">
          {/* Aviso destacado */}
          <div className="flex gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <AlertCircle
              size={20}
              className="text-[#002fbb] flex-shrink-0 mt-0.5"
            />
            <p className="text-sm text-blue-800">
              Favor de escribir en la parte superior de tu baucher de pago tu{" "}
              <span className="font-bold">nombre completo con tinta azul</span>{" "}
              antes de enviarlo.
            </p>
          </div>

          {/* Tarjeta de datos */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#002fbb] to-[#0040dd] px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <CreditCard size={18} className="text-white" />
              </div>
              <div>
                <p
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: "Josefin Sans, sans-serif" }}
                >
                  Cuenta Facultad de Ciencias Biológicas
                </p>
                <p className="text-blue-200 text-xs">BUAP · Banamex</p>
              </div>
            </div>

            {/* Campos */}
            <div className="px-5 divide-y divide-gray-100">
              {datos.map((d) => (
                <CopyField key={d.label} label={d.label} value={d.value} />
              ))}
            </div>
          </div>

          {/* Nota dirección */}
          <p className="text-center text-xs text-gray-400">
            C. 4 Sur No. 104, Col. Puebla Centro, 72000 Puebla, Pue.
          </p>
        </div>
      </div>
    </section>
  );
}
