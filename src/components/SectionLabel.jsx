// src/components/SectionLabel.jsx
// Dual-language section eyebrow: optional Japanese kanji above an English label.

export default function SectionLabel({ label, japanese }) {
  return (
    <div className="text-center mb-3">
      {japanese && (
        <p className="font-jp-serif text-[#C2185B]/70 text-2xl mb-1 tracking-[0.5em]">
          {japanese}
        </p>
      )}
      <p className="text-[#C2185B] font-semibold text-[0.6rem] tracking-[0.4em] uppercase font-jp-body font-medium">
        {label}
      </p>
    </div>
  );
}
