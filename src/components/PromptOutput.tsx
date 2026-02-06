import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy, ImageIcon, Video, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { GeneratedPrompts } from "@/types/prompt";

interface PromptOutputProps {
  prompts: GeneratedPrompts | null;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} đã được copy!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className="gap-2 border-border hover:border-primary hover:bg-primary/10"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-chart-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy
        </>
      )}
    </Button>
  );
}

export function PromptOutput({ prompts }: PromptOutputProps) {
  if (!prompts) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-foreground-subtle" />
        </div>
        <h3 className="font-display text-lg font-medium mb-2">
          Chưa có prompt
        </h3>
        <p className="text-sm text-foreground-muted">
          Điền brief và nhấn "Generate Prompts" để tạo prompt chuyên nghiệp
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <div className="glass-panel rounded-xl p-6">
        <h3 className="font-display text-sm font-medium text-primary mb-3">
          Phân tích Brief
        </h3>
        <div className="text-sm text-foreground-muted whitespace-pre-line">
          {prompts.analysis}
        </div>
      </div>

      {/* Prompts Tabs */}
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-muted/50 p-1">
          <TabsTrigger 
            value="image" 
            className="gap-2 data-[state=active]:bg-card data-[state=active]:text-primary"
          >
            <ImageIcon className="w-4 h-4" />
            Image Prompts
          </TabsTrigger>
          <TabsTrigger 
            value="video" 
            className="gap-2 data-[state=active]:bg-card data-[state=active]:text-secondary"
          >
            <Video className="w-4 h-4" />
            Video Prompt
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="image" className="mt-4 space-y-4">
          {/* Start Frame */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-chart-4" />
                <span className="font-medium text-sm">Start Frame</span>
              </div>
              <CopyButton text={prompts.startFrame} label="Start Frame prompt" />
            </div>
            <pre className="prompt-output text-foreground-muted overflow-x-auto max-h-[400px] overflow-y-auto">
              {prompts.startFrame}
            </pre>
          </div>
          
          {/* End Frame */}
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="font-medium text-sm">End Frame</span>
              </div>
              <CopyButton text={prompts.endFrame} label="End Frame prompt" />
            </div>
            <pre className="prompt-output text-foreground-muted overflow-x-auto max-h-[400px] overflow-y-auto">
              {prompts.endFrame}
            </pre>
          </div>
        </TabsContent>
        
        <TabsContent value="video" className="mt-4">
          <div className="glass-panel rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-medium text-sm">Video Prompt (Text-to-Video)</span>
              </div>
              <CopyButton text={prompts.videoPrompt} label="Video prompt" />
            </div>
            <pre className="prompt-output text-foreground-muted overflow-x-auto max-h-[500px] overflow-y-auto">
              {prompts.videoPrompt}
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
