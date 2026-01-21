import { Zap, Shield, Smartphone, Settings2 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Convert videos in seconds with our optimized processing engine",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "No files stored on servers. Direct download to your device",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Fully responsive design for desktop, tablet, and mobile",
  },
  {
    icon: Settings2,
    title: "Quality Options",
    description: "Choose from multiple quality presets for audio and video",
  },
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose <span className="gradient-text">TubeGrab</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The fastest, most reliable way to convert YouTube videos to MP3 and MP4 formats
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group glass-card rounded-2xl p-6 hover:bg-white/5 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
