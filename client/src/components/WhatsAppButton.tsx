import { MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  // You can customize these values
  const phoneNumber = "+919876543210"; // Replace with your actual WhatsApp number
  const defaultMessage = "Hello! I'm interested in your event planning services. Could you please provide more information?";
  
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full right-0 mb-3 px-4 py-2 bg-card border border-border rounded-lg shadow-lg text-sm font-medium text-card-foreground whitespace-nowrap transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        Chat with us on WhatsApp
        <div className="absolute top-full right-4 border-4 border-transparent border-t-card"></div>
      </div>
      
      {/* Main Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid="button-whatsapp-chat"
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform ${
          isHovered ? 'scale-110 shadow-primary/25' : 'scale-100'
        }`}
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)' 
            : '0 10px 25px -5px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)'
        }}
      >
        {/* Animated Background Ring */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 transition-all duration-300 ${
            isHovered ? 'scale-110 opacity-30' : 'scale-100 opacity-0'
          }`}
        />
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        
        {/* WhatsApp Icon - Using MessageCircle from Lucide */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          <MessageCircle 
            size={24} 
            className="drop-shadow-sm" 
            strokeWidth={2}
          />
        </div>
        
        {/* Subtle Inner Glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-50" />
      </button>
      
      {/* Decorative Elements */}
      <div 
        className={`absolute -inset-2 rounded-full bg-gradient-to-r from-primary/10 to-transparent transition-all duration-500 ${
          isHovered ? 'opacity-100 scale-125' : 'opacity-0 scale-100'
        }`}
      />
    </div>
  );
}