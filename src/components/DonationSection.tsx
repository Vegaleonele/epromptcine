import { Heart, Coffee, Sparkles, QrCode } from "lucide-react";
import donateQR from "@/assets/donate-qr.png";

export function DonationSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/8 via-primary/3 to-transparent rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in">
              <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
              <span className="text-sm text-foreground-muted">Ủng hộ Creator</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-5">
              <span className="text-foreground">Thích ứng dụng?</span>
              <br className="md:hidden" />
              <span className="gradient-text"> Ủng hộ mình nhé!</span>
            </h2>
            
            <p className="text-foreground-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Mỗi đóng góp của bạn giúp mình có thêm động lực phát triển các ứng dụng mới, 
              phục vụ cộng đồng sáng tạo nội dung Việt Nam.
            </p>
          </div>
          
          {/* Main Donation Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 lg:p-10 border border-primary/10 hover:border-primary/20 transition-colors duration-300">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              
              {/* QR Code Section */}
              <div className="flex-shrink-0 text-center">
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  
                  {/* QR Frame */}
                  <div className="relative bg-white rounded-2xl p-3 shadow-2xl shadow-primary/10">
                    <img 
                      src={donateQR} 
                      alt="QR Code Donate - Trần Thiên Chương" 
                      className="w-56 h-56 md:w-64 md:h-64 object-contain"
                    />
                  </div>
                </div>
                
                {/* Scan instruction */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground-subtle">
                  <QrCode className="w-4 h-4" />
                  <span>Quét để ủng hộ</span>
                </div>
              </div>
              
              {/* Info Section */}
              <div className="flex-1 text-center lg:text-left">
                {/* Title */}
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-display font-bold text-xl">Mua cho mình ly cà phê</span>
                </div>
                
                {/* Description */}
                <p className="text-foreground-muted mb-6 leading-relaxed">
                  Quét mã QR bằng <span className="text-primary font-medium">MoMo</span>, 
                  <span className="text-primary font-medium"> VietQR</span> hoặc bất kỳ ứng dụng 
                  ngân hàng nào hỗ trợ <span className="text-primary font-medium">NAPAS 247</span>.
                </p>
                
                {/* Account Info */}
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border mb-8">
                  <span className="text-sm text-foreground-subtle">Chủ TK:</span>
                  <span className="font-display font-semibold text-foreground">TRẦN THIÊN CHƯƠNG</span>
                </div>
                
                {/* Benefits */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-sm text-foreground-subtle mb-4 font-medium">
                    ✨ Đóng góp của bạn giúp:
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {[
                      { icon: "🚀", text: "Phát triển tính năng mới" },
                      { icon: "💻", text: "Duy trì server" },
                      { icon: "🎨", text: "Tạo app mới" }
                    ].map((item) => (
                      <span 
                        key={item.text}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground-muted text-sm border border-primary/10 hover:border-primary/30 transition-colors"
                      >
                        <span>{item.icon}</span>
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Thank you message */}
          <div className="text-center mt-10">
            <p className="text-foreground-muted text-sm">
              Cảm ơn bạn đã ủng hộ! <span className="text-destructive">❤️</span> Mỗi đóng góp dù nhỏ đều có ý nghĩa lớn.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
