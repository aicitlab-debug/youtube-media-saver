import { useState } from "react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UrlInput } from "@/components/UrlInput";
import { FormatSelector, Format } from "@/components/FormatSelector";
import { QualitySelector } from "@/components/QualitySelector";
import { VideoPreview } from "@/components/VideoPreview";
import { ProgressBar } from "@/components/ProgressBar";
import { LicenseWarning } from "@/components/LicenseWarning";
import { Features } from "@/components/Features";

const Index = () => {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<Format>("mp3");
  const [quality, setQuality] = useState("320");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");

  const handleUrlSubmit = (submittedUrl: string) => {
    setPendingUrl(submittedUrl);
    setShowWarning(true);
  };

  const handleProceed = () => {
    setShowWarning(false);
    setUrl(pendingUrl);
    setShowPreview(true);
    setIsProcessing(true);
  };

  const handleComplete = () => {
    toast.success("Conversion complete! Ready to download.");
  };

  const handleDownload = () => {
    toast.info("Demo mode: In production, this would download your file.", {
      description: "Connect a backend service to enable actual downloads.",
    });
  };

  const handleReset = () => {
    setUrl("");
    setShowPreview(false);
    setIsProcessing(false);
    setPendingUrl("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Free • Fast • No Sign-up Required
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Convert YouTube to{" "}
              <span className="gradient-text">MP3 & MP4</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The fastest way to download YouTube videos. Paste a link, choose your format, and download instantly.
            </p>
          </div>

          {/* URL Input */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <UrlInput onSubmit={handleUrlSubmit} isLoading={isProcessing} />
          </div>

          {/* Format & Quality selectors */}
          {!showPreview && (
            <div className="flex flex-col items-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <FormatSelector selected={format} onChange={setFormat} />
              <QualitySelector format={format} selected={quality} onChange={setQuality} />
            </div>
          )}

          {/* Video Preview */}
          {showPreview && url && (
            <div className="space-y-6">
              <VideoPreview url={url} />
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <FormatSelector selected={format} onChange={setFormat} />
                </div>
                <QualitySelector format={format} selected={quality} onChange={setQuality} />
              </div>

              <ProgressBar
                isProcessing={isProcessing}
                onComplete={handleComplete}
                onDownload={handleDownload}
              />

              {!isProcessing && (
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    Convert another video
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-card/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to get your audio or video file
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Paste URL", description: "Copy the YouTube video link and paste it in the input field above" },
              { step: "2", title: "Choose Format", description: "Select MP3 for audio only or MP4 for video with your preferred quality" },
              { step: "3", title: "Download", description: "Click convert and download your file directly to your device" },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground text-2xl font-bold mb-4">
                  {item.step}
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { q: "Is TubeGrab free to use?", a: "Yes! TubeGrab is completely free with no hidden charges or subscriptions required." },
              { q: "Do I need to create an account?", a: "No account needed. Just paste your URL and download. It's that simple." },
              { q: "What video quality options are available?", a: "We support up to 1080p for video and 320kbps for audio to ensure the best quality." },
              { q: "Is it legal to download YouTube videos?", a: "Downloading is only permitted for content you own, Creative Commons licensed material, or content you have explicit permission to use." },
            ].map((faq) => (
              <div key={faq.q} className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* License Warning Modal */}
      <LicenseWarning
        isOpen={showWarning}
        onClose={() => setShowWarning(false)}
        onProceed={handleProceed}
      />
    </div>
  );
};

export default Index;
