import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Crumbs } from "@/components/Crumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Long Stride Ranch: Danielle Harrity 917-566-7628, Sam Harrity 617-699-5246. 851 Hyde Park Rd, Loxahatchee, FL 33470. Visits by appointment only.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  url: `${site.url}/contact`,
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1.1 1A16 16 0 0 1 4 5.1 1 1 0 0 1 5 4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const { danielle, sam } = site.people;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="masthead">
        <div className="wrap">
          <Crumbs current="Contact" />
          <p className="eyebrow">Contact us</p>
          <h1>Send us a note.</h1>
          <p className="lede">
            Boarding, training, lessons, a horse you are looking for, or the renewables side of the
            business &mdash; whichever it is, you will get one of us, not a front desk.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid grid--aside">
            <div className="stack reveal">
              {[danielle, { ...sam, role: "Owner · Operations & Renewables" }].map((person) => (
                <div className="contact-card" key={person.email}>
                  <p className="contact-card__role">{person.role}</p>
                  <h3 style={{ fontSize: "var(--step-1)", marginBottom: 0 }}>{person.name}</h3>
                  <ul>
                    <li>
                      <MailIcon />
                      <a href={`mailto:${person.email}`}>{person.email}</a>
                    </li>
                    <li>
                      <PhoneIcon />
                      <a href={`tel:${person.tel}`}>{person.phone}</a>
                    </li>
                  </ul>
                </div>
              ))}

              <div className="contact-card">
                <p className="contact-card__role">Visit by appointment only</p>
                <h3 style={{ fontSize: "var(--step-1)", marginBottom: 0 }}>Loxahatchee, Florida</h3>
                <ul>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                    <a href={site.mapUrl} rel="noopener">
                      {site.address.street}, {site.address.locality}, {site.address.region}{" "}
                      {site.address.postalCode}
                    </a>
                  </li>
                </ul>
                <p
                  style={{
                    marginTop: "var(--space-4)",
                    color: "var(--ink-muted)",
                    fontSize: "var(--step--1)",
                  }}
                >
                  Summers are spent at our Jackson Hole, Wyoming location &mdash; call ahead and we
                  will tell you which barn we are standing in.
                </p>
              </div>
            </div>

            <div className="reveal">
              <h2 style={{ fontSize: "var(--step-2)" }}>Send us a note</h2>
              <p className="lede" style={{ marginBottom: "var(--space-6)" }}>
                Tell us a little about the horse or the rider and we will come back to you.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight section--sunk">
        <div className="wrap">
          <div className="media media--wide reveal" style={{ aspectRatio: "21 / 9" }}>
            <a
              href={site.mapUrl}
              rel="noopener"
              aria-label="Open 851 Hyde Park Rd, Loxahatchee, Florida in Google Maps"
            >
              <img
                src="/img/scene-florida.svg"
                alt="Illustration of the Florida farm at sunset"
                width={800}
                height={900}
              />
            </a>
          </div>
          <p className="figure-note">
            {site.address.street}, {site.address.locality}, {site.address.region}{" "}
            {site.address.postalCode} &mdash; visits by appointment only.
          </p>
        </div>
      </section>
    </>
  );
}
