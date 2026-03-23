import { useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type ActivityType = "BioTalk" | "Convocatoria" | "Panel" | "Ponencia";

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  speaker?: {
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };
  convocatoria?: {
    registroUrl?: string;
    pdfUrl?: string;
    why?: string[];
    awards?: string[];
  };
}

interface Props {
  activity: Activity;
  onClose: () => void;
}

const typeLabels: Record<ActivityType, string> = {
  BioTalk: "BioTalk",
  Convocatoria: "Convocatoria",
  Panel: "Panel",
  Ponencia: "Ponencia",
};

export function ActivityModal({ activity, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 99999 }}
      className="flex items-center justify-center p-4"
    >
      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: "42rem",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.5rem",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9ca3af",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "0.25rem",
          }}
          aria-label="Cerrar"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-8">
          <Badge className="w-fit mb-2 capitalize">
            {typeLabels[activity.type]}
          </Badge>
          <h2
            className="text-gray-900"
            style={{
              fontFamily: "Josefin Sans, sans-serif",
              marginBottom: "0.5rem",
            }}
          >
            {activity.title}
          </h2>
          <p className="text-gray-600">{activity.description}</p>
        </div>

        {/* CHARLAS — info del speaker */}
        {activity.speaker && (
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1.5rem",
              marginTop: "1rem",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
            }}
          >
            {activity.speaker.photo && (
              <img
                src={activity.speaker.photo}
                alt={activity.speaker.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "9999px",
                  objectFit: "cover",
                  flexShrink: 0,
                  backgroundColor: "#e5e7eb",
                }}
              />
            )}
            <div>
              <h4
                style={{
                  fontFamily: "Josefin Sans, sans-serif",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  color: "#111827",
                }}
              >
                {activity.speaker.name}
              </h4>
              <p
                style={{
                  color: "#002fbb",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                {activity.speaker.role}
              </p>
              <p style={{ color: "#4b5563", fontSize: "0.875rem" }}>
                {activity.speaker.bio}
              </p>
            </div>
          </div>
        )}

        {/* CONCURSOS / FERIA — convocatoria */}
        {activity.convocatoria && (
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {/* ¿Por qué asistir? */}
            {activity.convocatoria.why &&
              activity.convocatoria.why.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4
                    style={{
                      fontFamily: "Josefin Sans, sans-serif",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                      color: "#111827",
                    }}
                  >
                    ¿Por qué asistir?
                  </h4>
                  <ul style={{ paddingLeft: "1.25rem", color: "#4b5563" }}>
                    {activity.convocatoria.why.map((reason, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: "0.5rem",
                          listStyleType: "disc",
                        }}
                      >
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Premios a la Excelencia */}
            {activity.convocatoria.awards &&
              activity.convocatoria.awards.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <h4
                    style={{
                      fontFamily: "Josefin Sans, sans-serif",
                      fontWeight: 600,
                      marginBottom: "0.75rem",
                      color: "#111827",
                    }}
                  >
                    Premios a la Excelencia
                  </h4>
                  <ul style={{ paddingLeft: "1.25rem", color: "#4b5563" }}>
                    {activity.convocatoria.awards.map((award, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: "0.5rem",
                          listStyleType: "disc",
                        }}
                      >
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {activity.convocatoria.pdfUrl && (
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={activity.convocatoria.pdfUrl}
                    download={true}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar convocatoria PDF
                  </a>
                </Button>
              )}
              {activity.convocatoria.registroUrl && (
                <Button
                  asChild
                  style={{
                    backgroundColor: "#002fbb",
                    color: "#fff",
                    width: "100%",
                  }}
                >
                  <a
                    href={activity.convocatoria.registroUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ir a registro
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
