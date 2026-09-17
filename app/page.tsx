import Link from "next/link";
import { site } from "@/lib/site";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description:
    "Boarding, training, lessons and horse sales in Jackson Hole, Wyoming and Wellington, Florida.",
  url: `${site.url}/`,
  email: site.people.danielle.email,
  telephone: "+1-917-566-7628",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: [site.social.instagram, site.social.linkedin],
};

const stats = [
  { value: 20, suffix: "+", label: "Horses managed" },
  { value: 50, suffix: "", label: "Riders" },
  { value: 2, suffix: "", label: "Locations" },
  { value: 30, suffix: "+", label: "Years in the irons" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />

      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <ul className="hero__locations">
              <li>Jackson Hole, Wyoming</li>
              <li>Wellington, Florida</li>
            </ul>
            <h1>
              Long days in the saddle, <em>two places</em> to call home.
            </h1>
            <p className="lede hero__lede">
              Boarding, training and sales for hunters, jumpers and equitation horses &mdash; summer
              under the Tetons, winter in the Florida show season, and the same patient horsemanship
              in both.
            </p>
            <div className="btn-row hero__actions">
              <Link className="btn btn--primary" href="/contact">
                Plan a visit
              </Link>
              <Link className="btn btn--ghost" href="/about">
                Meet the ranch
              </Link>
            </div>
          </div>

          <figure className="hero__art" style={{ margin: 0 }}>
            <img
              src="/img/scene-hero.svg"
              alt="The Teton range at dawn above a fenced pasture"
              width={800}
              height={1000}
            />
            <figcaption className="hero__badge">
              <span>
                <strong>Now boarding both seasons</strong>
                <span>Wyoming May&ndash;October &middot; Florida November&ndash;April</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="stats" aria-label="Long Stride Ranch by the numbers">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <span className="stat__num" data-count={stat.value} data-count-suffix={stat.suffix}>
              {stat.value}
              {stat.suffix}
            </span>
            <span className="stat__label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="reveal">
              <p className="eyebrow">Who we are</p>
              <h2>A working barn, run by the people who ride in it.</h2>
              <div className="prose">
                <p>
                  Long Stride Ranch is a family operation. Danielle rides and trains every day; Sam
                  keeps the business honest. Between them there are three decades of hunters,
                  jumpers, equitation and dressage &mdash; and a conviction that horses go better
                  when they are understood rather than drilled.
                </p>
                <p>
                  Our program is built on natural horsemanship: groundwork first, clear and
                  consistent aids, and a schedule that lets a horse come along at the pace its body
                  and mind allow.
                </p>
              </div>
              <p style={{ marginTop: "var(--space-6)" }}>
                <Link className="link-arrow" href="/about">
                  Read our story
                </Link>
              </p>
            </div>

            <div className="media media--wide reveal">
              <img src="/img/placeholder-photo.svg" alt="" width={800} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <p className="eyebrow">Two seasons, one program</p>
          <h2 style={{ maxWidth: "18ch" }}>
            We follow the weather, so your horse never stops progressing.
          </h2>
          <div className="grid grid--2" style={{ marginTop: "var(--space-7)" }}>
            <article className="season reveal">
              <img className="season__bg" src="/img/scene-wyoming.svg" alt="" width={800} height={900} />
              <span className="season__tag">May &ndash; October</span>
              <h3>Jackson Hole, Wyoming</h3>
              <p>
                Summers at altitude, with big turnout, mountain hacking and the conditioning work
                that carries a horse through a long show year.
              </p>
            </article>

            <article className="season reveal">
              <img className="season__bg" src="/img/scene-florida.svg" alt="" width={800} height={900} />
              <span className="season__tag">November &ndash; April</span>
              <h3>Wellington, Florida</h3>
              <p>
                Horses and riders move south for the winter circuit &mdash; five acres and sixteen
                stalls in Loxahatchee, minutes from the Wellington showgrounds.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">What we do</p>
          <h2>Three things, done properly.</h2>
          <div className="grid grid--3" style={{ marginTop: "var(--space-7)" }}>
            <Link className="card reveal" href="/boarding">
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M6 22 24 8l18 14v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M18 42V28h12v14" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                </svg>
              </span>
              <h3>Boarding</h3>
              <p>
                Full-service care in Wyoming and Florida &mdash; individual turnout, a feed plan per
                horse, and eyes on your horse every single day.
              </p>
              <span className="card__foot">
                <span className="link-arrow">Boarding</span>
              </span>
            </Link>

            <Link className="card reveal" href="/training">
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M8 38h32" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M14 38V20l10-8 10 8v18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M14 27h20" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Training &amp; Lessons</h3>
              <p>
                Hunters, jumpers and equitation for riders from their first canter to the show ring,
                grounded in natural horsemanship.
              </p>
              <span className="card__foot">
                <span className="link-arrow">Training</span>
              </span>
            </Link>

            <Link className="card reveal" href="/renewables">
              <span className="card__icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path d="M24 40c0-11 7-18 16-18 0 11-7 18-16 18z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M24 40c0-9-6-15-13-15 0 9 6 15 13 15z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
                  <path d="M24 40v-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <h3>Renewables</h3>
              <p>
                Upcycling manure and used bedding into organic fertilizer and renewable fuel, so it
                never reaches a landfill.
              </p>
              <span className="card__foot">
                <span className="link-arrow">Renewables</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="media media--wide reveal">
              <img
                src="/img/scene-renewables.svg"
                alt="Windrows of bedding composting down into finished soil"
                width={800}
                height={500}
              />
            </div>
            <div className="reveal">
              <p className="eyebrow">Sustainability</p>
              <h2>Help us keep manure out of landfills.</h2>
              <div className="prose">
                <p>
                  A barn of twenty horses produces a remarkable amount of waste. We are expanding
                  operations to upcycle manure and used equine bedding into organic fertilizer and
                  renewable fuels &mdash; turning the least glamorous part of the business into
                  something a farm can use.
                </p>
              </div>
              <p style={{ marginTop: "var(--space-6)" }}>
                <Link className="link-arrow" href="/renewables">
                  How it works
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <p className="eyebrow">Sales</p>
          <h2>Horses we would put our own riders on.</h2>
          <p className="lede" style={{ maxWidth: "54ch" }}>
            We keep a short list. Show hunters, jumpers, equitation horses, dressage horses and
            ponies &mdash; each one we know well enough to tell you the truth about.
          </p>

          <div className="grid grid--3" style={{ marginTop: "var(--space-7)" }}>
            <article className="horse reveal">
              <div className="horse__media">
                <img src="/img/placeholder-photo.svg" alt="" width={800} height={600} />
                <span className="horse__status">Available</span>
              </div>
              <div className="horse__body">
                <ul className="horse__meta">
                  <li>Pony</li>
                  <li>12 years</li>
                  <li>Children&rsquo;s Hunter</li>
                </ul>
                <h3>Roa</h3>
                <p>
                  Fancy, brave and kind with lots of great kid miles. Lovely changes and beautiful
                  over fences &mdash; ready to start the winter season.
                </p>
                <p className="horse__foot">
                  <Link className="link-arrow" href="/contact">
                    Inquire about Roa
                  </Link>
                </p>
              </div>
            </article>

            <article className="card card--quiet reveal">
              <h3>Looking for something specific?</h3>
              <p>
                Tell us the job, the budget and the rider. We hear about horses long before they are
                advertised, and we will say no to the wrong one.
              </p>
              <p className="card__foot">
                <Link className="link-arrow" href="/contact">
                  Start a search
                </Link>
              </p>
            </article>

            <article className="card card--quiet reveal">
              <h3>Selling a horse?</h3>
              <p>
                We take a small number of sales horses into the program each season, shown honestly
                and produced correctly while they wait for the right home.
              </p>
              <p className="card__foot">
                <Link className="link-arrow" href="/horses-for-sale">
                  About our sales
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cta reveal">
            <img className="cta__ornament" src="/img/ornament-rope.svg" alt="" aria-hidden="true" />
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Come see us
            </p>
            <h2>Visits are by appointment &mdash; and always worth the drive.</h2>
            <p>
              Bring your questions, meet the horses, and see how the barn actually runs on an
              ordinary Tuesday. That is the best way to know whether we are right for you.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Book a visit
              </Link>
              <a className="btn btn--ghost" href={`tel:${site.people.danielle.tel}`}>
                Call {site.people.danielle.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
