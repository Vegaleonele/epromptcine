import { Heart, Coffee, Sparkles } from "lucide-react";
import donateQR from "@/assets/donate-qr.png";

export function DonationSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm text-foreground-muted">Ủng hộ Creator</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Thích ứng dụng?</span>{" "}
              <span className="gradient-text">Ủng hộ mình nhé!</span>
            </h2>
            
            <p className="text-foreground-muted max-w-xl mx-auto text-lg">
              Mỗi đóng góp của bạn giúp mình có thêm động lực phát triển các ứng dụng mới, 
              phục vụ cộng đồng sáng tạo nội dung.
            </p>
          </div>
          
          {/* Donation Card */}
          <div className="glass-panel rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* QR Code */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-lg" />
                  <div className="relative bg-white rounded-xl p-4 shadow-lg">
                    <img 
                      src={donateQR} 
                      alt="QR Code Donate - Trần Thiên Chương" 
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <Coffee className="w-5 h-5 text-primary" />
                  <span className="font-display font-semibold text-lg">Mua cho mình ly cà phê</span>
                </div>
                
                <p className="text-foreground-muted mb-6">
                  Quét mã QR bằng ứng dụng MoMo, VietQR hoặc bất kỳ ứng dụng ngân hàng nào 
                  hỗ trợ NAPAS 247 để ủng hộ.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
                    <span className="text-foreground-subtle">Chủ tài khoản:</span>
                    <span className="font-medium text-foreground">TRẦN THIÊN CHƯƠNG</span>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-foreground-subtle mb-4">Đóng góp của bạn giúp:</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {["Phát triển tính năng mới", "Duy trì server", "Tạo app mới"].map((item) => (
                      <span 
                        key={item}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
                      >
                        <Sparkles className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thank you message */}
          <p className="text-center text-foreground-subtle text-sm mt-8">
            Cảm ơn bạn đã ủng hộ! ❤️ Mỗi đóng góp dù nhỏ đều có ý nghĩa lớn.
          </p>
        </div>
      </div>
    </section>
  );
}
