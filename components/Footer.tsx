import Link from "next/link";
import { Mark } from "./Mark";
import { horses, services, site } from "@/lib/site";

export function Footer() {
  const { danielle } = site.people;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Link className="brand" href="/">
              <span className="brand__mark" aria-hidden="true">
                <Mark />
              </span>
              <span>
                <span className="brand__name">{site.name}</span>
                <span className="brand__sub">Est. 2020</span>
              </span>
            </Link>
            <p className="footer__blurb">{site.blurb}</p>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Horses</h4>
            <ul>
              {horses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Visit</h4>
            <ul>
              <li>
                <a href={site.mapUrl} rel="noopener">
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region} {site.address.postalCode}
                </a>
              </li>
              <li>
                <a href={`mailto:${danielle.email}`}>{danielle.email}</a>
              </li>
              <li>
                <a href={`tel:${danielle.tel}`}>{danielle.phone}</a>
              </li>
            </ul>
            <div className="social" style={{ marginTop: "var(--space-5)" }}>
              <a href={site.social.instagram} rel="noopener" aria-label={`${site.name} on Instagram`}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a href={site.social.youtube} rel="noopener" aria-label={`${site.name} on YouTube`}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" />
                </svg>
              </a>
              <a href={site.social.linkedin} rel="noopener" aria-label={`${site.name} on LinkedIn`}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <path
                    d="M7.5 10.5v6M7.5 7.6v.1M11.5 16.5v-3.2a2.3 2.3 0 0 1 4.6 0v3.2M11.5 10.5v1"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Visits by appointment only.</p>
        </div>
      </div>
    </footer>
  );
}
