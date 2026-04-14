// src/components/SakuraPetals.jsx
// Renders 18 absolutely-positioned CSS-animated cherry-blossom petals.
// Decorative only — hidden from assistive technology via aria-hidden.

export default function SakuraPetals() {
  return (
    <div aria-hidden="true">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="sakura-petal"
          style={{
            left:              `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay:    `${Math.random() * 10}s`,
            opacity:            0.7 + Math.random() * 0.3,
            transform:         `scale(${0.5 + Math.random() * 1})`,
          }}
        />
      ))}
    </div>
  );
}
