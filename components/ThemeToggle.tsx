"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Flips the pinned theme. The initial value is applied by the inline script in
 * the layout, before paint, so there is no flash of the wrong theme.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const pinned = document.documentElement.dataset.theme;
    if (pinned === "light" || pinned === "dark") setTheme(pinned);
  }, []);

  function toggle() {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = theme ?? (systemDark ? "dark" : "light");
    const next: Theme = current === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("lsr-theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }

  return (
    <button className="icon-btn" type="button" onClick={toggle} aria-label="Switch color theme">
      <svg className="icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.5 14.3A8.8 8.8 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
