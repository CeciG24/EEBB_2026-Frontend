import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type ActivityType = "charla" | "concurso" | "panel" | "feria";

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
    requirements: string[];
    fechas: string;
    registroUrl?: string;
  };
}

interface Props {
  activity: Activity;
  onClose: () => void;
}

export function ActivityModal({ activity, onClose }: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <Badge className="w-fit mb-2 capitalize">
            {activity.type}
          </Badge>

          <DialogTitle
            className="text-gray-900"
            style={{ fontFamily: "Josefin Sans, sans-serif" }}
          >
            {activity.title}
          </DialogTitle>
        </DialogHeader>

        {/* DESCRIPCIÓN GENERAL */}
        <p className="text-gray-600 mb-6">
          {activity.description}
        </p>

        {/* ===== CHARLAS / CONFERENCIAS ===== */}
        {activity.speaker && (
          <div className="flex gap-4 items-start border-t pt-6">
            {activity.speaker.photo && (
              <img
                src={activity.speaker.photo}
                alt={activity.speaker.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}

            <div>
              <h4 className="text-gray-900 font-semibold">
                {activity.speaker.name}
              </h4>
              <p className="text-[#002fbb] mb-2">
                {activity.speaker.role}
              </p>
              <p className="text-gray-600 text-sm">
                {activity.speaker.bio}
              </p>
            </div>
          </div>
        )}

        {/* ===== CONCURSOS ===== */}
        {activity.convocatoria && (
          <div className="border-t pt-6">
            <h4
              className="text-gray-900 mb-3"
              style={{ fontFamily: "Josefin Sans, sans-serif" }}
            >
              Convocatoria
            </h4>

            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
              {activity.convocatoria.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>

            <p className="text-sm text-gray-500 mb-4">
              <strong>Fechas:</strong> {activity.convocatoria.fechas}
            </p>

            {activity.convocatoria.registroUrl && (
              <Button asChild className="w-full bg-[#002fbb]">
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
        )}
      </DialogContent>
    </Dialog>
  );
}
