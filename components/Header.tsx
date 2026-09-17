"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "./Mark";
import { allRoutes, horses, services, site, type NavLink } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

function Caret() {
  return (
    <svg className="nav__caret" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4.5 6 8.5 10 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavGroup({
  label,
  links,
  openId,
  setOpenId,
  pathname,
}: {
  label: string;
  links: NavLink[];
  openId: string | null;
  setOpenId: (id: string | null) => void;
  pathname: string;
}) {
  const open = openId === label;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="nav__group"
      data-nav-group
      data-open={open}
      ref={ref}
      onMouseEnter={() => setOpenId(label)}
      onMouseLeave={() => setOpenId(null)}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget as Node)) setOpenId(null);
      }}
    >
      <button
        className="nav__link"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenId(open ? null : label)}
      >
        {label}
        <Caret />
      </button>
      <ul className="nav__menu">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
              {link.label}
              <span>{link.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route changes close whatever is open.
  useEffect(() => {
    setOpenId(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenId(null);
      setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeGroups = useCallback((event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest?.("[data-nav-group]")) setOpenId(null);
  }, []);

  useEffect(() => {
    document.addEventListener("click", closeGroups);
    return () => document.removeEventListener("click", closeGroups);
  }, [closeGroups]);

  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <>
      <header className="header" data-scrolled={scrolled}>
        <div className="wrap header__bar">
          <Link className="brand" href="/">
            <span className="brand__mark" aria-hidden="true">
              <Mark />
            </span>
            <span>
              <span className="brand__name">{site.name}</span>
              <span className="brand__sub">{site.tagline}</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <Link className="nav__link" href="/" aria-current={current("/")}>
              Home
            </Link>
            <Link className="nav__link" href="/about" aria-current={current("/about")}>
              About
            </Link>
            <NavGroup label="Services" links={services} openId={openId} setOpenId={setOpenId} pathname={pathname} />
            <NavGroup label="Horses" links={horses} openId={openId} setOpenId={setOpenId} pathname={pathname} />
            <Link className="nav__link" href="/contact" aria-current={current("/contact")}>
              Contact
            </Link>
          </nav>

          <div className="header__actions">
            <ThemeToggle />
            <Link className="btn btn--primary header__cta" href="/contact">
              Plan a visit
            </Link>
            <button
              className="icon-btn nav-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3.5 7h17M3.5 12h17M3.5 17h17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" id="drawer" data-open={drawerOpen} aria-hidden={!drawerOpen}>
        <div className="wrap drawer__top">
          <Link className="brand" href="/">
            <span className="brand__mark" aria-hidden="true">
              <Mark />
            </span>
            <span className="brand__name">{site.name}</span>
          </Link>
          <button className="icon-btn" type="button" aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="wrap drawer__body">
          <ul className="drawer__list">
            {allRoutes.map((link) => (
              <li key={link.href}>
                <Link href={link.href} aria-current={current(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="drawer__meta">
            {site.address.street}, {site.address.locality}, {site.address.region} {site.address.postalCode}
            <br />
            Visits by appointment only
          </p>
        </div>
      </div>
    </>
  );
}
