// src/pages/Services.jsx
// Service cards grid and special-occasion promotional banner.

import Mon from "../components/Mon";
import RoseDivider from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";
import { SERVICES } from "../data/constants";

export default function Services({ setActivePage }) {

  return (
    <div className="bg-[#FFF8FA] pt-20">

      {/* ── HEADER ── */}
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

      {/* ── SERVICE CARDS ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-2 gap-7">
        {SERVICES.map((s, i) => (
          <div
            key={i}
            className="group relative p-6 border border-[#F48FB1]/25 hover:border-[#E91E63]/40 bg-white hover:bg-[#FFF0F5] transition-all duration-500 overflow-hidden hover-lift rounded-sm shadow-sm hover:shadow-md hover:shadow-pink-100"
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-15 transition-opacity duration-500">
              <Mon size={40} opacity={1} />
            </div>
            <div className="text-5xl mb-6">{s.icon}</div>
            <h3 className="font-jp-serif text-2xl text-[#2D0A1A] mb-3 group-hover:text-[#E91E63] transition-colors duration-300">
              {s.title}
            </h3>
            <p className="font-jp-body text-[#1a0a10] leading-relaxed text-sm" style={{ lineHeight: 1.9 }}>
              {s.desc}
            </p>
            <button
              onClick={() => setActivePage("Contact")}
              className="mt-8 font-jp-body text-[0.6rem] tracking-[0.25em] uppercase text-[#E91E63] border-b border-[#E91E63]/30 pb-0.5 hover:border-[#E91E63] transition-all duration-300"
            >
              お問い合わせ · Enquire →
            </button>
          </div>
        ))}
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Private dining"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCE4EC]/90 via-[#FCE4EC]/75 to-[#FCE4EC]/90" />
        <div className="relative text-center px-6">
          <p className="font-jp-serif text-[#C2185B]/50 text-3xl tracking-[1em] mb-2">特別な夜</p>
          <p className="font-jp-serif text-3xl md:text-4xl text-[#2D0A1A] mb-6 italic">
            Planning something extraordinary?
          </p>
          <button
            onClick={() => setActivePage("Contact")}
            className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm"
          >
            Talk to Our Events Team
          </button>
        </div>
      </section>

    </div>
  );
}
