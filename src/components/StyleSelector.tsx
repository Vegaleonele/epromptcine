import { FILM_STYLES, type FilmStyle } from "@/types/prompt";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

// Style preview images
import stylePixar from "@/assets/styles/style-pixar.jpg";
import styleRealistic from "@/assets/styles/style-realistic.jpg";
import styleEpic from "@/assets/styles/style-epic.jpg";
import styleScifi from "@/assets/styles/style-scifi.jpg";
import styleFantasy from "@/assets/styles/style-fantasy.jpg";
import styleHorror from "@/assets/styles/style-horror.jpg";
import styleDocumentary from "@/assets/styles/style-documentary.jpg";
import styleVintage from "@/assets/styles/style-vintage.jpg";
import styleAnime from "@/assets/styles/style-anime.jpg";

const styleImages: Record<FilmStyle, string | null> = {
  pixar: stylePixar,
  realistic: styleRealistic,
  epic: styleEpic,
  scifi: styleScifi,
  fantasy: styleFantasy,
  horror: styleHorror,
  documentary: styleDocumentary,
  vintage: styleVintage,
  anime: styleAnime,
  other: null,
};

interface StyleSelectorProps {
  value: FilmStyle;
  onChange: (style: FilmStyle) => void;
}

const styleColors: Record<FilmStyle, string> = {
  pixar: "border-style-pixar/30 hover:border-style-pixar/70",
  realistic: "border-style-realistic/30 hover:border-style-realistic/70",
  epic: "border-style-epic/30 hover:border-style-epic/70",
  scifi: "border-style-scifi/30 hover:border-style-scifi/70",
  fantasy: "border-style-fantasy/30 hover:border-style-fantasy/70",
  horror: "border-style-horror/30 hover:border-style-horror/70",
  documentary: "border-style-documentary/30 hover:border-style-documentary/70",
  vintage: "border-style-vintage/30 hover:border-style-vintage/70",
  anime: "border-style-anime/30 hover:border-style-anime/70",
  other: "border-primary/30 hover:border-primary/70"
};

const styleActiveColors: Record<FilmStyle, string> = {
  pixar: "border-style-pixar ring-2 ring-style-pixar/40",
  realistic: "border-style-realistic ring-2 ring-style-realistic/40",
  epic: "border-style-epic ring-2 ring-style-epic/40",
  scifi: "border-style-scifi ring-2 ring-style-scifi/40",
  fantasy: "border-style-fantasy ring-2 ring-style-fantasy/40",
  horror: "border-style-horror ring-2 ring-style-horror/40",
  documentary: "border-style-documentary ring-2 ring-style-documentary/40",
  vintage: "border-style-vintage ring-2 ring-style-vintage/40",
  anime: "border-style-anime ring-2 ring-style-anime/40",
  other: "border-primary ring-2 ring-primary/40"
};

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div id="styles" className="space-y-4">
      <label className="text-sm font-medium text-foreground">
        Phong cách phim
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {FILM_STYLES.map((style) => {
          const image = styleImages[style.id];
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onChange(style.id)}
              className={cn(
                "relative rounded-xl border overflow-hidden text-left transition-all duration-200 group",
                value === style.id
                  ? styleActiveColors[style.id]
                  : styleColors[style.id]
              )}
            >
              {/* Image thumbnail */}
              {image ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image} 
                    alt={style.label} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <Palette className="w-8 h-8 text-foreground-subtle" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
              )}
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="font-display font-semibold text-sm mb-0.5">{style.label}</div>
                <div className="text-[11px] text-foreground-muted line-clamp-1 leading-tight">
                  {style.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
