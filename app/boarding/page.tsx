import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";

export const metadata: Metadata = {
  title: "Boarding",
  description:
    "Full-service horse boarding with Long Stride Ranch in Jackson Hole, Wyoming and Loxahatchee, Florida — sixteen stalls, individual turnout and daily eyes on every horse.",
  alternates: { canonical: "/boarding" },
};

const facts = [
  ["Stalls", "16, Loxahatchee FL"],
  ["Acreage", "5 acres"],
  ["Turnout", "Individual, daily"],
  ["Arena", "Full jumping ring"],
  ["Second location", "Jackson Hole, WY (summer)"],
  ["Availability", "Limited — ask"],
];

export default function BoardingPage() {
  return (
    <>
      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Boarding" />
          <p className="eyebrow">Services</p>
          <h1>Boarding</h1>
          <p className="lede">
            Full-service care at both farms, for horses in our training program and for horses whose
            owners ride them themselves.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--split">
            <div className="reveal">
              <h2>Small barn, high touch.</h2>
              <div className="prose">
                <p>
                  Sixteen stalls in Loxahatchee means every horse is known, not numbered. Feed is
                  planned per horse, turnout is individual and daily, and someone who rides your
                  horse is the one looking at it each morning.
                </p>
                <p>
                  Owners are welcome in the barn. We will tell you when something looks off before
                  it becomes a vet call, and we will tell you plainly.
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

      <section className="section section--sunk">
        <div className="wrap wrap--narrow">
          <div className="coming reveal">
            <p className="pill">Coming soon</p>
            <h2 style={{ fontSize: "var(--step-2)" }}>Full boarding packages and rates</h2>
            <p>
              We are finalizing our boarding packages and rate card for the coming season. In the
              meantime, tell us about your horse and we will talk you through what is available at
              each farm.
            </p>
            <div className="btn-row" style={{ justifyContent: "center" }}>
              <Link className="btn btn--primary" href="/contact">
                Ask about a stall
              </Link>
              <Link className="btn btn--ghost" href="/training">
                See the training program
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
