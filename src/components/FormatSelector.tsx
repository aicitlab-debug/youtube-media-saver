import { Music, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export type Format = "mp3" | "mp4";

interface FormatSelectorProps {
  selected: Format;
  onChange: (format: Format) => void;
}

export function FormatSelector({ selected, onChange }: FormatSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-secondary rounded-xl">
      <button
        onClick={() => onChange("mp3")}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300",
          selected === "mp3"
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <Music className="w-4 h-4" />
        MP3
      </button>
      <button
        onClick={() => onChange("mp4")}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300",
          selected === "mp4"
            ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <Video className="w-4 h-4" />
        MP4
      </button>
    </div>
  );
}
