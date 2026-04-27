import React, { useState, useEffect } from "react";
import "../footer.css";
import { Logo } from "../components";

function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < bp);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return isMobile;
}

export function Footer({ dark, setPage }) {
  const isMobile = useIsMobile(768);
  const isTablet = useIsMobile(1024);

  const cols = [
    {
      title: "Education",
      links: [
        { name: "Creator Hub", action: () => setPage("hub") },
        { name: "Getting Started", action: () => setPage("getting-started") },
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
        { name: "Platform Overview", action: () => setPage("getting-started") },
        { name: "Free Accounts", action: () => setPage("free-creators") },
        {
          name: "Features",
          action: () => {
            setPage("home");
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
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
  ];

  const linkColor = dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
  const mutedColor = dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)";
  const legalColor = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";

  // Grid: 4-col desktop → 2-col tablet → 1-col mobile
  const gridCols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr";

  return (
    <footer
      style={{
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        padding: isMobile ? "40px 5vw 28px" : "48px 5vw 32px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            gap: isMobile ? 32 : 40,
            marginBottom: isMobile ? 32 : 40,
          }}
        >
          {/* Brand column */}
          <div>
            <Logo dark={dark} />
            <p
              style={{
                marginTop: 14,
                fontSize: 13,
                color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
                lineHeight: 1.7,
                maxWidth: isMobile ? "100%" : 280,
              }}
            >
              The creator education hub for the next generation of independent
              earners. Learn, grow, and monetize — smarter.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
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
                      color: linkColor,
                      padding: 0,
                      textAlign: "left",
                      fontFamily: "inherit",
                    }}
                  >
                    {l.name}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            paddingTop: 24,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 16 : 12,
          }}
        >
          <div style={{ fontSize: 12, color: mutedColor }}>
            © 2026 LuvlyFans. All rights reserved.
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMobile ? 14 : 20,
            }}
          >
            {[
              { label: "Privacy Policy", href: "https://luvlyfans.com/pages/privacy" },
              { label: "Terms of Service", href: "https://luvlyfans.com/pages/terms-of-service" },
              { label: "Creator Agreement", href: "https://luvlyfans.com/pages/creator-agreement" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  fontSize: 12,
                  color: legalColor,
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
