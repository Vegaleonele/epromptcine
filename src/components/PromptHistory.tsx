import { useState, useEffect, useCallback } from "react";
import { Clock, Trash2, Copy, ChevronDown, ChevronUp, Database, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getSavedPrompts, deletePrompt as deleteLocalPrompt, clearAllPrompts, type SavedPrompt } from "@/lib/promptHistory";
import { getPromptsFromDatabase, deletePromptFromDatabase, type DatabasePrompt } from "@/lib/promptDatabase";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface PromptHistoryProps {
  onLoadPrompt: (prompt: SavedPrompt | DatabasePrompt) => void;
  refreshTrigger: number;
}

export function PromptHistory({ onLoadPrompt, refreshTrigger }: PromptHistoryProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [localPrompts, setLocalPrompts] = useState<SavedPrompt[]>([]);
  const [dbPrompts, setDbPrompts] = useState<DatabasePrompt[]>([]);
  const [activeTab, setActiveTab] = useState<string>(user ? "cloud" : "local");

  const loadPrompts = useCallback(async () => {
    setLocalPrompts(getSavedPrompts());
    if (user) {
      const { data } = await getPromptsFromDatabase();
      setDbPrompts(data);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      loadPrompts();
    }
  }, [isOpen, refreshTrigger, loadPrompts]);

  useEffect(() => {
    setActiveTab(user ? "cloud" : "local");
  }, [user]);

  const handleDeleteLocal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteLocalPrompt(id);
    setLocalPrompts(getSavedPrompts());
    toast.success("Đã xóa prompt");
  };

  const handleDeleteDb = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { error } = await deletePromptFromDatabase(id);
    if (error) {
      toast.error(error.message);
    } else {
      const { data } = await getPromptsFromDatabase();
      setDbPrompts(data);
      toast.success("Đã xóa prompt");
    }
  };

  const handleClearAllLocal = () => {
    clearAllPrompts();
    setLocalPrompts([]);
    toast.success("Đã xóa tất cả lịch sử local");
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Đã copy prompt");
  };

  const handleLoadLocal = (prompt: SavedPrompt) => {
    onLoadPrompt(prompt);
    setIsOpen(false);
    toast.success("Đã tải prompt");
  };

  const handleLoadDb = (prompt: DatabasePrompt) => {
    // Convert to the format expected by the parent
    onLoadPrompt({
      id: prompt.id,
      brief: prompt.brief,
      style: prompt.style,
      analysis: prompt.analysis || "",
      startFrame: prompt.start_frame || "",
      endFrame: prompt.end_frame || "",
      videoPrompt: prompt.video_prompt || "",
      createdAt: prompt.created_at
    });
    setIsOpen(false);
    toast.success("Đã tải prompt");
  };

  const totalCount = localPrompts.length + dbPrompts.length;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border-border hover:border-primary"
        >
          <Clock className="w-4 h-4" />
          Lịch sử ({totalCount})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Lịch sử Prompt
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="cloud" className="gap-2" disabled={!user}>
              <Database className="w-4 h-4" />
              Cloud ({dbPrompts.length})
            </TabsTrigger>
            <TabsTrigger value="local" className="gap-2">
              <HardDrive className="w-4 h-4" />
              Local ({localPrompts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cloud" className="mt-4">
            {!user ? (
              <div className="text-center py-12 text-foreground-muted">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Đăng nhập để lưu prompt vào cloud</p>
              </div>
            ) : dbPrompts.length === 0 ? (
              <div className="text-center py-12 text-foreground-muted">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Chưa có prompt nào được lưu</p>
              </div>
            ) : (
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-3">
                  {dbPrompts.map((prompt) => (
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
                                {formatDistanceToNow(new Date(prompt.created_at), { 
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
                                onClick={() => handleLoadDb(prompt)}
                                className="bg-primary text-primary-foreground hover:bg-primary-glow"
                              >
                                Tải lại
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => handleCopy(prompt.video_prompt || "", e)}
                                className="gap-1"
                              >
                                <Copy className="w-3 h-3" />
                                Copy Video
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={(e) => handleDeleteDb(prompt.id, e)}
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
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="local" className="mt-4">
            {localPrompts.length > 0 && (
              <div className="flex justify-end mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAllLocal}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa tất cả
                </Button>
              </div>
            )}
            {localPrompts.length === 0 ? (
              <div className="text-center py-12 text-foreground-muted">
                <HardDrive className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Chưa có prompt nào được lưu local</p>
                <p className="text-sm text-foreground-subtle mt-1">
                  {user ? "Prompt mới sẽ được lưu vào cloud" : "Đăng nhập để lưu vào cloud"}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[50vh] pr-4">
                <div className="space-y-3">
                  {localPrompts.map((prompt) => (
                    <Collapsible
                      key={prompt.id}
                      open={expandedId === prompt.id}
                      onOpenChange={(open) => setExpandedId(open ? prompt.id : null)}
                    >
                      <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
                        <CollapsibleTrigger className="w-full p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
                          <div className="text-left flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">
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
                                onClick={() => handleLoadLocal(prompt)}
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
                                onClick={(e) => handleDeleteLocal(prompt.id, e)}
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
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
