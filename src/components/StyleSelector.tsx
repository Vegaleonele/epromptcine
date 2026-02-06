import { FILM_STYLES, type FilmStyle } from "@/types/prompt";
import { cn } from "@/lib/utils";

interface StyleSelectorProps {
  value: FilmStyle;
  onChange: (style: FilmStyle) => void;
}

const styleColors: Record<FilmStyle, string> = {
  pixar: "border-style-pixar/50 hover:border-style-pixar bg-style-pixar/5",
  realistic: "border-style-realistic/50 hover:border-style-realistic bg-style-realistic/5",
  epic: "border-style-epic/50 hover:border-style-epic bg-style-epic/5",
  scifi: "border-style-scifi/50 hover:border-style-scifi bg-style-scifi/5",
  fantasy: "border-style-fantasy/50 hover:border-style-fantasy bg-style-fantasy/5",
  horror: "border-style-horror/50 hover:border-style-horror bg-style-horror/5",
  documentary: "border-style-documentary/50 hover:border-style-documentary bg-style-documentary/5",
  vintage: "border-style-vintage/50 hover:border-style-vintage bg-style-vintage/5",
  anime: "border-style-anime/50 hover:border-style-anime bg-style-anime/5",
  other: "border-primary/50 hover:border-primary bg-primary/5"
};

const styleActiveColors: Record<FilmStyle, string> = {
  pixar: "border-style-pixar bg-style-pixar/20 ring-2 ring-style-pixar/30",
  realistic: "border-style-realistic bg-style-realistic/20 ring-2 ring-style-realistic/30",
  epic: "border-style-epic bg-style-epic/20 ring-2 ring-style-epic/30",
  scifi: "border-style-scifi bg-style-scifi/20 ring-2 ring-style-scifi/30",
  fantasy: "border-style-fantasy bg-style-fantasy/20 ring-2 ring-style-fantasy/30",
  horror: "border-style-horror bg-style-horror/20 ring-2 ring-style-horror/30",
  documentary: "border-style-documentary bg-style-documentary/20 ring-2 ring-style-documentary/30",
  vintage: "border-style-vintage bg-style-vintage/20 ring-2 ring-style-vintage/30",
  anime: "border-style-anime bg-style-anime/20 ring-2 ring-style-anime/30",
  other: "border-primary bg-primary/20 ring-2 ring-primary/30"
};

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div id="styles" className="space-y-4">
      <label className="text-sm font-medium text-foreground">
        Phong cách phim
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {FILM_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onChange(style.id)}
            className={cn(
              "relative p-4 rounded-lg border text-left transition-all duration-200",
              value === style.id
                ? styleActiveColors[style.id]
                : styleColors[style.id]
            )}
          >
            <div className="font-medium text-sm mb-1">{style.label}</div>
            <div className="text-xs text-foreground-muted line-clamp-2">
              {style.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
