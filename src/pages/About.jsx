// src/pages/About.jsx
// Brand story, chef timeline, awards, and ambience photography grid.

import Mon          from "../components/Mon";
import RoseDivider  from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";
import { TIMELINE } from "../data/constants";

const AWARDS = [
  ["⭐⭐⭐", "Michelin Stars",        "2023–Present"],
  ["🥇",    "Asia's Best Restaurant", "World's 50 Best, 2023"],
  ["🍶",    "Best Sake Programme",    "Japan Food Awards, 2022"],
  ["🏛️",   "Luxury Dining Award",    "Condé Nast, 2024"],
];

export default function About({ setActivePage }) {
  return (
    <div className="bg-[#FFF8FA] pt-20">

      {/* ── STORY ── */}
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
              What began as a hushed 20-seat hinoki counter in Minami-Aoyama has grown into Tokyo's most celebrated omakase destination. Three Michelin stars, countless memories, and an unwavering devotion to sushi as a conversation between chef and guest.
            </p>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Sakura interior"
            className="w-full h-[500px] object-cover opacity-95 rounded-sm"
            loading="lazy"
          />
          <div className="absolute -bottom-5 -left-5 bg-[#E91E63] p-6 rounded-sm shadow-lg">
            <p className="font-jp-serif text-4xl text-white font-bold">2016</p>
            <p className="font-jp-body text-white/80 text-[0.55rem] tracking-widest uppercase mt-1">Est. Tokyo</p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
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
                    <p className="font-jp-body text-[#1a0a10] text-sm leading-relaxed font-medium" style={{ lineHeight: 1.9 }}>
                      {item.desc}
                    </p>
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

      {/* ── AWARDS ── */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <SectionLabel label="Recognition" japanese="受賞歴" />
          <h2 className="font-jp-serif text-4xl text-[#2D0A1A] mt-2">Awards & Acclaim</h2>
          <RoseDivider />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AWARDS.map(([icon, award, org]) => (
            <div key={award} className="text-center p-5 bg-white border border-[#F48FB1]/25 hover:border-[#E91E63]/40 hover:shadow-md hover:shadow-pink-100 transition-all duration-400 hover-lift rounded-sm">
              <div className="text-3xl mb-4">{icon}</div>
              <p className="font-jp-serif text-[#C2185B] text-sm mb-1">{award}</p>
              <p className="font-jp-body text-[#2D0A1A] text-xs tracking-widest font-semibold">{org}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AMBIENCE COLLAGE ── */}
      <section className="pb-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-3 h-[400px] md:h-[520px] rounded-sm overflow-hidden">
          <img
            src="https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Tokyo night"
            className="col-span-2 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
          <div className="flex flex-col gap-3">
            <img src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400"  alt="Hinoki counter" className="w-full h-1/2 object-cover opacity-90" loading="lazy" />
            <img src="https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Sushi craft"   className="w-full h-1/2 object-cover opacity-90" loading="lazy" />
          </div>
        </div>
      </section>

    </div>
  );
}
