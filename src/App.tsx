import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Glasses,
  Flag,
  PartyPopper,
  Volume2,
  Sparkles,
  Calendar,
  Megaphone,
  Smile,
  Award,
  Layers,
  ShieldCheck,
  Gift,
  Heart,
  Truck,
  CreditCard,
  QrCode,
  ShoppingBag,
  Star,
  Check,
  ChevronRight,
  ChevronDown,
  Clock,
  ArrowRight,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Info,
  Copy,
  RotateCcw,
  BadgePercent,
  Play,
  ThumbsUp,
  Sliders,
  AlertCircle
} from 'lucide-react';
import {
  TORCEDOR_ITEMS,
  BENEFITS,
  REVIEWS,
  FAQS,
  TorcedorItem,
  Benefit,
  Review,
  Faq
} from './types';
const boxImage = '/src/assets/images/kit_torcedor_box_items_white_bg_1779912635573.png';
const realLayoutImage = '/src/assets/images/kit_torcedor_real_layout_1779908500122.png';

// Icon mapping dictionary
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Glasses,
  Flag,
  PartyPopper,
  Volume2,
  Sparkles,
  Calendar,
  Megaphone,
  Smile,
  Award,
  Layers,
  ShieldCheck,
  Gift,
  Heart,
  Truck,
  CreditCard,
  QrCode,
  ShoppingBag,
  Star,
  Check,
  ChevronRight,
  ChevronDown,
  Clock,
  ArrowRight,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Info,
  Copy,
  RotateCcw,
  BadgePercent
};

// Social proof alerts database
const LOCALIZED_ALERTS = [
  { name: "Luciana M.", city: "Rio de Janeiro", state: "RJ", pack: "Combo Família (2 Kits)", time: "há 2 minutos" },
  { name: "Thiago S.", city: "São Paulo", state: "SP", pack: "Torcida Completa (3 Kits)", time: "há 5 minutos" },
  { name: "Felipe R.", city: "Salvador", state: "BA", pack: "1 Kit Torcedor Brasil", time: "há 8 minutos" },
  { name: "Juliana G.", city: "Porto Alegre", state: "RS", pack: "Combo Família (2 Kits)", time: "há 11 minutos" },
  { name: "Marcos P.", city: "Belo Horizonte", state: "MG", pack: "Torcida Completa (3 Kits)", time: "há 15 minutos" },
  { name: "Gabriela F.", city: "Curitiba", state: "PR", pack: "1 Kit Torcedor Brasil", time: "há 19 minutos" }
];

