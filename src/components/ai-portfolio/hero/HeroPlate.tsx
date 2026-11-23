/**
 * Designed plate that sits between the ribbon and the official mark.
 * Purely decorative and symmetric: halo, diagonal hatching + lozenge (the
 * mark's ±45° angles), concentric rings, a thin conic-spectrum edge and a
 * frosted disc with a darker core. Styles live in globals.css (.hp-*).
 */
export function HeroPlate() {
  return (
    <div className="hp" aria-hidden>
      <div className="hp-halo" />
      <div className="hp-hatch" />
      <svg className="hp-geo" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="158" />
        <circle cx="200" cy="200" r="122" className="hp-geo-extra" />
        <rect x="64" y="64" width="272" height="272" transform="rotate(45 200 200)" />
        <rect x="104" y="104" width="192" height="192" transform="rotate(45 200 200)" className="hp-geo-extra" />
      </svg>
      <div className="hp-spectrum" />
      <div className="hp-disc">
        <div className="hp-grain" />
        <div className="hp-core" />
      </div>
    </div>
  );
}
