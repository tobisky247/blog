// Main export file for all page components
// Components are being gradually split into individual files for better maintainability

// ===== EXPORTED COMPONENTS (in separate files) =====
export { Nav } from "./pages/Nav";
export { HomePage } from "./pages/HomePage";
export { ArticlePage } from "./pages/ArticlePage";
export { EventsPage } from "./pages/EventsPage";
export { Footer } from "./pages/Footer";

// ===== COMPONENTS STILL TO BE EXTRACTED =====
// These components are temporarily kept here until extraction is complete
// They will be moved to individual files in src/pages/

import React, { useState, useEffect } from "react";
import "./nav.css";
import "./home.css";
import "./article.css";
import "./events.css";
import "./hub.css";
import "./footer.css";
import "./getting-started.css";
import "./compare.css";
import "./earning.css";
import "./features.css";
import "./free-creators.css";
import "./mission-contact.css";
import { Badge } from "./components";
import { useInView, useScrollProgress } from "./hooks";
import {
  ARTICLES,
  CATEGORIES,
  STATS,
  HUB_MODULES,
  COMPARISON,
  EVENTS,
  FEATURES,
  FREE_CREATORS_DIGEST,
} from "./data";
import {
  ArticleCard,
  EmailCapture,
  CTAButton,
  GhostButton,
  Logo,
  Icon,
} from "./components";

// Import individual article components
import SustainableMonthlyIncome from "./articles/sustainable-monthly-income";
import PricingStrategy from "./articles/pricing-strategy";
import GetSubscribers from "./articles/get-subscribers";
import BuildingConsistentMonthlyIncome from "./articles/building-consistent-monthly-income";
import ContentIdeasThatSell from "./articles/content-ideas-that-sell";
import PromoteYourProfile from "./articles/promote-your-profile";
import BuildYourFanbase from "./articles/build-your-fanbase";
import CreatorHabits from "./articles/creator-habits";
import LuvlyfansStandard from "./articles/luvlyfans-standard";
import SetupFirstImpressions from "./articles/setup-first-impressions";
import ContentDirection from "./articles/content-direction";
import First30Days from "./articles/first-30-days";
import PricingContent from "./articles/pricing-content";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

