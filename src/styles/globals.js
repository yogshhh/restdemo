// src/styles/globals.js
// Injects Google Fonts and global keyframe/utility CSS into <head> once at app startup.

export function injectGlobalStyles() {
  if (document.getElementById("sakura-fonts")) return; // prevent double-injection

  const fontLink = document.createElement("link");
  fontLink.id = "sakura-fonts";
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700" +
    "&family=Noto+Serif+JP:wght@300;400;500" +
    "&family=Zen+Kaku+Gothic+New:wght@300;400;500&display=swap";
  document.head.appendChild(fontLink);

  const styleEl = document.createElement("style");
  styleEl.id = "sakura-global-styles";
  styleEl.textContent = `
    @keyframes sakuraFall {
      0%   { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
      10%  { opacity: 0.9; }
      90%  { opacity: 0.6; }
      100% { transform: translateY(100vh) rotate(720deg) translateX(80px); opacity: 0; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }

    .font-jp-serif { font-family: 'Shippori Mincho', 'Noto Serif JP', serif; }
    .font-jp-body  { font-family: 'Zen Kaku Gothic New', 'Noto Serif JP', sans-serif; }

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
      box-shadow: 0 0 6px rgba(244,143,177,0.5);
    }

    .washi-texture {
      background-image:
        repeating-linear-gradient(0deg,  transparent, transparent 2px, rgba(236,64,122,0.025) 2px, rgba(236,64,122,0.025) 3px),
        repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(236,64,122,0.015) 4px, rgba(236,64,122,0.015) 5px);
    }

    .brushstroke-underline { position: relative; }
    .brushstroke-underline::after {
      content: '';
      position: absolute;
      bottom: -6px; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #E91E63 30%, #F48FB1 50%, #E91E63 70%, transparent);
      border-radius: 2px;
    }

    .mon-border { border: 1px solid rgba(236,64,122,0.2); position: relative; }
    .mon-border::before, .mon-border::after {
      content: '家紋';
      position: absolute;
      font-size: 8px;
      color: rgba(236,64,122,0.15);
      font-family: 'Shippori Mincho', serif;
    }
    .mon-border::before { top: 4px;    left:  4px; }
    .mon-border::after  { bottom: 4px; right: 4px; }

    ::-webkit-scrollbar       { width: 4px; }
    ::-webkit-scrollbar-track { background: #FFF0F3; }
    ::-webkit-scrollbar-thumb { background: #F06292; border-radius: 2px; }

    .hover-lift { transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s; }
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
}