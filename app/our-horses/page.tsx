import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";

export const metadata: Metadata = {
  title: "Our Horses",
  description:
    "The Long Stride Ranch string: over twenty horses in work across Jackson Hole, Wyoming and Wellington, Florida.",
  alternates: { canonical: "/our-horses" },
};

export default function OurHorsesPage() {
  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Our Horses" />
          <p className="eyebrow">The string</p>
          <h1>Our Horses</h1>
          <p className="lede">
            Over twenty horses under management between the two farms &mdash; client horses, young
            horses coming along, and the old campaigners who teach everybody else.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--3">
            {[0, 1, 2].map((i) => (
              <div className="media media--wide reveal" key={i}>
                <img src="/img/placeholder-photo.svg" alt="" width={800} height={600} />
              </div>
            ))}
          </div>
          <p className="figure-note">
            Full profiles and photographs of the string are on their way.
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--narrow">
          <div className="coming reveal">
            <p className="pill">Coming soon</p>
            <h2 style={{ fontSize: "var(--step-2)" }}>Individual horse profiles</h2>
            <p>
              We are photographing the string this season and will publish a page for each horse
              &mdash; breeding, record, and what they are working on now.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--primary" href="/horses-for-sale">
                See horses for sale
              </Link>
              <Link className="btn btn--ghost" href="/contact">
                Ask about a horse
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
