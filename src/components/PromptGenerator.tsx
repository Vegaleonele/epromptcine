import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Wand2, Zap, Brain } from "lucide-react";
import { toast } from "sonner";
import { StyleSelector } from "./StyleSelector";
import { BriefInput } from "./BriefInput";
import { SceneDetailsForm } from "./SceneDetailsForm";
import { TechnicalSettings } from "./TechnicalSettings";
import { PromptOutput } from "./PromptOutput";
import { FileUpload } from "./FileUpload";
import { PromptHistory } from "./PromptHistory";
import { generatePrompts } from "@/lib/promptGenerator";
import { savePrompt, type SavedPrompt } from "@/lib/promptHistory";
import { savePromptToDatabase, type DatabasePrompt } from "@/lib/promptDatabase";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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
  const { user } = useAuth();
  const [brief, setBrief] = useState("");
  const [style, setStyle] = useState<FilmStyle>("realistic");
  const [customStyle, setCustomStyle] = useState("");
  const [sceneDetails, setSceneDetails] = useState<SceneDetails>(initialSceneDetails);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [duration, setDuration] = useState("5");
  const [fps, setFps] = useState("24");
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompts | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [instructionContent, setInstructionContent] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const saveToStorage = useCallback(async (prompts: GeneratedPrompts) => {
    const promptData = {
      brief,
      style,
      customStyle: style === "other" ? customStyle : undefined,
      analysis: prompts.analysis,
      startFrame: prompts.startFrame,
      endFrame: prompts.endFrame,
      videoPrompt: prompts.videoPrompt,
      sceneDetails,
      aspectRatio,
      duration,
      fps
    };

    if (user) {
      // Save to database
      const { error } = await savePromptToDatabase(promptData);
      if (error) {
        console.error("Failed to save to database:", error);
        // Fallback to local storage
        savePrompt(promptData);
      }
    } else {
      // Save to local storage
      savePrompt(promptData);
    }
    setHistoryRefresh(prev => prev + 1);
  }, [user, brief, style, customStyle, sceneDetails, aspectRatio, duration, fps]);

  const handleGenerateWithAI = useCallback(async () => {
    if (!brief.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("generate-prompt", {
        body: {
          brief,
          style,
          customStyle: style === "other" ? customStyle : undefined,
          sceneDetails,
          aspectRatio,
          duration,
          fps,
          instructionContext: instructionContent || undefined
        }
      });

      if (error) {
        console.error("AI generation error:", error);
        toast.error("Lỗi AI. Đang sử dụng fallback...");
        // Fallback to local generation
        handleGenerateLocal();
        return;
      }

      if (data.error) {
        if (data.error.includes("Rate limit")) {
          toast.error("Đã vượt giới hạn request. Vui lòng thử lại sau.");
        } else if (data.error.includes("Payment")) {
          toast.error("Cần thêm credits. Vui lòng nạp thêm.");
        } else {
          toast.error(data.error);
        }
        setIsGenerating(false);
        return;
      }

      const prompts: GeneratedPrompts = {
        analysis: data.analysis || "Đã phân tích brief thành công.",
        startFrame: data.startFrame || "",
        endFrame: data.endFrame || "",
        videoPrompt: data.videoPrompt || ""
      };

      setGeneratedPrompts(prompts);
      
      // Save to storage (database or local)
      await saveToStorage(prompts);
      
      toast.success("Đã tạo prompt với AI thành công!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Lỗi kết nối. Đang sử dụng fallback...");
      handleGenerateLocal();
    } finally {
      setIsGenerating(false);
    }
  }, [brief, style, customStyle, sceneDetails, aspectRatio, duration, fps, instructionContent, saveToStorage]);

  const handleGenerateLocal = useCallback(async () => {
    if (!brief.trim()) return;
    
    setIsGenerating(true);
    
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
    
    // Save to storage (database or local)
    await saveToStorage(prompts);
    
    setIsGenerating(false);
    toast.success("Đã tạo prompt thành công!");
  }, [brief, style, customStyle, sceneDetails, aspectRatio, duration, fps, saveToStorage]);

  const handleGenerate = useCallback(() => {
    if (useAI) {
      handleGenerateWithAI();
    } else {
      handleGenerateLocal();
    }
  }, [useAI, handleGenerateWithAI, handleGenerateLocal]);

  const handleLoadFromHistory = useCallback((saved: SavedPrompt | { id: string; brief: string; style: string; analysis: string; startFrame: string; endFrame: string; videoPrompt: string; createdAt: string }) => {
    setBrief(saved.brief);
    setStyle(saved.style as FilmStyle);
    setGeneratedPrompts({
      analysis: saved.analysis,
      startFrame: saved.startFrame,
      endFrame: saved.endFrame,
      videoPrompt: saved.videoPrompt
    });
  }, []);

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
                {/* Header with History */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-secondary" />
                      <Label htmlFor="useAI" className="text-sm cursor-pointer">
                        Dùng AI
                      </Label>
                    </div>
                    <Switch
                      id="useAI"
                      checked={useAI}
                      onCheckedChange={setUseAI}
                    />
                  </div>
                  <PromptHistory 
                    onLoadPrompt={handleLoadFromHistory} 
                    refreshTrigger={historyRefresh}
                  />
                </div>
                
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
                
                <FileUpload 
                  content={instructionContent}
                  onFileContent={setInstructionContent}
                />
                
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
                      {useAI ? "AI đang phân tích..." : "Đang tạo prompt..."}
                    </>
                  ) : (
                    <>
                      {useAI ? <Zap className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      {useAI ? "Generate với AI" : "Generate Prompts"}
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
