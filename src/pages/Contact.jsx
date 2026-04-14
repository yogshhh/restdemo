// src/pages/Contact.jsx
// Reservation form (controlled inputs) + sidebar with map placeholder,
// opening hours, and contact details.

import { useState } from "react";
import Mon          from "../components/Mon";
import RoseDivider  from "../components/RoseDivider";
import SectionLabel from "../components/SectionLabel";

const INPUT_CLASS =
  "w-full bg-transparent border-b border-[#F48FB1]/40 focus:border-[#E91E63] outline-none py-3 text-[#2D0A1A] text-sm placeholder-[#B07090]/50 transition-colors duration-400 font-jp-body font-light";

const HOURS = [
  ["月〜金 · Mon – Fri", "12:00 – 23:00"],
  ["土 · Saturday",       "11:00 – 23:30"],
  ["日 · Sunday",         "11:00 – 22:00"],
];

const CONTACT_ITEMS = [
  ["📞", "御予約 · Reservations", "+81 3 1234 5678"],
  ["✉️", "Email",                 "reserve@sakurasushibar.jp"],
  ["📸", "Instagram",             "@sakura.sushi.tokyo"],
];

const EMPTY_FORM = { name: "", email: "", phone: "", date: "", message: "" };

export default function Contact({ setActivePage }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm(EMPTY_FORM);
    setTimeout(() => setSent(false), 5000);
  };

  const field = (key) => ({
    value:    form[key],
    onChange: (e) => setForm({ ...form, [key]: e.target.value }),
  });

  return (
    <div className="bg-[#FFF8FA] pt-20">

      {/* ── HEADER ── */}
      <section className="max-w-3xl mx-auto px-6 py-8 text-center">
        <SectionLabel label="Get In Touch" japanese="ご連絡" />
        <h2 className="font-jp-serif text-5xl md:text-6xl text-[#2D0A1A] mb-2 mt-3">
          御予約 · <em className="text-[#E91E63]">Reserve</em>
        </h2>
        <RoseDivider />
      </section>

      {/* ── TWO-COLUMN LAYOUT ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── FORM ── */}
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
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">
                  お名前 · Full Name
                </label>
                <input type="text" required placeholder="Yuki Tanaka" className={INPUT_CLASS} {...field("name")} />
              </div>
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">
                  Email
                </label>
                <input type="email" required placeholder="hello@example.com" className={INPUT_CLASS} {...field("email")} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">
                  電話番号 · Phone
                </label>
                <input type="tel" placeholder="+81 3 1234 5678" className={INPUT_CLASS} {...field("phone")} />
              </div>
              <div>
                <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">
                  ご希望日 · Date
                </label>
                <input type="date" className={INPUT_CLASS} {...field("date")} />
              </div>
            </div>

            <div>
              <label className="font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#2D0A1A] font-semibold block mb-2">
                ご要望 · Special Requests
              </label>
              <textarea
                rows={4}
                placeholder="Dietary requirements, occasion details, seating preferences..."
                className={`${INPUT_CLASS} resize-none`}
                {...field("message")}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E91E63] text-white font-jp-body text-[0.65rem] tracking-[0.3em] uppercase font-medium hover:bg-[#C2185B] transition-all duration-400 shadow-lg shadow-pink-200 rounded-sm"
            >
              ご予約を確定する · Confirm Reservation
            </button>
          </form>
        </div>

        {/* ── SIDEBAR ── */}
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
              <a
                href="https://maps.google.com/?q=Minami-Aoyama+Tokyo"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 font-jp-body text-[0.55rem] tracking-[0.25em] uppercase text-[#E91E63] border-b border-[#E91E63]/30 hover:border-[#E91E63] transition-all duration-300 pb-0.5"
              >
                地図を開く · Open in Maps →
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="p-5 border border-[#F48FB1]/25 bg-white rounded-sm shadow-sm">
            <h3 className="font-jp-serif text-xl text-[#C2185B] mb-2">Opening Hours</h3>
            <p className="font-jp-serif text-[#C2185B]/50 text-sm tracking-widest mb-5">営業時間</p>
            {HOURS.map(([day, time]) => (
              <div key={day} className="flex justify-between py-3 border-b border-[#F48FB1]/15 last:border-0">
                <span className="font-jp-body text-[#1a0a10] text-sm">{day}</span>
                <span className="font-jp-body text-[#2D0A1A] text-sm font-semibold">{time}</span>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="space-y-5">
            {CONTACT_ITEMS.map(([icon, label, val]) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 border border-[#F48FB1]/30 bg-white flex items-center justify-center text-sm flex-shrink-0 rounded-sm shadow-sm">
                  {icon}
                </div>
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
