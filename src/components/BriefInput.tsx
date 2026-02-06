import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BriefInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function BriefInput({ value, onChange }: BriefInputProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="brief" className="text-sm font-medium">
        Brief mô tả cảnh <span className="text-primary">*</span>
      </Label>
      <Textarea
        id="brief"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Mô tả cảnh quay của bạn. Ví dụ: Một hiệp sĩ trong bộ giáp cổ đang bước vào khu rừng tối om dưới ánh trăng, tay nắm chặt chuôi kiếm, không khí căng thẳng và bí ẩn..."
        className="min-h-[140px] bg-input border-input-border focus:border-primary focus:ring-primary/20 resize-none"
      />
      <p className="text-xs text-foreground-subtle">
        Mô tả chi tiết sẽ giúp tạo ra prompt chất lượng cao hơn
      </p>
    </div>
  );
}
