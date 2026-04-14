// src/pages/Portfolio.jsx
// Filterable masonry gallery with a click-to-open lightbox overlay.

import { useState } from "react";
import Mon          from "../components/Mon";
import RoseDivider  from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";
import { PORTFOLIO_ITEMS } from "../data/constants";

const FILTERS = ["All", "Food", "Interior", "Events"];

export default function Portfolio({ setActivePage }) {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((i) => i.category === filter);

  return (
    <div className="bg-[#FFF8FA] pt-20">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <SectionLabel label="Visual Story" japanese="物語" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] mb-2 mt-3">
          Our <em className="text-[#E91E63]">Portfolio</em>
        </h2>
        <RoseDivider />
      </section>

      {/* ── FILTER TABS ── */}
      <div className="flex justify-center gap-5 mb-6 px-6 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-jp-body text-[0.6rem] tracking-[0.3em] uppercase pb-1 border-b transition-all duration-300 ${
              filter === f
                ? "border-[#E91E63] text-[#E91E63]"
                : "border-transparent text-[#1a0a10] hover:text-[#2D0A1A]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={`${filter}-${i}`}
              onClick={() => setLightbox(item)}
              className="group relative break-inside-avoid overflow-hidden cursor-zoom-in rounded-sm"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A1A]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F9A8B8]">
                  {item.category}
                </span>
                <p className="font-jp-serif text-white text-base">{item.title}</p>
                <Mon size={20} opacity={0.6} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-[#2D0A1A]/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-[#F48FB1] text-2xl hover:text-white transition-colors font-jp-serif"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.img}
              alt={lightbox.title}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />
            <div className="mt-5 text-center">
              <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F48FB1]">
                {lightbox.category}
              </span>
              <p className="font-jp-serif text-xl text-white mt-1">{lightbox.title}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