export function HubPage({ dark, onRead, setPage }) {
  const [activeModule, setActiveModule] = useState(0);
  const [hubRef, inView] = useInView(0.05);
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        background: dark ? "#0a0a0a" : "#fff",
        color: dark ? "#fff" : "#111",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Background Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "60%",
            background: dark
              ? "radial-gradient(ellipse at center, rgba(123,81,204,0.15) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(123,81,204,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* 1. HERO */}
      <section
        style={{
          padding: "80px 5vw 40px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Badge color="#7B51CC">Creator Hub</Badge>
          <h1
            style={{
              margin: "32px 0 20px",
              fontSize: "clamp(32px, 6vw, 64px)",
              fontWeight: 800,
              fontFamily: "'Lora', Georgia, serif",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Start building your page{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7B51CC, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              the right way
            </span>
          </h1>
          <p
            style={{
              margin: "0 auto 40px",
              maxWidth: 640,
              fontSize: "clamp(16px, 2vw, 20px)",
              color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Clear steps, practical guidance, and insider growth playbooks for
            LuvlyFans creators.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <GhostButton
              dark={dark}
              onClick={() => {
                const el = document.getElementById("playbooks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Guides
            </GhostButton>
          </div>
        </div>
      </section>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 5vw 100px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* 2. WHERE ARE YOU RIGHT NOW? */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: dark ? "#fff" : "#0f0f0f",
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Where are you right now?
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {HUB_MODULES.map((m, idx) => (
              <button
                key={m.title}
                onClick={() => {
                  setActiveModule(idx);
                  document
                    .getElementById("playbooks")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  padding: isMobile ? "24px 20px" : "32px 24px",
                  textAlign: "left",
                  background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: 20,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#7B51CC";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(123,81,204,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = dark
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.07)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon name={m.icon} size={32} color="#7B51CC" />
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: dark ? "#fff" : "#0f0f0f",
                      marginBottom: 4,
                    }}
                  >
                    {m.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: dark
                        ? "rgba(255,255,255,0.45)"
                        : "rgba(0,0,0,0.5)",
                      lineHeight: 1.5,
                    }}
                  >
                    {m.shortDesc}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: dark
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(0,0,0,0.35)",
                      marginTop: 8,
                      fontStyle: "italic",
                      lineHeight: 1.4,
                    }}
                  >
                    {m.supportingText}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#7B51CC",
                    paddingTop: 12,
                  }}
                >
                  {m.cta} →
                </div>
              </button>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 14,
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
              margin: 0,
            }}
          >
            You can move between these at any time. Most creators go through all
            three stages as they grow.
          </p>
        </section>

        {/* 3. YOUR FIRST STEPS (CHECKLIST) */}
        <section
          style={{
            marginBottom: 100,
            padding: isMobile ? "40px 24px" : "60px",
            background: dark
              ? "rgba(123,81,204,0.04)"
              : "rgba(123,81,204,0.02)",
            borderRadius: 32,
            border: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.07)"}`,
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? 26 : 32,
                fontWeight: 800,
                marginBottom: 12,
                textAlign: "center",
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Your First Steps
            </h2>
            <p
              style={{
                textAlign: "center",
                opacity: 0.6,
                marginBottom: isMobile ? 32 : 48,
              }}
            >
              Complete these essentials to get your page ready for growth.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Set up your profile",
                "Upload your first content",
                "Set your subscription price",
                "Turn on Spotlight",
                "Start promoting your page",
              ].map((step, idx) => (
                <div
                  key={step}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? 12 : 20,
                    padding: isMobile ? "16px" : "20px 24px",
                    background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                    borderRadius: 16,
                    border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(123,81,204,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = dark
                      ? "rgba(255,255,255,0.03)"
                      : "#fff";
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: `2px solid ${idx === 0 ? "#7B51CC" : dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {idx === 0 && (
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          background: "#7B51CC",
                        }}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: dark ? "rgba(255,255,255,0.9)" : "#0f0f0f",
                    }}
                  >
                    {step}
                  </div>
                  <div
                    style={{
                      marginLeft: "auto",
                      fontSize: 13,
                      color: "#7B51CC",
                      fontWeight: 700,
                    }}
                  >
                    Guide →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PLAYBOOKS */}
        <section id="playbooks" style={{ marginBottom: 100 }}>
          {/* Module tabs */}
          <div
            style={{
              marginBottom: 32,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {HUB_MODULES.map((m, i) => (
              <button
                key={m.level}
                onClick={() => setActiveModule(i)}
                style={{
                  padding: "12px 28px",
                  borderRadius: 99,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  background:
                    activeModule === i
                      ? "#7B51CC"
                      : dark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.05)",
                  color:
                    activeModule === i
                      ? "#fff"
                      : dark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.6)",
                  border: "none",
                  transition: "all 0.2s",
                }}
              >
                <Icon
                  name={m.icon}
                  size={16}
                  color={activeModule === i ? "#fff" : "#7B51CC"}
                  style={{ marginRight: 8, verticalAlign: "middle" }}
                />{" "}
                {m.level}
              </button>
            ))}
          </div>

          {/* Module content */}
          {HUB_MODULES.map((m, i) =>
            i !== activeModule ? null : (
              <div key={m.level}>
                <div
                  style={{ marginBottom: 48, textAlign: "left", maxWidth: 800 }}
                >
                  <Badge color="#7B51CC">{m.level}</Badge>
                  <h2
                    style={{
                      margin: "16px 0 8px",
                      fontSize: 32,
                      fontWeight: 800,
                      color: dark ? "#fff" : "#0f0f0f",
                      fontFamily: "'Lora', Georgia, serif",
                    }}
                  >
                    {m.headerTitle}
                  </h2>
                  <p
                    style={{
                      margin: "0 0 32px",
                      color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
                      fontSize: 18,
                      lineHeight: 1.6,
                    }}
                  >
                    {m.headerDesc}
                  </p>

                  <div
                    style={{
                      padding: "32px",
                      background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9",
                      borderRadius: 24,
                      border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                      marginBottom: 48,
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 20px",
                        fontSize: 13,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "#7B51CC",
                      }}
                    >
                      What to focus on:
                    </h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 16,
                      }}
                    >
                      {m.focusPoints.map((point) => (
                        <div
                          key={point}
                          style={{
                            display: "flex",
                            gap: 12,
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ color: "#7B51CC", fontWeight: 900 }}>
                            •
                          </div>
                          <div
                            style={{
                              fontSize: 15,
                              color: dark ? "rgba(255,255,255,0.8)" : "#333",
                              fontWeight: 500,
                              lineHeight: 1.4,
                            }}
                          >
                            {point}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h4
                    style={{
                      margin: "0 0 20px",
                      fontSize: 13,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    }}
                  >
                    Suggested guides:
                  </h4>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 20,
                  }}
                >
                  {m.guides.map((g, j) => {
                    const [hov, setHov] = useState(false);
                    return (
                      <div
                        key={g.title}
                        onMouseEnter={() => setHov(true)}
                        onMouseLeave={() => setHov(false)}
                        onClick={() => {
                          const targetArticle = ARTICLES.find(
                            (a) => a.slug === g.slug,
                          );
                          if (targetArticle) {
                            onRead(targetArticle);
                            window.scrollTo(0, 0);
                          }
                        }}
                        style={{
                          padding: "32px",
                          borderRadius: 24,
                          cursor: "pointer",
                          background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                          border: `1.5px solid ${hov ? "#7B51CC" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                          transform: hov ? "translateY(-5px)" : "none",
                          transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                          boxShadow: hov
                            ? "0 20px 40px rgba(0,0,0,0.2)"
                            : "none",
                        }}
                      >
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: dark
                              ? "rgba(123,81,204,0.15)"
                              : "rgba(123,81,204,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                            marginBottom: 20,
                            color: "#7B51CC",
                          }}
                        >
                          <Icon
                            name={["book", "target", "idea", "lock"][j % 4]}
                            size={22}
                            color="#7B51CC"
                          />
                        </div>
                        <h3
                          style={{
                            margin: "0 0 12px",
                            fontSize: 17,
                            fontWeight: 700,
                            color: dark ? "#fff" : "#0f0f0f",
                            lineHeight: 1.4,
                            fontFamily: "'Lora', Georgia, serif",
                          }}
                        >
                          {g.title}
                        </h3>
                        <div
                          style={{
                            fontSize: 13,
                            color: dark
                              ? "rgba(255,255,255,0.4)"
                              : "rgba(0,0,0,0.4)",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span>{g.time} read</span>
                          <span>•</span>
                          <span style={{ fontWeight: 700, color: "#7B51CC" }}>
                            Practical Guide
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </section>

        {/* 5. QUICK WINS */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: dark ? "#fff" : "#0f0f0f",
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Quick Wins You Can Do Today
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {[
              { title: "Add 6–12 posts before promoting", icon: "camera" },
              { title: "Use Spotlight on your best post", icon: "flash" },
              { title: "Post 3 Stories today", icon: "clock-circle" },
              { title: "Pin a welcome post", icon: "pin" },
              { title: "Reply to your latest subscribers", icon: "chat" },
            ].map((win) => (
              <div
                key={win.title}
                style={{
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: dark ? "rgba(255,255,255,0.02)" : "#f9f9f9",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                  borderRadius: 16,
                }}
              >
                <Icon name={win.icon} size={22} color="#7B51CC" />
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: dark ? "rgba(255,255,255,0.85)" : "#333",
                  }}
                >
                  {win.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. WHAT'S WORKING RIGHT NOW */}
        <section
          style={{
            marginBottom: 100,
            padding: "60px",
            background: dark ? "rgba(255,255,255,0.02)" : "#f4f3ff",
            borderRadius: 32,
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            What’s Working Right Now
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "Spotlight ROI",
                desc: "Creators using Spotlight are getting significantly more profile visits and conversions.",
              },
              {
                title: "Content Density",
                desc: "Pages with 20+ posts see a 40% higher subscription rate compared to newer pages.",
              },
              {
                title: "Engagement Speed",
                desc: "Creators who reply to new subscribers within 2 hours see higher retention in month 2.",
              },
            ].map((insight) => (
              <div key={insight.title}>
                <div
                  style={{
                    width: 40,
                    height: 2,
                    background: "#7B51CC",
                    marginBottom: 16,
                  }}
                />
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  {insight.title}
                </div>
                <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.6 }}>
                  {insight.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section style={{ marginBottom: 100 }}>
          <h2
            style={{
              margin: "0 0 32px",
              fontSize: 28,
              fontWeight: 800,
              textAlign: "center",
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            Real Feedback from Real Creators
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                name: "Luna V.",
                text: "I didn’t know where to start before this. The first 30 days guide helped me structure everything properly.",
                role: "Creator for 8 months",
              },
              {
                name: "Alex M.",
                text: "Using Spotlight made a difference. I started getting profile visits I wasn’t getting before.",
                role: "Creator for 3 months",
              },
              {
                name: "Kira S.",
                text: "The pricing playbook was the most helpful thing. It kept me from guessing what people might pay.",
                role: "Newly Launched",
              },
            ].map((t) => (
              <div
                key={t.name}
                style={{
                  padding: "32px",
                  background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: 24,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    position: "absolute",
                    top: 10,
                    right: 24,
                    opacity: 0.1,
                    color: "#7B51CC",
                  }}
                >
                  “
                </div>
                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: 16,
                    color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)",
                    lineHeight: 1.6,
                    position: "relative",
                    zIndex: 1,
                    minHeight: 80,
                  }}
                >
                  {t.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7B51CC, #9333ea)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: dark ? "#fff" : "#0f0f0f",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.5 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. FINAL CTA */}
        <section
          style={{
            padding: "80px 40px",
            textAlign: "center",
            borderRadius: 40,
            overflow: "hidden",
            background: `linear-gradient(135deg, ${dark ? "rgba(123,81,204,0.15)" : "#7B51CC"}, ${dark ? "rgba(147,51,234,0.1)" : "#9333ea"})`,
            border: dark ? "1px solid rgba(123,81,204,0.2)" : "none",
            color: dark ? "#fff" : "#fff",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: 36,
                fontWeight: 800,
                marginBottom: 16,
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Start applying what you’ve learned
            </h2>
            <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 40 }}>
              Your next step is building your page and staying consistent
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => window.open("https://luvlyfans.com/", "_blank")}
                style={{
                  padding: "16px 32px",
                  borderRadius: 12,
                  border: "none",
                  background: "#fff",
                  color: "#7B51CC",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
              >
                Build Your Page
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── GETTING STARTED ──────────────────────────────────────────────────────────

export function GettingStartedPage({ dark }) {
  const Step = ({ num, title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#7B51CC",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          {num}
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: 20,
            fontWeight: 700,
            color: dark ? "#fff" : "#0f0f0f",
          }}
        >
          {title}
        </h3>
      </div>
      <div
        style={{
          paddingLeft: 44,
          fontSize: 16,
          lineHeight: 1.7,
          color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
        }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "80px 5vw",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <header style={{ marginBottom: 80, textAlign: "center" }}>
        <Badge>OFFICIAL GUIDE</Badge>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 800,
            margin: "24px 0 16px",
            lineHeight: 1.1,
          }}
        >
          Getting started on LuvlyFans
        </h1>
        <p
          style={{
            fontSize: 18,
            maxWidth: 700,
            margin: "0 auto",
            opacity: 0.8,
            lineHeight: 1.6,
          }}
        >
          LuvlyFans is built around creators. Everything else flows from that.
          Whether you are here to build an audience, earn through subscriptions,
          or support creators as a fan, the best experience comes from
          understanding how the platform works from the start.
        </p>
        <div
          style={{
            marginTop: 24,
            padding: "12px 24px",
            background: dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.05)",
            borderRadius: 12,
            display: "inline-block",
            border: "1px solid rgba(123,81,204,0.2)",
            fontSize: 14,
            fontWeight: 600,
            color: "#7B51CC",
          }}
        >
          ⚠️ Notice: LuvlyFans does not offer live streaming at this time.
        </div>
      </header>

      <section style={{ marginBottom: 100 }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 48,
            borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            paddingBottom: 16,
          }}
        >
          Part 1: Getting Started as a Creator
        </h2>

        <Step num="1" title="Create Your Account">
          <p>
            Visit the LuvlyFans website at{" "}
            <a
              href="https://www.luvlyfans.com"
              style={{ color: "#7B51CC", fontWeight: 700 }}
            >
              www.luvlyfans.com
            </a>
            . Select <strong>Sign Up</strong>, enter your email and password,
            and confirm your address.
          </p>
          <div
            style={{
              marginTop: 12,
              fontSize: 13,
              padding: "8px 12px",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              borderRadius: 8,
              fontStyle: "italic",
            }}
          >
            Tip: Pick a username you are comfortable promoting long term.
          </div>
        </Step>

        <Step num="2" title="Apply or Switch to Creator Mode">
          <p>
            Once logged in, select <strong>Become a Creator</strong> or switch
            on creator mode in your account settings. This step unlocks creator
            verification, content posting, subscription setup, and payout
            configuration.
          </p>
          <p style={{ fontWeight: 600, color: "#f43f5e" }}>
            You will not be able to post content until verification is
            completed.
          </p>
        </Step>

        <Step num="3" title="Complete Creator Verification">
          <p>
            Verification is required for all creators before posting. This
            usually includes uploading a valid identity document and submitting
            a clear verification photo or selfie.
          </p>
          <ul style={{ margin: "12px 0", paddingLeft: 20 }}>
            <li>Use clear, well-lit photos</li>
            <li>Do not crop document edges</li>
            <li>Ensure the person in the photo matches the ID</li>
          </ul>
        </Step>

        <Step num="4" title="Set Up Your Creator Profile">
          <p>
            Your profile is your storefront. Recommended setup includes a clear
            profile photo, banner image, and a short bio explaining what you
            offer.
          </p>
          <div
            style={{
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              padding: 20,
              borderRadius: 16,
              marginTop: 12,
              fontSize: 14,
            }}
          >
            💡 Clear profiles convert significantly better than vague ones.
          </div>
        </Step>

        <Step num="5" title="Set Your Subscription Price">
          <p>
            Choose a price that matches your posting plans. Consider your post
            frequency and current content library. You can always adjust pricing
            later.
          </p>
        </Step>

        <Step num="6" title="Upload Starter Content">
          <p>
            Before promoting, aim for a base of 6 to 12 posts. Include a pinned
            post explaining what fans can expect and a welcome-style post for
            new subscribers.
          </p>
        </Step>

        <Step num="7" title="Understand Content Options">
          <p>
            LuvlyFans currently supports Subscriptions, Posts
            (photos/videos/text), and Locked content (PPV).{" "}
            <strong>Important:</strong> Live streaming is currently unavailable
            (Coming soon).
          </p>
        </Step>

        <Step num="8" title="Set Up Payout Details">
          <p>
            Complete your payout settings with bank details or your preferred
            method. Ensure your legal name matches your account to avoid payment
            delays.
          </p>
        </Step>

        <Step num="9" title="Complete Tax Information">
          <p>
            Tax information is required for compliance (e.g., W8BEN). Completing
            this early ensures you receive payouts without administrative
            blocks.
          </p>
        </Step>

        <Step num="10" title="Learn the Rules">
          <p>
            Protect your account: keep communication and payments on-platform,
            only upload owned content, and follow our content/consent
            guidelines.
          </p>
        </Step>
      </section>

      <section style={{ marginBottom: 100 }}>
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginBottom: 48,
            borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
            paddingBottom: 16,
          }}
        >
          Part 2: Getting Started as a Fan
        </h2>

        <div style={{ display: "grid", gap: 32 }}>
          {[
            {
              t: "Create an Account",
              d: "Sign up and confirm your email. We recommend using a strong, unique password.",
            },
            {
              t: "Complete Your Profile",
              d: "A basic profile helps creators recognize real supporters. Add a display name and a respectful bio.",
            },
            {
              t: "Find Creators",
              d: "Discover creators via usernames, social media links, or browsing our explore page.",
            },
            {
              t: "Subscribe & Access",
              d: "Once subscribed, gain access to exclusive content. Note: some posts may still be locked as PPV.",
            },
            {
              t: "Messaging & Behavior",
              d: "Keep conversations on-platform and respect creator boundaries. Respectful behavior improves the community.",
            },
            {
              t: "Manage Subscriptions",
              d: "View active subs, cancel renewals, or update payment methods in your account settings.",
            },
          ].map((item, i) => (
            <div
              key={item.t}
              style={{
                borderLeft: `3px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                paddingLeft: 24,
              }}
            >
              <h4 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>
                {item.t}
              </h4>
              <p
                style={{
                  margin: 0,
                  opacity: 0.7,
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          padding: 48,
          borderRadius: 32,
          background: dark ? "#1a1a1a" : "#fff",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          Quick Start Checklists
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h4
              style={{
                color: "#7B51CC",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              CREATOR CHECKLIST
            </h4>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Create account",
                "Become a creator",
                "Complete verification",
                "Set up profile",
                "Set subscription price",
                "Upload starter content",
                "Add payout details",
                "Complete tax information",
              ].map((c) => (
                <div
                  key={c}
                  style={{
                    fontSize: 15,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#7B51CC" }}>✓</span> {c}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "#0ea5e9",
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              FAN CHECKLIST
            </h4>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                "Create account",
                "Find creators",
                "Subscribe",
                "Respect boundaries",
                "Manage subscriptions",
              ].map((c) => (
                <div
                  key={c}
                  style={{
                    fontSize: 15,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#0ea5e9" }}>✓</span> {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          marginTop: 80,
          textAlign: "center",
          opacity: 0.6,
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        LuvlyFans works best when creators are set up properly and fans
        understand how to support responsibly.
        <br />
        Starting with the right foundations helps avoid confusion later and
        makes growth smoother over time.
      </footer>
    </div>
  );
}

// ─── COMPARISON PAGE ──────────────────────────────────────────────────────────

export function ComparePage({ dark, setPage }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <section
        style={{
          padding: "72px 5vw 60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: dark
              ? "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1), transparent 60%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.05), transparent 60%)",
          }}
        />
        <div style={{ position: "relative" }}>
          <Badge color="#06b6d4">Platform Comparison</Badge>
          <h1
            style={{
              margin: "16px 0 16px",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              fontFamily: "'Lora', Georgia, serif",
              lineHeight: 1.1,
              color: dark ? "#fff" : "#0a0a0a",
            }}
          >
            OnlyFans vs LuvlyFans{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              — The Real Numbers
            </span>
          </h1>
          <p
            style={{
              margin: "0 auto 36px",
              maxWidth: 560,
              fontSize: 17,
              color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
              lineHeight: 1.7,
            }}
          >
            We compared every major creator platform on the metrics that
            actually matter. The numbers don't lie.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw 80px" }}>
        {/* Winner banner */}
        <div
          ref={ref}
          style={{
            background: "linear-gradient(135deg, #7B51CC 0%, #8b5cf6 100%)",
            borderRadius: 20,
            padding: "32px 40px",
            marginBottom: 48,
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            opacity: inView ? 1 : 0,
            transform: inView ? "scale(1)" : "scale(0.96)",
            transition: "all 0.5s ease",
          }}
        >
          <div style={{ fontSize: 48 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Best Overall for Creators in 2026
            </div>
            <h2
              style={{
                margin: "0 0 6px",
                fontSize: 26,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              LuvlyFans — Lowest Fees, Fastest Payouts, Best Discovery
            </h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
              Based on platform fees, payout speed, growth tools, and creator
              support ratings.
            </div>
          </div>
          <CTAButton
            size="lg"
            style={{
              background: "#fff",
              color: "#7B51CC",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
            onClick={() => window.open("https://luvlyfans.com/", "_blank")}
          >
            Start Free
          </CTAButton>
        </div>

        {/* Comparison table */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            marginBottom: 48,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr
                style={{
                  background: dark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                }}
              >
                <th
                  style={{
                    padding: "16px 20px",
                    textAlign: "left",
                    fontSize: 13,
                    fontWeight: 700,
                    color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Feature
                </th>
                {COMPARISON.platforms.map((p, i) => (
                  <th
                    key={p}
                    style={{
                      padding: "16px 20px",
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: 800,
                      color:
                        i === 0
                          ? "#7B51CC"
                          : dark
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.6)",
                      background:
                        i === 0 ? "rgba(123,81,204,0.06)" : "transparent",
                    }}
                  >
                    {p} {i === 0 && "✓"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, ri) => (
                <tr
                  key={row.feature}
                  style={{
                    borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    background:
                      ri % 2 === 0
                        ? "transparent"
                        : dark
                          ? "rgba(255,255,255,0.01)"
                          : "rgba(0,0,0,0.01)",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: dark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.65)",
                    }}
                  >
                    {row.feature}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      style={{
                        padding: "14px 20px",
                        textAlign: "center",
                        fontSize: 13,
                        fontWeight: i === 0 ? 800 : 500,
                        color:
                          i === 0
                            ? "#7B51CC"
                            : dark
                              ? "rgba(255,255,255,0.55)"
                              : "rgba(0,0,0,0.55)",
                        background:
                          i === 0 ? "rgba(123,81,204,0.04)" : "transparent",
                      }}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pros/Cons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 60,
          }}
        >
          {[
            {
              platform: "LuvlyFans",
              color: "#7B51CC",
              isUs: true,
              pros: [
                "10% platform fee (industry lowest)",
                "24–48 hr payouts",
                "Built-in creator discovery",
                "Dedicated creator support team",
                "Advanced analytics dashboard",
                "5% lifetime referral commission",
              ],
              cons: [
                "Newer platform (less brand recognition)",
                "Growing subscriber base",
              ],
            },
            {
              platform: "OnlyFans",
              color: "#00aff0",
              isUs: false,
              pros: [
                "Largest subscriber base",
                "Established brand trust",
                "Large creator community",
              ],
              cons: [
                "20% platform fee",
                "7–21 day payout delays",
                "No organic discovery tools",
                "Limited analytics",
                "Email-only support",
                "Payout holds for new creators",
              ],
            },
          ].map(({ platform, color, isUs, pros, cons }) => (
            <div
              key={platform}
              style={{
                padding: "28px",
                borderRadius: 18,
                border: `2px solid ${isUs ? color + "40" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
                background: isUs
                  ? dark
                    ? "rgba(123,81,204,0.05)"
                    : "rgba(123,81,204,0.03)"
                  : dark
                    ? "rgba(255,255,255,0.02)"
                    : "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 18,
                    color,
                    fontFamily: "'Lora', Georgia, serif",
                  }}
                >
                  {platform}
                </div>
                {isUs && <Badge color={color}>Our Pick 🏆</Badge>}
              </div>
              <div style={{ marginBottom: 16 }}>
                {pros.map((p) => (
                  <div
                    key={p}
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 8,
                      fontSize: 13,
                      color: dark
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(0,0,0,0.65)",
                    }}
                  >
                    <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>
                    {p}
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  paddingTop: 16,
                }}
              >
                {cons.map((c) => (
                  <div
                    key={c}
                    style={{
                      display: "flex",
                      gap: 10,
                      marginBottom: 8,
                      fontSize: 13,
                      color: dark
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(0,0,0,0.45)",
                    }}
                  >
                    <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "48px",
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            borderRadius: 20,
            border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          }}
        >
          <h2
            style={{
              margin: "0 0 12px",
              fontSize: 30,
              fontWeight: 800,
              fontFamily: "'Lora', Georgia, serif",
              color: dark ? "#fff" : "#0f0f0f",
            }}
          >
            Keep More of What You Earn
          </h2>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 15,
              color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)",
              maxWidth: 460,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            At 10% vs 20% fees, a creator making $5,000/month saves $500 every
            single month on LuvlyFans. That's $6,000/year back in your pocket.
          </p>
          <CTAButton size="lg" onClick={() => {}}>
            Start Earning on LuvlyFans — Free
          </CTAButton>
          <div
            style={{
              marginTop: 16,
              fontSize: 12,
              color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
            }}
          >
            No setup fees · No monthly fees · First payout within 48 hours
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EARNING PAGE ─────────────────────────────────────────────────────────────

export function EarningPage({ dark }) {
  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "80px 5vw",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Badge>REVENUE GUIDE</Badge>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            margin: "20px 0",
            lineHeight: 1.1,
          }}
        >
          How the 1% Earns on LuvlyFans
        </h1>
        <p
          style={{
            fontSize: 18,
            maxWidth: 600,
            margin: "0 auto",
            opacity: 0.7,
          }}
        >
          Beyond subscriptions — discover the multiple revenue streams optimized
          for LuvlyFans creators.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32,
        }}
      >
        {[
          {
            title: "Subscriptions",
            percent: "40%",
            icon: "🎟️",
            desc: "Your stable, recurring base. Automated renewals mean predictable monthly income.",
          },
          {
            title: "Messaging & PPV",
            percent: "35%",
            icon: "💬",
            desc: "Selling exclusive content through our high-conversion messenger system.",
          },
          {
            title: "Live Tips",
            percent: "15%",
            icon: "💸",
            desc: "Interact live and receive real-time tips during streaming or story cycles.",
          },
          {
            title: "Referrals",
            percent: "10%",
            icon: "🤝",
            desc: "Earn 5% of our platform fee from every creator you bring to LuvlyFans — for life.",
          },
        ].map((m) => (
          <div
            key={m.title}
            style={{
              padding: 40,
              borderRadius: 24,
              background: dark ? "#1a1a1a" : "#fff",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
              textAlign: "center",
              border: `2px solid ${dark ? "rgba(255,255,255,0.05)" : "transparent"}`,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 20 }}>{m.icon}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>
              {m.title}
            </h3>
            <div
              style={{
                color: "#7B51CC",
                fontWeight: 800,
                fontSize: 14,
                marginBottom: 16,
              }}
            >
              AVG {m.percent} OF INCOME
            </div>
            <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.6 }}>
              {m.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURES PAGE ────────────────────────────────────────────────────────────

export function FeaturesPage({ dark, selectedFeature, setSelectedFeature }) {
  if (selectedFeature === 1) {
    // Spotlight Detail View
    return (
      <div style={{ paddingBottom: 100 }}>
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedFeature(null);
            window.scrollTo(0, 0);
          }}
          style={{
            margin: "24px 5vw",
            background: "none",
            border: "none",
            color: "#7B51CC",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
          }}
        >
          ← Back to Features
        </button>

        {/* Hero */}
        <header
          style={{
            padding: "80px 5vw",
            background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff",
            borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}`,
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>FEATURE SPOTLIGHT</Badge>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
              }}
            >
              Getting Seen: The Spotlight Feature
            </h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>
              One of the hardest parts of being a creator is getting seen.
              Spotlight was created to change that.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <section
          style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: dark ? "rgba(255,255,255,0.8)" : "#333",
            }}
          >
            <p>
              You can be consistent, post regularly, and still feel like your
              content is only reaching the same small group of people. Growth
              often depends on moments of visibility, when new people come
              across your work and decide to explore further.
            </p>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              What Spotlight Does
            </h2>
            <p>
              Spotlight allows creators to highlight a post so it can be seen by
              fans who are not currently following them.
            </p>

            {/* Mockup 1: Discovery Feed */}
            <div style={{ margin: "48px 0" }}>
              <img
                src="/assets/promotions/spotlight2.png"
                alt="Discovery Feed Mockup"
                style={{
                  width: "100%",
                  borderRadius: 24,
                  boxShadow: dark
                    ? "0 20px 50px rgba(0,0,0,0.5)"
                    : "0 20px 40px rgba(0,0,0,0.1)",
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.5,
                  marginTop: 16,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                A high-fidelity screenshot of the LuvlyFans Discovery Feed
                highlighting how spotlighted posts are surfaced to new fans.
              </div>
            </div>

            <p>
              Instead of content only appearing to existing subscribers or
              followers, a spotlighted post becomes visible to a wider audience
              across the platform. It gives creators a way to step outside their
              immediate circle and reach people who may not have discovered them
              otherwise.
            </p>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              Why This Matters
            </h2>
            <p>
              Growth often starts with discovery. Most subscribers begin as
              people who come across a piece of content, pause for a moment, and
              decide to explore more. Without visibility, that first step never
              happens.
            </p>

            <div
              style={{
                margin: "48px 0",
                padding: 40,
                background: "#7B51CC",
                borderRadius: 32,
                color: "#fff",
              }}
            >
              <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>
                From Visibility to Subscription
              </h3>
              <p>
                Spotlight is not just about being seen. It’s about what happens
                next. When someone sees your content and is interested, they may
                visit your profile, read your bio, look through your posts, and
                decide whether to subscribe.
              </p>
            </div>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              How to Use Spotlight
            </h2>
            <p>
              Getting started with Spotlight is simple and only takes a few
              taps.
            </p>
            <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
              {[
                {
                  s: "Step 1: Choose the Right Post",
                  t: "Select a post that represents your style well. This is often the first thing new people will see, so it should feel like a clear introduction.",
                },
                {
                  s: "Step 2: Open the Post Options",
                  t: "Go to the post you want to spotlight. Look for the options menu or settings icon on the post.",
                },
                {
                  s: "Step 3: Select 'Spotlight'",
                  t: "Choose the Spotlight option. Once selected, your post will be made visible to a wider audience across the platform.",
                },
                {
                  s: "Step 4: Confirm and Activate",
                  t: "Confirm your selection. Your post is now live in Spotlight and can be seen by fans who are not currently following you.",
                },
                {
                  s: "Step 5: Monitor Activity",
                  t: "After spotlighting, check profile visits, watch for new subscribers, and review engagement to understand what works over time.",
                },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#7B51CC",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}
                    >
                      {step.s}
                    </div>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>
                      {step.t}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mockup 2: Activation Button */}
            <div style={{ margin: "64px 0" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <img
                  src="/assets/promotions/spotlight3.png"
                  alt="Spotlight Activation"
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    boxShadow: dark
                      ? "0 10px 30px rgba(0,0,0,0.3)"
                      : "0 10px 20px rgba(0,0,0,0.08)",
                  }}
                />
                <img
                  src="/assets/promotions/spotlight4.png"
                  alt="Spotlight Confirmation"
                  style={{
                    width: "100%",
                    borderRadius: 16,
                    boxShadow: dark
                      ? "0 10px 30px rgba(0,0,0,0.3)"
                      : "0 10px 20px rgba(0,0,0,0.08)",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 13,
                  opacity: 0.5,
                  marginTop: 16,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Close-up UI showing the Spotlight toggle within post settings
                and the final activation confirmation.
              </div>
            </div>

            <div
              style={{
                marginTop: 64,
                padding: "48px",
                background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                borderRadius: 32,
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              }}
            >
              <Badge>TEAM TIP</Badge>
              <p
                style={{
                  margin: "16px 0 0",
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1.3,
                }}
              >
                Spotlight increases visibility, but your profile and content are
                what convert that visibility into subscribers.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedFeature === 2) {
    // Stories Detail View
    return (
      <div style={{ paddingBottom: 100 }}>
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedFeature(null);
            window.scrollTo(0, 0);
          }}
          style={{
            margin: "24px 5vw",
            background: "none",
            border: "none",
            color: "#7B51CC",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
          }}
        >
          ← Back to Features
        </button>

        {/* Hero */}
        <header
          style={{
            padding: "80px 5vw",
            background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff",
            borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}`,
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>NEW FEATURE</Badge>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
              }}
            >
              Introducing Stories on LuvlyFans
            </h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>
              Not every moment needs to be a full post. Sometimes it’s a quick
              update, a behind-the-scenes clip, or just a moment shared without
              overthinking.
            </p>
          </div>
        </header>

        {/* Hero Image */}
        <section
          style={{
            maxWidth: 800,
            margin: "-40px auto 0",
            padding: "0 5vw",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
            src="/assets/promotions/Stories.png"
            alt="Stories on LuvlyFans"
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: dark
                ? "0 20px 50px rgba(0,0,0,0.5)"
                : "0 20px 40px rgba(0,0,0,0.1)",
            }}
          />
        </section>

        {/* Main Content */}
        <section
          style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: dark ? "rgba(255,255,255,0.8)" : "#333",
            }}
          >
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 24px" }}>
              What Stories Are
            </h2>
            <p>
              Stories are short, temporary updates that creators can share
              throughout the day. They allow you to post content that feels more
              immediate, doesn’t need to be permanent, and gives fans a closer
              look at your day or process.
            </p>
            <p>Stories sit alongside your main content, not in place of it.</p>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              Why Stories Matter
            </h2>
            <p>
              Creating content can sometimes feel structured. Posts are planned,
              content is prepared, and expectations are set. Stories offer a
              more flexible way to share without that pressure.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
                margin: "40px 0",
              }}
            >
              {[
                { t: "Stay Active", d: "Show up without needing a full post." },
                { t: "Share Moments", d: "Share smaller, natural moments." },
                {
                  t: "Keep Engagement",
                  d: "Keep fans connected between uploads.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginBottom: 8,
                      color: "#7B51CC",
                    }}
                  >
                    {item.t}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.6 }}>{item.d}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                margin: "48px 0",
                padding: 40,
                background: "#7B51CC",
                borderRadius: 32,
                color: "#fff",
              }}
            >
              <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>
                Start sharing your Stories on LuvlyFans
              </h3>
              <p>
                Think of Stories as a way to stay present between your main
                content. They make it easier to show up without overthinking
                every detail.
              </p>
            </div>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              🧩 HOW-TO GUIDE: Using Stories
            </h2>
            <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
              {[
                {
                  s: "Step 1: Open Stories",
                  t: "Go to the Stories section on your dashboard or homepage.",
                },
                {
                  s: "Step 2: Create a Story",
                  t: "Select 'Add Story' and upload your content (photo or short video).",
                },
                {
                  s: "Step 3: Post",
                  t: "Confirm your upload. Your story will now be visible to your audience.",
                },
                {
                  s: "Step 4: Stay Active",
                  t: "Post multiple stories throughout the day whenever you have something quick to share.",
                },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#7B51CC",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}
                    >
                      {step.s}
                    </div>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>
                      {step.t}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 64,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
            >
              <div
                style={{
                  padding: 40,
                  background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                  borderRadius: 32,
                }}
              >
                <Badge color="#7B51CC">💡 FOR CREATORS</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>
                  Don't Aim for Perfect
                </h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>
                  Stories feel better when they're natural. Overthinking them
                  can make them harder to use. The goal is total presence, not
                  performance.
                </p>
              </div>
              <div
                style={{
                  padding: 40,
                  background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                  borderRadius: 32,
                }}
              >
                <Badge color="#0ea5e9">👥 FOR FANS</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>
                  Seeing More Through Stories
                </h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>
                  Experience creators beyond planned posts. Follow along with
                  their day and enjoy content that feels natural and immediate.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (selectedFeature === 3) {
    // Media Vault Detail View
    return (
      <div style={{ paddingBottom: 100 }}>
        <button
          onClick={() => {
            setSelectedFeature(null);
            window.scrollTo(0, 0);
          }}
          style={{
            margin: "24px 5vw",
            background: "none",
            border: "none",
            color: "#7B51CC",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
          }}
        >
          ← Back to Features
        </button>

        {/* Hero */}
        <header
          style={{
            padding: "80px 5vw",
            background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff",
            borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}`,
          }}
        >
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>CREATOR TOOL</Badge>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
              }}
            >
              Introducing Media Vault: Store, Organise, and Reuse Your Content
            </h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>
              Creating content takes time. Uploading, organising, and reusing it
              shouldn't take just as long. Media Vault is where your content
              library lives — always organised, always ready.
            </p>
          </div>
        </header>

        {/* Hero Image */}
        <section
          style={{
            maxWidth: 800,
            margin: "-40px auto 0",
            padding: "0 5vw",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
            src="/assets/promotions/spotlight_Image.png"
            alt="Media Vault"
            style={{
              width: "100%",
              borderRadius: 24,
              boxShadow: dark
                ? "0 20px 50px rgba(0,0,0,0.5)"
                : "0 20px 40px rgba(0,0,0,0.1)",
            }}
          />
        </section>

        {/* Main Content */}
        <section
          style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}
        >
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: dark ? "rgba(255,255,255,0.8)" : "#333",
            }}
          >
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 24px" }}>
              What Media Vault Is
            </h2>
            <p>
              Media Vault is your personal content library inside LuvlyFans.
              It's the space where all your uploaded photos and videos live,
              ready to be used, reused, and repurposed without starting from
              scratch every time.
            </p>
            <p>
              Think of it like a well-organised hard drive for your page —
              except it's built directly into the platform, accessible whenever
              you need it.
            </p>

            <div
              style={{
                margin: "48px 0",
                padding: 40,
                background: "#7B51CC",
                borderRadius: 32,
                color: "#fff",
              }}
            >
              <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>
                One Place. Everything In It.
              </h3>
              <p>
                No more digging through old posts. No more re-uploading files
                you've already uploaded. Your media stays in one place so you
                can focus on what it's supposed to do — connect with your
                audience.
              </p>
            </div>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              Why This Matters
            </h2>
            <p>
              As your page grows, so does your content. Without structure,
              things start to pile up. What used to take a few minutes begins to
              take much longer, and that friction adds up over time.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 24,
                margin: "40px 0",
              }}
            >
              {[
                {
                  t: "Files Get Lost",
                  d: "Repeated uploads, scattered files, no clear system to find what you need.",
                },
                {
                  t: "Posting Takes Longer",
                  d: "Every post becomes its own admin task when there's no organised library behind it.",
                },
                {
                  t: "Momentum Breaks",
                  d: "Small inefficiencies compound. When posting is slow, consistency suffers.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 18,
                      marginBottom: 8,
                      color: "#7B51CC",
                    }}
                  >
                    {item.t}
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.6 }}>{item.d}</div>
                </div>
              ))}
            </div>
            <p>
              Media Vault removes that friction. Your content is always there,
              always accessible, and always ready to use.
            </p>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              How Creators Use It
            </h2>
            <p>
              Media Vault is designed around how creators actually work — not
              how platforms assume they do.
            </p>
            <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
              {[
                {
                  s: "Upload and Store in Advance",
                  t: "Batch create your content and keep it in the Vault until you're ready to post. No pressure to post immediately after creating.",
                },
                {
                  s: "Reuse Across Posts",
                  t: "A photo that worked well in one context can work in another. Pull from your Vault instead of re-uploading the same file.",
                },
                {
                  s: "Keep Everything Organised",
                  t: "Everything you've uploaded is stored cleanly in one place. No searching through your feed to find something from three months ago.",
                },
                {
                  s: "Prepare Content Ahead of Time",
                  t: "Build up a library before a busy period. When you're ready to post, your content is already waiting for you.",
                },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "#7B51CC",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}
                    >
                      {step.s}
                    </div>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>
                      {step.t}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}
            >
              Before vs. After
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              <div
                style={{
                  padding: 32,
                  borderRadius: 20,
                  background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 20,
                    opacity: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Without Media Vault
                </div>
                {[
                  "Re-upload the same file every time",
                  "Search through old posts to find content",
                  "Lose time on small repetitive tasks",
                  "Disrupted workflow between sessions",
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 14,
                      fontSize: 14,
                      opacity: 0.7,
                    }}
                  >
                    <span
                      style={{
                        color: "#ef4444",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      ✕
                    </span>{" "}
                    {t}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: 32,
                  borderRadius: 20,
                  background: dark ? "rgba(123,81,204,0.06)" : "#f3f0ff",
                  border: `1px solid ${dark ? "rgba(123,81,204,0.2)" : "rgba(123,81,204,0.15)"}`,
                }}
              >
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 16,
                    marginBottom: 20,
                    color: "#7B51CC",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  With Media Vault
                </div>
                {[
                  "Pick from your library in seconds",
                  "Everything is already organised and ready",
                  "Post without friction or interruption",
                  "Build content batches and post on schedule",
                ].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      marginBottom: 14,
                      fontSize: 14,
                    }}
                  >
                    <span
                      style={{
                        color: "#7B51CC",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>{" "}
                    {t}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 64,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
              }}
            >
              <div
                style={{
                  padding: 40,
                  background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                  borderRadius: 32,
                }}
              >
                <Badge color="#7B51CC">💡 FOR CREATORS</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>
                  Built for Batch Creators
                </h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>
                  If you create content in batches, Media Vault is the missing
                  piece. Upload everything in one session, then post from your
                  library throughout the week without touching a file again.
                </p>
              </div>
              <div
                style={{
                  padding: 40,
                  background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                  borderRadius: 32,
                }}
              >
                <Badge color="#0ea5e9">📋 BUILD CONSISTENCY</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>
                  Consistency Needs Preparation
                </h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>
                  Showing up regularly is easier when your content is already
                  ready. Media Vault supports consistent posting by reducing the
                  friction between having content and sharing it.
                </p>
              </div>
            </div>

            <div
              style={{
                marginTop: 64,
                padding: "48px",
                background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8",
                borderRadius: 32,
                border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              }}
            >
              <Badge>FINAL THOUGHTS</Badge>
              <p
                style={{
                  margin: "16px 0 0",
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1.3,
                }}
              >
                As you build more content, organisation becomes just as
                important as creation. Media Vault gives you the structure to do
                both — without slowing either one down.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // List View (Same style as Events List)
  return (
    <div style={{ padding: "80px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: 60 }}>
          <Badge>PLATFORM TOOLS</Badge>
          <h1 style={{ fontSize: 48, fontWeight: 800, marginTop: 16 }}>
            Creator Features
          </h1>
          <p style={{ fontSize: 18, opacity: 0.6, marginTop: 12 }}>
            Unlocking new ways to grow, engage, and monetize your influence.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: 32,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                if (f.id === 1 || f.id === 2 || f.id === 3)
                  setSelectedFeature(f.id);
                window.scrollTo(0, 0);
              }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                cursor:
                  f.id === 1 || f.id === 2 || f.id === 3
                    ? "pointer"
                    : "default",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (f.id === 1 || f.id === 2 || f.id === 3) {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = dark
                    ? "0 40px 80px rgba(0,0,0,0.6)"
                    : "0 30px 60px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ height: 240, overflow: "hidden" }}>
                <img
                  src={f.thumbnail}
                  alt={f.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "28px 24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <Badge color="#7B51CC">{f.type}</Badge>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    · {f.date}
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    margin: "0 0 16px",
                    lineHeight: 1.25,
                    color: dark ? "#fff" : "#111",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    opacity: 0.6,
                    lineHeight: 1.6,
                    marginBottom: 0,
                  }}
                >
                  {f.excerpt}
                </p>
                {f.id === 1 || f.id === 2 ? (
                  <div
                    style={{
                      marginTop: 20,
                      color: "#7B51CC",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Learn More →
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 20,
                      color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FREE CREATORS PAGE ────────────────────────────────────────────────────────

export function FreeCreatorsPage({ dark, onRead }) {
  const data = FREE_CREATORS_DIGEST[0];
  const isMobile = useIsMobile();
  const [isNarrow, setIsNarrow] = React.useState(
    () => window.innerWidth < 960
  );
  React.useEffect(() => {
    const h = () => setIsNarrow(window.innerWidth < 960);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return (
    <div
      style={{
        background: dark ? "#0a0a0a" : "#fff",
        color: dark ? "#fff" : "#111",
        overflowX: "hidden",
        maxWidth: "100vw",
        width: "100%",
      }}
    >
      {/* Hero Section */}
      <div style={{ overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
        <section
          style={{
            position: "relative",
            height: "70vh",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${data.hero}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.65)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "5vw",
              right: "5vw",
              maxWidth: 800,
            }}
          >
            <Badge>MONTHLY DIGEST</Badge>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 72px)",
                fontWeight: 900,
                color: "#fff",
                margin: "24px 0",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Free Creator Accounts to Follow in {data.month}
            </h1>
          </div>
        </section>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 5vw" }}>
        <section style={{ textAlign: "center", marginBottom: 120 }}>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              maxWidth: 640,
              margin: "0 auto",
              opacity: 0.7,
            }}
          >
            Looking for new creators to follow this month? From comedy and
            travel to fitness and photography, these creators bring personality
            and originality to LuvlyFans.
          </p>
        </section>

        {/* Featured Creator List */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: isNarrow ? 80 : 140,
          }}
        >
          {data.featured.map((c, i) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                gap: isNarrow ? 32 : 60,
                alignItems: "flex-start",
                flexDirection: isNarrow
                  ? "column"
                  : i % 2 === 1
                    ? "row-reverse"
                    : "row",
                flexWrap: "nowrap",
                paddingBottom: isNarrow ? 0 : 60,
              }}
            >
              {/* Image & Quote Section */}
              <div
                style={{
                  flex: isNarrow ? "1 1 100%" : "0 0 450px",
                  position: "relative",
                  width: isNarrow ? "100%" : "auto",
                  overflow: "visible",
                  borderRadius: 24,
                  display: isNarrow ? "flex" : "block",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Creator Photo Visual - Fixed cropping for faces on mobile */}
                <div
                  style={
                    isNarrow
                      ? {
                          width: "100%",
                          height: "auto",
                          borderRadius: 24,
                          overflow: "hidden",
                          position: "relative",
                          border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                          order: -1,
                        }
                      : {
                          position: "absolute",
                          bottom: -40,
                          right: i % 2 === 0 ? -40 : "auto",
                          left: i % 2 === 1 ? -40 : "auto",
                          width: 280,
                          height: 350,
                          borderRadius: 24,
                          border: `8px solid ${dark ? "#1a1a1a" : "#fff"}`,
                          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: 12,
                          backgroundColor: dark ? "#111" : "#fff",
                          overflow: "hidden",
                          zIndex: 10,
                        }
                  }
                >
                  <img
                    src={c.image || "/assets/events/AVN2.jpeg"}
                    alt={c.name}
                    style={{
                      position: isNarrow ? "relative" : "absolute",
                      inset: 0,
                      width: "100%",
                      height: isNarrow ? "auto" : "100%",
                      objectFit: isNarrow ? "contain" : "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      zIndex: 2,
                      background: "rgba(255,255,255,0.95)",
                      padding: "10px 18px",
                      borderRadius: 12,
                      fontSize: 13,
                      fontWeight: 800,
                      backdropFilter: "blur(4px)",
                      color: "#111",
                    }}
                  >
                    {c.type}
                  </div>
                </div>

                {/* Quote Card (Main background) */}
                <div
                  style={{
                    minHeight: isNarrow ? "auto" : 480,
                    height: "auto",
                    borderRadius: 24,
                    background: c.color,
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    padding: isNarrow ? "32px" : 48,
                    boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
                    backgroundImage: `radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 70%)`,
                    position: "relative",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "clamp(18px, 3.2vw, 30px)",
                      fontWeight: 800,
                      lineHeight: 1.2,
                      flex: isNarrow ? "none" : 1,
                      margin: 0,
                      marginBottom: isNarrow ? 32 : 0,
                    }}
                  >
                    “{c.quote}”
                  </h2>
                </div>
              </div>

              {/* Text Section (Description) */}
              <div style={{ flex: isNarrow ? "1 1 100%" : "1 1 400px" }}>
                <div
                  style={{
                    fontSize: isNarrow ? 16 : 18,
                    fontWeight: 400,
                    color: "#7B51CC",
                    marginBottom: 12,
                  }}
                >
                  {i + 1}. {c.name}{" "}
                  <span style={{ fontWeight: 800 }}>{c.handle}</span>
                </div>
                <h3
                  style={{
                    fontSize: isNarrow ? 22 : 24,
                    fontWeight: 800,
                    marginBottom: 20,
                  }}
                >
                  {c.type}
                </h3>
                <p
                  style={{
                    fontSize: isNarrow ? 16 : 17,
                    lineHeight: 1.8,
                    opacity: 0.8,
                    marginBottom: 32,
                  }}
                >
                  {c.bio}
                </p>
                <div
                  style={{
                    borderLeft: `4px solid ${c.color}`,
                    paddingLeft: 24,
                    margin: "32px 0",
                    fontSize: 15,
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    opacity: 0.9,
                  }}
                >
                  {c.quote}
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <button
                    onClick={() => window.open(c.profileUrl, "_blank")}
                    style={{
                      background: "#7B51CC",
                      color: "#fff",
                      border: `2px solid #7B51CC`,
                      padding: "14px 28px",
                      borderRadius: 12,
                      fontWeight: 800,
                      cursor: "pointer",
                      flex: isNarrow ? 1 : "initial",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    Follow for free
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Find Top Creators Spotlight */}
        <div
          style={{
            position: "relative",
            padding: isMobile ? "60px 24px" : "80px 40px",
            borderRadius: 40,
            background: dark ? "rgba(123,81,204,0.12)" : "#F8F5FF",
            border: `1px solid ${dark ? "rgba(123,81,204,0.25)" : "rgba(123,81,204,0.1)"}`,
            overflow: "hidden",
            marginTop: 120,
            marginBottom: 80,
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <Icon
              name="star"
              size={isMobile ? 48 : 56}
              color="#7B51CC"
              style={{ marginBottom: 24 }}
            />
            <h2
              style={{
                fontSize: isMobile ? 32 : 40,
                fontWeight: 800,
                marginBottom: 20,
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Find Top Creator Accounts
            </h2>
            <p
              style={{
                fontSize: 18,
                opacity: 0.7,
                marginBottom: 32,
                lineHeight: 1.6,
              }}
            >
              LuvlyFans is the home of growth-focused creators. See how the top
              1% are building their legacy through authentic connection.
            </p>
            <CTAButton
              size="lg"
              onClick={() => window.open("https://luvlyfans.com/", "_blank")}
            >
              Explore the Platform
            </CTAButton>
          </div>
        </div>

        {/* Digest Footer Redesign */}
        <section
          style={{
            marginTop: isMobile ? 80 : 120,
            textAlign: "center",
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            paddingTop: 80,
          }}
        >

          {/* Related Posts */}
          <div style={{ textAlign: "left", maxWidth: 1200, margin: "0 auto" }}>
            <h2
              style={{
                fontSize: isMobile ? 24 : 28,
                fontWeight: 900,
                marginBottom: 40,
                fontFamily: "'Lora', Georgia, serif",
              }}
            >
              Related Posts
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? 32 : 24,
              }}
            >
              {ARTICLES.slice(0, 3).map((a) => (
                <div
                  key={a.id}
                  onClick={() => onRead(a)}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: dark ? "rgba(255,255,255,0.02)" : "#f9f9f9",
                    cursor: "pointer",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.borderColor = "#7B51CC";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = dark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)";
                  }}
                >
                  <div style={{ height: 220, position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          background: "#7B51CC",
                          color: "#fff",
                          padding: "4px 10px",
                          borderRadius: 6,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {a.tag}
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(45deg, ${a.gradient || "from-purple-500 to-indigo-600"})`,
                        opacity: 0.1,
                        position: "absolute",
                        inset: 0,
                      }}
                    />
                    <img
                      src={
                        a.thumbnail ||
                        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500"
                      }
                      alt={a.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div style={{ padding: "28px" }}>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        lineHeight: 1.4,
                        margin: 0,
                        color: dark ? "#fff" : "#111",
                      }}
                    >
                      {a.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// ─── MISSION PAGE ────────────────────────────────────────────────────────────

export function MissionPage({ dark }) {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "100px 5vw",
        textAlign: "center",
      }}
    >
      <Badge>OUR MISSION</Badge>
      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 800,
          margin: "24px 0",
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        Built for Creators, by Creators.
      </h1>
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          opacity: 0.8,
          marginBottom: 40,
        }}
      >
        At LuvlyFans, we believe the creator economy has been uneven for too
        long. Our mission is to provide the tools, education, and platform
        stability that independent earners need to build sustainable careers.
      </p>
      <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.8 }}>
        We focus on automation, transparency, and human-first support so you can
        focus on what matters most: your content and your connection with fans.
      </p>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

export function ContactPage({ dark }) {
  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "100px 5vw",
        textAlign: "center",
      }}
    >
      <Badge>SUPPORT</Badge>
      <h1
        style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontWeight: 800,
          margin: "24px 0",
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        Get in Touch
      </h1>
      <p style={{ fontSize: 18, marginBottom: 40, opacity: 0.8 }}>
        Have a question or need assistance? Our support team is here to help.
      </p>
      <div
        style={{
          background: dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.05)",
          border: "1px solid rgba(123,81,204,0.2)",
          padding: "40px",
          borderRadius: 24,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#7B51CC",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          Official Support Email
        </div>
        <a
          href="mailto:support@luvlyfans.com"
          style={{
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 800,
            color: dark ? "#fff" : "#111",
            textDecoration: "none",
          }}
        >
          support@luvlyfans.com
        </a>
      </div>
    </div>
  );
}
