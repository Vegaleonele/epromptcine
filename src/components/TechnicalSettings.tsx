import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TechnicalSettingsProps {
  aspectRatio: string;
  duration: string;
  fps: string;
  onAspectRatioChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onFpsChange: (value: string) => void;
}

const ASPECT_RATIOS = [
  { value: "16:9", label: "16:9 (HD Standard)" },
  { value: "2.39:1", label: "2.39:1 (Cinematic Anamorphic)" },
  { value: "1.85:1", label: "1.85:1 (Theatrical Flat)" },
  { value: "4:3", label: "4:3 (Classic TV)" },
  { value: "9:16", label: "9:16 (Vertical/Mobile)" },
  { value: "1:1", label: "1:1 (Square)" }
];

const DURATIONS = [
  { value: "3", label: "3 giây" },
  { value: "5", label: "5 giây" },
  { value: "6", label: "6 giây" },
  { value: "10", label: "10 giây" }
];

const FPS_OPTIONS = [
  { value: "24", label: "24 FPS (Cinematic)" },
  { value: "30", label: "30 FPS (Smooth)" },
  { value: "60", label: "60 FPS (High Frame Rate)" }
];

export function TechnicalSettings({
  aspectRatio,
  duration,
  fps,
  onAspectRatioChange,
  onDurationChange,
  onFpsChange
}: TechnicalSettingsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label className="text-xs">Aspect Ratio</Label>
        <Select value={aspectRatio} onValueChange={onAspectRatioChange}>
          <SelectTrigger className="bg-input border-input-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ASPECT_RATIOS.map((ratio) => (
              <SelectItem key={ratio.value} value={ratio.value}>
                {ratio.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs">Duration (Video)</Label>
        <Select value={duration} onValueChange={onDurationChange}>
          <SelectTrigger className="bg-input border-input-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DURATIONS.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-xs">Frame Rate</Label>
        <Select value={fps} onValueChange={onFpsChange}>
          <SelectTrigger className="bg-input border-input-border text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FPS_OPTIONS.map((f) => (
              <SelectItem key={f.value} value={f.value}>
                {f.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
