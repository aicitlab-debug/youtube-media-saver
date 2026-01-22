import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DownloadRequest {
  videoUrl: string;
  format: 'mp3' | 'mp4';
  quality: string;
}

// Extract video ID from YouTube URL
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY');
    if (!RAPIDAPI_KEY) {
      console.error('RAPIDAPI_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { videoUrl, format, quality }: DownloadRequest = await req.json();
    console.log(`Processing request: ${videoUrl}, format: ${format}, quality: ${quality}`);

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Extracted video ID: ${videoId}`);

    // Use YouTube MP3 API for audio, different endpoint for video
    if (format === 'mp3') {
      // Get download URL from YouTube MP310 API
      const apiUrl = `https://youtube-mp310.p.rapidapi.com/download/mp3?url=${encodeURIComponent(videoUrl)}`;
      
      console.log('Calling YouTube MP310 API for MP3...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'youtube-mp310.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: 'Failed to process video', details: errorText }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      console.log('API response:', JSON.stringify(data));

      // The API returns downloadUrl in the response
      const downloadUrl = data.downloadUrl || data.dlink || data.link || data.url;
      const title = data.title || 'YouTube Audio';

      if (!downloadUrl) {
        return new Response(
          JSON.stringify({ error: 'No download URL returned', data }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          downloadUrl, 
          title,
          format: 'mp3',
          quality: quality || '128'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      // For MP4 video downloads, use the same API with mp4 endpoint
      const apiUrl = `https://youtube-mp310.p.rapidapi.com/download/mp4?url=${encodeURIComponent(videoUrl)}`;
      
      console.log('Calling YouTube MP310 API for MP4...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'youtube-mp310.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error:', response.status, errorText);
        return new Response(
          JSON.stringify({ error: 'Failed to process video', details: errorText }),
          { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const data = await response.json();
      console.log('API response:', JSON.stringify(data));

      const downloadUrl = data.downloadUrl || data.link || data.url;
      const title = data.title || 'YouTube Video';

      if (!downloadUrl) {
        return new Response(
          JSON.stringify({ error: 'No download URL returned', data }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          downloadUrl, 
          title,
          format: 'mp4',
          quality: quality || '720'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
