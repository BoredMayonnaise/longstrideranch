import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";

export const metadata: Metadata = {
  title: "Horses for Sale",
  description:
    "A short, honest list of horses for sale from Long Stride Ranch: show hunters, jumpers, equitation horses, dressage horses and ponies.",
  alternates: { canonical: "/horses-for-sale" },
};

export default function HorsesForSalePage() {
  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Horses for Sale" />
          <p className="eyebrow">Sales</p>
          <h1>Horses for Sale</h1>
          <p className="lede">
            Long Stride Ranch keeps a limited sales list. We have experience with show hunters,
            jumpers, equitation horses, dressage horses and ponies &mdash; and we only list the ones
            we know well.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--3">
            <article className="horse reveal">
              <div className="horse__media">
                <img src="/img/placeholder-photo.svg" alt="" width={800} height={600} />
                <span className="horse__status">Available</span>
              </div>
              <div className="horse__body">
                <ul className="horse__meta">
                  <li>Pony</li>
                  <li>12 years</li>
                  <li>Mare</li>
                </ul>
                <h3>Roa</h3>
                <p>
                  A 12-year-old Children&rsquo;s Hunter Pony. Fancy, brave and kind with lots of
                  great kid miles. Lovely changes and beautiful over fences, she is ready to start
                  the season with a new partner.
                </p>
                <p className="horse__foot">
                  <Link className="link-arrow" href="/contact">
                    Inquire about Roa
                  </Link>
                </p>
              </div>
            </article>

            <article className="card card--quiet reveal">
              <h3>More horses coming</h3>
              <p>
                Our sales list turns over with the seasons. If nothing here fits, it is worth asking
                &mdash; horses often move before they are ever listed.
              </p>
              <p className="card__foot">
                <Link className="link-arrow" href="/contact">
                  Tell us what you need
                </Link>
              </p>
            </article>

            <article className="card card--quiet reveal">
              <h3>Selling with us</h3>
              <p>
                We take a small number of sales horses into the program each season. They are
                ridden, shown and represented honestly &mdash; which is, in the end, what sells a
                horse.
              </p>
              <p className="card__foot">
                <Link className="link-arrow" href="/contact">
                  Discuss a consignment
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="reveal">
              <p className="eyebrow">How we sell</p>
              <h2>No surprises after the vetting.</h2>
            </div>
            <div className="prose reveal">
              <p>
                Every horse on this list is in work with us, so what you are told is what we have
                seen ourselves: what it is good at, what it finds hard, and what kind of rider it
                needs. If a horse is not right for you, we would rather say so on the phone than at
                the pre-purchase exam.
              </p>
              <p>Trials and vettings are welcome and expected. Come ride the horse.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
