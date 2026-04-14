// src/pages/Help.jsx
// FAQ accordion with hover-to-open behaviour and animated accent bar.

import { useState } from "react";
import Mon from "../components/Mon";
import RoseDivider from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";
import { FAQ_ITEMS } from "../data/constants";

export default function Help({ setActivePage }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <div className="bg-[#FFF8FA] pt-20">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-12 text-center">
        <SectionLabel label="Frequently Asked Questions" japanese="よくある質問" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] leading-tight mb-4 mt-3">
          How Can We<br /><em className="text-[#E91E63]">Help You?</em>
        </h2>
        <RoseDivider />
        <p className="font-jp-body text-[#1a0a10] text-base leading-relaxed mt-6 font-medium" style={{ lineHeight: 2 }}>
          Find answers to the most common questions about dining at Sakura Sushi Bar.
          If you need further assistance, please do not hesitate to contact us directly.
        </p>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen    = openIndex    === i;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                onMouseEnter={() => { setHoveredIndex(i); setOpenIndex(i); }}
                onMouseLeave={() => { setHoveredIndex(null); setOpenIndex(null); }}
                style={{
                  border: isOpen
                    ? "1px solid rgba(233,30,99,0.55)"
                    : isHovered
                    ? "1px solid rgba(233,30,99,0.35)"
                    : "1px solid rgba(244,143,177,0.3)",
                  boxShadow: isHovered || isOpen
                    ? "0 8px 32px rgba(233,30,99,0.10), 0 2px 8px rgba(233,30,99,0.06)"
                    : "0 1px 4px rgba(233,30,99,0.04)",
                  transform:  isHovered && !isOpen ? "translateY(-2px)" : "translateY(0)",
                  background: isOpen ? "linear-gradient(135deg,#fff 80%,#FFF0F5 100%)" : "#fff",
                  transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                  borderRadius: "2px",
                  overflow:   "hidden",
                  position:   "relative",
                }}
              >
                {/* Left accent bar */}
                <div
                  style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
                    background: isOpen
                      ? "linear-gradient(180deg,#E91E63,#F48FB1)"
                      : isHovered
                      ? "linear-gradient(180deg,rgba(233,30,99,0.5),rgba(244,143,177,0.3))"
                      : "transparent",
                    transition: "background 0.35s ease",
                  }}
                />

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left"
                  style={{ paddingLeft: "1.75rem", paddingRight: "1.5rem" }}
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <span style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize:   "1rem",
                      marginTop:  "2px",
                      flexShrink: 0,
                      color:      isHovered || isOpen ? "#E91E63" : "rgba(233,30,99,0.35)",
                      transition: "color 0.3s ease, transform 0.3s ease",
                      transform:  isHovered || isOpen ? "scale(1.15)" : "scale(1)",
                      display:    "inline-block",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Question text */}
                    <span style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize:   "1.05rem",
                      lineHeight: 1.45,
                      color:      isOpen ? "#C2185B" : "#2D0A1A",
                      transition: "color 0.3s ease, font-weight 0.3s ease",
                      fontWeight: isHovered || isOpen ? 600 : 400,
                    }}>
                      {item.q}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <span style={{
                    flexShrink:      0,
                    marginTop:       "2px",
                    width:           "22px",
                    height:          "22px",
                    borderRadius:    "50%",
                    border:          isOpen
                      ? "1.5px solid #E91E63"
                      : isHovered
                      ? "1.5px solid rgba(233,30,99,0.6)"
                      : "1.5px solid rgba(244,143,177,0.5)",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    color:           isOpen || isHovered ? "#E91E63" : "#F48FB1",
                    fontSize:        "1.1rem",
                    fontWeight:      300,
                    background:      isOpen ? "rgba(233,30,99,0.07)" : isHovered ? "rgba(233,30,99,0.04)" : "transparent",
                    transform:       isOpen ? "rotate(45deg)" : isHovered ? "rotate(90deg)" : "rotate(0deg)",
                    transition:      "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}>
                    +
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    style={{
                      paddingLeft:   "1.75rem",
                      paddingRight:  "1.5rem",
                      paddingBottom: "1.5rem",
                      animation:     "fadeInUp 0.3s ease both",
                    }}
                  >
                    <div style={{
                      paddingLeft:   "2.5rem",
                      borderLeft:    "2px solid rgba(233,30,99,0.3)",
                      background:    "linear-gradient(90deg,rgba(255,240,245,0.6),transparent)",
                      paddingTop:    "0.5rem",
                      paddingBottom: "0.25rem",
                      paddingRight:  "0.5rem",
                      borderRadius:  "0 4px 4px 0",
                    }}>
                      <p className="font-jp-body text-[#1a0a10] text-sm md:text-base leading-relaxed font-medium" style={{ lineHeight: 2 }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Contact CTA ── */}
        <div className="mt-14 text-center p-8 border border-[#F48FB1]/30 bg-[#FCF0F4] washi-texture rounded-sm">
          <Mon size={36} opacity={0.2} />
          <p className="font-jp-serif text-[#C2185B]/50 text-xl tracking-[0.5em] mt-4 mb-2">お問い合わせ</p>
          <h3 className="font-jp-serif text-2xl text-[#2D0A1A] mb-3">Still Have Questions?</h3>
          <p className="font-jp-body text-[#1a0a10] text-sm mb-6 font-medium">
            Our team is happy to assist. Reach us by phone, email, or visit our Contact page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+81312345678"
              className="px-6 py-2.5 border border-[#E91E63]/50 text-[#E91E63] font-jp-body text-[0.6rem] tracking-[0.25em] uppercase hover:bg-[#E91E63] hover:text-white transition-all duration-300 rounded-sm"
            >
              📞 Call Us
            </a>
            <button
              onClick={() => setActivePage("Contact")}
              className="px-6 py-2.5 bg-[#E91E63] text-white font-jp-body text-[0.6rem] tracking-[0.25em] uppercase hover:bg-[#C2185B] transition-all duration-300 rounded-sm shadow-md shadow-pink-200"
            >
              ✉️ Contact Us
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
