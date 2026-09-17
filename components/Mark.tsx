/** The ranch's horseshoe mark. Inherits currentColor from its parent. */
export function Mark() {
  return (
    <svg viewBox="0 0 100 100" fill="none" role="img" aria-label="Long Stride Ranch">
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2.5" opacity="0.28" />
      <path d="M28 78 A26 26 0 1 1 72 78" stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" />
      <path d="M28 78 l-2.5 7" stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" />
      <path d="M72 78 l2.5 7" stroke="currentColor" strokeWidth="9.5" strokeLinecap="round" />
      <circle cx="34" cy="40" r="2.6" fill="var(--surface-100)" />
      <circle cx="66" cy="40" r="2.6" fill="var(--surface-100)" />
      <circle cx="39" cy="27" r="2.6" fill="var(--surface-100)" />
      <circle cx="61" cy="27" r="2.6" fill="var(--surface-100)" />
    </svg>
  );
}
