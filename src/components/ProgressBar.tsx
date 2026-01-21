import { useEffect, useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  isProcessing: boolean;
  onComplete: () => void;
  onDownload: () => void;
}

const stages = [
  { label: "Fetching video info", duration: 1500 },
  { label: "Extracting media", duration: 2000 },
  { label: "Converting format", duration: 2500 },
  { label: "Preparing download", duration: 1000 },
];

export function ProgressBar({ isProcessing, onComplete, onDownload }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isProcessing) {
      setProgress(0);
      setCurrentStage(0);
      setIsComplete(false);
      return;
    }

    let totalTime = 0;
    const totalDuration = stages.reduce((acc, s) => acc + s.duration, 0);
    
    stages.forEach((stage, index) => {
      setTimeout(() => {
        setCurrentStage(index);
      }, totalTime);
      totalTime += stage.duration;
    });

    // Animate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onComplete();
          }, 300);
          return 100;
        }
        return next;
      });
    }, totalDuration / 100);

    return () => clearInterval(interval);
  }, [isProcessing, onComplete]);

  if (!isProcessing && !isComplete) return null;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass-card rounded-2xl p-6">
        {!isComplete ? (
          <>
            {/* Progress bar */}
            <div className="relative h-3 bg-secondary rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-orange-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />
            </div>

            {/* Stage info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-foreground">
                  {stages[currentStage]?.label || "Processing..."}
                </span>
              </div>
              <span className="text-sm font-mono text-muted-foreground">
                {progress}%
              </span>
            </div>

            {/* Stage indicators */}
            <div className="flex items-center gap-2 mt-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.label}
                  className={cn(
                    "flex-1 h-1 rounded-full transition-all duration-500",
                    index < currentStage
                      ? "bg-primary"
                      : index === currentStage
                      ? "bg-primary/50"
                      : "bg-secondary"
                  )}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Conversion Complete!
            </h3>
            <p className="text-muted-foreground mb-6">
              Your file is ready to download
            </p>
            <Button variant="gradient" size="lg" onClick={onDownload}>
              <Download className="w-5 h-5" />
              Download File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
