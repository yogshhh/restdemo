// src/components/Footer.jsx
// Site-wide footer: brand, navigation links, contact info, and copyright.

import Mon from "./Mon";
import { NAV_LINKS } from "../data/constants";

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);};

  return (
    <footer className="bg-[#2D0A1A] border-t border-[#F48FB1]/15 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Mon size={30} opacity={0.6} />
              <div>
                <p className="font-jp-serif text-xl text-[#F9A8B8] tracking-[0.2em]">桜寿司バー</p>
                <p className="font-jp-body text-white/60 text-[0.5rem] tracking-[0.3em] uppercase">
                  Sakura Sushi Bar
                </p>
              </div>
            </div>
            <p
              className="font-jp-body text-white/90 text-sm leading-relaxed max-w-xs"
              style={{ lineHeight: 2 }}
            >
              Three Michelin stars. The spirit of Japan. One unforgettable evening in
              Minami-Aoyama, Tokyo since 2016.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-jp-body text-[0.55rem] tracking-[0.3em] uppercase text-[#F48FB1] mb-5">
              Navigation · ナビ
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handleNav(page)}
                    className="font-jp-body text-white/80 text-sm hover:text-[#F9A8B8] transition-colors"
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-jp-body text-[0.55rem] tracking-[0.3em] uppercase text-[#F48FB1] mb-5">
              Contact · ご連絡
            </p>
            <address className="not-italic space-y-2 font-jp-body text-white/80 text-sm font-light">
              <p>2-14-6 Minami-Aoyama, Minato-ku</p>
              <p>Tokyo, 107-0062, Japan</p>
              <p className="mt-4">+81 3 1234 5678</p>
              <p>reserve@sakurasushibar.jp</p>
            </address>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[#F48FB1]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-jp-body text-white/60 text-xs tracking-widest">
            © 2025 Sakura Sushi Bar · 桜寿司バー. All rights reserved.
          </p>
          <p className="font-jp-body text-white/60 text-xs tracking-widest">
            一期一会 · Crafted with soul in Tokyo
          </p>
        </div>

      </div>
    </footer>
  );
}
