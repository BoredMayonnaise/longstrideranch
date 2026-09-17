import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";

export const metadata: Metadata = {
  title: "Training & Lessons",
  description:
    "Training and lessons with Long Stride Ranch: hunters, jumpers and equitation for riders at every level, built on natural horsemanship. Jackson Hole and Wellington.",
  alternates: { canonical: "/training" },
};

const steps = [
  {
    heading: "On the ground",
    body: "Every horse starts in hand. Soft, attentive and unworried before anything is asked under saddle. It is where trouble gets solved, not managed.",
  },
  {
    heading: "On the flat",
    body: "Straightness, rhythm and an honest connection. Most jumping problems are flatwork problems wearing a costume.",
  },
  {
    heading: "Over fences",
    body: "Gymnastics before courses, courses before shows. Horses learn to find their own distances instead of waiting to be told.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Training & Lessons" />
          <p className="eyebrow">Services</p>
          <h1>Training &amp; Lessons</h1>
          <p className="lede">
            Hunters, jumpers and equitation &mdash; taught the same way to a first-year rider and to
            a horse headed for the winter circuit.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="eyebrow">How we work</p>
          <h2 style={{ maxWidth: "20ch" }}>Groundwork, flatwork, fences &mdash; in that order.</h2>
          <ol className="steps" style={{ marginTop: "var(--space-7)" }}>
            {steps.map((step) => (
              <li className="reveal" key={step.heading}>
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="wrap">
          <div className="grid grid--3">
            <article className="card reveal">
              <h3>Riders</h3>
              <p>
                Private and semi-private lessons from first canter through the equitation ring, with
                coaching at the shows we attend.
              </p>
            </article>
            <article className="card reveal">
              <h3>Horses in training</h3>
              <p>
                Full training rides, restarts, and green horses brought along slowly. Hunters,
                jumpers, equitation and dressage horses and ponies.
              </p>
            </article>
            <article className="card reveal">
              <h3>Show season</h3>
              <p>
                Horses and riders move to Wellington from November through April for the winter
                circuit, and back to Wyoming for the summer.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap wrap--narrow">
          <div className="coming reveal">
            <p className="pill">Coming soon</p>
            <h2 style={{ fontSize: "var(--step-2)" }}>Lesson schedule and training rates</h2>
            <p>
              Detailed program options and rates are on their way. For now, the fastest answer is a
              conversation &mdash; tell us about the rider or the horse and we will tell you honestly
              whether we are a fit.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--primary" href="/contact">
                Talk to Danielle
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
