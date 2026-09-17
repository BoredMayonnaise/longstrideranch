import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Danielle and Sam Harrity run Long Stride Ranch, a family hunter/jumper operation in Jackson Hole, Wyoming and Wellington, Florida built on natural horsemanship.",
  alternates: { canonical: "/about" },
};

const facts = [
  ["Florida farm", "5 acres, 16 stalls"],
  ["Arena", "Full jumping ring with quality footing"],
  ["Turnout", "Individual, daily, weather permitting"],
  ["On site", "Owner’s house & guest house"],
  ["Winter season", "November – April, Wellington FL"],
  ["Summer season", "May – October, Jackson Hole WY"],
  ["Disciplines", "Hunters, jumpers, equitation, dressage"],
];

export default function AboutPage() {
  const { danielle, sam } = site.people;

  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="About Us" />
          <p className="eyebrow">About us</p>
          <h1>Three decades of horses, and one very stubborn idea about how to bring them along.</h1>
          <p className="lede">
            Long Stride Ranch is a family operation split between Jackson Hole, Wyoming and
            Wellington, Florida. We board, train, teach and sell &mdash; and we do all of it
            ourselves, in the barn, every day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--aside">
            <div className="reveal">
              <p className="eyebrow">Our approach</p>
              <h2 style={{ fontSize: "var(--step-2)" }}>Understood, not drilled.</h2>
              <p style={{ color: "var(--ink-muted)" }}>
                The same method in both barns, whatever the horse is being asked to do.
              </p>
            </div>
            <div className="prose reveal">
              <p>
                Everything here starts on the ground. Before a horse is asked to jump a course or
                hold a frame, it is asked to be soft, attentive and unworried in hand. That is the
                natural horsemanship half of the program, and it is not a marketing word for us
                &mdash; it is the reason a green horse in this barn will stand quietly at a strange
                showground in its first season.
              </p>
              <p>
                The other half is ordinary, unglamorous correctness. Flatwork before fences.
                Conditioning before competing. A horse that is sore does not work. A rider who is
                frightened does not jump. It is a slower way to produce a horse, and it produces a
                horse that lasts.
              </p>
              <p>
                We keep the operation deliberately small &mdash; around twenty horses under
                management and fifty riders across both locations. Small enough that Danielle knows
                what every horse ate this morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <p className="eyebrow">The people</p>
          <h2>Who you will actually be dealing with.</h2>

          <div style={{ marginTop: "var(--space-8)", display: "grid", gap: "var(--space-9)" }}>
            <article className="person reveal">
              <div className="person__portrait">
                <img src="/img/placeholder-portrait.svg" alt="" width={400} height={400} />
              </div>
              <div>
                <p className="person__role">{danielle.role}</p>
                <h3>{danielle.name}</h3>
                <p>
                  More than three decades of competitive riding across hunters, jumpers, equitation
                  and dressage. Danielle rides and trains the horses and ponies in the program
                  herself, coaches at the shows, and runs the day-to-day of both barns. She is a
                  show jumper, an optimist, and a mother to two riders, two dogs and a great many
                  horses.
                </p>
                <p style={{ marginTop: "var(--space-4)" }}>
                  <a className="link-arrow" href={`mailto:${danielle.email}`}>
                    {danielle.email}
                  </a>
                </p>
              </div>
            </article>

            <article className="person reveal">
              <div className="person__portrait">
                <img src="/img/placeholder-portrait.svg" alt="" width={400} height={400} />
              </div>
              <div>
                <p className="person__role">{sam.role}</p>
                <h3>{sam.name}</h3>
                <p>
                  Sam has over 25 years of experience in finance and capital markets and holds an
                  MBA from Columbia University, with former positions at Kiavi and Mynd. A lifelong
                  competitive horseman, he oversees operations and finance at Long Stride Ranch
                  &mdash; including the renewables side of the business.
                </p>
                <p style={{ marginTop: "var(--space-4)" }}>
                  <a className="link-arrow" href={`mailto:${sam.email}`}>
                    {sam.email}
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="reveal">
              <p className="eyebrow">The farms</p>
              <h2>Five acres in Florida. Big country in Wyoming.</h2>
              <div className="prose">
                <p>
                  Our Loxahatchee farm sits on five acres with sixteen stalls, a beautiful arena,
                  generous turnout, an owner&rsquo;s house and a guest house &mdash; minutes from the
                  Wellington showgrounds. Horses and riders move south for the winter circuit from
                  November through April.
                </p>
                <p>
                  The rest of the year we are in Jackson Hole, where the turnout is measured in
                  acres rather than paddocks and the conditioning happens on mountain trails.
                </p>
              </div>
            </div>

            <dl className="facts reveal">
              {facts.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <div className="cta reveal">
            <img className="cta__ornament" src="/img/ornament-rope.svg" alt="" aria-hidden="true" />
            <h2>Come walk the barn with us.</h2>
            <p>
              We would rather show you than tell you. Visits are by appointment at both locations.
            </p>
            <div className="btn-row">
              <Link className="btn btn--primary" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
