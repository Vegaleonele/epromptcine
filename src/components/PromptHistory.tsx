import { useState } from "react";
import { Clock, Trash2, Copy, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { getSavedPrompts, deletePrompt, clearAllPrompts, type SavedPrompt } from "@/lib/promptHistory";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface PromptHistoryProps {
  onLoadPrompt: (prompt: SavedPrompt) => void;
  refreshTrigger: number;
}

export function PromptHistory({ onLoadPrompt, refreshTrigger }: PromptHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const prompts = getSavedPrompts();

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePrompt(id);
    toast.success("Đã xóa prompt");
    // Force re-render
    setExpandedId(null);
  };

  const handleClearAll = () => {
    clearAllPrompts();
    toast.success("Đã xóa tất cả lịch sử");
    setIsOpen(false);
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Đã copy prompt");
  };

  const handleLoad = (prompt: SavedPrompt) => {
    onLoadPrompt(prompt);
    setIsOpen(false);
    toast.success("Đã tải prompt");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-border hover:border-primary"
        >
          <Clock className="w-4 h-4" />
          Lịch sử ({prompts.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between font-display">
            <span className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Lịch sử Prompt
            </span>
            {prompts.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Xóa tất cả
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh] pr-4">
          {prompts.length === 0 ? (
            <div className="text-center py-12 text-foreground-muted">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Chưa có prompt nào được lưu</p>
              <p className="text-sm text-foreground-subtle mt-1">
                Prompt sẽ tự động được lưu sau khi generate
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {prompts.map((prompt) => (
                <Collapsible
                  key={prompt.id}
                  open={expandedId === prompt.id}
                  onOpenChange={(open) => setExpandedId(open ? prompt.id : null)}
                >
                  <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
                    <CollapsibleTrigger className="w-full p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
                      <div className="text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {prompt.style}
                          </span>
                          <span className="text-xs text-foreground-subtle">
                            {formatDistanceToNow(new Date(prompt.createdAt), { 
                              addSuffix: true, 
                              locale: vi 
                            })}
                          </span>
                        </div>
                        <p className="text-sm line-clamp-2 text-foreground-muted">
                          {prompt.brief}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {expandedId === prompt.id ? (
                          <ChevronUp className="w-4 h-4 text-foreground-muted" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-foreground-muted" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                        <p className="text-xs text-foreground-subtle">
                          {prompt.analysis}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleLoad(prompt)}
                            className="bg-primary text-primary-foreground hover:bg-primary-glow"
                          >
                            Tải lại
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => handleCopy(prompt.videoPrompt, e)}
                            className="gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy Video
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => handleDelete(prompt.id, e)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
