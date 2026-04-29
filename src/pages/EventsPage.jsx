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
                    aspectRatio: isMobile ? "4/5" : "3/4",
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
                      height: "100%",
                      objectFit: "cover",
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
              <span style={{ color: "#7B51CC" }}>AVN </span>
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? 300 : 500,
              borderRadius: isMobile ? 24 : 32,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
              border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}`,
              background: "#111",
            }}
          >
            <img
              src="/assets/events/Quietlyvae.avn.jpeg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(40px) brightness(0.6)",
                transform: "scale(1.1)",
              }}
            />
            <img
              loading="eager"
              fetchPriority="high"
              src="/assets/events/Quietlyvae.avn.jpeg"
              alt="LuvlyFans @ AVN"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                zIndex: 1,
              }}
            />
          </div>
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
            Introduction
          </h2>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a",
            }}
          >
            <p>Every industry has moments where everything comes together in one place.</p>
            <p>For the creator space, one of those moments is AVN in Las Vegas.</p>
            <p>It’s where creators, platforms, brands, and audiences meet in real life. Conversations happen faster, ideas move quicker, and you get a clearer sense of where things are heading.</p>
            <p>This year, LuvlyFans was part of that environment, with QuietlyVae in attendance representing the platform.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>What AVN Represents</h3>
            <p>AVN isn’t just about visibility.</p>
            <p>It represents scale.</p>
            <p>Creators from different countries, different stages, and different styles all come together. You see:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Established creators running structured businesses</li>
              <li>New creators finding their direction</li>
              <li>Platforms competing for attention</li>
              <li>Trends forming in real time</li>
            </ul>
            <p>It gives a wider view of the creator economy beyond what you see online.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Being Present Through Creators</h3>
            <p>Rather than approaching the event as a platform looking in, we chose to be present through creators already part of the space.</p>
            <p>QuietlyVae attending AVN gave us a grounded way to stay connected to what’s actually happening on the ground. Real conversations, real interactions, and real feedback.</p>
            <p>That kind of presence matters more than just visibility.</p>

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
                    aspectRatio: isMobile ? "4/5" : "3/4",
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
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>What Stood Out</h3>
            
            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>Creators Are Thinking Long-Term</h4>
            <p>The focus isn’t just on quick wins.</p>
            <p>More creators are thinking about:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Stability</li>
              <li>Brand building</li>
              <li>Consistent income</li>
            </ul>
            <p>The mindset is shifting toward sustainability.</p>

            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>Visibility Is Still a Major Topic</h4>
            <p>Even at a global event, one thing is consistent.</p>
            <p>Getting seen is still a challenge.</p>
            <p>It reinforces how important discovery tools are. Content alone isn’t always enough without visibility.</p>

            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>The Space Is Becoming More Structured</h4>
            <p>Creators are becoming more organised in how they work.</p>
            <p>They’re:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Planning content ahead</li>
              <li>Treating their pages like businesses</li>
              <li>Building systems around consistency</li>
            </ul>
            <p>This shift is changing expectations across the industry.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Why This Matters for LuvlyFans</h3>
            <p>Being present at AVN, through creators like QuietlyVae, helps us stay connected to the reality of the space.</p>
            <p>It reinforces a few key things:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Simplicity matters</li>
              <li>Visibility matters</li>
              <li>Consistency matters</li>
            </ul>
            <p>These are the areas that shape real outcomes for creators.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Looking Ahead</h3>
            <p>The creator space is growing, but it’s also becoming more focused.</p>
            <p>Events like AVN highlight that shift clearly. More structure, more intention, and more awareness of long-term growth.</p>
            <p>That’s the direction we’re building towards.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Final Thoughts</h3>
            <p>AVN is a reminder that the creator world is bigger than any one platform.</p>
            <p>It’s built on people, conversations, and shared experience. Being present, even through creators, helps us understand that better.</p>
            <p>We’re glad to be part of that journey.</p>
          </div>
        </section>
      </div>
    );
  }

    if (selectedEvent === 5) {
    const afterDarkPhotos = [
      { src: "/assets/events/creators_after_dark1.jpeg", alt: "Creators After Dark 1" },
      { src: "/assets/events/creators_after_dark.jpeg", alt: "Creators After Dark 2" },
      { src: "/assets/events/creators_after_dark7.jpeg", alt: "Creators After Dark 3" },
      { src: "/assets/events/creators_after_dark6.jpeg", alt: "Creators After Dark 4" },
      { src: "/assets/events/creators_after_dark5.jpeg", alt: "Creators After Dark 5" },
      { src: "/assets/events/creators_after_dark4.jpeg", alt: "Creators After Dark 6" },
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
            fontSize: 15,
          }}
        >
          ← Back to Events
        </button>

        {/* Hero Banner */}
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
                "url('/assets/events/creators_after_dark2.jpeg') center/cover no-repeat",
              filter: "blur(40px) brightness(0.7)",
            }}
          />
          <div
            style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}
          >
            <Badge>MARCH 15 · CREATOR EVENT</Badge>
            <h1
              style={{
                fontSize: "clamp(30px, 6vw, 64px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              QuietlyVae represents Luvlyfans at{" "}
              <span style={{ color: "#7B51CC" }}>Creators After Dark</span>
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
              Building relationships over reach in relaxed spaces.
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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? 300 : 500,
              borderRadius: isMobile ? 24 : 32,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
              border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}`,
              background: "#111",
            }}
          >
            <img
              src="/assets/events/creators_after_dark2.jpeg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(40px) brightness(0.6)",
                transform: "scale(1.1)",
              }}
            />
            <img
              loading="eager"
              fetchPriority="high"
              src="/assets/events/creators_after_dark2.jpeg"
              alt="Creators After Dark"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                zIndex: 1,
              }}
            />
          </div>
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
            Introduction
          </h2>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.9,
              color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a",
            }}
          >
            <p>Not every important conversation happens on a stage.</p>
            <p>Some happen in more relaxed spaces. Smaller settings where creators can speak openly, connect naturally, and share experiences without pressure.</p>
            <p>Creators After Dark is one of those spaces.</p>
            <p>LuvlyFans was present through QuietlyVae, who attended and represented the platform within that environment.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>A Different Kind of Event</h3>
            <p>Creators After Dark feels different from larger events.</p>
            <p>It’s less structured, more personal, and more focused on connection than visibility. Conversations flow more naturally, and people tend to speak more openly about their experiences.</p>
            <p>That difference matters.</p>

            <div
              style={{
                margin: "40px 0",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 20,
              }}
            >
              {afterDarkPhotos.map((p, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    aspectRatio: isMobile ? "4/5" : "3/4",
                    background: "#111",
                    position: "relative",
                  }}
                >
                  <img
                    src={p.src}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "blur(20px)",
                      opacity: 0.6,
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    loading="lazy"
                    src={p.src}
                    alt={p.alt}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      zIndex: 1,
                    }}
                  />
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>What Stood Out</h3>
            
            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>Conversations Were More Honest</h4>
            <p>In a more relaxed setting, creators tend to speak more freely.</p>
            <p>Topics that came up included:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Income stability</li>
              <li>Burnout</li>
              <li>Platform frustrations</li>
              <li>What they’re trying to build long-term</li>
            </ul>
            <p>There’s less filtering, and more honesty.</p>

            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>Relationships Over Reach</h4>
            <p>The focus wasn’t on numbers.</p>
            <p>It was on:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Who you connect with</li>
              <li>Who you trust</li>
              <li>Who you can collaborate with</li>
            </ul>
            <p>These relationships often shape growth just as much as visibility.</p>

            <h4 style={{ fontSize: 22, fontWeight: 700, marginTop: 30, marginBottom: 15 }}>Shared Experiences Matter</h4>
            <p>Even though creators come from different backgrounds, many of the challenges are similar.</p>
            <p>Hearing those shared experiences in person creates a different level of understanding. It reinforces that most creators are figuring things out as they go, not following a fixed path.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Why This Matters for LuvlyFans</h3>
            <p>Being present in spaces like this, through creators like QuietlyVae, helps us stay connected to the reality of the creator journey.</p>
            <p>Not just the visible side, but the conversations that don’t always make it online.</p>
            <p>It highlights what creators actually care about:</p>
            <ul style={{ margin: "20px 0 20px 20px" }}>
              <li>Stability</li>
              <li>Simplicity</li>
              <li>Support</li>
            </ul>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Looking Ahead</h3>
            <p>Not every insight comes from large events.</p>
            <p>Sometimes the smaller, more personal environments give a clearer picture of what’s really happening in the space.</p>
            <p>That perspective is just as important.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Final Thoughts</h3>
            <p>Creators After Dark is a reminder that the creator world isn’t just about platforms or content.</p>
            <p>It’s about people, conversations, and shared experiences.</p>
            <p>Being present in those spaces helps us build with more awareness and intention.</p>
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
                if ([1, 4, 5].includes(event.id)) setSelectedEvent(event.id);
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
