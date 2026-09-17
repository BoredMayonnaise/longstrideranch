import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="section"
      style={{ minHeight: "58vh", display: "grid", placeItems: "center", textAlign: "center" }}
    >
      <div className="wrap wrap--narrow">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          404
        </p>
        <h1 style={{ fontSize: "var(--step-4)" }}>This one got loose.</h1>
        <p className="lede" style={{ marginInline: "auto", maxWidth: "44ch" }}>
          The page you were after is not here. Try the barn, the ring, or the front gate.
        </p>
        <div className="btn-row" style={{ justifyContent: "center", marginTop: "var(--space-6)" }}>
          <Link className="btn btn--primary" href="/">
            Back to home
          </Link>
          <Link className="btn btn--ghost" href="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
