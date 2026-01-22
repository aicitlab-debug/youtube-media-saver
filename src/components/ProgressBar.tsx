import { Check, Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  isLoading: boolean;
  isComplete: boolean;
  onDownload: () => void;
  error: string | null;
  title?: string;
}

const stages = [
  { label: "Fetching video info" },
  { label: "Extracting media" },
  { label: "Converting format" },
  { label: "Preparing download" },
];

export function ProgressBar({ isLoading, isComplete, onDownload, error, title }: ProgressBarProps) {
  if (!isLoading && !isComplete && !error) return null;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        {error ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 text-destructive mb-4">
              <span className="text-2xl">✕</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Conversion Failed
            </h3>
            <p className="text-muted-foreground mb-2">
              {error}
            </p>
          </div>
        ) : isLoading ? (
          <>
            {/* Progress bar with indeterminate animation */}
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-orange-400 rounded-full animate-pulse"
                style={{ width: '60%' }}
              />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
            </div>

            {/* Stage info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-foreground">
                  Processing video...
                </span>
              </div>
            </div>

            {/* Stage indicators */}
            <div className="flex items-center gap-2 mt-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.label}
                  className={cn(
                    "flex-1 h-1 rounded-full transition-all duration-500 bg-primary/30 animate-pulse"
                  )}
                  style={{ animationDelay: `${index * 0.2}s` }}
                />
              ))}
            </div>
          </>
        ) : isComplete ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Conversion Complete!
            </h3>
            {title && (
              <p className="text-muted-foreground mb-2 text-sm truncate max-w-md mx-auto">
                {title}
              </p>
            )}
            <p className="text-muted-foreground mb-6">
              Your file is ready to download
            </p>
            <Button variant="gradient" size="lg" onClick={onDownload}>
              <Download className="w-5 h-5" />
              Download File
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}