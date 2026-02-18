import { ImageIcon, Video, Palette, Wand2, Camera, Layers, Sparkles, Zap } from "lucide-react";
import styleRealistic from "@/assets/styles/style-realistic.jpg";
import styleEpic from "@/assets/styles/style-epic.jpg";
import styleAnime from "@/assets/styles/style-anime.jpg";

const features = [
  {
    icon: ImageIcon,
    title: "Start & End Frame",
    description: "Tạo prompt cho khung hình đầu và cuối, tối ưu cho storyboard chuyên nghiệp.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    icon: Video,
    title: "Video Prompt",
    description: "Prompt text-to-video chi tiết với chuyển động, nhịp điệu và kỹ thuật quay phim.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
  {
    icon: Palette,
    title: "9+ Film Styles",
    description: "Từ Pixar đến Horror, mỗi style đều có hệ thống ánh sáng, camera và texture riêng.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
  {
    icon: Wand2,
    title: "AI Analysis",
    description: "AI phân tích brief của bạn và tạo prompt với ngôn ngữ điện ảnh chuyên nghiệp.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  {
    icon: Camera,
    title: "Camera & Lighting",
    description: "Tự động bổ sung kỹ thuật camera, ánh sáng và góc quay phù hợp với scene.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
  {
    icon: Layers,
    title: "File Instruction",
    description: "Upload project bible hoặc style guide để AI tạo prompt nhất quán với dự án.",
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
  },
];

export function FeaturesShowcase() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-6">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm text-foreground-muted">Tính năng nổi bật</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Mọi thứ bạn cần để tạo
            <br />
            <span className="gradient-text">Cinematic Prompts</span>
          </h2>
          <p className="text-foreground-muted max-w-2xl mx-auto text-lg">
            Công cụ toàn diện cho filmmaker, animator và content creator
          </p>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-16">
          {features.map((feature, i) => (
            <div 
              key={feature.title}
              className={`glass-panel rounded-2xl p-6 border ${feature.borderColor} hover:border-opacity-60 transition-all duration-300 group hover:-translate-y-1`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Visual showcase strip */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl p-6 md:p-8 border border-card-border">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Phong cách đa dạng</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative rounded-xl overflow-hidden group aspect-[4/3]">
                <img src={styleRealistic} alt="Realistic Style" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-display font-semibold">Realistic</span>
                  <p className="text-[11px] text-foreground-muted">Live-Action Quality</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden group aspect-[4/3]">
                <img src={styleEpic} alt="Epic Style" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-display font-semibold">Epic</span>
                  <p className="text-[11px] text-foreground-muted">Grand & Heroic</p>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden group aspect-[4/3]">
                <img src={styleAnime} alt="Anime Style" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-sm font-display font-semibold">Anime</span>
                  <p className="text-[11px] text-foreground-muted">Stylized Animation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
