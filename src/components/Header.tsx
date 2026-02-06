import { Film, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-background-secondary/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Film className="w-5 h-5 text-primary-foreground" />
            </div>
            <Sparkles className="w-3 h-3 text-primary-glow absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold gradient-text">
              CinePrompt Architect
            </h1>
            <p className="text-xs text-foreground-subtle">
              Film & Storyboard Prompt Engineering
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#generator" 
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            Generator
          </a>
          <a 
            href="#styles" 
            className="text-sm text-foreground-muted hover:text-primary transition-colors"
          >
            Styles
          </a>
        </nav>
      </div>
    </header>
  );
}
