import React from "react";
import "../footer.css";
import { Logo } from "../components";

export function Footer({ dark, setPage }) {
  return (
    <footer
      style={{
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        padding: "48px 5vw 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Logo dark={dark} />
            <p
              style={{
                marginTop: 14,
                fontSize: 13,
                color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              The creator education hub for the next generation of independent
              earners. Learn, grow, and monetize — smarter.
            </p>
          </div>
          {[
            {
              title: "Education",
              links: [
                { name: "Creator Hub", action: () => setPage("hub") },
                {
                  name: "Getting Started",
                  action: () => setPage("getting-started"),
                },
                {
                  name: "Playbooks",
                  action: () => {
                    setPage("hub");
                    setTimeout(
                      () =>
                        document
                          .getElementById("playbooks")
                          ?.scrollIntoView({ behavior: "smooth" }),
                      100,
                    );
                  },
                },
              ],
            },
            {
              title: "Platform",
              links: [
                {
                  name: "Platform Overview",
                  action: () => setPage("getting-started"),
                },
                {
                  name: "Free Accounts",
                  action: () => setPage("free-creators"),
                },
                {
                  name: "Features",
                  action: () => {
                    setPage("home");
                    setTimeout(
                      () => window.scrollTo({ top: 0, behavior: "smooth" }),
                      100,
                    );
                  },
                },
              ],
            },
            {
              title: "Support",
              links: [
                { name: "Mission", action: () => setPage("mission") },
                { name: "Blog", action: () => setPage("home") },
                { name: "Contact", action: () => setPage("contact") },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                  marginBottom: 14,
                }}
              >
                {col.title}
              </div>
              {col.links.map((l) => (
                <div key={l.name} style={{ marginBottom: 10 }}>
                  <button
                    onClick={l.action}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 13,
                      color: dark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.55)",
                      padding: 0,
                      textAlign: "left",
                    }}
                  >
                    {l.name}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
            }}
          >
            © 2026 LuvlyFans. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <a
              href="https://luvlyfans.com/pages/privacy"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                fontSize: 12,
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
              }}
            >
              Privacy Policy
            </a>
            <a
              href="https://luvlyfans.com/pages/terms-of-service"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                fontSize: 12,
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
              }}
            >
              Terms of Service
            </a>
            <a
              href="https://luvlyfans.com/pages/creator-agreement"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                fontSize: 12,
                color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
              }}
            >
              Creator Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
