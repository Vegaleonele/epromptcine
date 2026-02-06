import { Film, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background-secondary/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/50 to-primary-glow/50 flex items-center justify-center">
              <Film className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-sm text-foreground-muted">
              CinePrompt Architect
            </span>
          </div>
          
          <p className="text-sm text-foreground-subtle flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive fill-destructive" /> for filmmakers & artists
          </p>
          
          <div className="text-xs text-foreground-subtle">
            © 2024 CinePrompt. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
