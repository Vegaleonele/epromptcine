import { ArrowDown, Sparkles, Zap, Film, Palette, Video, ImageIcon, Wand2, Camera, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroThumbnail from "@/assets/hero-thumbnail.jpg";

// Import style preview images for the floating gallery
import stylePixar from "@/assets/styles/style-pixar.jpg";
import styleScifi from "@/assets/styles/style-scifi.jpg";
import styleFantasy from "@/assets/styles/style-fantasy.jpg";
import styleEpic from "@/assets/styles/style-epic.jpg";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-hero-gradient" />
        <div className="absolute top-1/4 left-1/6 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/4 rounded-full blur-[180px]" />
        {/* Film grain overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Main hero content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content - Typography */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Floating badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 animate-fade-in">
              <Badge variant="outline" className="px-3 py-1.5 border-primary/40 bg-primary/10 text-primary gap-1.5 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 border-secondary/40 bg-secondary/10 text-secondary gap-1.5 backdrop-blur-sm">
                <Zap className="w-3 h-3" />
                Pro Quality
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5 border-accent/40 bg-accent/10 text-accent gap-1.5 backdrop-blur-sm">
                <Wand2 className="w-3 h-3" />
                One Click
              </Badge>
            </div>
            
            {/* Main headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-slide-up leading-[1.05]">
              <span className="text-foreground">Tạo Prompt</span>
              <br />
              <span className="gradient-text">Điện Ảnh</span>
              <br />
              <span className="text-foreground">Chuyên Nghiệp</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-lg lg:text-xl text-foreground-muted max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Công cụ AI tạo prompt cho <span className="text-primary font-medium">storyboard</span>, <span className="text-secondary font-medium">keyframe</span> và <span className="text-accent font-medium">text-to-video</span>. 
              Tối ưu cho mọi phong cách từ Pixar đến Sci-Fi.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow-md transition-all duration-300 text-base px-8 h-12"
                onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Bắt đầu miễn phí
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-border-hover hover:bg-muted transition-all duration-300 text-base h-12"
                onClick={() => document.getElementById('styles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Xem phong cách
              </Button>
            </div>
            
            {/* Feature pills row */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-card-border backdrop-blur-sm">
                <ImageIcon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground-muted">Start/End Frame</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-card-border backdrop-blur-sm">
                <Video className="w-4 h-4 text-secondary" />
                <span className="text-sm text-foreground-muted">Video Prompt</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 border border-card-border backdrop-blur-sm">
                <Palette className="w-4 h-4 text-accent" />
                <span className="text-sm text-foreground-muted">9+ Styles</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Visual Showcase */}
          <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main hero image */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative rounded-2xl overflow-hidden border border-card-border shadow-2xl">
                  <img 
                    src={heroThumbnail} 
                    alt="CinePrompt - AI Film Prompt Generator"
                    className="w-full h-auto aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  
                  {/* Overlay badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-lg">
                      <Film className="w-3 h-3 mr-1" />
                      Storyboard
                    </Badge>
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Keyframe
                    </Badge>
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-lg">
                      <Video className="w-3 h-3 mr-1" />
                      Text-to-Video
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Floating mini style gallery */}
              <div className="absolute -bottom-6 -left-6 hidden md:block animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="glass-panel rounded-xl p-2 shadow-2xl">
                  <div className="flex gap-1.5">
                    <img src={stylePixar} alt="Pixar" className="w-14 h-14 rounded-lg object-cover ring-1 ring-card-border" />
                    <img src={styleScifi} alt="Sci-Fi" className="w-14 h-14 rounded-lg object-cover ring-1 ring-card-border" />
                    <img src={styleFantasy} alt="Fantasy" className="w-14 h-14 rounded-lg object-cover ring-1 ring-card-border" />
                  </div>
                  <p className="text-[10px] text-foreground-subtle text-center mt-1.5">9+ Film Styles</p>
                </div>
              </div>
              
              {/* Floating AI badge */}
              <div className="absolute -top-4 -right-4 hidden md:block animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="glass-panel rounded-xl px-4 py-3 shadow-2xl flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wand2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">AI Generator</p>
                    <p className="text-[10px] text-foreground-subtle">Powered by AI</p>
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-primary/15 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-secondary/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="mt-20 pt-12 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.5s" }}>
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
