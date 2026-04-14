// src/components/Navbar.jsx
// Sticky navigation bar with state-based routing
// Collapses into a hamburger menu on mobile

import { useState, useEffect } from "react";
import Mon from "./Mon";
import { NAV_LINKS } from "../data/constants";

export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (page) => {
    setMenuOpen(false);
    setActivePage(page);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-700 ${
        scrolled
          ? "py-3 bg-white/92 backdrop-blur-xl border-b border-[#F48FB1]/30 shadow-sm shadow-pink-100"
          : "py-4 bg-transparent"
      }`}
    >
      {/* ── Logo ── */}
      <button onClick={() => handleNav("Home")} className="flex items-center gap-3">
        <Mon size={32} opacity={0.6} />
        <div>
          <p className="font-jp-serif text-[#C2185B] text-base tracking-[0.25em] leading-none">桜寿司</p>
          <p className="font-jp-body text-[#E91E63]/60 text-[0.5rem] tracking-[0.35em] uppercase">Sakura Sushi Bar</p>
        </div>
      </button>

      {/* ── Desktop links ── */}
      <ul className="hidden md:flex items-center gap-5">
        {NAV_LINKS.map((page) => (
          <li key={page}>
            <button
              onClick={() => handleNav(page)}
              className={`font-jp-body text-[0.6rem] tracking-[0.25em] uppercase transition-all duration-300 relative group ${
                activePage === page ? "text-[#E91E63]" : "text-[#1a0a10] hover:text-[#C2185B]"
              }`}
            >
              {page}
              {activePage === page && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#E91E63]" />
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* ── Desktop CTA ── */}
      <button
        onClick={() => handleNav("Contact")}
        className="hidden md:flex items-center gap-2 font-jp-body text-[0.6rem] tracking-[0.2em] uppercase border border-[#E91E63]/50 text-[#E91E63] px-5 py-2.5 hover:bg-[#E91E63] hover:text-white transition-all duration-400 font-medium rounded-sm"
      >
        <span>御予約</span>
        <span className="opacity-60">Reserve</span>
      </button>

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-[#E91E63] text-xl font-jp-serif"
        aria-label="Toggle menu"
      >
        {menuOpen ? "✕" : "三"}
      </button>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/97 backdrop-blur-xl border-t border-[#F48FB1]/20 py-8 flex flex-col items-center gap-6 washi-texture shadow-lg">
          <Mon size={30} opacity={0.3} />
          {NAV_LINKS.map((page) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className="font-jp-body text-[0.65rem] tracking-[0.3em] uppercase transition-colors text-[#1a0a10] hover:text-[#E91E63]"
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handleNav("Contact")}
            className="mt-2 font-jp-body text-[0.6rem] tracking-[0.2em] uppercase border border-[#E91E63]/50 text-[#E91E63] px-8 py-2.5 hover:bg-[#E91E63] hover:text-white transition-all duration-300 rounded-sm"
          >
            御予約 · Reserve
          </button>
        </div>
      )}
    </nav>
  );
}
