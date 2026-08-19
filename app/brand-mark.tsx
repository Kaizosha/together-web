export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`brand-mark${compact ? " brand-mark--compact" : ""}`}
      aria-hidden="true"
    >
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">改</span>
      </span>
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">造</span>
      </span>
      <span className="brand-mark__unit">
        <span className="brand-mark__bar" />
        <span className="brand-mark__glyph">社</span>
      </span>
    </span>
  );
}
