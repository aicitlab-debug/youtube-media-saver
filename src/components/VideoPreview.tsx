import { Clock, User, Eye } from "lucide-react";

interface VideoPreviewProps {
  url: string;
}

// Extract video ID from YouTube URL
function getVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function VideoPreview({ url }: VideoPreviewProps) {
  const videoId = getVideoId(url);
  
  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted">
          <img
            src={thumbnailUrl}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to lower quality thumbnail
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Video info */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-3">
            Video ready for conversion
          </h3>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>Duration varies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>YouTube Creator</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Views vary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