export default function App() {
  // --- GENERAL STATES ---
  const [activeCategory, setActiveCategory] = useState<'all' | 'vestuario' | 'festa' | 'barulho' | 'decoracao'>('all');
  const [selectedItem, setSelectedItem] = useState<TorcedorItem | null>(null);
  const [activeMedia, setActiveMedia] = useState<'video' | 'real' | 'box'>('video');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // COUNTDOWN: Starts at 12m 45s
  const [timeLeft, setTimeLeft] = useState(765);
  // STOCK: Starts at 93%, drops to 96%
  const [stockPercentage, setStockPercentage] = useState(91);
  const [itemsLeft, setItemsLeft] = useState(14);

  // CEP STATE
  const [cep, setCep] = useState('');
  const [cepLoading, setCepLoading] = useState(false);
  const [cepSuccess, setCepSuccess] = useState<string | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);

  // PACK SELECTION
  const [selectedPack, setSelectedPack] = useState<'single' | 'double' | 'triple'>('single');

  // CHECKOUT STATE
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutCpf, setCheckoutCpf] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCep, setCheckoutCep] = useState('');

  // CREDIT CARD STATE
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // FAQ STATE
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // SOCIAL PROOF TOAST
  const [currentAlert, setCurrentAlert] = useState<{name: string, city: string, state: string, pack: string, time: string} | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  // PIX SIMULATION TIMER
  const [pixTimeLeft, setPixTimeLeft] = useState(600); // 10 minutes
  const [isPixCopied, setIsPixCopied] = useState(false);

  // SCROLL TARGET REF
  const checkoutRef = useRef<HTMLDivElement>(null);

  // --- VIDEO PLAYBACK CONTROL EFFECTS ---
  useEffect(() => {
    if (activeMedia === 'video' && videoRef.current) {
      if (videoPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeMedia, videoPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoMuted;
    }
  }, [videoMuted]);

  // --- COUNTDOWN EFFECT ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 10) return 765; // Reset to 12m 45s if hits 10s to keep urgency active
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- DYNAMIC STOCK DECREASE ---
  useEffect(() => {
    const timer = setTimeout(() => {
      if (itemsLeft > 4) {
        setItemsLeft(prev => prev - 1);
        setStockPercentage(prev => Math.min(prev + 1, 98));
      }
    }, 32000); // Drops an item every 32 seconds to create urgency
    return () => clearTimeout(timer);
  }, [itemsLeft]);

  // --- PIX TIMER EFFECT ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === 'confirmed' && paymentMethod === 'pix') {
      interval = setInterval(() => {
        setPixTimeLeft((prev) => {
          if (prev <= 1) return 600;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep, paymentMethod]);

  // --- SOCIAL PROOF POPUPS EFFECT ---
  useEffect(() => {
    const triggerToast = () => {
      const randomIndex = Math.floor(Math.random() * LOCALIZED_ALERTS.length);
      setCurrentAlert(LOCALIZED_ALERTS[randomIndex]);
      setAlertVisible(true);

      // Hide after 5.5 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 5500);
    };

    // First trigger after 3 seconds
    const initialTimeout = setTimeout(triggerToast, 3000);

    // Regular interval: trigger every 14 seconds
    const interval = setInterval(triggerToast, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // --- FORMAT HELPER FOR COUNTDOWN ---
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- SIMULATED CEP LOOKUP ---
  const handleCepLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cep || cep.replace(/\D/g, '').length < 8) {
      setCepError("Por favor, digite um CEP válido com 8 dígitos.");
      setCepSuccess(null);
      return;
    }

    setCepLoading(true);
    setCepError(null);
    setCepSuccess(null);

    setTimeout(() => {
      setCepLoading(false);
      const cleanCep = cep.replace(/\D/g, '');
      const firstDigit = cleanCep[0];

      // Smart State Mapping based on Brazilian CEP system
      let detectedLocation = "sua casa";
      if (firstDigit === '0' || firstDigit === '1') detectedLocation = "São Paulo - SP";
      else if (firstDigit === '2') detectedLocation = "Rio de Janeiro - RJ";
      else if (firstDigit === '3') detectedLocation = "Minas Gerais - MG";
      else if (firstDigit === '4') detectedLocation = "Salvador - BA";
      else if (firstDigit === '5') detectedLocation = "Recife - PE";
      else if (firstDigit === '6') detectedLocation = "Manaus - AM";
      else if (firstDigit === '7') detectedLocation = "Brasília - DF";
      else if (firstDigit === '8') detectedLocation = "Curitiba - PR";
      else if (firstDigit === '9') detectedLocation = "Porto Alegre - RS";

      setCepSuccess(detectedLocation);
      // Auto populate checkout address CEP
      setCheckoutCep(cep);
    }, 850);
  };

  // --- SCROLL TO CHKOUT ---
  const scrollToCheckout = (packType?: 'single' | 'double' | 'triple') => {
    if (packType) {
      setSelectedPack(packType);
    }
    checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- PRICES DICTIONARY ---
  const pricing = {
    single: { price: 137.99, label: "1x Kit Torcedor Oficial", quantityDesc: "1 Kit Completo (12 Itens)", save: "Frete Grátis Especial" },
    double: { price: 275.98, label: "Leve 2x Kits Torcedor", quantityDesc: "2 Kits Completos (24 Itens)", save: "Frete Grátis Especial" },
    triple: { price: 413.97, label: "Leve 3x Kits Torcedor", quantityDesc: "3 Kits Completos (36 Itens)", save: "Frete Grátis Especial" }
  };

  const getPriceDetails = () => {
    const selected = pricing[selectedPack];
    return {
      name: selected.label,
      subtotal: selected.price,
      shipping: 0, // Always simulated free express
      total: selected.price
    };
  };

  // --- CHECKOUT SUBMISSION SIMULATOR ---
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkoutName || !checkoutEmail || !checkoutPhone || !checkoutCpf) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setCheckoutStep('processing');

    setTimeout(() => {
      setCheckoutStep('confirmed');
    }, 1800);
  };

  // --- SIMULATED PIX COPY KEY ---
  const copyPixKey = () => {
    setIsPixCopied(true);
    navigator.clipboard?.writeText("00020101021226830014br.gov.pix0114227848651000150215KitTorcedor20265204000053039865406149.905802BR5915KitTorcedorS.A.6009SAOPAULO62070503***6304CA3B");
    setTimeout(() => setIsPixCopied(false), 2500);
  };

  // --- FILTERS ---
  const filteredItems = activeCategory === 'all' 
    ? TORCEDOR_ITEMS 
    : TORCEDOR_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div id="landing-page" className="min-h-screen flex flex-col font-sans select-none antialiased bg-slate-50">
      
      {/* 1. DYNAMIC SALE TICKER BAR */}
      <div id="promo-ticker" className="bg-brand-blue text-white overflow-hidden py-2 text-xs md:text-sm font-medium border-b border-brand-yellow-dark/20 relative z-30">
        <div className="flex animate-marquee whitespace-nowrap gap-8">
          <span>🎯 COPA DO MUNDO 2026: PREPARE SUA TORCIDA! ● ENTREGA EXPRESSA GARANTIDA ANTES DOS PRÓXIMOS EVENTOS EM TODO O BRASIL ●</span>
          <span>⚡ DESCONTO DE LANÇAMENTO: ATÉ 40% OFF + FRETE GRÁTIS HOJE ●</span>
          <span>🔥 ATENÇÃO: ESTOQUE EM NÍVEL CRÍTICO! INSTABILIDADE DEVIDO AO VOLUME DE PEDIDOS ●</span>
          <span>🎯 COPA DO MUNDO 2026: PREPARE SUA TORCIDA! ● ENTREGA EXPRESSA GARANTIDA ANTES DOS PRÓXIMOS EVENTOS EM TODO O BRASIL ●</span>
          <span>⚡ DESCONTO DE LANÇAMENTO: ATÉ 40% OFF + FRETE GRÁTIS HOJE ●</span>
          <span>🔥 ATENÇÃO: ESTOQUE EM NÍVEL CRÍTICO! INSTABILIDADE DEVIDO AO VOLUME DE PEDIDOS ●</span>
        </div>
      </div>

      {/* 2. HEADER */}
      <header id="main-header" className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3 px-4 md:px-8 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-brand-green p-1.5 md:p-2 rounded-xl text-brand-yellow shadow-md shadow-brand-green/10 flex items-center justify-center">
            <Flag className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg md:text-2xl text-brand-green-dark tracking-tight leading-none">
              KIT TORCEDOR <span className="text-brand-green">BRASIL</span>
            </h1>
            <p className="text-[10px] md:text-xs text-brand-blue font-semibold tracking-wider uppercase">Copa do Mundo 2026</p>
          </div>
        </div>

        {/* Header Right Badges */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Compra 100% Protegida</span>
          </div>
          <div className="flex items-center gap-1.5 bg-brand-yellow/15 text-brand-yellow-dark px-3 py-1.5 rounded-full border border-brand-yellow/30 text-[11px] md:text-xs font-bold animate-pulse">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Oferta por tempo limitado</span>
          </div>
          
          <a 
            id="header-cta"
            href="https://entrega.logzz.com.br/pay/memgnzpp7/logzz-vaibrasil"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-green hover:bg-brand-green-dark text-white font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Comprar Agora</span>
          </a>
        </div>
      </header>

      {/* 3. HERO & TOP SECTION */}
      <section id="hero" className="relative bg-gradient-to-b from-brand-green-dark to-slate-900 text-white pt-10 pb-20 px-4 md:px-8 overflow-hidden">
        {/* Background Decorative Graphic Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-brand-green blur-3xl opacity-70" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-brand-blue blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 relative z-10">
          
          {/* Hero Left Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Promo Badge */}
            <div className="inline-flex max-w-fit items-center gap-2 bg-brand-yellow text-slate-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg border border-brand-yellow/50 tracking-wider uppercase animate-bounce">
              <Sparkles className="w-4 h-4 text-brand-green-dark fill-brand-green-dark animate-spin" />
              <span>SUPER LANÇAMENTO • 40% DE DESCONTO</span>
            </div>

            {/* Title & Slogans */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Kit Torcedor Brasil <br />
                <span className="text-brand-yellow tracking-normal relative block mt-1">
                  ★ 12 Itens Incríveis ★
                </span>
              </h2>
              <p className="text-base md:text-xl text-slate-200 font-medium leading-relaxed max-w-2xl">
                Entre no verdadeiro clima da festa! Um conjunto completo preparado nos mínimos detalhes para acompanhar jogos, festas e comemorações com muito mais estilo, barulho e união. Garanta a diversão da família inteira na Copa do Mundo 2026!
              </p>
            </div>

            {/* Quick Visual Grid (vibe metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { label: "DIVERSÃO", symbol: "😊", desc: "Acessórios e tintas" },
                { label: "ESTILO", symbol: "😎", desc: "Óculos e bandanas" },
                { label: "UNIÃO", symbol: "👥", desc: "Família e amigos" },
                { label: "ENERGIA", symbol: "⚡", desc: "Confetes e barulho" }
              ].map((m, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center hover:bg-white/10 transition-colors">
                  <div className="text-2xl mb-1">{m.symbol}</div>
                  <div className="text-[11px] text-brand-yellow font-bold uppercase tracking-wider">{m.label}</div>
                  <div className="text-[10px] text-slate-300">{m.desc}</div>
                </div>
              ))}
            </div>

            {/* Countdown / Stock Banner */}
            <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-brand-yellow">
                  <Clock className="w-5 h-5 text-brand-yellow animate-pulse" />
                  <span className="font-bold text-sm tracking-wide">A PROMOÇÃO TERMINA EM:</span>
                  <span className="font-mono bg-brand-yellow text-slate-900 font-extrabold px-2.5 py-1 rounded text-base inline-block tracking-tight ml-1 animate-pulse">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <div className="text-xs text-right text-slate-300">
                  <span className="text-brand-green-light font-extrabold">🚨 {itemsLeft} unidades restando</span> com frete grátis nacional.
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold text-slate-300">
                  <span>Vendas em ritmo frenético!</span>
                  <span>Estoque restante: {itemsLeft % 10 + 4}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: "70%" }}
                    animate={{ width: `${stockPercentage}%` }}
                    transition={{ duration: 1.5 }}
                    className="bg-gradient-to-r from-brand-yellow to-brand-green h-full rounded-full" 
                  />
                </div>
              </div>
            </div>

            {/* Direct Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a 
                href="https://entrega.logzz.com.br/pay/memgnzpp7/logzz-vaibrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-yellow hover:bg-brand-yellow-dark text-slate-900 font-extrabold text-base md:text-lg px-8 py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-brand-yellow/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>GARANTIR MEU KIT OFICIAL JÁ</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300 font-medium">
                <Check className="w-4 h-4 text-brand-green-light stroke-[3]" />
                <span>Garantia de 7 dias inclusa</span>
              </div>
            </div>

          </div>

          {/* Hero Right Media Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            
            {/* Interactive Image Frame */}
            <div className="relative w-full max-w-[420px] bg-slate-900/40 p-3 rounded-3xl border border-white/10 shadow-2xl overflow-hidden hover-trigger">
              
              <div className="absolute top-4 left-4 z-10 bg-brand-green text-brand-yellow px-3 py-1 rounded-full text-xs font-extrabold shadow-md border border-brand-yellow/30 uppercase tracking-widest flex items-center gap-1 select-none">
                <Award className="w-3.5 h-3.5 fill-brand-yellow text-brand-yellow" />
                <span>{activeMedia === 'video' ? 'ASSISTIR VÍDEO' : activeMedia === 'real' ? 'FOTO REAL LAYOUT' : 'CAIXA OFICIAL'}</span>
              </div>

              {/* Toggle controls inside the frame */}
              <div className="absolute top-4 right-4 z-15 flex gap-1 p-1 bg-black/75 backdrop-blur-md rounded-xl border border-white/10 shadow-lg select-none">
                <button
                  type="button"
                  onClick={() => setActiveMedia('video')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                    activeMedia === 'video'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vídeo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia('real')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                    activeMedia === 'real'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Foto Real
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMedia('box')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                    activeMedia === 'box'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Embalagem
                </button>
              </div>

              {/* Dynamic Image/Video Rendering with smooth transition */}
              <div className="relative w-full aspect-square bg-[#eaeaea] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                {activeMedia === 'video' ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video
                      ref={videoRef}
                      src="https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-sitting-on-the-grass-before-a-match-40348-large.mp4"
                      poster={realLayoutImage}
                      className="w-full h-full object-cover cursor-pointer animate-fade-in"
                      playsInline
                      loop
                      muted
                      referrerPolicy="no-referrer"
                      onClick={() => setVideoPlaying(!videoPlaying)}
                      onPlay={() => setVideoPlaying(true)}
                      onPause={() => setVideoPlaying(false)}
                    />
                    
                    {/* Play/Pause Button cover image overlay */}
                    {!videoPlaying && (
                      <div 
                        onClick={() => setVideoPlaying(true)}
                        className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center z-10 transition-all hover:scale-[1.01]"
                      >
                        <img 
                          src={realLayoutImage} 
                          alt="Capa do Vídeo" 
                          className="absolute inset-0 w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/25" />
                        
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow hover:bg-brand-yellow-dark text-slate-900 shadow-xl transition-transform hover:scale-110 active:scale-95 z-20">
                          <Play className="w-8 h-8 fill-slate-900 ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Mute controller for VSL conversion */}
                    {videoMuted && videoPlaying && (
                      <button
                        onClick={() => setVideoMuted(false)}
                        className="absolute bottom-4 left-4 right-4 bg-brand-yellow hover:bg-brand-yellow-dark text-slate-950 py-2.5 px-4 rounded-xl text-xs font-black shadow-lg flex items-center justify-center gap-2 z-10 uppercase tracking-widest text-slate-950 cursor-pointer animate-pulse"
                      >
                        <Volume2 className="w-4 h-4 text-slate-950" />
                        <span>Clique para Ativar o Som 🔊</span>
                      </button>
                    )}

                    {/* Top watermark */}
                    <div className="absolute top-4 left-4 bg-brand-yellow text-slate-950 font-black text-[9px] px-2 py-0.5 uppercase tracking-widest rounded shadow-sm z-10">
                      VSL Oficial
                    </div>
                  </div>
                ) : (
                  <img 
                    src={activeMedia === 'real' ? realLayoutImage : boxImage}
                    alt={activeMedia === 'real' ? "Foto real dos 12 itens do Kit Torcedor Brasil" : "Caixa oficial do Kit Torcedor Brasil"} 
                    className="w-full h-full object-cover transition-all duration-300 hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              
              {/* Image Description label based on active image */}
              <div className="bg-slate-950/80 p-3.5 mt-2 rounded-xl border border-white/5 text-center space-y-1">
                <p className="text-xs font-bold text-brand-yellow uppercase tracking-wider">
                  {activeMedia === 'video' ? 'VÍDEO DE APRESENTAÇÃO DO KIT' : activeMedia === 'real' ? 'TODOS OS 12 ITENS ESPALHADOS NA MESA' : 'PREPARAÇÃO COMPLETA EM UMA SÓ CAIXA'}
                </p>
                <p className="text-[11px] text-slate-350 leading-tight">
                  {activeMedia === 'video' 
                    ? 'Assista o vídeo e veja por que milhares de torcedores recomendam nosso Kit Oficial!'
                    : activeMedia === 'real'
                      ? 'Veja exatamente tudo o que vem na sua caixa! Imagem realista com alta fidelidade.' 
                      : 'O combo de itens mais completo e pelo menor preço das lojas brasileiras.'}
                </p>
              </div>

            </div>

            {/* Quick trust metrics */}
            <div className="flex justify-around bg-slate-950/50 backdrop-blur-md rounded-2xl p-3 border border-white/5 w-full mt-4 max-w-[420px] text-center gap-1">
              <div>
                <div className="text-sm font-extrabold text-brand-yellow">12 ITENS</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Sem Repetições</div>
              </div>
              <div className="border-l border-white/10" />
              <div>
                <div className="text-sm font-extrabold text-brand-green-light">PIX IMEDIATO</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Aprovação Já</div>
              </div>
              <div className="border-l border-white/10" />
              <div>
                <div className="text-sm font-extrabold text-white">ENVIO SEDEX</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Entrega Segura</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. DYNAMIC DEVIATION POINT / CEP ZIP CALCULATOR */}
      <section id="cep-section" className="relative -mt-10 px-4 md:px-8 max-w-4xl mx-auto z-15">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-5 space-y-1">
            <div className="flex items-center gap-1.5 text-brand-green font-bold text-xs uppercase tracking-wider">
              <Truck className="w-4 h-4 animate-bounce" />
              <span>Calcular Entrega Grátis</span>
            </div>
            <h3 className="text-slate-900 font-extrabold text-lg">Consulte sua data de entrega</h3>
            <p className="text-xs text-slate-500 leading-normal">Digitando seu CEP abaixo nossa ferramenta calcula a data estimada de chegada garantida.</p>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={handleCepLookup} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                <input 
                  type="text"
                  placeholder="Seu CEP (ex: 01001-000)" 
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  maxLength={9}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-green focus:bg-white text-slate-900 px-10 py-3.5 rounded-2xl text-sm font-medium outline-none transition-colors"
                />
              </div>
              <button 
                type="submit"
                disabled={cepLoading}
                className="bg-brand-green hover:bg-brand-green-dark disabled:bg-slate-300 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md shrink-0"
              >
                {cepLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Calculando...</span>
                  </>
                ) : (
                  <span>Descobrir Entrega</span>
                )}
              </button>
            </form>

            {/* CEP Result states */}
            {cepSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-2.5"
              >
                <div className="bg-emerald-500 text-white p-1 rounded-lg shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <p className="text-xs text-slate-800 font-bold shrink-0">
                    PARABÉNS! Frete Grátis Ativado para <span className="text-brand-green-dark">{cepSuccess}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    O produto encontra-se em estoque central prontinho para despacho. Prazo estimado: de <span className="font-semibold text-slate-800">2 a 4 dias úteis</span> via Sedex Expresso Brasil.
                  </p>
                </div>
              </motion.div>
            )}

            {cepError && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-center gap-2.5 text-xs text-rose-700 font-bold"
              >
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{cepError}</span>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE KIT BOX EXPLORER */}
      <section id="kit-explorer" className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
        
        {/* Title Container */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-green uppercase tracking-widest bg-emerald-50 rounded-full px-3 py-1 border border-emerald-200">
            <Sliders className="w-3.5 h-3.5" />
            <span>Abra a Caixa e Explore</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            O Que Contém no Kit Torcedor Brasil?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Nada de repetição sem valor. São 12 itens escolhidos individualmente e calibrados para oferecer a melhor experiência visual e sonora de celebração. Clique em qualquer item abaixo para ver detalhes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-3xl mx-auto">
          {[
            { id: 'all', label: "Todos os Itens (12)" },
            { id: 'vestuario', label: "Roupas e Estilo (4)" },
            { id: 'festa', label: "Festa e Alegria (3)" },
            { id: 'barulho', label: "Som e Bares (3)" },
            { id: 'decoracao', label: "Casa e Paredes (2)" }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setSelectedItem(null); // Close if opened to keep layout clean
              }}
              className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-brand-green text-white shadow-md shadow-brand-green/10 font-bold' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Grid & Detail Panel Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Grid (7 cols on lg, scrolls items) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const IconComponent = IconMap[item.iconName] || LightbulbIcon;
                const isSelected = selectedItem?.id === item.id;
                
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setSelectedItem(item)}
                    className={`group bg-white p-4.5 rounded-3xl border-2 transition-all cursor-pointer select-none text-left flex flex-col justify-between ${
                      isSelected 
                        ? 'border-brand-green bg-emerald-50/20 shadow-md ring-2 ring-brand-green/20' 
                        : 'border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Icon & Qty Tag */}
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-3 rounded-2xl transition-colors ${
                          isSelected ? 'bg-brand-green text-white' : 'bg-slate-50 group-hover:bg-brand-yellow/10 text-slate-700 group-hover:text-brand-yellow-dark'
                        }`}>
                          <IconComponent className="w-5 h-5 flex-shrink-0" />
                        </div>
                        <span className="bg-brand-blue text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Qtd: {item.quantity}
                        </span>
                      </div>

                      {/* Header and short desc */}
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1 transition-colors group-hover:text-brand-green-dark">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Action text */}
                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-brand-green group-hover:text-brand-green-dark">
                      <span>Ver detalhes técnicos</span>
                      <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Details Sidebar Panel (4 cols on lg) */}
          <div className="lg:col-span-4 sticky top-22">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key="selected"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[#0b1f13] border border-brand-green/30 text-white rounded-3xl p-6 shadow-xl space-y-6 text-left relative overflow-hidden"
                >
                  {/* Subtle Background Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green opacity-25 rounded-full blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-yellow opacity-10 rounded-full blur-3xl" />

                  {/* Icon & Selected Tag header */}
                  <div className="flex justify-between items-center z-10 relative">
                    <span className="bg-brand-yellow text-slate-900 border border-brand-yellow/30 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest leading-none">
                      Item Selecionado
                    </span>
                    <button 
                      onClick={() => setSelectedItem(null)}
                      className="text-slate-400 hover:text-white transition-colors text-xs font-bold p-1 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer"
                    >
                      Limpar Seleção
                    </button>
                  </div>

                  {/* Large Icon Graphic */}
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="bg-brand-green p-4 rounded-xl text-brand-yellow shadow-inner">
                      {React.createElement(IconMap[selectedItem.iconName] || ShieldCheck, { className: 'w-8 h-8 stroke-[2]' })}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-brand-yellow leading-tight">
                        {selectedItem.name}
                      </h3>
                      <p className="text-xs text-slate-300 uppercase tracking-widest font-bold">
                        Categoria: {selectedItem.category === 'vestuario' ? 'Estilo & Look' : selectedItem.category === 'festa' ? 'FESTA' : selectedItem.category === 'barulho' ? 'Som & Farra' : 'Decoração'}
                      </p>
                    </div>
                  </div>

                  {/* Extensive Copy details */}
                  <div className="space-y-4 text-xs leading-relaxed text-slate-200">
                    <div>
                      <p className="font-bold text-brand-green-light uppercase tracking-wider mb-1">Como vai enriquecer sua Copa:</p>
                      <p className="bg-white/5 p-3 rounded-xl border border-white/5 italic">
                        "{selectedItem.detailedDescription}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 text-[11px] font-medium bg-black/20 p-3 rounded-xl">
                      <div>
                        <span className="text-slate-400 block">Quantidade incluída:</span>
                        <span className="text-white font-extrabold text-sm">{selectedItem.quantity} unidade(s)</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Status:</span>
                        <span className="text-emerald-400 font-extrabold text-sm flex items-center gap-1">Em estoque</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400 text-[10px] bg-slate-950/20 p-2.5 rounded-xl border border-white/5">
                      <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
                      <span>Todos os materiais são laváveis, leves e higienizados.</span>
                    </div>
                  </div>

                  {/* Standard CTA to Checkout */}
                  <a 
                    href="https://entrega.logzz.com.br/pay/memgnzpp7/logzz-vaibrasil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-brand-yellow hover:bg-brand-yellow-dark text-slate-900 font-extrabold text-xs py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer text-center"
                  >
                    <span>Quero os 12 Itens do Kit</span>
                    <ChevronRight className="w-4 h-4 ml-1 inline-block" />
                  </a>

                </motion.div>
              ) : (
                <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-3 min-h-[380px]">
                  <div className="bg-slate-200 p-4 rounded-full text-slate-400">
                    <Info className="w-8 h-8" />
                  </div>
                  <h4 className="text-slate-700 font-bold text-base">Inspecione os itens!</h4>
                  <p className="text-slate-500 text-xs max-w-xs leading-normal">
                    Selecione qualquer elemento na lista ao lado para desbloquear a ficha técnica, medidas detalhadas e relevância do item na Copa do Mundo 2026.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </section>

      {/* 6. CONVERSATIONAL BENEFITS & FEATURES */}
      <section id="benefits" className="bg-brand-green/5 py-16 px-4 md:px-8 border-y border-brand-green/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-green uppercase tracking-widest bg-emerald-50 rounded-full px-3 py-1 border border-emerald-200">
              Vantagens do Kit
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Torcer Pelo Brasil Nunca Foi Tão Completo
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Diga adeus a comprar acessórios soltos na rua de última hora pagando o triplo do preço. Com nosso kit unificado, você garante a diversão de uma só vez, com segurança e praticidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, bIdx) => {
              const BenefitIconComponent = IconMap[benefit.icon] || Smile;
              
              return (
                <div key={bIdx} className="bg-white rounded-3xl p-6 border border-slate-100 benefit-card-shadow flex flex-col text-left justify-between space-y-4 hover:scale-[1.01] transition-transform">
                  <div className="space-y-3">
                    <div className="bg-emerald-50 text-brand-green p-3.5 max-w-fit rounded-2xl border border-emerald-100 shadow-sm">
                      <BenefitIconComponent className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-extrabold text-base tracking-tight">{benefit.title}</h4>
                      <p className="text-xs text-brand-green font-bold uppercase tracking-wider">{benefit.subtitle}</p>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed leading-normal pt-1">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Image-Like Slogan text from Prompt Attachment */}
          <div className="bg-[#004b1c] rounded-3xl p-6 text-center text-white border border-brand-yellow/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 font-black text-white/5 text-[150px] leading-none pointer-events-none select-none">BRA</div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-brand-yellow text-slate-900 font-extrabold p-2.5 rounded-2xl text-xl shrink-0 flex items-center justify-center shadow-md">
                ⚽
              </div>
              <div className="text-left">
                <p className="font-extrabold text-base md:text-lg text-brand-yellow">FAÇA A DIFERENÇA NA TORCIDA!</p>
                <p className="text-[11px] md:text-xs text-slate-200">Reúna amigos e vizinhos, vista as cores do Brasil e prepare as emoções.</p>
              </div>
            </div>
            
            <a 
              href="https://entrega.logzz.com.br/pay/memgnzpp7/logzz-vaibrasil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow hover:bg-brand-yellow-dark text-slate-900 font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer relative z-10 uppercase tracking-wider text-center"
            >
              Garantir Meu Kit Já
            </a>
          </div>

        </div>
      </section>

      {/* 7. COMPELLING PRICING & INTEGRATED SECURE CHECKOUT FORM */}
      <section id="checkout-pricing" ref={checkoutRef} className="py-16 bg-slate-900 text-white px-4 md:px-8 border-t-8 border-brand-yellow relative overflow-hidden">
        
        {/* Background glow graphics */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-120 h-120 rounded-full bg-brand-green blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-120 h-120 rounded-full bg-brand-yellow blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto space-y-12 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 rounded-full px-3 py-1 border border-brand-yellow/30">
              <BadgePercent className="w-3.5 h-3.5" />
              <span>Oferta Oficial Logzz 100% Protegida</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Adquira Seu Kit Torcedor Oficial
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              O kit oficial mais amado do Brasil pelo menor preço garantido. Sem surpresas, sem taxas adicionais. Aproveite o envio imediato hoje mesmo!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: What comes inside details (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              
              <div className="bg-slate-950/40 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">📦</span>
                    <h3 className="font-extrabold text-lg text-white uppercase tracking-wider font-sans text-brand-yellow">
                      Sua Caixa Completa Contém 12 Itens:
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-200">
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Bandeira do Brasil Grande</strong><br /><span className="text-[10px] text-slate-400">150x90cm com ilhós premium</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Óculos Temático Copa</strong><br /><span className="text-[10px] text-slate-400">Verde e amarelo super estiloso</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Vuvuzela Acústica</strong><br /><span className="text-[10px] text-slate-400">Corneta clássica barulhenta</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Confete Lança-Papel</strong><br /><span className="text-[10px] text-slate-400">Chuva automática de comemoração</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>2x Bastões de Torcedor</strong><br /><span className="text-[10px] text-slate-400">Infláveis plásticos barulhentos</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Estojo de Pintura Facial</strong><br /><span className="text-[10px] text-slate-400">Cremosa, hipoalergênica e lavável</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Bandana Headband</strong><br /><span className="text-[10px] text-slate-400">Tecido respirável e elástico</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Pulseira de Silicone</strong><br /><span className="text-[10px] text-slate-400">Macia e resistente à vibração</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>1x Calendário Oficial de Bolso</strong><br /><span className="text-[10px] text-slate-400">Tabela de jogos em alta resolução</span></p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-brand-yellow text-sm font-semibold mt-0.5">✦</span>
                      <p><strong>2x Cartelas de Tatuagens</strong><br /><span className="text-[10px] text-slate-400">Adesivos temporários para pele</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/10 p-4.5 rounded-2xl">
                  <p className="text-[11px] text-emerald-400 leading-relaxed font-sans font-medium">
                    ✓ <strong>Garantia de Fidelidade:</strong> Receba o produto idêntico às fotos realistas apresentadas em nosso site. Nós prezamos por materiais premium e duradouros para animar todos os jogos!
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Unified Pricing & Direct Official Logzz Link (6 cols) */}
            <div className="lg:col-span-6 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between border border-slate-50 relative overflow-hidden text-left">
              
              <div className="absolute top-0 right-0 bg-brand-yellow text-slate-950 font-black text-[9px] px-3.5 py-1 uppercase tracking-widest rounded-bl-xl shadow-sm z-10 animate-pulse">
                Melhor Oferta do Ano ✦ Lote Promocional
              </div>

  <div className="space-y-6">
                <div className="space-y-1 pt-2">
                  <span className="text-[11px] font-mono font-extrabold uppercase text-brand-green tracking-widest">PROMOÇÃO EXCLUSIVA DE LANÇAMENTO</span>
                  <h3 className="font-extrabold text-2xl text-slate-950 tracking-tight leading-tight">
                    Garantir Meu Kit Oficial
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal">
                    Clique no botão de checkout abaixo para preencher com total segurança os seus dados de entrega direto na página oficial Logzz da nossa distribuidora parceira recomendada.
                  </p>
                </div>

                {/* Big Static Pricing Block with custom styles */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2 text-left relative overflow-hidden">
                  <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                    <span className="line-through">De R$ 199,90</span>
                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase bg-emerald-100/80 px-2 py-0.5 rounded">40% OFF ATIVADO</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-0.5">
                    <span className="text-xs text-slate-500 font-bold">Por apenas</span>
                    <span className="text-3xl font-black text-brand-green-dark tracking-tighter">
                      R$ 137,99
                    </span>
                  </div>
                  <span className="text-[10.5px] text-slate-600 font-semibold block pt-1.5 leading-snug">
                    📦 Nota: Se desejar, você poderá selecionar combos com mais kits e descontos ainda maiores na página oficial Logzz de compra!
                  </span>
                </div>

                {/* Cash on Delivery (COD) Objection Breaker Column */}
                <div className="bg-emerald-50/65 border border-emerald-500/10 p-4 rounded-xl text-left space-y-2">
                  <p className="text-xs font-extrabold text-brand-green-dark flex items-center gap-1.5">
                    🚚 PAGAMENTO NA ENTREGA DISPONÍVEL!
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-medium">
                    Toda a comodidade de <strong>pagar somente na entrega</strong> (Pague no Recebimento) está ativa! Receba as mercadorias em sua residência primeiro e pague em dinheiro, PIX ou cartões de débito/crédito apenas ao pegar as compras na mão.
                  </p>
                </div>

                {/* Core Benefits Stamps */}
                <ul className="text-[11.5px] text-slate-650 space-y-2 text-left pl-1 font-semibold">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-green stroke-[3]" />
                    <span>Envio prioritário em 24h úteis com código de rastreamento</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-green stroke-[3]" />
                    <span>Embalagem resistente personalizada e lacrada de fábrica</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-brand-green stroke-[3]" />
                    <span>Garantia de 7 dias incondicional para amar ou reembolsar</span>
                  </li>
                </ul>
              </div>

              {/* Huge Checkout CTA Trigger to Logzz */}
              <div className="pt-6 space-y-3">
                <a 
                  href="https://entrega.logzz.com.br/pay/memgnzpp7/logzz-vaibrasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-brand-green hover:bg-brand-green-dark text-white font-extrabold text-center text-sm md:text-base py-4.5 px-6 rounded-2xl transition-all shadow-xl hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 border border-brand-yellow/30 cursor-pointer shadow-brand-green/20 uppercase tracking-wider"
                >
                  <ShoppingBag className="w-5 h-5 shrink-0 text-brand-yellow animate-bounce" />
                  <span>Quero meu kit pagamento só na entrega</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-sans tracking-wide">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ambiente Distribuidor Oficial Logzz com Criptografia SSL Bancária</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. PREMIUM CUSTOMER TESTIMONIALS & REVIEWS SECTION */}
      <section id="reviews-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-brand-green uppercase tracking-widest bg-emerald-50 rounded-full px-3 py-1 border border-emerald-200">
            Social Proof
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quem Já Comprou Recomenda!
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Veja opiniões sinceras de clientes reais que já receberam suas caixas do Kit Torcedor Brasil e decolaram a animação de suas torcidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {REVIEWS.map((rev, rIdx) => (
            <div key={rIdx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left hover:scale-[1.01] transition-transform space-y-4">
              
              {/* Review Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-extrabold flex items-center justify-center text-xs border-2 border-brand-green/30">
                    {rev.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-900 leading-tight">{rev.name}</h5>
                    <p className="text-[10px] text-slate-400 font-medium">{rev.city} - {rev.state}</p>
                  </div>
                </div>

                <div className="text-right">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-0.5 text-amber-500 justify-end">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium block mt-1">{rev.date}</span>
                </div>
              </div>

              {/* Comment Content */}
              <p className="text-xs text-slate-600 leading-relaxed italic leading-normal">
                "{rev.comment}"
              </p>

              {/* Verified purchase indicator */}
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50/50 py-1.5 px-3 rounded-xl max-w-fit border border-emerald-100">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Compra Verificada de Kit Torcedor</span>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 10. ELATED FAQ SECTION */}
      <section id="faq-section" className="bg-[#04200c] text-white py-16 px-4 md:px-8 border-t border-brand-yellow/10">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 rounded-full px-3 py-1 border border-brand-yellow/30">
              Perguntas Frequentes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Tire Qualquer Dúvida Restante
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
              Dispomos de transparência total. Explore respostas rápidas para que você compre seu kit com comodidade e segurança absolutas.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, fIdx) => {
              const isOpen = faqOpenIndex === fIdx;
              
              return (
                <div 
                  key={fIdx}
                  className="bg-[#0b2b14] border border-white/5 rounded-2xl overflow-hidden transition-all text-left"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : fIdx)}
                    className="w-full flex justify-between items-center p-5 text-sm font-extrabold text-slate-100 hover:text-white transition-colors cursor-pointer outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-brand-yellow transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 leading-normal">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 11. FOOTER AND FINAL METRICS */}
      <footer id="main-footer" className="bg-slate-950 text-slate-400 py-12 px-4 md:px-8 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left space-y-2">
            <h1 className="font-extrabold text-white text-base tracking-tight leading-none flex items-center justify-center md:justify-start gap-1.5">
              <span>KIT TORCEDOR BRASIL</span>
              <span className="text-brand-yellow">★★★★★</span>
            </h1>
            <p className="text-[10px] text-slate-400 max-w-sm leading-tight">
              Torça com paixão, segurança e economia. O produto final é exatamente idêntico ao fotografado no estúdio de publicações. Todos os direitos reservados para a Copa 2026.
            </p>
          </div>

          {/* Guarantee stamp indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
            <span className="border-r border-white/10 pr-4 block">✓ COMPRA SEGURA EM 2026</span>
            <span className="border-r border-white/10 pr-4 block">✓ DESPACHO EM 24 HORAS</span>
            <span>✓ SUPORTE WHATSAPP BRASIL</span>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 text-center text-[10px] text-slate-500 space-y-1">
          <p>Kit Torcedor Brasil S.A. CNPJ: 12.345.678/0001-90. Alameda do Futebol, nº 2026 - São Paulo - SP</p>
          <p>Este applet é uma demonstração de alta fidelidade e conversão. Nenhuma transação financeira real será processada.</p>
        </div>
      </footer>

      {/* 12. SOCIAL PROOF LIVE RECENT PURCHASE ALERTS */}
      <AnimatePresence>
        {alertVisible && currentAlert && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-4 left-4 bg-slate-900/95 backdrop-blur-md text-white px-4 py-3.5 rounded-2xl border border-white/15 shadow-2xl z-50 flex items-center gap-3.5 text-left max-w-[340px]"
          >
            <div className="bg-brand-green text-brand-yellow p-2 rounded-xl text-lg shrink-0 flex items-center justify-center shadow-md border border-brand-yellow/30">
              ⚽
            </div>
            <div className="leading-tight">
              <p className="text-[10px] text-brand-yellow font-extrabold uppercase tracking-wide">NOVA COMPRA REGISTRADA</p>
              <p className="text-xs font-bold text-white leading-normal">
                {currentAlert.name} ({currentAlert.city}, {currentAlert.state})
              </p>
              <p className="text-[10px] text-slate-300 leading-normal block">
                Comprou: <span className="font-semibold text-brand-green-light">{currentAlert.pack}</span>
              </p>
              <span className="text-[9px] text-slate-400 font-medium block mt-1">{currentAlert.time}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple fallback component in case of dynamic instantiation errors but we are robust
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
