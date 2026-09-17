"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Progressive enhancement, mounted once in the layout.
 *
 * The inline script in the layout adds `js` to <html> before first paint (so
 * `.reveal` blocks start hidden with no flash) and removes it again after 2.5s
 * if this component never mounts — so a bundle that fails to load leaves a
 * readable page rather than a blank one. Here we only claim readiness and wire
 * up the observers.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    window.__lsrReady = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasObserver = "IntersectionObserver" in window;
    const timers: number[] = [];
    const observers: IntersectionObserver[] = [];

    const revealables = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (reduceMotion || !hasObserver) {
      revealables.forEach((el) => el.classList.add("is-visible"));
    } else {
      const reveal = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            reveal.unobserve(entry.target);
            timers.push(
              window.setTimeout(() => entry.target.classList.add("is-visible"), Math.min(i * 70, 280)),
            );
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      revealables.forEach((el) => reveal.observe(el));
      observers.push(reveal);
    }

    // Stat band counts up from zero, but only as decoration: the final figure is
    // already the element's server-rendered text.
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (counters.length && !reduceMotion && hasObserver) {
      const counting = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            counting.unobserve(el);

            const target = Number(el.dataset.count);
            if (!Number.isFinite(target)) return;
            const suffix = el.dataset.countSuffix ?? "";
            const duration = 1100;
            let start: number | null = null;

            const tick = (now: number) => {
              start ??= now;
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(target * eased) + suffix;
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((el) => counting.observe(el));
      observers.push(counting);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      timers.forEach(window.clearTimeout);
    };
  }, [pathname]);

  return null;
}
