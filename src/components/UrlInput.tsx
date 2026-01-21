import { useState } from "react";
import { Link, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function UrlInput({ onSubmit, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const isValidYoutubeUrl = (url: string) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return pattern.test(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Gradient glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Input container */}
        <div className="relative flex items-center gap-3 bg-card border border-border rounded-xl p-2 transition-all duration-300 group-hover:border-primary/30">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
            <Link className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg"
            disabled={isLoading}
          />
          
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={!url.trim() || !isValidYoutubeUrl(url) || isLoading}
            className="shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing
              </>
            ) : (
              "Convert"
            )}
          </Button>
        </div>
      </div>
      
      {url && !isValidYoutubeUrl(url) && (
        <p className="mt-3 text-sm text-destructive animate-fade-in text-center">
          Please enter a valid YouTube URL
        </p>
      )}
    </form>
  );
}
