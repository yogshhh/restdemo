import { useState, useEffect, useRef } from "react";

/* ─── FONTS ─────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700&family=Noto+Serif+JP:wght@300;400;500&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

/* ─── GLOBAL STYLES ─────────────────────────────────────── */
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes sakuraFall {
    0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
    10% { opacity: 0.9; }
    90% { opacity: 0.6; }
    100% { transform: translateY(100vh) rotate(720deg) translateX(80px); opacity: 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  .font-jp-serif  { font-family: 'Shippori Mincho', 'Noto Serif JP', serif; }
  .font-jp-body   { font-family: 'Zen Kaku Gothic New', 'Noto Serif JP', sans-serif; }
  .shimmer-rose {
    background: linear-gradient(90deg, #C2185B, #E91E63, #F48FB1, #E91E63, #C2185B);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 4s linear infinite;
  }
  .sakura-petal {
    position: fixed; pointer-events: none; z-index: 9999;
    width: 13px; height: 13px;
    background: radial-gradient(ellipse, #FADADD 0%, #F9A8B8 50%, #F48FB1 70%, transparent 100%);
    border-radius: 50% 0 50% 0;
    animation: sakuraFall linear infinite;
    box-shadow: 0 0 6px rgba(244, 143, 177, 0.5);
  }
  .washi-texture {
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(236,64,122,0.025) 2px, rgba(236,64,122,0.025) 3px),
      repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(236,64,122,0.015) 4px, rgba(236,64,122,0.015) 5px);
  }
  .brushstroke-underline {
    position: relative;
  }
  .brushstroke-underline::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #E91E63 30%, #F48FB1 50%, #E91E63 70%, transparent);
    border-radius: 2px;
  }
  .mon-border {
    border: 1px solid rgba(236,64,122,0.2);
    position: relative;
  }
  .mon-border::before, .mon-border::after {
    content: '家紋';
    position: absolute;
    font-size: 8px;
    color: rgba(236,64,122,0.15);
    font-family: 'Shippori Mincho', serif;
  }
  .mon-border::before { top: 4px; left: 4px; }
  .mon-border::after  { bottom: 4px; right: 4px; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #FFF0F3; }
  ::-webkit-scrollbar-thumb { background: #F06292; border-radius: 2px; }
  .hover-lift { transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s; }
  .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(236,64,122,0.12); }
  .card-glass {
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(244,143,177,0.3);
  }
  .hero-gradient {
    background: linear-gradient(135deg, #FFF0F3 0%, #FCE4EC 30%, #FFF8FA 60%, #F8BBD9 100%);
  }
`;
document.head.appendChild(styleEl);

/* ─── SAKURA PETALS COMPONENT ───────────────────────────── */
function SakuraPetals() {
  return (
    <div aria-hidden="true">
      {[...Array(18)].map((_, i) => (
        <div key={i} className="sakura-petal" style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${8 + Math.random() * 12}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: 0.7 + Math.random() * 0.3,
          transform: `scale(${0.5 + Math.random() * 1})`,
        }} />
      ))}
    </div>
  );
}

/* ─── DATA ───────────────────────────────────────────────── */
const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Contact"];

const DISHES = [
  { name: "Otoro Sashimi", desc: "Premium bluefin toro, shiso, freshly grated wasabi, house ponzu", tag: "Chef's Signature", img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Omakase Nigiri", desc: "Ten-piece seasonal selection, shari rice seasoned with akazu", tag: "Most Loved", img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Wagyu Shabu Sushi", desc: "A5 Kobe beef, truffle ponzu, gold leaf, micro herbs", tag: "Premium", img: "https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { name: "Uni Ikura Don", desc: "Hokkaido sea urchin, salmon roe, dashi jelly, nori, sesame", tag: "Seasonal", img: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=600" },
];

const USPS = [
  { icon: "🎋", title: "Tsukiji-Direct Sourcing", desc: "Every fish arrives from Tokyo's finest markets within 24 hours, ensuring absolute freshness and authenticity." },
  { icon: "🏆", title: "Michelin-Recognised Craft", desc: "Head chef Kenji Nakamura trained under three Michelin-starred masters in Kyoto, Osaka, and Paris." },
  { icon: "⛩️", title: "Japanese Minimalist Ambience", desc: "Our dining room was designed by Kyoto architect Hiroshi Tanaka — wabi-sabi meets contemporary luxury." },
  { icon: "🍶", title: "Curated Sake & Whisky", desc: "Over 200 labels: rare Dassai, Hakkaisan, and vintage Yamazaki expressions curated by our kikizake-shi." },
];

const TESTIMONIALS = [
  { name: "Yuki Tanaka", role: "Food Critic, Tokyo Gourmet Monthly", quote: "Sakura Sushi Bar doesn't merely serve Japanese cuisine — it delivers the soul of Japan itself. Each piece of nigiri is a poem.", stars: 5 },
  { name: "James Whitfield", role: "CEO, Whitfield Asia Pacific", quote: "We host every important client dinner here. The omakase experience is consistently transcendent — equal to anything in Tokyo.", stars: 5 },
  { name: "Aisha Al-Rashidi", role: "Luxury Travel Correspondent", quote: "If I could name one restaurant that defines Tokyo's modern luxury dining scene, it would be Sakura. Extraordinary in every dimension.", stars: 5 },
];

const SERVICES = [
  { icon: "🍣", title: "Omakase Experience", desc: "Surrender to our chef's vision — an intimate 15-course journey through Japan's finest seasonal ingredients, renewed each evening." },
  { icon: "🥂", title: "Private Kaiseki Rooms", desc: "Exclusive tatami rooms for up to 20 guests. Perfect for o-iwai celebrations, corporate omakase, and proposals under paper lantern light." },
  { icon: "🚐", title: "Premium Catering", desc: "Bring Sakura's artistry to your venue. Our team delivers the same Michelin-recognised standard anywhere in the Tokyo metropolitan area." },
  { icon: "📅", title: "Online Reservations", desc: "Reserve your omakase seat instantly. Share dietary preferences and special requests for a truly personalised experience." },
];

const PORTFOLIO_ITEMS = [
  { category: "Food", img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Otoro Artistry" },
  { category: "Interior", img: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Hinoki Counter" },
  { category: "Food", img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Nigiri Procession" },
  { category: "Events", img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Private Kaiseki Evening" },
  { category: "Interior", img: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Tokyo at Night" },
  { category: "Food", img: "https://images.pexels.com/photos/884596/pexels-photo-884596.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Miso Symphony" },
  { category: "Events", img: "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Corporate Omakase" },
  { category: "Interior", img: "https://images.pexels.com/photos/2664149/pexels-photo-2664149.jpeg?auto=compress&cs=tinysrgb&w=600", title: "The Sake Cellar" },
  { category: "Food", img: "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Seasonal Composition" },
];

const TIMELINE = [
  { year: "2005", title: "修行の始まり", desc: "Chef Kenji Nakamura begins his shugyo — the rigorous traditional apprenticeship — under sushi master Jiro Ono in Ginza, Tokyo." },
  { year: "2011", title: "最初の星", desc: "After six years of mastery, Chef Nakamura opens a 12-seat kappo in Nishi-Azabu. It receives its first Michelin star within twelve months." },
  { year: "2016", title: "桜の誕生", desc: "Sakura Sushi Bar opens in Minami-Aoyama, Tokyo — a 60-seat temple of Japanese fine dining fusing tradition with contemporary luxury." },
  { year: "2023", title: "三つ星の栄誉", desc: "Sakura is awarded three Michelin stars, joining a select handful of Tokyo's most celebrated omakase destinations." },
];

/* ─── HELPERS ────────────────────────────────────────────── */
function RoseDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-5">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#F06292]" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L10 6 L16 6 L11.5 9.5 L13.5 16 L8 12 L2.5 16 L4.5 9.5 L0 6 L6 6 Z"
          fill="#E91E63" opacity="0.7" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#F06292]" />
    </div>
  );
}

function SectionLabel({ label, japanese }) {
  return (
    <div className="text-center mb-3">
      {japanese && (
        <p className="font-jp-serif text-[#C2185B]/70 text-2xl mb-1 tracking-[0.5em]">{japanese}</p>
      )}
      <p className="text-[#C2185B] font-semibold text-[0.6rem] tracking-[0.4em] uppercase font-jp-body font-medium">
        {label}
      </p>
    </div>
  );
}

/* ─── JAPANESE MON ORNAMENT ─────────────────────────────── */
function Mon({ size = 40, opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ opacity }}>
      <circle cx="20" cy="20" r="18" stroke="#E91E63" strokeWidth="0.8" />
      <circle cx="20" cy="20" r="12" stroke="#E91E63" strokeWidth="0.5" />
      <path d="M20 2 L20 38 M2 20 L38 20 M5.86 5.86 L34.14 34.14 M34.14 5.86 L5.86 34.14"
        stroke="#E91E63" strokeWidth="0.4" />
      <circle cx="20" cy="20" r="3" fill="#E91E63" opacity="0.5" />
    </svg>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${scrolled ? "py-3 bg-white/92 backdrop-blur-xl border-b border-[#F48FB1]/30 shadow-sm shadow-pink-100" : "py-4 bg-transparent"}`}>
      {/* Logo */}
      <button onClick={() => setActivePage("Home")} className="flex items-center gap-3">
        <Mon size={32} opacity={0.6} />
        <div>
          <p className="font-jp-serif text-[#C2185B] text-base tracking-[0.25em] leading-none">桜寿司</p>
          <p className="font-jp-body text-[#E91E63]/60 text-[0.5rem] tracking-[0.35em] uppercase">Sakura Sushi Bar</p>
        </div>
      </button>

      {/* Desktop */}
      <ul className="hidden md:flex items-center gap-5">
        {NAV_LINKS.map(p => (
          <li key={p}>
            <button onClick={() => setActivePage(p)}
              className={`font-jp-body text-[0.6rem] tracking-[0.25em] uppercase transition-all duration-300 relative group ${activePage === p ? "text-[#E91E63]" : "text-[#1a0a10] hover:text-[#C2185B]"}`}>
              {p}
              {activePage === p && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#E91E63]" />
              )}
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => setActivePage("Contact")}
        className="hidden md:flex items-center gap-2 font-jp-body text-[0.6rem] tracking-[0.2em] uppercase border border-[#E91E63]/50 text-[#E91E63] px-5 py-2.5 hover:bg-[#E91E63] hover:text-white transition-all duration-400 font-medium rounded-sm">
        <span>御予約</span>
        <span className="opacity-60">Reserve</span>
      </button>

      {/* Mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#E91E63] text-xl font-jp-serif">
        {menuOpen ? "✕" : "三"}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/97 backdrop-blur-xl border-t border-[#F48FB1]/20 py-8 flex flex-col items-center gap-6 washi-texture shadow-lg">
          <Mon size={30} opacity={0.3} />
          {NAV_LINKS.map(p => (
            <button key={p} onClick={() => { setActivePage(p); setMenuOpen(false); }}
              className={`font-jp-body text-[0.65rem] tracking-[0.3em] uppercase transition-colors ${activePage === p ? "text-[#E91E63]" : "text-[#1a0a10]"}`}>
              {p}
            </button>
          ))}
          <button onClick={() => { setActivePage("Contact"); setMenuOpen(false); }}
            className="mt-2 font-jp-body text-[0.6rem] tracking-[0.2em] uppercase border border-[#E91E63]/50 text-[#E91E63] px-8 py-2.5 hover:bg-[#E91E63] hover:text-white transition-all duration-300 rounded-sm">
            御予約 · Reserve
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────── */
function Home({ setActivePage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#FFF8FA]">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Soft pink gradient background */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Hero image with pink overlay */}
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Sakura Sushi Bar" className="w-full h-full object-cover opacity-15" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCE4EC]/60 via-transparent to-[#FFF8FA]" />
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(236,64,122,0.02) 120px, rgba(236,64,122,0.02) 121px)"
          }} />
        </div>

        {/* Floating kanji */}
        <div className="absolute left-8 top-1/3 font-jp-serif text-[#E91E63]/20 text-[200px] select-none pointer-events-none leading-none">
          桜
        </div>
        <div className="absolute right-8 bottom-1/4 font-jp-serif text-[#E91E63]/15 text-[150px] select-none pointer-events-none leading-none">
          寿
        </div>

        <div className="relative text-center px-6 max-w-5xl mx-auto" style={{ animation: "fadeInUp 1.2s ease both" }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#F06292]/60" />
            <Mon size={36} opacity={0.5} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#F06292]/60" />
          </div>
          <p className="font-jp-serif text-[#C2185B]/60 text-3xl tracking-[1em] mb-3">桜寿司バー</p>
          <SectionLabel label="Established 2016 · Minami-Aoyama, Tokyo" />
          <h1 className="font-jp-serif text-5xl md:text-7xl lg:text-8xl text-[#2D0A1A] leading-[1.15] mb-4 mt-4">
            Where Tradition<br />
            <em className="shimmer-rose font-normal" style={{ fontFamily: "inherit" }}>Meets Perfection</em>
          </h1>
          <p className="font-jp-body font-light text-[#2D0A1A] font-medium text-base md:text-lg max-w-lg mx-auto mb-6 leading-relaxed tracking-wide">
            A transcendent omakase journey — three Michelin stars, the spirit of Japan, one unforgettable evening in Tokyo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setActivePage("Contact")}
              className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm">
              御予約 · Reserve a Table
            </button>
            <button onClick={() => setActivePage("Services")}
              className="px-6 py-3 border border-[#E91E63]/40 text-[#E91E63] font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:border-[#E91E63] hover:bg-[#E91E63]/8 transition-all duration-400 rounded-sm bg-white/60">
              お品書き · View Menu
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-[#E91E63] to-transparent animate-pulse" />
          <p className="font-jp-body text-[#E91E63] text-[0.55rem] tracking-[0.4em] uppercase">Scroll · 下へ</p>
        </div>
      </section>

      {/* ── FEATURED DISHES ── */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <SectionLabel label="Omakase Selection" japanese="お品書き" />
          <h2 className="font-jp-serif text-4xl md:text-5xl text-[#2D0A1A] mb-2 mt-2">Signature Dishes</h2>
          <RoseDivider />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DISHES.map((dish, i) => (
            <div key={i}
              className="group relative overflow-hidden cursor-pointer hover-lift mon-border bg-white rounded-sm">
              <div className="overflow-hidden h-72">
                <img src={dish.img} alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-800 group-hover:scale-110 opacity-90 group-hover:opacity-100" loading="lazy"
                  style={{ transition: "transform 0.8s ease, opacity 0.5s ease" }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="font-jp-body text-[0.55rem] tracking-[0.2em] uppercase bg-[#E91E63] text-white px-3 py-1 font-medium rounded-sm shadow-sm">{dish.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-jp-serif text-lg text-[#2D0A1A] mb-1">{dish.name}</h3>
                <p className="font-jp-body text-[#1a0a10] text-xs leading-relaxed font-medium">{dish.desc}</p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity duration-400">
                <Mon size={20} opacity={1} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-10 washi-texture border-y border-[#F48FB1]/20" style={{ background: "#FCF0F4" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <SectionLabel label="The Sakura Promise" japanese="桜の約束" />
            <h2 className="font-jp-serif text-4xl md:text-5xl text-[#2D0A1A] mb-2 mt-2">Why Choose Us</h2>
            <RoseDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {USPS.map((u, i) => (
              <div key={i} className="group text-center p-5 bg-white/80 border border-[#F48FB1]/25 hover:border-[#E91E63]/40 hover:bg-white hover:shadow-lg hover:shadow-pink-100 transition-all duration-500 hover-lift rounded-sm">
                <div className="text-4xl mb-5">{u.icon}</div>
                <h3 className="font-jp-serif text-lg text-[#C2185B] mb-3">{u.title}</h3>
                <p className="font-jp-body text-[#1a0a10] text-sm leading-relaxed font-medium">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEF HIGHLIGHT ── */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div className="relative">
            <img src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Chef Kenji Nakamura" className="w-full h-[600px] object-cover opacity-95 rounded-sm" loading="lazy" />
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border border-[#F48FB1]/40" />
            <div className="absolute -top-5 -left-5 w-28 h-28 border border-[#F48FB1]/25" />
            <div className="absolute -bottom-5 -right-5 bg-[#E91E63] p-4 w-20 h-20 flex flex-col items-center justify-center rounded-sm shadow-lg">
              <Mon size={36} opacity={0.9} />
            </div>
          </div>
          <div>
            <SectionLabel label="The Master" japanese="職人" />
            <h2 className="font-jp-serif text-4xl md:text-5xl text-[#2D0A1A] leading-tight mb-2 mt-3">
              Chef Kenji<br /><em className="text-[#E91E63]">Nakamura</em>
            </h2>
            <RoseDivider />
            <p className="font-jp-body text-[#2D0A1A] leading-relaxed mb-5 text-base mt-4" style={{ lineHeight: 1.9 }}>
              Following eighteen years of shugyo — the sacred Japanese path of mastery — across Ginza, Kyoto, and New York, Chef Nakamura brings a philosophy rooted in ichigo ichie: this moment, once in a lifetime. His omakase menus honour seasons and simplicity above all else.
            </p>
            <p className="font-jp-body text-[#2D0A1A] leading-relaxed mb-5 text-base italic border-l-2 border-[#F48FB1]/50 pl-5 bg-[#FFF0F5]/50 py-3 pr-3 rounded-r-sm">
              "The best sushi is the sushi that disappears — it asks nothing of you, and gives you everything."
            </p>
            <div className="flex gap-6">
              {[["18+", "Years of Mastery"], ["3", "Michelin Stars"], ["2", "Global Awards"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-jp-serif text-3xl text-[#E91E63]">{num}</p>
                  <p className="font-jp-body text-[#1a0a10] text-[0.6rem] tracking-widest uppercase mt-1 font-bold">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-10 border-y border-[#F48FB1]/20" style={{ background: "#FCF0F4" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionLabel label="Guest Voices" japanese="お客様の声" />
          <h2 className="font-jp-serif text-4xl text-[#2D0A1A] mb-2 mt-2">What They Say</h2>
          <RoseDivider />
          <div className="mt-6 min-h-[200px]">
            <div key={activeTestimonial} style={{ animation: "fadeInUp 0.6s ease both" }}>
              <p className="font-jp-body text-[#1a0a10] text-lg md:text-xl font-medium leading-relaxed mb-8 italic" style={{ lineHeight: 2 }}>
                "{TESTIMONIALS[activeTestimonial].quote}"
              </p>
              <div className="text-[#E91E63] text-lg mb-3">{"★".repeat(TESTIMONIALS[activeTestimonial].stars)}</div>
              <p className="font-jp-serif text-[#2D0A1A] font-medium text-sm tracking-wide">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="font-jp-body text-[#2D0A1A] text-xs tracking-widest font-semibold uppercase mt-1">{TESTIMONIALS[activeTestimonial].role}</p>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`h-px transition-all duration-400 ${i === activeTestimonial ? "bg-[#E91E63] w-10" : "bg-[#F48FB1]/40 w-5"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <SectionLabel label="Gallery" japanese="ギャラリー" />
          <h2 className="font-jp-serif text-4xl text-[#2D0A1A] mt-2">A Glimpse Within</h2>
          <RoseDivider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PORTFOLIO_ITEMS.slice(0, 6).map((item, i) => (
            <div key={i} className="group relative overflow-hidden rounded-sm">
              <img src={item.img} alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A1A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4">
                <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F9A8B8]">{item.category}</span>
                <p className="font-jp-serif text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => setActivePage("Portfolio")}
            className="font-jp-body text-[0.6rem] tracking-[0.3em] uppercase border border-[#E91E63]/40 text-[#E91E63] px-6 py-3 hover:bg-[#E91E63] hover:text-white transition-all duration-400 bg-white rounded-sm">
            ギャラリー · Full Portfolio
          </button>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative py-8 flex items-center justify-center overflow-hidden">
        <img src="https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Reserve" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCE4EC]/90 via-[#FCE4EC]/75 to-[#FCE4EC]/90" />
        <div className="relative text-center px-6">
          <p className="font-jp-serif text-4xl md:text-5xl text-[#C2185B]/50 mb-2 tracking-[0.5em]">一期一会</p>
          <p className="font-jp-serif text-3xl md:text-4xl text-[#2D0A1A] mb-6 italic">One lifetime, one chance.</p>
          <button onClick={() => setActivePage("Contact")}
            className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm">
            御予約 · Reserve Your Table
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── ABOUT PAGE ─────────────────────────────────────────── */
function About() {
  return (
    <div className="bg-[#FFF8FA] pt-20">
      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
        <div>
          <SectionLabel label="Our Story" japanese="物語" />
          <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] leading-tight mb-4 mt-3">
            Born from<br /><em className="text-[#E91E63]">Shugyo.</em><br />
            <span className="text-[#2D0A1A]">Refined by Time.</span>
          </h2>
          <RoseDivider />
          <div className="space-y-5 mt-8">
            <p className="font-jp-body text-[#0d0508] leading-relaxed text-[0.95rem] font-medium" style={{ lineHeight: 2 }}>
              Sakura Sushi Bar was never meant to be just a restaurant. When Chef Kenji Nakamura returned to Tokyo in 2016 after training in the world's greatest kitchens, he brought with him a single vision — to distil Japan's philosophy of monozukuri, the art of making, into a dining experience unlike any other.
            </p>
            <p className="font-jp-body text-[#0d0508] leading-relaxed text-[0.95rem] font-medium" style={{ lineHeight: 2 }}>
              What began as a hushed 20-seat hinoki counter in Minami-Aoyama has grown into Tokyo's most celebrated omakase destination. Three Michelin stars, countless memories, and an unwavering devotion to the idea that sushi is, at its finest, a conversation between chef and guest.
            </p>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Sakura interior" className="w-full h-[500px] object-cover opacity-95 rounded-sm" loading="lazy" />
          <div className="absolute -bottom-5 -left-5 bg-[#E91E63] p-6 rounded-sm shadow-lg">
            <p className="font-jp-serif text-4xl text-white font-bold">2016</p>
            <p className="font-jp-body text-white/80 text-[0.55rem] tracking-widest uppercase mt-1">Est. Tokyo</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="washi-texture border-y border-[#F48FB1]/20 py-10 px-6" style={{ background: "#FCF0F4" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <SectionLabel label="Our Journey" japanese="歩み" />
            <h2 className="font-jp-serif text-4xl text-[#2D0A1A] mt-2">Milestones</h2>
            <RoseDivider />
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#F48FB1]/40" />
            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={i} className={`flex gap-5 items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
                    <span className="font-jp-serif text-[#E91E63] text-2xl block mb-2">{item.year}</span>
                    <h3 className="font-jp-serif text-xl text-[#2D0A1A] mb-2">{item.title}</h3>
                    <p className="font-jp-body text-[#1a0a10] text-sm leading-relaxed font-medium" style={{ lineHeight: 1.9 }}>{item.desc}</p>
                  </div>
                  <div className="relative flex-shrink-0 hidden md:block">
                    <Mon size={18} opacity={0.7} />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <SectionLabel label="Recognition" japanese="受賞歴" />
          <h2 className="font-jp-serif text-4xl text-[#2D0A1A] mt-2">Awards & Acclaim</h2>
          <RoseDivider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["⭐⭐⭐", "Michelin Stars", "2023–Present"],
            ["🥇", "Asia's Best Restaurant", "World's 50 Best, 2023"],
            ["🍶", "Best Sake Programme", "Japan Food Awards, 2022"],
            ["🏛️", "Luxury Dining Award", "Condé Nast, 2024"],
          ].map(([icon, award, org]) => (
            <div key={award} className="text-center p-5 bg-white border border-[#F48FB1]/25 hover:border-[#E91E63]/40 hover:shadow-md hover:shadow-pink-100 transition-all duration-400 hover-lift rounded-sm">
              <div className="text-3xl mb-4">{icon}</div>
              <p className="font-jp-serif text-[#C2185B] text-sm mb-1">{award}</p>
              <p className="font-jp-body text-[#2D0A1A] text-xs tracking-widest font-semibold">{org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ambience */}
      <section className="pb-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-3 h-[400px] md:h-[520px] rounded-sm overflow-hidden">
          <img src="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Tokyo night" className="col-span-2 w-full h-full object-cover opacity-90" loading="lazy" />
          <div className="flex flex-col gap-3">
            <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Hinoki counter" className="w-full h-1/2 object-cover opacity-90" loading="lazy" />
            <img src="https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Sushi craft" className="w-full h-1/2 object-cover opacity-90" loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── SERVICES PAGE ──────────────────────────────────────── */
function Services({ setActivePage }) {
  return (
    <div className="bg-[#FFF8FA] pt-20">
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <SectionLabel label="What We Offer" japanese="ご提供" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] leading-tight mb-2 mt-3">
          Our <em className="text-[#E91E63]">Services</em>
        </h2>
        <RoseDivider />
        <p className="font-jp-body text-[#1a0a10] mt-6 leading-relaxed text-base" style={{ lineHeight: 2 }}>
          Every service at Sakura is curated with the same obsessive attention — omotenashi, the Japanese art of wholehearted hospitality, elevated to its finest expression.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-7">
        {SERVICES.map((s, i) => (
          <div key={i} className="group relative p-6 border border-[#F48FB1]/25 hover:border-[#E91E63]/40 bg-white hover:bg-[#FFF0F5] transition-all duration-500 overflow-hidden hover-lift rounded-sm shadow-sm hover:shadow-md hover:shadow-pink-100">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
              <Mon size={40} opacity={1} />
            </div>
            <div className="text-5xl mb-6">{s.icon}</div>
            <h3 className="font-jp-serif text-2xl text-[#2D0A1A] mb-3 group-hover:text-[#E91E63] transition-colors duration-300">{s.title}</h3>
            <p className="font-jp-body text-[#1a0a10] leading-relaxed text-sm" style={{ lineHeight: 1.9 }}>{s.desc}</p>
            <button onClick={() => setActivePage("Contact")}
              className="mt-8 font-jp-body text-[0.6rem] tracking-[0.25em] uppercase text-[#E91E63] border-b border-[#E91E63]/30 pb-0.5 hover:border-[#E91E63] transition-all duration-300">
              お問い合わせ · Enquire →
            </button>
          </div>
        ))}
      </section>

      {/* Special occasion promo */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Private dining" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCE4EC]/90 via-[#FCE4EC]/75 to-[#FCE4EC]/90" />
        <div className="relative text-center px-6">
          <p className="font-jp-serif text-[#C2185B]/50 text-3xl tracking-[1em] mb-2">特別な夜</p>
          <p className="font-jp-serif text-3xl md:text-4xl text-[#2D0A1A] mb-6 italic">Planning something extraordinary?</p>
          <button onClick={() => setActivePage("Contact")}
            className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm">
            Talk to Our Events Team
          </button>
        </div>
      </section>
    </div>
  );
}

/* ─── PORTFOLIO PAGE ─────────────────────────────────────── */
function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const FILTERS = ["All", "Food", "Interior", "Events"];
  const filtered = filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(i => i.category === filter);

  return (
    <div className="bg-[#FFF8FA] pt-20">
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <SectionLabel label="Visual Story" japanese="物語" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] mb-2 mt-3">
          Our <em className="text-[#E91E63]">Portfolio</em>
        </h2>
        <RoseDivider />
      </section>

      <div className="flex justify-center gap-5 mb-6 px-6 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-jp-body text-[0.6rem] tracking-[0.3em] uppercase pb-1 border-b transition-all duration-300 ${filter === f ? "border-[#E91E63] text-[#E91E63]" : "border-transparent text-[#1a0a10] hover:text-[#2D0A1A]"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div key={`${filter}-${i}`} onClick={() => setLightbox(item)}
              className="group relative break-inside-avoid overflow-hidden cursor-zoom-in rounded-sm">
              <img src={item.img} alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A1A]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F9A8B8]">{item.category}</span>
                <p className="font-jp-serif text-white text-base">{item.title}</p>
                <Mon size={20} opacity={0.6} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-[#2D0A1A]/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-8 text-[#F48FB1] text-2xl hover:text-white transition-colors font-jp-serif">✕</button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[80vh] object-contain rounded-sm" />
            <div className="mt-5 text-center">
              <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F48FB1]">{lightbox.category}</span>
              <p className="font-jp-serif text-xl text-white mt-1">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CONTACT PAGE ───────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", date: "", message: "" });
  };

  const inputClass = "w-full bg-transparent border-b border-[#F48FB1]/40 focus:border-[#E91E63] outline-none py-3 text-[#2D0A1A] text-sm placeholder-[#B07090]/50 transition-colors duration-400 font-jp-body font-light";

  return (
    <div className="bg-[#FFF8FA] pt-20">
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <SectionLabel label="Get In Touch" japanese="ご連絡" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] mb-2 mt-3">
          御予約 · <em className="text-[#E91E63]">Reserve</em>
        </h2>
        <RoseDivider />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Form */}
        <div className="bg-white border border-[#F48FB1]/25 p-6 shadow-sm rounded-sm">
          <h3 className="font-jp-serif text-2xl text-[#2D0A1A] mb-2">Reserve Your Table</h3>
          <p className="font-jp-serif text-[#C2185B]/60 text-sm tracking-widest mb-8">お席のご予約</p>
          {sent && (
            <div className="mb-6 p-4 border border-[#E91E63]/30 bg-[#FFF0F5] text-[#C2185B] text-sm font-jp-body tracking-wide rounded-sm">
              ✓ ご予約のリクエストを承りました。24時間以内にご確認をいたします。
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">お名前 · Full Name</label>
                <input type="text" required placeholder="Yuki Tanaka" className={inputClass}
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">Email</label>
                <input type="email" required placeholder="hello@example.com" className={inputClass}
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">電話番号 · Phone</label>
                <input type="tel" placeholder="+81 3 1234 5678" className={inputClass}
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">ご希望日 · Date</label>
                <input type="date" className={inputClass}
                  value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">ご要望 · Special Requests</label>
              <textarea rows={4} placeholder="Dietary requirements, occasion details, seating preferences..." className={`${inputClass} resize-none`}
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit"
              className="w-full py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm">
              ご予約を確定する · Confirm Reservation
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-10">
          {/* Map placeholder */}
          <div className="relative overflow-hidden h-64 bg-[#FCF0F4] border border-[#F48FB1]/25 flex items-center justify-center washi-texture rounded-sm">
            <div className="absolute top-4 right-4 opacity-10">
              <Mon size={50} opacity={1} />
            </div>
            <div className="text-center">
              <p className="text-[#E91E63] text-3xl mb-3">⛩️</p>
              <p className="font-jp-serif text-[#2D0A1A] text-lg">桜寿司バー</p>
              <p className="font-jp-body text-[#1a0a10] text-sm mt-1">2-14-6 Minami-Aoyama, Minato-ku</p>
              <p className="font-jp-body text-[#1a0a10] text-sm">Tokyo, 107-0062, Japan</p>
              <a href="https://maps.google.com/?q=Minami-Aoyama+Tokyo" target="_blank" rel="noreferrer"
                className="inline-block mt-4 font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#E91E63] border-b border-[#E91E63]/30 hover:border-[#E91E63] transition-all duration-300 pb-0.5">
                地図を開く · Open in Maps →
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="p-5 border border-[#F48FB1]/25 bg-white rounded-sm shadow-sm">
            <h3 className="font-jp-serif text-xl text-[#C2185B] mb-2">Opening Hours</h3>
            <p className="font-jp-serif text-[#C2185B]/50 text-sm tracking-widest mb-5">営業時間</p>
            {[["月〜金 · Mon – Fri", "12:00 – 23:00"], ["土 · Saturday", "11:00 – 23:30"], ["日 · Sunday", "11:00 – 22:00"]].map(([day, time]) => (
              <div key={day} className="flex justify-between py-3 border-b border-[#F48FB1]/15 last:border-0">
                <span className="font-jp-body text-[#1a0a10] text-sm">{day}</span>
                <span className="font-jp-body text-[#2D0A1A] text-sm font-semibold">{time}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-5">
            {[
              ["📞", "御予約 · Reservations", "+81 3 1234 5678"],
              ["✉️", "Email", "reserve@sakurasushibar.jp"],
              ["📸", "Instagram", "@sakura.sushi.tokyo"],
            ].map(([icon, label, val]) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#F48FB1]/30 bg-white flex items-center justify-center text-sm flex-shrink-0 rounded-sm shadow-sm">{icon}</div>
                <div>
                  <p className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#1a0a10]">{label}</p>
                  <p className="font-jp-body text-[#2D0A1A] text-sm mt-0.5 font-medium">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer({ setActivePage }) {
  return (
    <footer className="bg-[#2D0A1A] border-t border-[#F48FB1]/15 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mon size={30} opacity={0.6} />
              <div>
                <p className="font-jp-serif text-xl text-[#F9A8B8] tracking-[0.2em]">桜寿司バー</p>
                <p className="font-jp-body text-white/60 text-[0.5rem] tracking-[0.3em] uppercase">Sakura Sushi Bar</p>
              </div>
            </div>
            <p className="font-jp-body text-white/90 text-sm leading-relaxed max-w-xs" style={{ lineHeight: 2 }}>
              Three Michelin stars. The spirit of Japan. One unforgettable evening in Minami-Aoyama, Tokyo since 2016.
            </p>
          </div>
          <div>
            <p className="font-jp-body text-[0.55rem] tracking-[0.3em] uppercase text-[#F48FB1] mb-5">Navigation · ナビ</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(p => (
                <li key={p}>
                  <button onClick={() => setActivePage(p)} className="font-jp-body text-white/80 text-sm hover:text-[#F9A8B8] transition-colors">{p}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-jp-body text-[0.55rem] tracking-[0.3em] uppercase text-[#F48FB1] mb-5">Contact · ご連絡</p>
            <div className="space-y-2 font-jp-body text-white/80 text-sm font-light">
              <p>2-14-6 Minami-Aoyama, Minato-ku</p>
              <p>Tokyo, 107-0062, Japan</p>
              <p className="mt-4">+81 3 1234 5678</p>
              <p>reserve@sakurasushibar.jp</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#F48FB1]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-jp-body text-white/60 text-xs tracking-widest">© 2025 Sakura Sushi Bar · 桜寿司バー. All rights reserved.</p>
          <p className="font-jp-body text-white/60 text-xs tracking-widest">一期一会 · Crafted with soul in Tokyo</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────── */
export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const PAGE = { Home, About, Services, Portfolio, Contact };
  const PageComponent = PAGE[activePage];

  return (
    <div className="min-h-screen bg-[#FFF8FA]">
      <SakuraPetals />
      <Navbar activePage={activePage} setActivePage={navigate} />
      <main>
        <PageComponent setActivePage={navigate} />
      </main>
      <Footer setActivePage={navigate} />
    </div>
  );
}
