// src/pages/Home.jsx
// Landing page: Hero → Featured Dishes → Why Choose Us → Chef Highlight →
// Testimonials → Gallery Preview → CTA Strip.

import { useState, useEffect } from "react";
import Mon from "../components/Mon";
import RoseDivider from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";
import { DISHES, USPS, TESTIMONIALS, PORTFOLIO_ITEMS } from "../data/constants";

export default function Home({ setActivePage }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#FFF8FA]">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1800"
            alt="Sakura Sushi Bar"
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCE4EC]/60 via-transparent to-[#FFF8FA]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 120px, rgba(236,64,122,0.02) 120px, rgba(236,64,122,0.02) 121px)",
            }}
          />
        </div>

        {/* Floating kanji */}
        <div className="absolute left-8 top-1/3 font-jp-serif text-[#E91E63]/20 text-[200px] select-none pointer-events-none leading-none">桜</div>
        <div className="absolute right-8 bottom-1/4 font-jp-serif text-[#E91E63]/15 text-[150px] select-none pointer-events-none leading-none">寿</div>

        <div
          className="relative text-center px-6 max-w-5xl mx-auto"
          style={{ animation: "fadeInUp 1.2s ease both" }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#F06292]/60" />
            <Mon size={36} opacity={0.5} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#F06292]/60" />
          </div>
          <p className="font-jp-serif text-[#C2185B]/60 text-3xl tracking-[1em] mb-3">桜寿司バー</p>
          <SectionLabel label="Established 2016 · Minami-Aoyama, Tokyo" />
          <h1 className="font-jp-serif text-5xl md:text-7xl lg:text-8xl text-[#2D0A1A] leading-[1.15] mb-4 mt-4">
            Where Tradition<br />
            <em className="shimmer-rose font-normal" style={{ fontFamily: "inherit" }}>
              Meets Perfection
            </em>
          </h1>
          <p className="font-jp-body font-light text-[#2D0A1A] font-medium text-base md:text-lg max-w-lg mx-auto mb-6 leading-relaxed tracking-wide">
            A transcendent omakase journey — three Michelin stars, the spirit of Japan, one unforgettable evening in Tokyo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActivePage("Contact")}
              className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm"
            >
              御予約 · Reserve a Table
            </button>
            <button
              onClick={() => setActivePage("Services")}
              className="px-6 py-3 border border-[#E91E63]/40 text-[#E91E63] font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:border-[#E91E63] hover:bg-[#E91E63]/8 transition-all duration-400 rounded-sm bg-white/60"
            >
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
            <div key={i} className="group relative overflow-hidden cursor-pointer hover-lift mon-border bg-white rounded-sm">
              <div className="overflow-hidden h-72">
                <img
                  src={dish.img} alt={dish.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
                  style={{ transition: "transform 0.8s ease, opacity 0.5s ease" }}
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="font-jp-body text-[0.55rem] tracking-[0.2em] uppercase bg-[#E91E63] text-white px-3 py-1 font-medium rounded-sm shadow-sm">
                  {dish.tag}
                </span>
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
            <img
              src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Chef Kenji Nakamura"
              className="w-full h-[600px] object-cover opacity-95 rounded-sm"
              loading="lazy"
            />
            <div className="absolute -bottom-5 -right-5 w-28 h-28 border border-[#F48FB1]/40" />
            <div className="absolute -top-5  -left-5  w-28 h-28 border border-[#F48FB1]/25" />
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
              Following eighteen years of shugyo — the sacred Japanese path of mastery — across Ginza, Kyoto, and New York, Chef Nakamura brings a philosophy rooted in ichigo ichie: this moment, once in a lifetime.
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
              <div className="text-[#E91E63] text-lg mb-3">
                {"★".repeat(TESTIMONIALS[activeTestimonial].stars)}
              </div>
              <p className="font-jp-serif text-[#2D0A1A] font-medium text-sm tracking-wide">
                {TESTIMONIALS[activeTestimonial].name}
              </p>
              <p className="font-jp-body text-[#2D0A1A] text-xs tracking-widest font-semibold uppercase mt-1">
                {TESTIMONIALS[activeTestimonial].role}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-px transition-all duration-400 ${i === activeTestimonial ? "bg-[#E91E63] w-10" : "bg-[#F48FB1]/40 w-5"}`}
              />
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
              <img
                src={item.img} alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D0A1A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4">
                <span className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#F9A8B8]">{item.category}</span>
                <p className="font-jp-serif text-white text-sm">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => setActivePage("Portfolio")}
            className="font-jp-body text-[0.6rem] tracking-[0.3em] uppercase border border-[#E91E63]/40 text-[#E91E63] px-6 py-3 hover:bg-[#E91E63] hover:text-white transition-all duration-400 bg-white rounded-sm"
          >
            ギャラリー · Full Portfolio
          </button>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative py-8 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Reserve"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FCE4EC]/90 via-[#FCE4EC]/75 to-[#FCE4EC]/90" />
        <div className="relative text-center px-6">
          <p className="font-jp-serif text-4xl md:text-5xl text-[#C2185B]/50 mb-2 tracking-[0.5em]">一期一会</p>
          <p className="font-jp-serif text-3xl md:text-4xl text-[#2D0A1A] mb-6 italic">One lifetime, one chance.</p>
          <button
            onClick={() => setActivePage("Contact")}
            className="px-6 py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm"
          >
            御予約 · Reserve Your Table
          </button>
        </div>
      </section>

    </div>
  );
}
