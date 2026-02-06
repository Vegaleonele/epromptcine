import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Key, User, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function UserMenu() {
  const { user, profile, userApiKey, signOut, updateApiKey } = useAuth();
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(userApiKey?.openrouter_api_key || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  const initials = profile?.display_name
    ? profile.display_name.slice(0, 2).toUpperCase()
    : user.email?.slice(0, 2).toUpperCase() || "U";

  const handleSaveApiKey = async () => {
    setSaving(true);
    const { error } = await updateApiKey(apiKey || null);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Đã lưu API key!");
      setApiKeyDialogOpen(false);
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Đã đăng xuất");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 border-2 border-primary/50">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || ""} />
              <AvatarFallback className="bg-primary/20 text-primary font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-card border-border" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{profile?.display_name || "User"}</p>
              <p className="text-xs text-foreground-muted truncate">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem 
            className="gap-2 cursor-pointer"
            onClick={() => {
              setApiKey(userApiKey?.openrouter_api_key || "");
              setApiKeyDialogOpen(true);
            }}
          >
            <Key className="w-4 h-4" />
            <span>Quản lý API Key</span>
            {userApiKey?.openrouter_api_key && (
              <span className="ml-auto text-xs text-chart-4">✓</span>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem 
            className="gap-2 cursor-pointer text-destructive focus:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* API Key Dialog */}
      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Quản lý API Key
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-foreground-muted">
              Thêm API key riêng để sử dụng AI mà không bị trừ credit của admin.
              Bạn có thể lấy API key từ OpenRouter hoặc các provider khác.
            </p>
            <div className="space-y-2">
              <Label htmlFor="api-key">OpenRouter API Key</Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  placeholder="sk-or-v1-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-input border-input-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="w-4 h-4 text-foreground-muted" />
                  ) : (
                    <Eye className="w-4 h-4 text-foreground-muted" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-foreground-subtle">
                Lấy API key tại{" "}
                <a 
                  href="https://openrouter.ai/keys" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  openrouter.ai/keys
                </a>
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setApiKeyDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={handleSaveApiKey}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : null}
                Lưu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
