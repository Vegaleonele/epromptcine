import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Wand2 } from "lucide-react";
import { StyleSelector } from "./StyleSelector";
import { BriefInput } from "./BriefInput";
import { SceneDetailsForm } from "./SceneDetailsForm";
import { TechnicalSettings } from "./TechnicalSettings";
import { PromptOutput } from "./PromptOutput";
import { generatePrompts } from "@/lib/promptGenerator";
import type { FilmStyle, SceneDetails, PromptInput, GeneratedPrompts } from "@/types/prompt";

const initialSceneDetails: SceneDetails = {
  subject: "",
  action: "",
  environment: "",
  timeWeather: "",
  mood: "",
  shotType: ""
};

export function PromptGenerator() {
  const [brief, setBrief] = useState("");
  const [style, setStyle] = useState<FilmStyle>("realistic");
  const [customStyle, setCustomStyle] = useState("");
  const [sceneDetails, setSceneDetails] = useState<SceneDetails>(initialSceneDetails);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5");
  const [fps, setFps] = useState("24");
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!brief.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay for UX
    setTimeout(() => {
      const input: PromptInput = {
        brief,
        style,
        customStyle: style === "other" ? customStyle : undefined,
        sceneDetails,
        aspectRatio,
        duration,
        fps
      };
      
      const prompts = generatePrompts(input);
      setGeneratedPrompts(prompts);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <section id="generator" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-4">
              <Wand2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground-muted">Prompt Generator</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Tạo <span className="gradient-text">Cinematic Prompts</span>
            </h2>
            <p className="text-foreground-muted max-w-2xl mx-auto">
              Điền thông tin cảnh quay, chọn phong cách và nhận prompt tối ưu cho image và video
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="glass-panel rounded-xl p-6 space-y-6">
                <BriefInput value={brief} onChange={setBrief} />
                
                <StyleSelector value={style} onChange={setStyle} />
                
                {style === "other" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="customStyle" className="text-sm">Mô tả phong cách tùy chỉnh</Label>
                    <Textarea
                      id="customStyle"
                      value={customStyle}
                      onChange={(e) => setCustomStyle(e.target.value)}
                      placeholder="Mô tả chi tiết phong cách hình ảnh bạn muốn..."
                      className="min-h-[80px] bg-input border-input-border"
                    />
                  </div>
                )}
                
                <SceneDetailsForm value={sceneDetails} onChange={setSceneDetails} />
                
                <TechnicalSettings
                  aspectRatio={aspectRatio}
                  duration={duration}
                  fps={fps}
                  onAspectRatioChange={setAspectRatio}
                  onDurationChange={setDuration}
                  onFpsChange={setFps}
                />
                
                <Button
                  onClick={handleGenerate}
                  disabled={!brief.trim() || isGenerating}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow-md transition-all duration-300 gap-2"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Đang tạo prompt...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Prompts
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Output Section */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <PromptOutput prompts={generatedPrompts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
