// src/components/Mon.jsx
// Japanese family-crest (家紋) SVG ornament used throughout the UI.

export default function Mon({ size = 40, opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ opacity }}>
      <circle cx="20" cy="20" r="18" stroke="#E91E63" strokeWidth="0.8" />
      <circle cx="20" cy="20" r="12" stroke="#E91E63" strokeWidth="0.5" />
      <path
        d="M20 2 L20 38 M2 20 L38 20 M5.86 5.86 L34.14 34.14 M34.14 5.86 L5.86 34.14"
        stroke="#E91E63"
        strokeWidth="0.4"
      />
      <circle cx="20" cy="20" r="3" fill="#E91E63" opacity="0.5" />
    </svg>
  );
}
