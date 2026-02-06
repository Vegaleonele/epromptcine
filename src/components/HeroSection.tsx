import { ArrowDown, Clapperboard, ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
            <Clapperboard className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-muted">
              Professional AI Prompt Engineering
            </span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Craft Cinematic</span>
            <br />
            <span className="gradient-text">Prompts for Film</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Tạo prompt chuyên nghiệp cho storyboard, keyframe và text-to-video. 
            Tối ưu cho mọi phong cách điện ảnh từ Pixar đến Sci-Fi.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow-md transition-all duration-300"
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Bắt đầu tạo prompt
              <ArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {/* Feature cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="glass-panel rounded-xl p-6 text-left hover:border-primary/30 transition-colors animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Image Prompts</h3>
              <p className="text-sm text-foreground-muted">
                Start Frame & End Frame cho storyboard, keyframe, concept art
              </p>
            </div>
            
            <div className="glass-panel rounded-xl p-6 text-left hover:border-primary/30 transition-colors animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">Video Prompts</h3>
              <p className="text-sm text-foreground-muted">
                Text-to-video với motion sequence, camera movement, physics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
