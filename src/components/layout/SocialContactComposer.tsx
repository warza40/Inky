"use client";

import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useId, useState } from "react";
import { expandingCursorAttrs } from "@/lib/expanding-cursor";

const CONTACT_EMAIL = "rachanamandal@gmail.com";

export function SocialContactComposer() {
  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio note from ${name.trim() || "a visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="social-contact__composer-block">
      <div className="social-contact__composer-divider" aria-hidden />

      <form
        className="social-contact__composer"
        onSubmit={handleSubmit}
        aria-labelledby={`${formId}-heading`}
      >
        <div className="social-contact__composer-heading">
          <div
            className="social-contact__composer-heading-copy"
            id={`${formId}-heading`}
          >
            <p className="social-contact__composer-title">Send a quick note</p>
            <p className="social-contact__composer-subtitle">
              I&apos;ll get back to you soon.
            </p>
          </div>
          <ArrowUpRight
            className="social-contact__composer-arrow"
            size={24}
            strokeWidth={2}
            aria-hidden
          />
        </div>

        <div className="social-contact__composer-fields">
          <div className="social-contact__composer-row">
            <label className="social-contact__field" htmlFor={nameId}>
              <span className="social-contact__field-label">Your name</span>
              <input
                id={nameId}
                name="name"
                type="text"
                autoComplete="name"
                className="social-contact__input"
                placeholder="Riley Chen"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className="social-contact__field" htmlFor={emailId}>
              <span className="social-contact__field-label">Your email</span>
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                required
                className="social-contact__input"
                placeholder="riley@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>

          <label className="social-contact__field" htmlFor={messageId}>
            <span className="social-contact__field-label">Your message</span>
            <textarea
              id={messageId}
              name="message"
              required
              className="social-contact__textarea"
              placeholder="Hi Rachana - I'd love to chat about a project..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
        </div>

        <div className="social-contact__composer-actions">
          <p className="social-contact__composer-note">
            no spam, just a reply ✦
          </p>
          <button
            type="submit"
            className="social-contact__send"
            {...expandingCursorAttrs({
              title: "Send message",
              hint: "Opens your mail app",
            })}
          >
            <span>Send</span>
            <ChevronRight size={10} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
      </form>
    </div>
  );
}
