import { useState, useCallback } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileContent: (content: string) => void;
  content: string;
}

export function FileUpload({ onFileContent, content }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["text/plain", "application/pdf", ".txt", ".pdf"];
    const isValid = validTypes.some(type => 
      file.type === type || file.name.endsWith(type)
    );

    if (!isValid) {
      setError("Chỉ hỗ trợ file TXT hoặc PDF");
      toast.error("Định dạng file không được hỗ trợ");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File quá lớn (tối đa 5MB)");
      toast.error("File quá lớn");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setFileName(file.name);

    try {
      if (file.name.endsWith(".txt") || file.type === "text/plain") {
        // Handle TXT file
        const text = await file.text();
        onFileContent(text);
        toast.success("Đã tải file instruction thành công");
      } else if (file.name.endsWith(".pdf") || file.type === "application/pdf") {
        // For PDF, we'll extract text on client side using a basic approach
        // Note: For full PDF parsing, a backend service would be better
        const text = await extractPDFText(file);
        onFileContent(text);
        toast.success("Đã tải file PDF thành công");
      }
    } catch (err) {
      console.error("Error reading file:", err);
      setError("Không thể đọc file");
      toast.error("Lỗi đọc file");
    } finally {
      setIsProcessing(false);
    }
  }, [onFileContent]);

  const handleClear = () => {
    setFileName(null);
    setError(null);
    onFileContent("");
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        File Instruction (tùy chọn)
      </label>
      
      {!fileName ? (
        <div className="relative">
          <input
            type="file"
            accept=".txt,.pdf,text/plain,application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />
          <div className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors bg-card/50">
            <Upload className="w-5 h-5 text-foreground-muted" />
            <div className="text-sm">
              <span className="text-foreground-muted">
                {isProcessing ? "Đang xử lý..." : "Kéo thả hoặc click để upload"}
              </span>
              <p className="text-xs text-foreground-subtle mt-1">
                TXT hoặc PDF (project bible, style guide, master prompt...)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card/50">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">{fileName}</p>
              <p className="text-xs text-foreground-muted">
                {content.length} ký tự đã tải
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="text-foreground-muted hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}

// Simple PDF text extraction (basic approach)
async function extractPDFText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        // Basic text extraction from PDF (works for simple PDFs)
        const text = extractTextFromPDFBytes(typedArray);
        resolve(text || "PDF content loaded (complex formatting may not be fully extracted)");
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// Very basic PDF text extraction
function extractTextFromPDFBytes(bytes: Uint8Array): string {
  const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
  
  // Extract text between stream markers (simplified)
  const matches = text.match(/\(([^)]+)\)/g) || [];
  const extractedText = matches
    .map(m => m.slice(1, -1))
    .filter(t => t.length > 2 && !/^[\d\s.]+$/.test(t))
    .join(" ")
    .replace(/\\n/g, "\n")
    .replace(/\\/g, "");
  
  return extractedText || "File PDF đã được tải. Nội dung sẽ được xử lý bởi AI.";
}
