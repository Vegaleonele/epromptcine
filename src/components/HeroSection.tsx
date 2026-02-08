import { ArrowDown, Sparkles, Zap, Film, Palette, Video, ImageIcon, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroThumbnail from "@/assets/hero-thumbnail.jpg";

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Typography */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Floating badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6 animate-fade-in">
              <Badge variant="outline" className="px-3 py-1.5 border-primary/40 bg-primary/10 text-primary gap-1.5">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 border-secondary/40 bg-secondary/10 text-secondary gap-1.5">
                <Zap className="w-3 h-3" />
                Pro Quality
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 border-accent/40 bg-accent/10 text-accent gap-1.5">
                <Wand2 className="w-3 h-3" />
                One Click
              </Badge>
            </div>
            
            {/* Main headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-slide-up leading-[1.1]">
              <span className="text-foreground">Tạo Prompt</span>
              <br />
              <span className="gradient-text">Điện Ảnh</span>
              <br />
              <span className="text-foreground">Chuyên Nghiệp</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Công cụ AI tạo prompt cho <span className="text-primary font-medium">storyboard</span>, <span className="text-secondary font-medium">keyframe</span> và <span className="text-accent font-medium">text-to-video</span>. 
              Tối ưu cho mọi phong cách từ Pixar đến Sci-Fi.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow-md transition-all duration-300 text-base px-8"
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Bắt đầu miễn phí
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border-hover hover:bg-muted transition-all duration-300 text-base"
                onClick={() => document.getElementById('styles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Xem phong cách
              </Button>
            </div>
            
            {/* Feature badges row */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground-muted">Start/End Frame</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border">
                <Video className="w-4 h-4 text-secondary" />
                <span className="text-sm text-foreground-muted">Video Prompt</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border">
                <Palette className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground-muted">9+ Styles</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative group">
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden border border-card-border shadow-2xl">
                <img 
                  src={heroThumbnail} 
                  alt="CinePrompt - AI Film Prompt Generator"
                  className="w-full h-auto aspect-video object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Floating badges on image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-none">
                    <Film className="w-3 h-3 mr-1" />
                    Storyboard
                  </Badge>
                  <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-none">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Keyframe
                  </Badge>
                  <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-none">
                    <Video className="w-3 h-3 mr-1" />
                    Text-to-Video
                  </Badge>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
        
        {/* Bottom stats/trust indicators */}
        <div className="mt-16 pt-12 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">9+</div>
              <div className="text-sm text-foreground-muted">Film Styles</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">AI</div>
              <div className="text-sm text-foreground-muted">Powered</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">Pro</div>
              <div className="text-sm text-foreground-muted">Quality</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">Free</div>
              <div className="text-sm text-foreground-muted">To Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
