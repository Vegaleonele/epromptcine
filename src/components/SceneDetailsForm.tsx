import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { SceneDetails } from "@/types/prompt";

interface SceneDetailsFormProps {
  value: SceneDetails;
  onChange: (details: SceneDetails) => void;
}

const SHOT_TYPES = [
  "Extreme Wide Shot (EWS)",
  "Wide Shot (WS)",
  "Full Shot (FS)",
  "Medium Wide Shot (MWS)",
  "Medium Shot (MS)",
  "Medium Close-Up (MCU)",
  "Close-Up (CU)",
  "Extreme Close-Up (ECU)",
  "Over-the-Shoulder (OTS)",
  "Point of View (POV)",
  "Low-Angle Shot",
  "High-Angle Shot",
  "Dutch Angle",
  "Bird's Eye View",
  "Worm's Eye View"
];

export function SceneDetailsForm({ value, onChange }: SceneDetailsFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field: keyof SceneDetails, newValue: string) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border hover:border-primary/50 bg-card transition-colors">
        <div className="text-left">
          <div className="font-medium text-sm">Chi tiết cảnh quay (tùy chọn)</div>
          <div className="text-xs text-foreground-muted">
            Bổ sung thông tin để prompt chính xác hơn
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-foreground-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-foreground-muted" />
        )}
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pt-4">
        <div className="grid md:grid-cols-2 gap-4 p-4 rounded-lg border border-border bg-card/50">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs">Chủ thể chính</Label>
            <Input
              id="subject"
              value={value.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Nhân vật, sinh vật, đối tượng..."
              className="bg-input border-input-border text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="action" className="text-xs">Hành động</Label>
            <Input
              id="action"
              value={value.action}
              onChange={(e) => handleChange("action", e.target.value)}
              placeholder="Đang làm gì, chuyển động..."
              className="bg-input border-input-border text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="environment" className="text-xs">Môi trường / Bối cảnh</Label>
            <Input
              id="environment"
              value={value.environment}
              onChange={(e) => handleChange("environment", e.target.value)}
              placeholder="Địa điểm, không gian..."
              className="bg-input border-input-border text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeWeather" className="text-xs">Thời gian / Thời tiết</Label>
            <Input
              id="timeWeather"
              value={value.timeWeather}
              onChange={(e) => handleChange("timeWeather", e.target.value)}
              placeholder="Ban đêm, mưa, hoàng hôn..."
              className="bg-input border-input-border text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mood" className="text-xs">Cảm xúc / Tâm trạng</Label>
            <Input
              id="mood"
              value={value.mood}
              onChange={(e) => handleChange("mood", e.target.value)}
              placeholder="Căng thẳng, hạnh phúc, bí ẩn..."
              className="bg-input border-input-border text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="shotType" className="text-xs">Loại shot</Label>
            <Select
              value={value.shotType}
              onValueChange={(v) => handleChange("shotType", v)}
            >
              <SelectTrigger className="bg-input border-input-border text-sm">
                <SelectValue placeholder="Chọn loại shot..." />
              </SelectTrigger>
              <SelectContent>
                {SHOT_TYPES.map((shot) => (
                  <SelectItem key={shot} value={shot}>
                    {shot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
