import { cn } from "@/lib/utils";
import { Format } from "./FormatSelector";

interface QualitySelectorProps {
  format: Format;
  selected: string;
  onChange: (quality: string) => void;
}

const audioQualities = [
  { value: "320", label: "320 kbps", description: "Highest quality" },
  { value: "256", label: "256 kbps", description: "High quality" },
  { value: "192", label: "192 kbps", description: "Standard" },
  { value: "128", label: "128 kbps", description: "Compressed" },
];

const videoQualities = [
  { value: "1080", label: "1080p", description: "Full HD" },
  { value: "720", label: "720p", description: "HD" },
  { value: "480", label: "480p", description: "SD" },
  { value: "360", label: "360p", description: "Low" },
];

export function QualitySelector({ format, selected, onChange }: QualitySelectorProps) {
  const qualities = format === "mp3" ? audioQualities : videoQualities;

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Select Quality
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {qualities.map((quality) => (
          <button
            key={quality.value}
            onClick={() => onChange(quality.value)}
            className={cn(
              "flex flex-col items-center gap-1 p-4 rounded-xl border transition-all duration-300",
              selected === quality.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-card/80"
            )}
          >
            <span className="font-semibold">{quality.label}</span>
            <span className="text-xs opacity-70">{quality.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
