"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const TOPICS = [
  "Boarding",
  "Training & lessons",
  "Buying a horse",
  "Selling a horse",
  "Renewables",
  "Something else",
];

/**
 * No backend yet, so the message is handed to the visitor's mail client rather
 * than collected and silently dropped. Swap this for a POST when an endpoint
 * exists — the markup does not need to change.
 */
export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const { danielle } = site.people;

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    if (!form.checkValidity()) return;
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Interested in: ${data.get("topic") ?? ""}`,
      "",
      String(data.get("message") ?? ""),
    ].join("\n");

    window.location.href =
      `mailto:${danielle.email}` +
      `?subject=${encodeURIComponent(`Website inquiry from ${name || "a visitor"}`)}` +
      `&body=${encodeURIComponent(body)}`;

    setStatus(
      `Opening your email app with this message ready to send. If nothing happens, write to ${danielle.email} directly.`,
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="email" required />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="phone">
            Phone <span style={{ fontWeight: 400, color: "var(--ink-faint)" }}>(optional)</span>
          </label>
          <input type="tel" id="phone" name="phone" autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="topic">I am interested in</label>
          <select id="topic" name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>

      {status ? (
        <p className="form__status" role="status">
          {status}
        </p>
      ) : null}

      <div className="btn-row">
        <button className="btn btn--primary" type="submit">
          Send note
        </button>
      </div>
      <p className="field__hint">
        This form opens your email app with the message ready to send. If you would rather not, write to{" "}
        <a href={`mailto:${danielle.email}`}>{danielle.email}</a>.
      </p>
    </form>
  );
}
