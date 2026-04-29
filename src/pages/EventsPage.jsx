import React, { useState, useEffect } from "react";
import "../events.css";
import { Badge } from "../components";
import { EVENTS } from "../data";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

export function EventsPage({ dark, selectedEvent, setSelectedEvent }) {
  const isMobile = useIsMobile();

  // DETAIL VIEW FOR INTRODUCTION (Lustful Ladies & Perspective)
  if (selectedEvent === 4) {
    const lustfulPhotos = [
      { src: "/assets/events/events_lustful1.jpeg", alt: "Creator Event 1" },
      { src: "/assets/creators/Loulalou.png", alt: "CEO Lou" },
      { src: "/assets/events/events_lustful2.jpeg", alt: "Creator Event 2" },
      { src: "/assets/events/events_lustful3.jpeg", alt: "Creator Event 3" },
    ];

    return (
      <div style={{ paddingBottom: isMobile ? 60 : 100 }}>
        <button
          onClick={() => {
            setSelectedEvent(null);
            window.scrollTo(0, 0);
          }}
          style={{
            margin: isMobile ? "24px 5vw 0" : "24px 5vw",
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
          ← Back to Events
        </button>

        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "60px 5vw" : "120px 5vw",
            background: dark ? "#0a0a0a" : "#fff",
            textAlign: "center",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background:
                "url('/assets/creators/Loulalou.png') center/cover no-repeat",
              filter: "blur(40px) brightness(0.7)",
            }}
          />
          <div
            style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}
          >
            <Badge>EDITORIAL PERSPECTIVE</Badge>
            <h1
              style={{
                fontSize: "clamp(30px, 6vw, 64px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Beyond the Screen:{" "}
              <span style={{ color: "#7B51CC" }}>Real-World Experiences</span>
            </h1>
            <p
              style={{
                fontSize: isMobile ? 18 : 20,
                opacity: 0.8,
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Real-world creator spaces are the foundation of community.
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <section
          style={{
            maxWidth: 1100,
            margin: isMobile ? "0 auto 40px" : "-60px auto 80px",
            padding: "0 5vw",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
              loading="eager"
              fetchPriority="high"
            src="/assets/creators/Loulalou.png"
            alt="CEO Lou - Lustful Events"
            style={{
              width: "100%",
              height: isMobile ? 300 : 500,
              objectFit: "cover",
              borderRadius: isMobile ? 24 : 32,
              boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
              border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}`,
            }}
          />
        </section>

        {/* Content - continuing with all Lustful Ladies content... */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 5vw" }}>
          <h2
            style={{
              fontSize: isMobile ? 26 : 36,
              fontWeight: 800,
              marginBottom: 28,
              lineHeight: 1.2,
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            Organised by Lustful Events CEO Lou (@iamloulalouagain)
          </h2>

          <div
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a",
            }}
          >
            <p>
              The creator space doesn't just exist online. It also lives in
              real-world environments where people meet, talk, and understand
              the space they're part of. The Lustful Ladies event was one of
              those environments. A place where creators came together in a more
              direct and personal setting.
            </p>
            <p>
              LuvlyFans was in attendance, and it gave us the opportunity to
              step outside the platform and see things from a different
              perspective.
            </p>

            <div
              style={{
                margin: "40px 0",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 20,
              }}
            >
              {lustfulPhotos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#111",
                  }}
                >
                  <img
              loading="eager"
              fetchPriority="high"
                    src={p.src}
                    alt={p.alt}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>

            <h3
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginTop: 40,
                color: "#7B51CC",
              }}
            >
              What Lustful Ladies Represents
            </h3>
            <p>
              Lustful Ladies is part of a wider UK-based event series that
              brings together creators and audiences in a curated environment.
              What stood out wasn't just the setting, but the mix of people.
              Creators at different stages. Different approaches. Different
              goals. All in one space. It's a reminder that the creator world
              isn't one-dimensional. It's varied, and constantly evolving.
            </p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>
              Being in the Room Changes Perspective
            </h3>
            <p>
              Online, everything can feel separate. Profiles, posts, and numbers
              don't always reflect the full picture. Being in the room changes
              that. You start to see how creators present themselves, how they
              connect, and how differently people approach the same space. It
              adds context that you don't always get from a screen.
            </p>

            <h3
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginTop: 40,
                color: "#7B51CC",
              }}
            >
              Conversations That Matter
            </h3>
            <p>
              What stood out most were the conversations. Creators spoke openly
              about what's working for them, where they feel stuck, what they
              expect from platforms, and how they're building income over time.
              These weren't polished answers. They were honest, practical, and
              grounded in real experience.
            </p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>
              What We Learned
            </h3>
            <div
              style={{
                background: dark
                  ? "rgba(123,81,204,0.05)"
                  : "rgba(123,81,204,0.03)",
                padding: isMobile ? "32px 24px" : "56px 48px",
                borderRadius: 24,
                border: `1px solid ${dark ? "rgba(123,81,204,0.15)" : "rgba(123,81,204,0.1)"}`,
                marginBottom: 40,
              }}
            >
              <div style={{ display: "grid", gap: 56 }}>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    Creators Are Looking for Stability
                  </h4>
                  <p>
                    A lot of the focus wasn't on going viral. It was on
                    consistency. Predictable income. Platforms that don't change
                    direction without warning. Creators are thinking more about
                    long-term stability than short-term spikes.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    Visibility Is Still a Challenge
                  </h4>
                  <p>
                    Even strong creators mentioned the same issue. Getting seen
                    is difficult. Not because they aren't creating, but because
                    discovery is unpredictable. It reinforced how important
                    visibility tools are. Posting alone isn't always enough.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    There Is No Single Path
                  </h4>
                  <p>
                    Every creator we spoke to was doing things differently. Some
                    post frequently. Others focus on fewer, higher-quality
                    updates. What works is often personal, not universal.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    Community Still Matters
                  </h4>
                  <p>
                    Even in a digital space, creators value connection. Being
                    able to talk, share experiences, and learn from others stood
                    out as something people don't get enough of online.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    Clarity From Platforms Is Important
                  </h4>
                  <p>
                    Creators want clear rules, expectations, and earning
                    structures. When things feel unclear, it slows people down.
                    Simple and transparent systems build confidence.
                  </p>
                </div>
                <div>
                  <h4
                    style={{
                      color: "#7B51CC",
                      fontSize: 20,
                      marginBottom: 16,
                      fontWeight: 800,
                    }}
                  >
                    Small Improvements Go a Long Way
                  </h4>
                  <p>
                    Not everything needs to be complex. Often it's the smaller
                    things that make the biggest difference: better onboarding,
                    clear guidance, and simpler tools. These are the things
                    creators notice and value.
                  </p>
                </div>
              </div>
            </div>

            <h3
              style={{
                fontSize: 28,
                fontWeight: 800,
                marginTop: 40,
                color: "#7B51CC",
              }}
            >
              Why This Matters for LuvlyFans
            </h3>
            <p>
              These aren't abstract takeaways. They directly shape how we think
              about the platform. From improving visibility through features
              like Spotlight, to keeping things simple and clear, these
              conversations help us stay aligned with what creators actually
              need. Being present in these spaces helps us build with more
              awareness, not assumptions.
            </p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>
              Final Thoughts
            </h3>
            <p>
              Events like Lustful Ladies are a reminder that the creator world
              is built on people first. The platforms, the features, and the
              numbers all come after that. What matters is understanding the
              space and the people within it.
            </p>

            <p
              style={{
                fontWeight: 800,
                fontStyle: "italic",
                fontSize: 22,
                marginTop: 48,
                color: "#7B51CC",
              }}
            >
              "We're glad we were there, and we'll continue to listen, learn,
              and build with that in mind."
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (selectedEvent === 1) {
    // AVN Detail View
    const avnPhotos = [
      {
        src: "/assets/creators/Quietlyvae.avn1.jpeg",
        alt: "QuietlyVae at AVN",
      },
      { src: "/assets/events/AVN2.jpeg", alt: "Industry Networking" },
      {
        src: "/assets/events/Quietlyvae.avn2.jpeg",
        alt: "Red Carpet Visibility",
      },
      { src: "/assets/events/Quietlyvae.avn3.jpeg", alt: "Creator Community" },
    ];

    return (
      <div style={{ paddingBottom: isMobile ? 60 : 100 }}>
        <button
          onClick={() => {
            setSelectedEvent(null);
            window.scrollTo(0, 0);
          }}
          style={{
            margin: isMobile ? "24px 5vw 0" : "24px 5vw",
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
          ← Back to Events
        </button>

        {/* Hero */}
        <section
          style={{
            padding: isMobile ? "60px 5vw" : "120px 5vw",
            background: dark ? "#0a0a0a" : "#fff",
            textAlign: "center",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.2,
              background:
                "url('/assets/events/Quietlyvae.avn.jpeg') center/cover no-repeat",
              filter: "blur(40px) brightness(0.7)",
            }}
          />
          <div
            style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}
          >
            <Badge>2026 AVN · LAS VEGAS</Badge>
            <h1
              style={{
                fontSize: "clamp(30px, 6vw, 64px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              LuvlyFans @ the{" "}
              <span style={{ color: "#7B51CC" }}>AVN Awards</span>
            </h1>
            <p
              style={{
                fontSize: isMobile ? 18 : 20,
                opacity: 0.8,
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              The Future of Creator Community
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <section
          style={{
            maxWidth: 1100,
            margin: isMobile ? "0 auto 40px" : "-60px auto 80px",
            padding: "0 5vw",
            position: "relative",
            zIndex: 10,
          }}
        >
          <img
              loading="eager"
              fetchPriority="high"
            src="/assets/events/Quietlyvae.avn.jpeg"
            alt="LuvlyFans @ AVN"
            style={{
              width: "100%",
              height: isMobile ? 300 : 500,
              objectFit: "cover",
              borderRadius: isMobile ? 24 : 32,
              boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
              border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}`,
            }}
          />
        </section>

        {/* Content */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 5vw" }}>
          <h2
            style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 800,
              marginBottom: 28,
              lineHeight: 1.25,
            }}
          >
            QuietlyVae Represents the Future
          </h2>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a",
            }}
          >
            <p>
              Participating in industry conversations that continue to shape the
              future of creator-led platforms.
            </p>

            <div
              style={{
                margin: "40px 0",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 20,
              }}
            >
              {avnPhotos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    aspectRatio: isMobile ? "16/9" : "4/3",
                    background: "#222",
                  }}
                >
                  <img
              loading="eager"
              fetchPriority="high"
                    src={p.src}
                    alt={p.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            <p>
              AVN brings together top creators and innovators. Its presence
              reflects our commitment to creator success.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div style={{ padding: isMobile ? "40px 5vw" : "80px 5vw" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ marginBottom: isMobile ? 40 : 80 }}>
          <Badge>INDUSTRY RECAPS</Badge>
          <h1
            style={{
              fontSize: isMobile ? 32 : 48,
              fontWeight: 800,
              marginTop: 16,
            }}
          >
            Creators on the Move
          </h1>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(2, minmax(0, 400px))",
            gap: 24,
          }}
        >
          {EVENTS.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                if ([1, 4].includes(event.id)) setSelectedEvent(event.id);
                window.scrollTo(0, 0);
              }}
              style={{
                borderRadius: 24,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
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
              <div style={{ height: isMobile ? 200 : 240, overflow: "hidden" }}>
                <img
              loading="eager"
              fetchPriority="high"
                  src={event.thumbnail}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: isMobile ? 24 : 32 }}>
                <Badge color="#7B51CC">{event.type}</Badge>
                <h3
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    margin: "16px 0",
                    color: dark ? "#fff" : "#111",
                    lineHeight: 1.25,
                  }}
                >
                  {event.title}
                </h3>
                <p style={{ fontSize: 15, opacity: 0.6, lineHeight: 1.6 }}>
                  {event.excerpt}
                </p>
                <div
                  style={{
                    marginTop: 24,
                    color: "#7B51CC",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  Read Recap →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
