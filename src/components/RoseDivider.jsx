// src/components/RoseDivider.jsx
// Decorative horizontal rule with a centred rose-star accent.

export default function RoseDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-5">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#F06292]" />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0 L10 6 L16 6 L11.5 9.5 L13.5 16 L8 12 L2.5 16 L4.5 9.5 L0 6 L6 6 Z"
          fill="#E91E63"
          opacity="0.7"
        />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#F06292]" />
    </div>
  );
}
