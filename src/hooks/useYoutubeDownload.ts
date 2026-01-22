import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DownloadResult {
  success: boolean;
  downloadUrl: string;
  title: string;
  format: string;
  quality: string;
}

interface UseYoutubeDownloadReturn {
  isLoading: boolean;
  isComplete: boolean;
  downloadResult: DownloadResult | null;
  error: string | null;
  startDownload: (videoUrl: string, format: "mp3" | "mp4", quality: string) => Promise<void>;
  triggerDownload: () => void;
  reset: () => void;
}

export function useYoutubeDownload(): UseYoutubeDownloadReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [downloadResult, setDownloadResult] = useState<DownloadResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startDownload = async (videoUrl: string, format: "mp3" | "mp4", quality: string) => {
    setIsLoading(true);
    setIsComplete(false);
    setError(null);
    setDownloadResult(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('youtube-download', {
        body: { videoUrl, format, quality }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to process video');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to get download URL');
      }

      setDownloadResult(data);
      setIsComplete(true);
      toast.success("Conversion complete! Ready to download.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      toast.error("Conversion failed", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerDownload = () => {
    if (downloadResult?.downloadUrl) {
      // Cross-origin downloads often ignore the `download` attribute.
      // Opening a new tab is the most reliable UX; the user can then save the file.
      const opened = window.open(downloadResult.downloadUrl, "_blank", "noopener,noreferrer");

      if (!opened) {
        toast.error("Popup blocked", {
          description: "Please allow popups for this site, then click Download again.",
        });
        return;
      }

      toast.success("Download opened in a new tab");
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsComplete(false);
    setDownloadResult(null);
    setError(null);
  };

  return {
    isLoading,
    isComplete,
    downloadResult,
    error,
    startDownload,
    triggerDownload,
    reset
  };
}
