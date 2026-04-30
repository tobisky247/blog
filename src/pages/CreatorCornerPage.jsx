import React from "react";
import { Badge, CTAButton } from "../components";

export function CreatorCornerPage({ dark, setPage }) {
  const isMobile = window.innerWidth < 800;

  return (
    <div
      style={{
        padding: isMobile ? "40px 5vw" : "80px 5vw",
        maxWidth: 1200,
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      <header style={{ marginBottom: isMobile ? 40 : 80 }}>
        <Badge>CREATOR CORNER</Badge>
        <h1
          style={{
            fontSize: isMobile ? 32 : 48,
            fontWeight: 800,
            marginTop: 16,
            lineHeight: 1.1,
          }}
        >
          By Creators, For Creators
        </h1>
        <p
          style={{
            fontSize: isMobile ? 18 : 22,
            opacity: 0.7,
            marginTop: 24,
            maxWidth: 600,
            lineHeight: 1.5,
          }}
        >
          A dedicated space for articles written by creators and submitted to us for publishing. Share your journey, strategies, and stories with the community.
        </p>
        <div style={{ marginTop: 32 }}>
          <CTAButton block={isMobile} onClick={() => setPage("contact")}>
            Submit an Article
          </CTAButton>
        </div>
      </header>

      <div
        style={{
          background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: 24,
          padding: isMobile ? 40 : 80,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 24 }}>✍️</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          First Submissions Coming Soon
        </h3>
        <p style={{ opacity: 0.7, maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.6 }}>
          We're currently reviewing the first batch of creator submissions. Check back soon for authentic stories and proven strategies straight from the source.
        </p>
      </div>
    </div>
  );
}
