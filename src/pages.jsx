import React, { useState, useEffect } from "react";
import { Badge } from "./components";
import { useInView, useScrollProgress } from "./hooks";
import { ARTICLES, CATEGORIES, STATS, HUB_MODULES, COMPARISON, EVENTS, FEATURES, FREE_CREATORS_DIGEST } from "./data";
import { ArticleCard, EmailCapture, CTAButton, GhostButton, Logo, Icon } from "./components";

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

export function Nav({ dark, setDark, page, setPage }) {
  const [scroll, setScroll] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      if (window.innerWidth >= 800) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { label: "Blog", p: "home" },
    { 
      label: "Creator Hub", p: "hub", 
      sub: [
        { label: "Creator Hub", p: "hub", icon: "chart-arrow-up" },
        { label: "Free Creators accounts", p: "free-creators", icon: "diamond" }
      ]
    },
    { 
      label: "How-to-guides", 
      sub: [
        { label: "Getting started", p: "getting-started" },
        { label: "Earning on Luvlyfans", p: "earning" },
        { label: "Features", p: "features" }
      ]
    },
    { label: "Events", p: "events" }
  ];

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 1000,
        background: (scroll || menuOpen) ? (dark ? "rgba(10,10,10,0.98)" : "rgba(255,255,255,0.98)") : "transparent",
        backdropFilter: (scroll || menuOpen) ? "blur(20px)" : "none",
        borderBottom: (scroll || menuOpen) ? `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "1px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 5vw"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => { setPage("home"); setMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, zIndex: 1001 }}>
            <Logo dark={dark} />
          </button>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {navLinks.map(link => (
                <div 
                  key={link.label}
                  onMouseEnter={() => link.sub && (link.label === "Creator Hub" ? setHubOpen(true) : setGuidesOpen(true))}
                  onMouseLeave={() => link.sub && (link.label === "Creator Hub" ? setHubOpen(false) : setGuidesOpen(false))}
                  style={{ position: "relative" }}
                >
                  <button onClick={() => !link.sub && setPage(link.p)} style={{
                    background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8,
                    color: page === link.p ? "#7B51CC" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"),
                    fontSize: 14, fontWeight: 600, transition: "color 0.15s", display: "flex", alignItems: "center", gap: 5
                  }}>
                    {link.label} {link.sub && <span style={{ fontSize: 10, transform: (link.label === "Creator Hub" ? hubOpen : guidesOpen) ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>}
                  </button>

                  {link.sub && (
                    <div style={{
                      position: "absolute", top: "100%", left: 0, width: 240,
                      background: dark ? "rgba(18,18,18,0.98)" : "#fff",
                      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
                      borderRadius: 20, boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                      opacity: (link.label === "Creator Hub" ? hubOpen : guidesOpen) ? 1 : 0, 
                      transform: (link.label === "Creator Hub" ? hubOpen : guidesOpen) ? "translateY(5px)" : "translateY(15px)",
                      visibility: (link.label === "Creator Hub" ? hubOpen : guidesOpen) ? "visible" : "hidden", transition: "all 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
                      padding: "8px", zIndex: 1001, backdropFilter: "blur(20px)"
                    }}>
                      {link.sub.map(s => (
                        <button key={s.p} onClick={() => { setPage(s.p); setHubOpen(false); setGuidesOpen(false); window.scrollTo(0,0); }} style={{
                          display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 14px",
                          borderRadius: 12, fontSize: 13, fontWeight: 600, color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)",
                          background: "transparent", cursor: "pointer", transition: "all 0.15s", border: "none"
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.background = dark ? "rgba(123,81,204,0.15)" : "rgba(123,81,204,0.1)"; 
                          e.currentTarget.style.color = "#7B51CC"; 
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.background = "transparent"; 
                          e.currentTarget.style.color = dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.75)"; 
                        }}
                        >
                          {s.icon && <Icon name={s.icon} size={16} color="#7B51CC" />}
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "center", zIndex: 1001 }}>
            <button onClick={() => setDark(!dark)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: dark ? "#fbbf24" : "#6b7280", padding: "6px 10px", display: "flex", alignItems: "center" }}>
              <Icon name={dark ? "sun" : "moon"} size={20} color={dark ? "#fbbf24" : "#6b7280"} />
            </button>
            {!isMobile && <CTAButton size="sm" onClick={() => window.open('https://luvlyfans.com/', '_blank')}>Start Earning</CTAButton>}
            
            {/* Mobile Toggle */}
            {isMobile && (
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 40, height: 40, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5,
                  background: "none", border: "none", cursor: "pointer"
                }}
              >
                <div style={{ width: 22, height: 2, background: dark ? "#fff" : "#000", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }} />
                <div style={{ width: 22, height: 2, background: dark ? "#fff" : "#000", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
                <div style={{ width: 22, height: 2, background: dark ? "#fff" : "#000", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobile && (
          <div style={{
            position: "fixed", top: 64, left: 0, width: "100%", height: "calc(100vh - 64px)",
            background: dark ? "#0a0a0a" : "#fff",
            zIndex: 1000, padding: "20px 5vw",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            overflowY: "auto", display: "flex", flexDirection: "column", gap: 10
          }}>
            {navLinks.map(link => (
              <div key={link.label}>
                {link.sub ? (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "#7B51CC", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, paddingLeft: 12 }}>{link.label}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {link.sub.map(s => (
                        <button key={s.p} onClick={() => { setPage(s.p); setMenuOpen(false); window.scrollTo(0,0); }} style={{
                          width: "100%", textAlign: "left", padding: "14px 16px", borderRadius: 16,
                          background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                          border: "none", color: dark ? "#fff" : "#000", fontSize: 15, fontWeight: 600,
                          display: "flex", alignItems: "center", gap: 12
                        }}>
                          {s.icon && <span style={{ fontSize: 18 }}>{s.icon}</span>}
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button onClick={() => { setPage(link.p); setMenuOpen(false); window.scrollTo(0,0); }} style={{
                    width: "100%", textAlign: "left", padding: "16px", borderRadius: 16,
                    background: page === link.p ? (dark ? "rgba(123,81,204,0.15)" : "rgba(123,81,204,0.05)") : "transparent",
                    border: "none", color: page === link.p ? "#7B51CC" : (dark ? "#fff" : "#000"),
                    fontSize: 18, fontWeight: 700, marginBottom: 5
                  }}>{link.label}</button>
                )}
              </div>
            ))}
            <div style={{ marginTop: "auto", paddingBottom: 40 }}>
              <CTAButton block onClick={() => { setPage("home"); setMenuOpen(false); }}>Start Earning Now</CTAButton>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────

export function EventsPage({ dark, selectedEvent, setSelectedEvent }) {
  const isMobile = useIsMobile();

  // DETAIL VIEW FOR INTRODUCTION (Lustful Ladies & Perspective)
  if (selectedEvent === 4) {
    const lustfulPhotos = [
      { src: "/assets/creators/Loulalou.png", alt: "CEO Lou" },
      { src: "/assets/events/AVN.jpeg", alt: "Industry Networking" },
      { src: "/assets/creators/Zozo.png", alt: "Creator Community" },
      { src: "/assets/events/AVN2.jpeg", alt: "Atmosphere" }
    ];

    return (
      <div style={{ paddingBottom: isMobile ? 60 : 100 }}>
        <button onClick={() => { setSelectedEvent(null); window.scrollTo(0, 0); }} style={{ margin: isMobile ? "24px 5vw 0" : "24px 5vw", background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          ← Back to Events
        </button>

        {/* Hero */}
        <section style={{ padding: isMobile ? "60px 5vw" : "120px 5vw", background: dark ? "#0a0a0a" : "#fff", textAlign: "center", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.2, background: "url('/assets/creators/Loulalou.png') center/cover no-repeat", filter: "blur(40px) brightness(0.7)" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
            <Badge>EDITORIAL PERSPECTIVE</Badge>
            <h1 style={{ fontSize: "clamp(30px, 6vw, 64px)", fontWeight: 800, margin: "24px 0", lineHeight: 1.1, letterSpacing: "-0.02em" }}>Beyond the Screen: <span style={{ color: "#7B51CC" }}>Real-World Experiences</span></h1>
            <p style={{ fontSize: isMobile ? 18 : 20, opacity: 0.8, maxWidth: 700, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>Real-world creator spaces are the foundation of community.</p>
          </div>
        </section>

        {/* Hero Image */}
        <section style={{ maxWidth: 1100, margin: isMobile ? "0 auto 40px" : "-60px auto 80px", padding: "0 5vw", position: "relative", zIndex: 10 }}>
          <img src="/assets/creators/Loulalou.png" alt="CEO Lou - Lustful Events" style={{ width: "100%", height: isMobile ? 300 : 500, objectFit: "cover", borderRadius: isMobile ? 24 : 32, boxShadow: "0 40px 100px rgba(0,0,0,0.3)", border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}` }} />
        </section>

        {/* Content */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 5vw" }}>
          <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, marginBottom: 28, lineHeight: 1.2, fontFamily: "'Sora', sans-serif" }}>Organised by Lustful Events CEO Lou (@iamloulalouagain)</h2>
          
          <div style={{ fontSize: 17, lineHeight: 1.9, color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a" }}>
            <p>The creator space doesn’t just exist online. It also lives in real-world environments where people meet, talk, and understand the space they’re part of. The Lustful Ladies event was one of those environments. A place where creators came together in a more direct and personal setting.</p>
            <p>LuvlyFans was in attendance, and it gave us the opportunity to step outside the platform and see things from a different perspective.</p>

            <div style={{ margin: "40px 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
              {lustfulPhotos.map((p, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: "hidden", aspectRatio: isMobile ? "16/9" : "4/3", background: "#222" }}>
                  <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>What Lustful Ladies Represents</h3>
            <p>Lustful Ladies is part of a wider UK-based event series that brings together creators and audiences in a curated environment. What stood out wasn’t just the setting, but the mix of people. Creators at different stages. Different approaches. Different goals. All in one space. It’s a reminder that the creator world isn’t one-dimensional. It’s varied, and constantly evolving.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>Being in the Room Changes Perspective</h3>
            <p>Online, everything can feel separate. Profiles, posts, and numbers don’t always reflect the full picture. Being in the room changes that. You start to see how creators present themselves, how they connect, and how differently people approach the same space. It adds context that you don’t always get from a screen.</p>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Conversations That Matter</h3>
            <p>What stood out most were the conversations. Creators spoke openly about what’s working for them, where they feel stuck, what they expect from platforms, and how they’re building income over time. These weren’t polished answers. They were honest, practical, and grounded in real experience.</p>
            
            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>What We Learned</h3>
            <div style={{ background: dark ? "rgba(123,81,204,0.05)" : "rgba(123,81,204,0.03)", padding: isMobile ? "32px 24px" : "56px 48px", borderRadius: 24, border: `1px solid ${dark ? "rgba(123,81,204,0.15)" : "rgba(123,81,204,0.1)"}`, marginBottom: 40 }}>
              <div style={{ display: "grid", gap: 56 }}>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>Creators Are Looking for Stability</h4>
                  <p>A lot of the focus wasn’t on going viral. It was on consistency. Predictable income. Platforms that don’t change direction without warning. Creators are thinking more about long-term stability than short-term spikes.</p>
                </div>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>Visibility Is Still a Challenge</h4>
                  <p>Even strong creators mentioned the same issue. Getting seen is difficult. Not because they aren’t creating, but because discovery is unpredictable. It reinforced how important visibility tools are. Posting alone isn’t always enough.</p>
                </div>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>There Is No Single Path</h4>
                  <p>Every creator we spoke to was doing things differently. Some post frequently. Others focus on fewer, higher-quality updates. What works is often personal, not universal.</p>
                </div>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>Community Still Matters</h4>
                  <p>Even in a digital space, creators value connection. Being able to talk, share experiences, and learn from others stood out as something people don’t get enough of online.</p>
                </div>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>Clarity From Platforms Is Important</h4>
                  <p>Creators want clear rules, expectations, and earning structures. When things feel unclear, it slows people down. Simple and transparent systems build confidence.</p>
                </div>
                <div>
                  <h4 style={{ color: "#7B51CC", fontSize: 20, marginBottom: 16, fontWeight: 800 }}>Small Improvements Go a Long Way</h4>
                  <p>Not everything needs to be complex. Often it’s the smaller things that make the biggest difference: better onboarding, clear guidance, and simpler tools. These are the things creators notice and value.</p>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40, color: "#7B51CC" }}>Why This Matters for LuvlyFans</h3>
            <p>These aren’t abstract takeaways. They directly shape how we think about the platform. From improving visibility through features like Spotlight, to keeping things simple and clear, these conversations help us stay aligned with what creators actually need. Being present in these spaces helps us build with more awareness, not assumptions.</p>
            
            <h3 style={{ fontSize: 28, fontWeight: 800, marginTop: 40 }}>Final Thoughts</h3>
            <p>Events like Lustful Ladies are a reminder that the creator world is built on people first. The platforms, the features, and the numbers all come after that. What matters is understanding the space and the people within it.</p>
            
            <p style={{ fontWeight: 800, fontStyle: "italic", fontSize: 22, marginTop: 48, color: "#7B51CC" }}>“We’re glad we were there, and we’ll continue to listen, learn, and build with that in mind.”</p>
          </div>
        </section>
      </div>
    );
  }

  if (selectedEvent === 1) {
    // AVN Detail View (Previous content)
    const avnPhotos = [
      { src: "/assets/creators/Quietlyvae.avn1.jpeg", alt: "QuietlyVae at AVN" },
      { src: "/assets/events/AVN2.jpeg", alt: "Industry Networking" },
      { src: "/assets/events/Quietlyvae.avn2.jpeg", alt: "Red Carpet Visibility" },
      { src: "/assets/events/Quietlyvae.avn3.jpeg", alt: "Creator Community" }
    ];
    
    return (
      <div style={{ paddingBottom: isMobile ? 60 : 100 }}>
        <button onClick={() => { setSelectedEvent(null); window.scrollTo(0, 0); }} style={{ margin: isMobile ? "24px 5vw 0" : "24px 5vw", background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          ← Back to Events
        </button>

        {/* Hero */}
        <section style={{ padding: isMobile ? "60px 5vw" : "120px 5vw", background: dark ? "#0a0a0a" : "#fff", textAlign: "center", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.2, background: "url('/assets/events/Quietlyvae.avn.jpeg') center/cover no-repeat", filter: "blur(40px) brightness(0.7)" }} />
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
            <Badge>2026 AVN · LAS VEGAS</Badge>
            <h1 style={{ fontSize: "clamp(30px, 6vw, 64px)", fontWeight: 800, margin: "24px 0", lineHeight: 1.1, letterSpacing: "-0.03em" }}>LuvlyFans @ the <span style={{ color: "#7B51CC" }}>AVN Awards</span></h1>
            <p style={{ fontSize: isMobile ? 18 : 20, opacity: 0.8, maxWidth: 700, margin: "0 auto", lineHeight: 1.6, fontWeight: 500 }}>The Future of Creator Community</p>
          </div>
        </section>

        {/* Hero Image */}
        <section style={{ maxWidth: 1100, margin: isMobile ? "0 auto 40px" : "-60px auto 80px", padding: "0 5vw", position: "relative", zIndex: 10 }}>
          <img src="/assets/events/Quietlyvae.avn.jpeg" alt="LuvlyFans @ AVN" style={{ width: "100%", height: isMobile ? 300 : 500, objectFit: "cover", borderRadius: isMobile ? 24 : 32, boxShadow: "0 40px 100px rgba(0,0,0,0.3)", border: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "#fff"}` }} />
        </section>

        {/* Content */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 5vw" }}>
          <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 800, marginBottom: 28, lineHeight: 1.25 }}>QuietlyVae Represents the Future</h2>
          <div style={{ fontSize: 17, lineHeight: 1.9, color: dark ? "rgba(255,255,255,0.8)" : "#2a2a2a" }}>
            <p>Participating in industry conversations that continue to shape the future of creator-led platforms.</p>
            
            <div style={{ margin: "40px 0", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
              {avnPhotos.map((p, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: "hidden", aspectRatio: isMobile ? "16/9" : "auto", background: "#222" }}>
                  <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            
            <p>AVN brings together top creators and innovators. Its presence reflects our commitment to creator success.</p>
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
          <h1 style={{ fontSize: isMobile ? 32 : 48, fontWeight: 800, marginTop: 16 }}>Creators on the Move</h1>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
          {EVENTS.map(event => (
            <div 
              key={event.id}
              onClick={() => { if([1, 4].includes(event.id)) setSelectedEvent(event.id); window.scrollTo(0,0); }}
              style={{
                borderRadius: 24, overflow: "hidden", 
                background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                transform: "translateY(0)"
              }}
              onMouseEnter={(e) => {
                if(!isMobile) {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = dark ? "0 40px 80px rgba(0,0,0,0.6)" : "0 30px 60px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ height: isMobile ? 200 : 240, overflow: "hidden" }}>
                <img src={event.thumbnail} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: isMobile ? 24 : 32 }}>
                <Badge color="#7B51CC">{event.type}</Badge>
                <h3 style={{ fontSize: 24, fontWeight: 800, margin: "16px 0", color: dark ? "#fff" : "#111", lineHeight: 1.25 }}>{event.title}</h3>
                <p style={{ fontSize: 15, opacity: 0.6, lineHeight: 1.6 }}>{event.excerpt}</p>
                <div style={{ marginTop: 24, color: "#7B51CC", fontWeight: 700, fontSize: 13 }}>Read Recap →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export function HomePage({ dark, onRead, setPage }) {
  const isMobile = useIsMobile();
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [heroRef, heroInView] = useInView(0.05);

  const filtered = ARTICLES.filter(a => {
    const matchCat = cat === "All" || a.category === cat;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const featured = ARTICLES.filter(a => a.featured);
  const trending = ARTICLES.filter(a => a.trending);
  const catColors = { "Make Money": "#059669", "Growth": "#D946EF", "Guides": "#0284C7" };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      {/* Hero — outer padding matches nav (5vw sides), inner maxWidth 1200 matches nav */}
      <section ref={heroRef} style={{ padding: "80px 5vw 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 60% 0%, rgba(123,81,204,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 50%)" : "radial-gradient(ellipse at 60% 0%, rgba(123,81,204,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* maxWidth 1200 + auto margin = same as navbar container */}
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Hero text block — narrower for readability, but left-aligned with container */}
          <div style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s ease" }}>
            <div style={{ marginBottom: 32 }}>
              <Badge><Icon name="fire" size={14} color="#fff" style={{ marginRight: 6 }} /> Creator Education Platform</Badge>
            </div>
            <h1 style={{ margin: "0 0 20px", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.1, fontFamily: "'Sora', sans-serif", color: dark ? "#fff" : "#0a0a0a", maxWidth: 760 }}>
              Grow. Monetize.{" "}
              <span style={{ background: "linear-gradient(135deg, #7B51CC, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Win.</span>
            </h1>
            <p style={{ margin: "0 0 32px", fontSize: 20, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7, maxWidth: 600 }}>
              The only creator education hub built by people who've actually made it. Strategies, playbooks, and insider tips to help you earn more faster.
            </p>
            <div style={{ marginBottom: 48 }}>
              <CTAButton size="lg" onClick={() => setPage("hub")}>Explore the Creator Hub</CTAButton>
            </div>

            {/* Asymmetrical Featured Grid — uses full 1200px container width */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", 
              gap: 20, 
              marginBottom: 48
            }}>
              {/* Left Column — Fortune Cookie + Creator Spotlight */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Large Card: Creator Habits Article */}
                <div style={{ 
                  flex: "0 0 auto",
                  height: isMobile ? 280 : 380, 
                  borderRadius: 24, 
                  overflow: "hidden", 
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                onClick={() => { const a = ARTICLES.find(a => a.slug === "creator-habits"); if(a) { onRead(a); window.scrollTo(0,0); } }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                  <img src="/assets/promotions/fortune_cookie.png" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ 
                    position: "absolute", inset: 0, 
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    display: "flex", alignItems: "flex-end", padding: isMobile ? 24 : 36
                  }}>
                    <h3 style={{ color: "#fff", fontSize: isMobile ? 18 : 26, fontWeight: 900, margin: 0, lineHeight: 1.2, fontFamily: "'Sora', sans-serif" }}>
                      5 Habits That Separate Creators Who Earn From Those Who Don't
                    </h3>
                  </div>
                </div>

                {/* Bottom Card: Creator Spotlight — full bleed photo + title overlay */}
                <div style={{ 
                  flex: "0 0 auto",
                  height: isMobile ? 280 : 380,
                  borderRadius: 24,
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }} 
                onClick={() => { const a = ARTICLES.find(item => item.slug === "luvlyfans-standard"); if(a) { onRead(a); window.scrollTo(0,0); } }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"} 
                onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                  {/* Full-bleed background photo */}
                  <img 
                    src="/assets/promotions/spotlight_Image.png" 
                    alt="The LuvlyFans Standard" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }} 
                  />
                  {/* Dark gradient overlay — heavier at bottom for readability */}
                  <div style={{ 
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.1) 100%)"
                  }} />

                  {/* Title and CTA overlay */}
                  <div style={{ 
                    position: "absolute", bottom: isMobile ? 24 : 36, left: isMobile ? 24 : 36, right: isMobile ? 24 : 36
                  }}>
                    <h3 style={{ color: "#fff", fontSize: isMobile ? 22 : 32, fontWeight: 900, margin: 0, lineHeight: 1.1, fontFamily: "'Sora', sans-serif", maxWidth: 450 }}>
                      The LuvlyFans Standard: Why the Top 1% are Switching
                    </h3>
                    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.8 }}>Read More</span>
                      <div style={{ width: 30, height: 2, background: "#7B51CC" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column — Creator photo collage cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, height: isMobile ? "auto" : 776 }}>
                {/* Card 1: Free Accounts */}
                <div style={{ 
                  height: isMobile ? 280 : 380, borderRadius: 24, overflow: "hidden", position: "relative", cursor: "pointer",
                  background: "transparent",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }} onClick={() => setPage("free-creators")} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                  <img
                    src="/assets/promotions/Free accounts.png"
                    alt="Free LuvlyFans Accounts to Follow"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                  {/* Overlay with title */}
                  <div style={{ 
                    position: "absolute", inset: 0, 
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 20px 28px"
                  }}>
                    <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0, lineHeight: 1.3, fontFamily: "'Sora', sans-serif", textAlign: "center", letterSpacing: "-0.01em" }}>
                      Free LuvlyFans Accounts to Follow in {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}
                    </h4>
                  </div>
                </div>

                {/* Card 2: Rising Stars */}
                <div style={{ 
                  height: isMobile ? 280 : 380, borderRadius: 24, overflow: "hidden", position: "relative", cursor: "pointer",
                  background: "transparent",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }} onClick={() => setPage("free")} onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                  <img 
                    src="/assets/promotions/Rising_star.png" 
                    alt="Rising Stars on LuvlyFans" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} 
                  />
                  <div style={{ 
                    position: "absolute", inset: 0, 
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 65%)",
                    display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 20px 28px"
                  }}>
                    <h4 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0, lineHeight: 1.3, fontFamily: "'Sora', sans-serif", textAlign: "center", letterSpacing: "-0.01em" }}>
                      Rising Stars on LuvlyFans
                      <span style={{ display: "block", fontSize: 18, fontWeight: 500, opacity: 0.75, marginTop: 4, letterSpacing: "0.02em" }}>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured article mini-cards — full container width */}
            <div style={{ opacity: heroInView ? 1 : 0, transition: "all 0.9s ease 0.4s", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 16, marginBottom: 0 }}>
              {featured.slice(0, 2).map((a) => (
                <div key={a.id} onClick={() => onRead(a)} style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: 16, padding: "20px 24px", cursor: "pointer",
                  boxShadow: dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  if(!dark) e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  if(!dark) e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: catColors[a.category] }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: catColors[a.category], textTransform: "uppercase", letterSpacing: "0.08em" }}>{a.category}</span>
                    <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginLeft: "auto" }}>{a.readTime}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", lineHeight: 1.4, fontFamily: "'Sora', sans-serif" }}>{a.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles section — outer 5vw + inner maxWidth 1200 matches nav pattern exactly */}
      <div style={{ padding: "0 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 60, paddingBottom: 100 }}>

        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>
            {cat === "All" ? "Featured Articles" : `${cat} Articles`}
          </h2>
          <div style={{ flex: 1, height: 1, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, justifyContent: "flex-start" }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: "9px 20px", borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: "pointer",
              background: cat === c ? "#7B51CC" : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
              color: cat === c ? "#fff" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"),
              border: `1.5px solid ${cat === c ? "#7B51CC" : (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}`,
              transition: "all 0.18s",
              fontFamily: "'Sora', sans-serif"
            }}>{c}</button>
          ))}
        </div>

        {cat === "All" && !search && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 60 }}>
              {featured.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} featured />)}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <Icon name="fire" size={24} color="#7B51CC" />
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>Trending Now</h2>
              <div style={{ flex: 1, height: 1, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 80 }}>
              {trending.map((a, i) => (
                <div key={a.id} onClick={() => onRead(a)} style={{
                  background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: 20, padding: "24px 32px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 32, transition: "all 0.18s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(5px)";
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "#fff";
                }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", minWidth: 60, fontFamily: "monospace" }}>0{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 12 }}>
                      <Badge color={catColors[a.category]}>{a.category}</Badge>
                    </div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif", lineHeight: 1.3 }}>{a.title}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 4 }}>{a.readTime} read</div>
                    <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {(cat !== "All" || search) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 60 }}>
            {filtered.length ? filtered.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} />) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontSize: 15 }}>No articles found. Try a different search.</div>
            )}
          </div>
        )}

        <div style={{ marginBottom: 80 }}>
          <EmailCapture dark={dark} />
        </div>
        </div>
      </div>
    </div>
  );
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────

export function ArticlePage({ article, dark, onBack, onRead }) {
    const isMobile = useIsMobile();
    const progress = useScrollProgress();
    const others = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
    const catColors = { "Make Money": "#7B51CC", "Growth": "#8b5cf6", "Guides": "#0ea5e9" };
    const color = catColors[article.category] || "#7B51CC";
  
    const CONTENT = {
      "promote-your-profile": `
        <p>Promoting your profile is part of being a creator.</p>
        <p>It’s not always the most enjoyable part, but it’s what helps people find you, understand what you offer, and decide whether they want to support you.</p>
        <p>Whether you’re just starting out or trying to grow steadily, promotion works best when it’s simple, consistent, and clear.</p>

        <div style="margin: 32px 0; border-radius: 16px; overflow: hidden; background: rgba(123,81,204,0.05); border: 2px dashed rgba(123,81,204,0.2); min-height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #7B51CC; text-align: center; padding: 20px;">
          <div style="font-size: 32px; margin-bottom: 12px; color: #7B51CC;">#</div>
          <div style="font-weight: 700; font-size: 16px;">Image Placeholder: Social Bio Example</div>
          <div style="font-size: 13px; opacity: 0.7; max-width: 300px; margin-top: 8px;">Recommended: A screenshot showing a clean Instagram or X bio with your LuvlyFans link.</div>
        </div>

        <h2>Start With Your Existing Platforms</h2>
        <p>The easiest place to begin is where people already follow you. This might be Instagram, X (Twitter), TikTok, Reddit, or any platform where you already post.</p>
        <p>Make sure your LuvlyFans link is easy to find. Adding it to your bio is often enough to start. You don’t need to constantly push it. Just make it visible.</p>

        <h2>Share What People Can Expect</h2>
        <p>People are more likely to subscribe when they understand what they’re getting. When posting about your LuvlyFans profile:</p>
        <ul>
          <li>Share short previews or clips</li>
          <li>Give a sense of your content style</li>
          <li>Keep it simple and honest</li>
        </ul>
        <p>You’re not trying to convince everyone. You’re helping the right people decide.</p>

        <div style="margin: 32px 0; border-radius: 16px; overflow: hidden; background: rgba(123,81,204,0.05); border: 2px dashed rgba(123,81,204,0.2); min-height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #7B51CC; text-align: center; padding: 20px;">
          <div style="font-size: 32px; margin-bottom: 12px; color: #7B51CC;">@</div>
          <div style="font-weight: 700; font-size: 16px;">Image Placeholder: Content Preview</div>
          <div style="font-size: 13px; opacity: 0.7; max-width: 300px; margin-top: 8px;">Recommended: A blurred or watermarked preview of premium content to entice subscribers.</div>
        </div>

        <h2>Use Platforms Like Reddit and Forums Carefully</h2>
        <p>Discussion platforms can help you reach new audiences, especially when your content fits the space. If you use platforms like Reddit, post in relevant communities, follow the rules of each space, and avoid repetitive posting.</p>
        <p>People respond better when content feels natural, not forced.</p>

        <h2>Keep Your Links Organised</h2>
        <p>If you’re active on multiple platforms, it helps to keep everything in one place. Many creators use a simple landing page that includes your LuvlyFans profile, social media accounts, and any other relevant links. This makes it easier for people to find you without confusion.</p>

        <h2>Collaborate With Other Creators</h2>
        <p>Working with other creators can help you reach new audiences. This might include creating content together, mentioning each other, or posting at similar times. Collaboration works best when it feels natural and benefits both sides.</p>

        <h2>Protect Your Content</h2>
        <p>When sharing previews outside LuvlyFans, it’s worth thinking about content protection. Adding a watermark or keeping content slightly limited helps protect your work and reduce misuse. You don’t need to overdo it, just be aware.</p>

        <h2>Use Promotions Thoughtfully</h2>
        <p>If you offer promotions such as discounts, limited offers, or special access, keep them clear and occasional. Too many promotions can reduce their impact. Used carefully, they can help new fans take the first step.</p>

        <h2>Grow Through Referrals</h2>
        <p>As your presence grows, other creators may join through you. Sharing your referral link can help new creators get started and give you a small additional income stream. This works best when it happens naturally, not as pressure.</p>

        <h2>Don’t Neglect Your Existing Fans</h2>
        <p>It’s easy to focus on getting new subscribers. But long-term growth usually comes from the people who are already supporting you. Consistent content, clear communication, and respect go a long way in keeping subscribers over time.</p>

        <blockquote>Promotion brings people in. Consistency keeps them.</blockquote>

        <h2>Final Thoughts</h2>
        <p>There isn’t a single way to promote your profile. What works for one creator may not work for another. The most reliable approach is to stay consistent, keep things clear, and focus on building something people want to come back to.</p>
        <p>At LuvlyFans, growth is not about rushing. It’s about building something steady over time.</p>
      `,
      "building-consistent-monthly-income": `
        <p>Making money as a creator is not the same as making money consistently.</p>
        <p>Many creators have moments where income spikes. A post performs well. A promotion works. A burst of attention turns into short-term sales. The harder part is turning those moments into something reliable that shows up month after month.</p>
        <p>Creators who earn consistently tend to focus less on quick wins and more on habits, structure, and trust.</p>

        <h2>Consistency Starts With Expectations</h2>
        <p>One of the biggest factors in consistent income is clarity. Creators who do well over time are usually clear about what kind of content they share, how often they post, and what subscribers can realistically expect.</p>
        <p>This does not mean everything has to be rigid. It means avoiding surprises. When people know what they are subscribing to, they are more likely to stay. Unclear expectations often lead to short subscriptions and frustration on both sides.</p>

        <h2>Turning Attention Into Ongoing Support</h2>
        <p>Attention matters. Virality matters. Growth moments matter. What separates creators who earn consistently from those who do not is what happens next.</p>
        <p>Creators who build monthly income tend to:</p>
        <ul>
          <li>Direct new attention toward subscriptions</li>
          <li>Give people a reason to stay, not just click</li>
          <li>Focus on retaining subscribers after growth spikes</li>
        </ul>
        <p>Attention brings people in. Retention is what creates stability.</p>

        <h2>Building a Subscription Base Slowly</h2>
        <p>Consistent income does not always start big. Many creators build a subscription base gradually. A few subscribers turn into a few more. Over time, that base becomes reliable monthly support. Even modest numbers can make a difference when subscribers stay for several months.</p>
        <blockquote>Slow growth often lasts longer than fast growth with no foundation.</blockquote>

        <h2>Posting Regularly, Not Constantly</h2>
        <p>Consistency does not mean posting all the time. Creators who last usually find a rhythm they can maintain. That might be a few posts a week or a set schedule that works around other commitments. What matters most is that subscribers know when to expect updates.</p>
        <p>Posting too often can lead to burnout. Posting too little without communication can lead to cancellations. Finding balance is key.</p>

        <h2>Communicating With Subscribers</h2>
        <p>Creators who earn consistently tend to communicate clearly. This might include letting subscribers know when content is coming, explaining changes in schedule, and being open about breaks or slow periods.</p>
        <p>Good communication builds trust. Trust keeps people subscribed, even during quieter periods.</p>

        <h2>Using One-Off Content Carefully</h2>
        <p>One-off content such as pay-per-view posts can increase income, especially after growth moments. Creators who rely on consistent monthly income usually use these thoughtfully. They add to subscriptions rather than replacing them.</p>

        <h2>Looking After Energy and Motivation</h2>
        <p>Consistency is not just about strategy. It is also about wellbeing. Sustainable income comes from work that is sustainable to do. Creators who burn out struggle to maintain income, no matter how strong their following is. Those who last tend to pace themselves and avoid comparison.</p>

        <h2>Final Thoughts</h2>
        <p>Consistent monthly income is built through clarity, patience, and trust. Attention helps, but long-term income comes from retaining supporters and building habits that can be maintained over time.</p>
      `,
      "sustainable-monthly-income": `
        <p>There is a lot of noise around what it takes to make money as a creator.</p>
        <p>Some people talk about going viral. Others say consistency is everything. The truth is more balanced than that. Most creators who earn well over time understand how to use attention when it comes, and how to build something stable once it does.</p>
        <p>Sustainable income is rarely about one thing. It is about timing, effort, and what you do after people notice you.</p>

        <h2>Understanding Virality and What Comes After</h2>
        <p>Going viral matters. Virality is often how creators break through in the first place. It brings attention, reach, and momentum. It is also one of the reasons a small percentage of creators rise to the very top. The top one percent did not get there by accident. In many cases, a viral moment played a role.</p>
        <blockquote>Virality opens the door. Sustainability is what keeps it open.</blockquote>
        <p>The issue is not virality itself. The issue is relying on it alone. A post can perform extremely well and then fade just as quickly. When income depends only on moments like that, things can feel unstable. What works one week might not work the next.</p>
        <p>Creators who build long-term income usually treat virality as a starting point. They focus on turning attention into something more reliable by giving people a reason to stay, subscribe, and come back.</p>

        <h2>Why Monthly Income Makes a Difference</h2>
        <p>Monthly income gives creators breathing room. It allows you to plan, to slow down when needed, and to create without constant pressure. Even a relatively small but steady income can be more valuable than occasional spikes that disappear just as quickly as they arrive.</p>
        <p>For many creators, subscriptions are not about making a lot of money straight away. They are about building a base that grows over time.</p>

        <h2>Consistency Without Burning Out</h2>
        <p>Consistency matters, but it does not mean doing everything all the time.</p>
        <ul>
          <li>Set a schedule you can realistically maintain</li>
          <li>Communicate clearly with subscribers</li>
          <li>Focus on quality rather than volume</li>
          <li>Allow yourself time off</li>
        </ul>
        <p>Trying to post constantly or be available at all hours often leads to burnout. Consistency works best when it fits into your life, not when it takes over.</p>

        <h2>Subscriptions and One-Off Content</h2>
        <p>Subscriptions work best as a foundation. They give creators predictable income and give fans clarity about what they are supporting. One-off content, such as pay-per-view posts, can work well alongside subscriptions, especially after moments of increased attention.</p>
        <p>Creators who build sustainably tend to use one-off content as an addition, not as their only source of income.</p>

        <h2>Turning Attention Into Loyalty</h2>
        <p>A large following does not always mean strong income. Creators with fewer but more engaged subscribers often earn more than those with large audiences that do not convert. Loyalty comes from showing up consistently, being clear about what you offer, and respecting your own boundaries.</p>

        <h2>Final Thoughts</h2>
        <p>Sustainable monthly income is built by combining opportunity with consistency. Virality can create momentum. Consistency and trust are what turn that momentum into something lasting. There is no single path, and success looks different for everyone.</p>
      `,
      "build-your-fanbase": `
        <p>Building a fanbase takes time.</p>
        <p>It doesn’t happen overnight, and it doesn’t come from one post or one moment. Most creators who grow steadily do so through a combination of consistency, clarity, and how they treat the people already supporting them.</p>
        <p>Whether you’re just starting out or looking to grow what you already have, building a fanbase is less about quick wins and more about what you do repeatedly.</p>

        <h2>Followers and Subscribers Are Not the Same</h2>
        <p>It’s easy to assume that followers and subscribers behave the same way, but they don’t.</p>
        <p>Followers usually discover you through:</p>
        <ul>
          <li>Social media</li>
          <li>Shared content</li>
          <li>Recommendations or reposts</li>
        </ul>

        <p>Subscribers make a different decision. They:</p>
        <ul>
          <li>Visit your profile intentionally</li>
          <li>Choose to subscribe</li>
          <li>Continue paying or staying based on their experience</li>
        </ul>

        <p>That difference matters. Growth is not just about getting attention. It’s about giving people a reason to stay.</p>

        <h2>Consistency Builds Trust</h2>
        <p>Subscribers stay when they know what to expect. This doesn’t mean posting constantly. It means posting in a way that feels reliable.</p>
        <p>That might look like:</p>
        <ul>
          <li>A few posts each week</li>
          <li>A regular rhythm that fits your schedule</li>
          <li>Clear communication if things change</li>
        </ul>
        <p>When people feel like they understand your pace, they’re more likely to stay subscribed.</p>

        <h2>Leave Room for Natural Moments</h2>
        <p>While consistency matters, everything doesn’t need to feel planned. Alongside your regular content, it helps to include:</p>
        <ul>
          <li>Smaller updates</li>
          <li>Behind-the-scenes moments</li>
          <li>Quick thoughts or reactions</li>
        </ul>
        <p>These don’t need to be perfect. They help your page feel active and real.</p>

        <h2>Collaborate With Other Creators</h2>
        <p>Working with other creators can introduce your content to new audiences. This might include:</p>
        <ul>
          <li>Creating content together</li>
          <li>Mentioning or tagging each other</li>
          <li>Posting around the same time</li>
        </ul>
        <p>Collaboration works best when it feels natural and relevant to both creators.</p>

        <h2>Engage With the People Who Support You</h2>
        <p>Building a fanbase is not just about attracting people. It’s about keeping them. Simple actions make a difference:</p>
        <ul>
          <li>Replying to messages when you can</li>
          <li>Acknowledging comments</li>
          <li>Making new subscribers feel welcome</li>
        </ul>
        <p>Many creators set up a welcome message so new subscribers feel recognised straight away. Small things like this often shape how long someone stays.</p>

        <h2>Let Your Fans Be Part of the Process</h2>
        <p>People are more likely to stay when they feel involved. You can:</p>
        <ul>
          <li>Ask what they’d like to see more of</li>
          <li>Pay attention to what gets the best response</li>
          <li>Adjust your content over time</li>
        </ul>
        <p>This doesn’t mean doing everything people ask for. It means listening and responding where it makes sense.</p>

        <h2>Focus on Retention, Not Just Growth</h2>
        <p>It’s easy to focus on getting new subscribers. But long-term growth usually comes from the people who are already there. If your existing subscribers are happy, they stay longer and sometimes recommend you to others.</p>
        <p>A smaller, loyal fanbase is often more valuable than a large, inconsistent one.</p>

        <blockquote>Building a fanbase is not about doing everything at once. Consistency and respect are the foundation.</blockquote>

        <h2>Final Thoughts</h2>
        <p>Building a fanbase is not about doing everything at once. It’s about showing up consistently, communicating clearly, and treating your audience with respect. Growth tends to follow when those things are in place.</p>
        <p>At LuvlyFans, the focus is on helping creators build fanbases that last, not just ones that grow quickly.</p>
      `,
      "creator-habits": `
        <p>Most creators start the same way.</p>
        <p>They sign up, post a few times, wait for income to arrive — and wonder why it doesn't. The truth is that earning consistently on LuvlyFans isn't about luck, follower count, or even talent alone. It's about habit.</p>
        <p>The creators who build real, reliable income — month after month — tend to do five things that most others skip entirely.</p>

        <h2>1. They Treat Their Page Like a Business, Not a Side Project</h2>
        <p>The mindset shift is everything. Creators who earn consistently don't log in when they feel like it — they show up the same way a business owner manages their shop.</p>
        <p>That means:</p>
        <ul>
          <li>A profile bio that clearly describes what subscribers get</li>
          <li>Pricing that reflects the value of the content</li>
          <li>A posting schedule they stick to — not just when inspiration strikes</li>
        </ul>
        <p>You don't need to be everywhere. You need to be reliable. When a new fan lands on your page, they should immediately understand what you're about and feel confident that subscribing is worth it.</p>
        <blockquote>Your profile is your storefront. If the window display is unclear, people walk past.</blockquote>

        <h2>2. They Post on a Schedule — Even When They Don't Feel Like It</h2>
        <p>Consistency beats brilliance almost every time. A creator who posts solid content three times a week will outperform one who posts amazing content once a month and then disappears.</p>
        <p>Subscribers cancel when they feel forgotten. They stay when they feel like something is always waiting for them.</p>
        <p>The creators who build real monthly income typically:</p>
        <ul>
          <li>Pick a posting cadence they can actually maintain</li>
          <li>Batch create content in advance so they're never scrambling</li>
          <li>Communicate openly if life gets in the way</li>
        </ul>
        <p>You don't need to post daily. You need to post predictably.</p>

        <h2>3. They Actually Talk to Their Subscribers</h2>
        <p>This one is consistently underestimated. The creators who retain subscribers longest are almost always the ones who engage personally — even briefly.</p>
        <p>A welcome message when someone subscribes. A reply to a comment. A check-in DM after a week of silence. These small moments build loyalty that no algorithm can replicate.</p>
        <p>It doesn't have to be time-consuming. Even a few minutes a day spent genuinely engaging creates a relationship feel that makes people want to stay — and spend.</p>
        <blockquote>Subscribers who feel seen are subscribers who stick around.</blockquote>

        <h2>4. They Track What Actually Performs</h2>
        <p>Creators who guess what their audience wants stay stuck. Creators who pay attention to data grow.</p>
        <p>You don't need to be a data scientist. You just need to notice:</p>
        <ul>
          <li>Which types of content get the most engagement?</li>
          <li>At what times do your subscribers respond most?</li>
          <li>Which posts led to new subscriptions or tips?</li>
        </ul>
        <p>Over time, patterns emerge. Double down on what works. Don't waste energy creating content that consistently underperforms — no matter how much effort went into it.</p>

        <h2>5. They Protect Their Energy Like It's Their Most Valuable Asset</h2>
        <p>Content creation is a long game. Burnout is one of the most common reasons creators stop — not lack of talent, not lack of audience. Just running out of energy.</p>
        <p>The creators who last set boundaries:</p>
        <ul>
          <li>They don't create content during every waking hour</li>
          <li>They take breaks without guilt and communicate with their audience about it</li>
          <li>They know what kind of content drains them and limit it</li>
        </ul>
        <p>Sustainable income requires a sustainable pace. The hustle-every-day approach works for a while — until it doesn't. Building rest into your rhythm isn't a weakness. It's strategy.</p>
        <blockquote>You can't pour from an empty cup. Protect your energy, and your content will show it.</blockquote>

        <h2>The Common Thread</h2>
        <p>None of these habits are glamorous. There's no secret hack here. What they share is simple: they're all about showing up — consistently, intentionally, and with longevity in mind.</p>
        <p>The creators who earn most reliably on LuvlyFans aren't always the most talented or the most followed. They're the ones who decided to run their page like a business, engage like a human, and pace themselves like a professional.</p>
        <p>Start with one habit. Build from there. Income follows consistency — not the other way around.</p>
      `,
      "luvlyfans-standard": `
        <p>The creator economy is shifting.</p>
        <p>For too long, creators have been at the mercy of platforms that treat them as an afterthought. Hidden fees, delayed payouts, and non-existent support have become the industry norm. At LuvlyFans, we’re setting a new standard.</p>

        <h2>Fast Payouts: Your Money, When You Earn It</h2>
        <p>In a world that moves this fast, waiting weeks for your hard-earned money is unacceptable. The LuvlyFans Standard means you get access to your funds in as little as 24 hours. Whether you’re reinvesting in your brand or just living your life, you shouldn’t have to wait for the platform to catch up.</p>

        <h2>Real Human Support: No More Chatbots</h2>
        <p>When you have a question about your business, you deserve a human answer. We’ve eliminated the frustration of automated loops. Every creator on LuvlyFans has access to dedicated human support. We’re here to solve problems, not clear tickets.</p>

        <h2>Built-in Growth: Beyond Your Follower Count</h2>
        <p>Most platforms leave discovery entirely up to you. If you don't have a massive external following, you don't grow. LuvlyFans is the only platform with built-in discovery tools like Spotlight, designed to get your content in front of thousands of new fans who are already on the platform looking for creators like you.</p>

        <blockquote>"LuvlyFans is the first platform that feels like it's actually on my side. The growth tools alone changed everything for my career." — Top 1% Creator</blockquote>

        <h2>A Community Built on Trust</h2>
        <p>The transition to LuvlyFans isn't just about better tools; it's about a better culture. We believe that when creators are supported, the entire ecosystem thrives. Join the thousands of creators who are making the switch to a platform that measures its success by yours.</p>
      `
    };

    const body = CONTENT[article.slug] || `
      <p>This is a placeholder for the full article content. In a production environment, this would be fetched from a CMS based on the slug: <strong>${article.slug}</strong>.</p>
      <p>LuvlyFans is dedicated to providing creators with the best tools and educational resources to grow their digital business.</p>
    `;
  
    return (
      <div style={{ overflowX: "hidden", width: "100%" }}>
        {/* Progress Bar */}
        <div style={{ position: "fixed", top: 0, left: 0, width: `${progress * 100}%`, height: 3, background: "linear-gradient(90deg, #7B51CC, #8b5cf6)", zIndex: 1000, transition: "width 0.1s" }} />
  
        {/* Hero */}
        <div style={{ padding: "48px 5vw 0", maxWidth: 1200, margin: "0 auto" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontSize: 13, fontWeight: 600, padding: "0 0 24px", display: "flex", alignItems: "center", gap: 6 }}>← Back to Blog</button>
        </div>
  
        <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 5vw 80px" }}>
          <div style={{ marginBottom: 32, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <Badge color={color}>{article.category}</Badge>
            {article.trending && <Badge color="#f59e0b"><Icon name="fire" size={12} color="#fff" style={{ marginRight: 4 }} /> Trending</Badge>}
            <span style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{article.readTime} read · {article.date}</span>
          </div>
  
          <h1 style={{ margin: "0 0 20px", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.15, fontFamily: "'Sora', sans-serif", color: dark ? "#fff" : "#0a0a0a" }}>
            {article.title}
          </h1>
  
          <p style={{ margin: "0 0 28px", fontSize: 18, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7 }}>{article.excerpt}</p>
  
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderRadius: 14, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, marginBottom: 40 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, color: dark ? "#fff" : "#0f0f0f" }}>By {article.author}</div>
              <div style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}>{article.authorRole} · {article.readTime} read</div>
            </div>
          </div>
  
          {/* Hero Image / Banner */}
          <div style={{ 
            height: isMobile ? 240 : 400, 
            borderRadius: 18, 
            background: `linear-gradient(135deg, ${article.gradient.replace("from-", "").replace(" to-", ", ").split(",").map(c => { const map = { "rose-500": "#7B51CC", "pink-600": "#db2777", "amber-500": "#f59e0b", "orange-500": "#f97316", "violet-500": "#8b5cf6", "purple-600": "#9333ea", "cyan-500": "#06b6d4", "blue-600": "#2563eb", "emerald-500": "#10b981", "teal-600": "#0d9488", "fuchsia-500": "#d946ef", "rose-600": "#613db7" }; return map[c.trim()] || "#7B51CC"; }).join(", ")})`, 
            marginBottom: 40, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {article.thumbnail ? (
              <img src={article.thumbnail} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ textAlign: "center", color: "#fff" }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}><Icon name="chart-line" size={48} color="#fff" /></div>
                <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.9 }}>Visual guide coming soon</div>
              </div>
            )}
          </div>
  
          {/* Article body */}
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            style={{ fontSize: 17, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.72)" }}
          />
  
          {/* Inline CTA */}
          <div style={{ margin: "40px 0", padding: "32px", background: dark ? "rgba(123,81,204,0.08)" : "rgba(123,81,204,0.05)", border: "1.5px solid rgba(123,81,204,0.2)", borderRadius: 18, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#7B51CC", textTransform: "uppercase", marginBottom: 8 }}>Ready to Apply This?</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>Start Your LuvlyFans Page Today</h3>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>Join 200,000+ creators earning on the platform built for growth. Setup takes under 10 minutes.</p>
            <CTAButton size="lg" onClick={() => window.open('https://luvlyfans.com/', '_blank')}>Create My Page — It's Free</CTAButton>
          </div>
  
          {/* Related */}
          <div style={{ marginTop: 60 }}>
            <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>Keep Reading</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {others.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} />)}
            </div>
          </div>
        </article>
      </div>
    );
}

// ─── CREATOR HUB ─────────────────────────────────────────────────────────────

export function HubPage({ dark, onRead, setPage }) {
    const [activeModule, setActiveModule] = useState(0);
    const [hubRef, inView] = useInView(0.05);
    const isMobile = useIsMobile();

    return (
      <div style={{ background: dark ? "#0a0a0a" : "#fff", color: dark ? "#fff" : "#111", minHeight: "100vh", overflowX: "hidden" }}>
        {/* Background Gradients */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: "100%", height: "60%", background: dark ? "radial-gradient(ellipse at center, rgba(123,81,204,0.15) 0%, transparent 70%)" : "radial-gradient(ellipse at center, rgba(123,81,204,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        {/* 1. HERO */}
        <section style={{ padding: "80px 5vw 40px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <Badge color="#7B51CC">Creator Hub</Badge>
            <h1 style={{ margin: "32px 0 20px", fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 800, fontFamily: "'Sora', sans-serif", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Start building your page <span style={{ background: "linear-gradient(135deg, #7B51CC, #9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>the right way</span>
            </h1>
            <p style={{ margin: "0 auto 40px", maxWidth: 640, fontSize: "clamp(16px, 2vw, 20px)", color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.6, fontWeight: 500 }}>
              Clear steps, practical guidance, and insider growth playbooks for LuvlyFans creators.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <CTAButton size="lg" onClick={() => setActiveModule(0)}>Start Here</CTAButton>
              <GhostButton dark={dark} onClick={() => {
                const el = document.getElementById("playbooks");
                el?.scrollIntoView({ behavior: "smooth" });
              }}>Explore Guides</GhostButton>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw 100px", position: "relative", zIndex: 2 }}>

          {/* 2. WHERE ARE YOU RIGHT NOW? */}
          <section style={{ marginBottom: 80 }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>Where are you right now?</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
              {HUB_MODULES.map((m, idx) => (
                <button 
                  key={m.title} 
                  onClick={() => {
                    setActiveModule(idx);
                    document.getElementById("playbooks")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    padding: isMobile ? "24px 20px" : "32px 24px", textAlign: "left", background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, borderRadius: 20,
                    cursor: "pointer", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", display: "flex", flexDirection: "column", gap: 12
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "#7B51CC";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(123,81,204,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon name={m.icon} size={32} color="#7B51CC" />
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", marginBottom: 4 }}>{m.title}</div>
                    <div style={{ fontSize: 14, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)", lineHeight: 1.5 }}>{m.shortDesc}</div>
                    <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", marginTop: 8, fontStyle: "italic", lineHeight: 1.4 }}>{m.supportingText}</div>
                  </div>
                  <div style={{ marginTop: "auto", fontSize: 13, fontWeight: 700, color: "#7B51CC", paddingTop: 12 }}>{m.cta} →</div>
                </button>
              ))}
            </div>
            <p style={{ textAlign: "center", fontSize: 14, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", margin: 0 }}>
              You can move between these at any time. Most creators go through all three stages as they grow.
            </p>
          </section>

          {/* 3. YOUR FIRST STEPS (CHECKLIST) */}
          <section style={{ marginBottom: 100, padding: isMobile ? "40px 24px" : "60px", background: dark ? "rgba(123,81,204,0.04)" : "rgba(123,81,204,0.02)", borderRadius: 32, border: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.07)"}` }}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 800, marginBottom: 12, textAlign: "center", fontFamily: "'Sora', sans-serif" }}>Your First Steps</h2>
              <p style={{ textAlign: "center", opacity: 0.6, marginBottom: isMobile ? 32 : 48 }}>Complete these essentials to get your page ready for growth.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  "Set up your profile",
                  "Upload your first content",
                  "Set your subscription price",
                  "Turn on Spotlight",
                  "Start promoting your page"
                ].map((step, idx) => (
                  <div key={step} style={{ 
                    display: "flex", alignItems: "center", gap: isMobile ? 12 : 20, padding: isMobile ? "16px" : "20px 24px", 
                    background: dark ? "rgba(255,255,255,0.03)" : "#fff", borderRadius: 16,
                    border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    cursor: "pointer", transition: "all 0.15s"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(123,81,204,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "#fff"; }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${idx === 0 ? "#7B51CC" : (dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)")}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {idx === 0 && <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#7B51CC" }} />}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: dark ? "rgba(255,255,255,0.9)" : "#0f0f0f" }}>{step}</div>
                    <div style={{ marginLeft: "auto", fontSize: 13, color: "#7B51CC", fontWeight: 700 }}>Guide →</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. PLAYBOOKS */}
          <section id="playbooks" style={{ marginBottom: 100 }}>
            {/* Module tabs */}
            <div style={{ marginBottom: 32, display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {HUB_MODULES.map((m, i) => (
                <button key={m.level} onClick={() => setActiveModule(i)} style={{
                  padding: "12px 28px", borderRadius: 99, fontSize: 15, fontWeight: 700, cursor: "pointer",
                  background: activeModule === i ? "#7B51CC" : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                  color: activeModule === i ? "#fff" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"),
                  border: "none", transition: "all 0.2s"
                }}><Icon name={m.icon} size={16} color={activeModule === i ? "#fff" : "#7B51CC"} style={{ marginRight: 8, verticalAlign: "middle" }} /> {m.level}</button>
              ))}
            </div>

            {/* Module content */}
            {HUB_MODULES.map((m, i) => i !== activeModule ? null : (
              <div key={m.level}>
                <div style={{ marginBottom: 48, textAlign: "left", maxWidth: 800 }}>
                  <Badge color="#7B51CC">{m.level}</Badge>
                  <h2 style={{ margin: "16px 0 8px", fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>{m.headerTitle}</h2>
                  <p style={{ margin: "0 0 32px", color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", fontSize: 18, lineHeight: 1.6 }}>{m.headerDesc}</p>
                  
                  <div style={{ padding: "32px", background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9", borderRadius: 24, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, marginBottom: 48 }}>
                    <h4 style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#7B51CC" }}>What to focus on:</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                      {m.focusPoints.map(point => (
                        <div key={point} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <div style={{ color: "#7B51CC", fontWeight: 900 }}>•</div>
                          <div style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.8)" : "#333", fontWeight: 500, lineHeight: 1.4 }}>{point}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h4 style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>Suggested guides:</h4>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                  {m.guides.map((g, j) => {
                    const [hov, setHov] = useState(false);
                    return (
                      <div key={g.title} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onRead(ARTICLES[j % ARTICLES.length])} style={{
                        padding: "32px", borderRadius: 24, cursor: "pointer",
                        background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                        border: `1.5px solid ${hov ? "#7B51CC" : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`,
                        transform: hov ? "translateY(-5px)" : "none", transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        boxShadow: hov ? "0 20px 40px rgba(0,0,0,0.2)" : "none"
                      }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: dark ? "rgba(123,81,204,0.15)" : "rgba(123,81,204,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 20, color: "#7B51CC" }}>
                          <Icon name={["book", "target", "idea", "lock"][j % 4]} size={22} color="#7B51CC" />
                        </div>
                        <h3 style={{ margin: "0 0 12px", fontSize: 17, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", lineHeight: 1.4, fontFamily: "'Sora', sans-serif" }}>{g.title}</h3>
                        <div style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                          <span>{g.time} read</span>
                          <span>•</span>
                          <span style={{ fontWeight: 700, color: "#7B51CC" }}>Practical Guide</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* 5. QUICK WINS */}
          <section style={{ marginBottom: 100 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Sora', sans-serif" }}>Quick Wins You Can Do Today</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
              {[
                { title: "Add 6–12 posts before promoting", icon: "camera" },
                { title: "Use Spotlight on your best post", icon: "flash" },
                { title: "Post 3 Stories today", icon: "clock-circle" },
                { title: "Pin a welcome post", icon: "pin" },
                { title: "Reply to your latest subscribers", icon: "chat" }
              ].map(win => (
                <div key={win.title} style={{
                  padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
                  background: dark ? "rgba(255,255,255,0.02)" : "#f9f9f9",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, borderRadius: 16
                }}>
                  <Icon name={win.icon} size={22} color="#7B51CC" />
                  <div style={{ fontSize: 15, fontWeight: 600, color: dark ? "rgba(255,255,255,0.85)" : "#333" }}>{win.title}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. WHAT'S WORKING RIGHT NOW */}
          <section style={{ marginBottom: 100, padding: "60px", background: dark ? "rgba(255,255,255,0.02)" : "#f4f3ff", borderRadius: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, textAlign: "center" }}>What’s Working Right Now</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { title: "Spotlight ROI", desc: "Creators using Spotlight are getting significantly more profile visits and conversions." },
                { title: "Content Density", desc: "Pages with 20+ posts see a 40% higher subscription rate compared to newer pages." },
                { title: "Engagement Speed", desc: "Creators who reply to new subscribers within 2 hours see higher retention in month 2." }
              ].map(insight => (
                <div key={insight.title}>
                  <div style={{ width: 40, height: 2, background: "#7B51CC", marginBottom: 16 }} />
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{insight.title}</div>
                  <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.6 }}>{insight.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. TESTIMONIALS */}
          <section style={{ marginBottom: 100 }}>
            <h2 style={{ margin: "0 0 32px", fontSize: 28, fontWeight: 800, textAlign: "center", fontFamily: "'Sora', sans-serif" }}>Real Feedback from Real Creators</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {[
                { name: "Luna V.", text: "I didn’t know where to start before this. The first 30 days guide helped me structure everything properly.", role: "Creator for 8 months" },
                { name: "Alex M.", text: "Using Spotlight made a difference. I started getting profile visits I wasn’t getting before.", role: "Creator for 3 months" },
                { name: "Kira S.", text: "The pricing playbook was the most helpful thing. It kept me from guessing what people might pay.", role: "Newly Launched" },
              ].map(t => (
                <div key={t.name} style={{ 
                  padding: "32px", background: dark ? "rgba(255,255,255,0.03)" : "#fff", 
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, borderRadius: 24,
                  position: "relative"
                }}>
                  <div style={{ fontSize: 40, position: "absolute", top: 10, right: 24, opacity: 0.1, color: "#7B51CC" }}>“</div>
                  <p style={{ margin: "0 0 24px", fontSize: 16, color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)", lineHeight: 1.6, position: "relative", zIndex: 1, minHeight: 80 }}>{t.text}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #7B51CC, #9333ea)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff" }}>{t.name[0]}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f" }}>{t.name}</div>
                      <div style={{ fontSize: 13, opacity: 0.5 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. FINAL CTA */}
          <section style={{ 
            padding: "80px 40px", textAlign: "center", borderRadius: 40, overflow: "hidden", 
            background: `linear-gradient(135deg, ${dark ? "rgba(123,81,204,0.15)" : "#7B51CC"}, ${dark ? "rgba(147,51,234,0.1)" : "#9333ea"})`,
            border: dark ? "1px solid rgba(123,81,204,0.2)" : "none",
            color: dark ? "#fff" : "#fff"
          }}>
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, fontFamily: "'Sora', sans-serif" }}>Start applying what you’ve learned</h2>
              <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 40 }}>Your next step is building your page and staying consistent</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button style={{ 
                  padding: "16px 32px", borderRadius: 12, border: "none", background: "#fff", color: "#7B51CC", 
                  fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                }}>Go to Dashboard</button>
                <button style={{ 
                  padding: "16px 32px", borderRadius: 12, border: "2px solid rgba(255,255,255,0.4)", background: "transparent", 
                  color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer"
                }}>Create Your First Post</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

export function Footer({ dark, setPage }) {
    return (
      <footer style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, padding: "48px 5vw 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
            <div>
              <Logo dark={dark} />
              <p style={{ marginTop: 14, fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", lineHeight: 1.7, maxWidth: 280 }}>The creator education hub for the next generation of independent earners. Learn, grow, and monetize — smarter.</p>
            </div>
            {[
              { title: "Learn", links: ["Creator Hub", "Guides", "Playbooks"] },
              { title: "Platform", links: ["How it Works", "Pricing", "Testimonials"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] }
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginBottom: 14 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 10 }}>
                    <button onClick={() => {}} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", padding: 0, textAlign: "left" }}>{l}</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>© 2026 LuvlyFans. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Service", "Creator Guidelines"].map(l => (
                <button key={l} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)", padding: 0 }}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

// ─── GETTING STARTED ──────────────────────────────────────────────────────────

export function GettingStartedPage({ dark }) {
  const Step = ({ num, title, children }) => (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7B51CC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>{num}</div>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f" }}>{title}</h3>
      </div>
      <div style={{ paddingLeft: 44, fontSize: 16, lineHeight: 1.7, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 5vw", overflowX: "hidden", width: "100%" }}>
      <header style={{ marginBottom: 80, textAlign: "center" }}>
        <Badge>OFFICIAL GUIDE</Badge>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "24px 0 16px", lineHeight: 1.1 }}>Getting started on LuvlyFans</h1>
        <p style={{ fontSize: 18, maxWidth: 700, margin: "0 auto", opacity: 0.8, lineHeight: 1.6 }}>
          LuvlyFans is built around creators. Everything else flows from that. Whether you are here to build an audience, earn through subscriptions, or support creators as a fan, the best experience comes from understanding how the platform works from the start.
        </p>
        <div style={{ marginTop: 24, padding: "12px 24px", background: dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.05)", borderRadius: 12, display: "inline-block", border: "1px solid rgba(123,81,204,0.2)", fontSize: 14, fontWeight: 600, color: "#7B51CC" }}>
          ⚠️ Notice: LuvlyFans does not offer live streaming at this time.
        </div>
      </header>

      <section style={{ marginBottom: 100 }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 48, borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, paddingBottom: 16 }}>Part 1: Getting Started as a Creator</h2>
        
        <Step num="1" title="Create Your Account">
          <p>Visit the LuvlyFans website at <a href="https://www.luvlyfans.com" style={{ color: "#7B51CC", fontWeight: 700 }}>www.luvlyfans.com</a>. Select <strong>Sign Up</strong>, enter your email and password, and confirm your address.</p>
          <div style={{ marginTop: 12, fontSize: 13, padding: "8px 12px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", borderRadius: 8, fontStyle: "italic" }}>Tip: Pick a username you are comfortable promoting long term.</div>
        </Step>

        <Step num="2" title="Apply or Switch to Creator Mode">
          <p>Once logged in, select <strong>Become a Creator</strong> or switch on creator mode in your account settings. This step unlocks creator verification, content posting, subscription setup, and payout configuration.</p>
          <p style={{ fontWeight: 600, color: "#f43f5e" }}>You will not be able to post content until verification is completed.</p>
        </Step>

        <Step num="3" title="Complete Creator Verification">
          <p>Verification is required for all creators before posting. This usually includes uploading a valid identity document and submitting a clear verification photo or selfie.</p>
          <ul style={{ margin: "12px 0", paddingLeft: 20 }}>
            <li>Use clear, well-lit photos</li>
            <li>Do not crop document edges</li>
            <li>Ensure the person in the photo matches the ID</li>
          </ul>
        </Step>

        <Step num="4" title="Set Up Your Creator Profile">
          <p>Your profile is your storefront. Recommended setup includes a clear profile photo, banner image, and a short bio explaining what you offer.</p>
          <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", padding: 20, borderRadius: 16, marginTop: 12, fontSize: 14 }}>
            💡 Clear profiles convert significantly better than vague ones.
          </div>
        </Step>

        <Step num="5" title="Set Your Subscription Price">
          <p>Choose a price that matches your posting plans. Consider your post frequency and current content library. You can always adjust pricing later.</p>
        </Step>

        <Step num="6" title="Upload Starter Content">
          <p>Before promoting, aim for a base of 6 to 12 posts. Include a pinned post explaining what fans can expect and a welcome-style post for new subscribers.</p>
        </Step>

        <Step num="7" title="Understand Content Options">
          <p>LuvlyFans currently supports Subscriptions, Posts (photos/videos/text), and Locked content (PPV). <strong>Important:</strong> Live streaming is currently unavailable (Coming soon).</p>
        </Step>

        <Step num="8" title="Set Up Payout Details">
          <p>Complete your payout settings with bank details or your preferred method. Ensure your legal name matches your account to avoid payment delays.</p>
        </Step>

        <Step num="9" title="Complete Tax Information">
          <p>Tax information is required for compliance (e.g., W8BEN). Completing this early ensures you receive payouts without administrative blocks.</p>
        </Step>

        <Step num="10" title="Learn the Rules">
          <p>Protect your account: keep communication and payments on-platform, only upload owned content, and follow our content/consent guidelines.</p>
        </Step>
      </section>

      <section style={{ marginBottom: 100 }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 48, borderBottom: `2px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, paddingBottom: 16 }}>Part 2: Getting Started as a Fan</h2>
        
        <div style={{ display: "grid", gap: 32 }}>
          {[
            { t: "Create an Account", d: "Sign up and confirm your email. We recommend using a strong, unique password." },
            { t: "Complete Your Profile", d: "A basic profile helps creators recognize real supporters. Add a display name and a respectful bio." },
            { t: "Find Creators", d: "Discover creators via usernames, social media links, or browsing our explore page." },
            { t: "Subscribe & Access", d: "Once subscribed, gain access to exclusive content. Note: some posts may still be locked as PPV." },
            { t: "Messaging & Behavior", d: "Keep conversations on-platform and respect creator boundaries. Respectful behavior improves the community." },
            { t: "Manage Subscriptions", d: "View active subs, cancel renewals, or update payment methods in your account settings." }
          ].map((item, i) => (
            <div key={item.t} style={{ borderLeft: `3px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, paddingLeft: 24 }}>
              <h4 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700 }}>{item.t}</h4>
              <p style={{ margin: 0, opacity: 0.7, fontSize: 15, lineHeight: 1.6 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: 48, borderRadius: 32, background: dark ? "#1a1a1a" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, boxShadow: "0 40px 100px rgba(0,0,0,0.2)" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48 }}>Quick Start Checklists</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h4 style={{ color: "#7B51CC", fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>CREATOR CHECKLIST</h4>
            <div style={{ display: "grid", gap: 12 }}>
              {["Create account", "Become a creator", "Complete verification", "Set up profile", "Set subscription price", "Upload starter content", "Add payout details", "Complete tax information"].map(c => (
                <div key={c} style={{ fontSize: 15, display: "flex", gap: 10, alignItems: "center" }}><span style={{ color: "#7B51CC" }}>✓</span> {c}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: "#0ea5e9", fontWeight: 800, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>FAN CHECKLIST</h4>
            <div style={{ display: "grid", gap: 12 }}>
              {["Create account", "Find creators", "Subscribe", "Respect boundaries", "Manage subscriptions"].map(c => (
                <div key={c} style={{ fontSize: 15, display: "flex", gap: 10, alignItems: "center" }}><span style={{ color: "#0ea5e9" }}>✓</span> {c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer style={{ marginTop: 80, textAlign: "center", opacity: 0.6, fontSize: 14, lineHeight: 1.7 }}>
        LuvlyFans works best when creators are set up properly and fans understand how to support responsibly.<br />Starting with the right foundations helps avoid confusion later and makes growth smoother over time.
      </footer>
    </div>
  );
}

// ─── COMPARISON PAGE ──────────────────────────────────────────────────────────

export function ComparePage({ dark, setPage }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <section style={{ padding: "72px 5vw 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1), transparent 60%)" : "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.05), transparent 60%)" }} />
        <div style={{ position: "relative" }}>
          <Badge color="#06b6d4">Platform Comparison</Badge>
          <h1 style={{ margin: "16px 0 16px", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Sora', sans-serif", lineHeight: 1.1, color: dark ? "#fff" : "#0a0a0a" }}>
            OnlyFans vs LuvlyFans{" "}
            <span style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>— The Real Numbers</span>
          </h1>
          <p style={{ margin: "0 auto 36px", maxWidth: 560, fontSize: 17, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7 }}>
            We compared every major creator platform on the metrics that actually matter. The numbers don't lie.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw 80px" }}>

        {/* Winner banner */}
        <div ref={ref} style={{
          background: "linear-gradient(135deg, #7B51CC 0%, #8b5cf6 100%)",
          borderRadius: 20, padding: "32px 40px", marginBottom: 48, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.96)", transition: "all 0.5s ease"
        }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Best Overall for Creators in 2026</div>
            <h2 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "'Sora', sans-serif" }}>LuvlyFans — Lowest Fees, Fastest Payouts, Best Discovery</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Based on platform fees, payout speed, growth tools, and creator support ratings.</div>
          </div>
          <CTAButton size="lg" style={{ background: "#fff", color: "#7B51CC", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} onClick={() => window.open('https://luvlyfans.com/', '_blank')}>Start Free</CTAButton>
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, marginBottom: 48 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 13, fontWeight: 700, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Feature</th>
                {COMPARISON.platforms.map((p, i) => (
                  <th key={p} style={{ padding: "16px 20px", textAlign: "center", fontSize: 14, fontWeight: 800, color: i === 0 ? "#7B51CC" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"), background: i === 0 ? "rgba(123,81,204,0.06)" : "transparent" }}>{p} {i === 0 && "✓"}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, ri) => (
                <tr key={row.feature} style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, background: ri % 2 === 0 ? "transparent" : (dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)") }}>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>{row.feature}</td>
                  {row.values.map((v, i) => (
                    <td key={i} style={{ padding: "14px 20px", textAlign: "center", fontSize: 13, fontWeight: i === 0 ? 800 : 500, color: i === 0 ? "#7B51CC" : (dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)"), background: i === 0 ? "rgba(123,81,204,0.04)" : "transparent" }}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pros/Cons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 60 }}>
          {[
            {
              platform: "LuvlyFans", color: "#7B51CC", isUs: true,
              pros: ["10% platform fee (industry lowest)", "24–48 hr payouts", "Built-in creator discovery", "Dedicated creator support team", "Advanced analytics dashboard", "5% lifetime referral commission"],
              cons: ["Newer platform (less brand recognition)", "Growing subscriber base"]
            },
            {
              platform: "OnlyFans", color: "#00aff0", isUs: false,
              pros: ["Largest subscriber base", "Established brand trust", "Large creator community"],
              cons: ["20% platform fee", "7–21 day payout delays", "No organic discovery tools", "Limited analytics", "Email-only support", "Payout holds for new creators"]
            }
          ].map(({ platform, color, isUs, pros, cons }) => (
            <div key={platform} style={{ padding: "28px", borderRadius: 18, border: `2px solid ${isUs ? color + "40" : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)")}`, background: isUs ? (dark ? "rgba(123,81,204,0.05)" : "rgba(123,81,204,0.03)") : (dark ? "rgba(255,255,255,0.02)" : "#fff") }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color, fontFamily: "'Sora', sans-serif" }}>{platform}</div>
                {isUs && <Badge color={color}>Our Pick 🏆</Badge>}
              </div>
              <div style={{ marginBottom: 16 }}>
                {pros.map(p => <div key={p} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}><span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>{p}</div>)}
              </div>
              <div style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, paddingTop: 16 }}>
                {cons.map(c => <div key={c} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 13, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}><span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span>{c}</div>)}
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: "center", padding: "48px", background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderRadius: 20, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
          <h2 style={{ margin: "0 0 12px", fontSize: 30, fontWeight: 800, fontFamily: "'Sora', sans-serif", color: dark ? "#fff" : "#0f0f0f" }}>Keep More of What You Earn</h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>At 10% vs 20% fees, a creator making $5,000/month saves $500 every single month on LuvlyFans. That's $6,000/year back in your pocket.</p>
          <CTAButton size="lg" onClick={() => {}}>Start Earning on LuvlyFans — Free</CTAButton>
          <div style={{ marginTop: 16, fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>No setup fees · No monthly fees · First payout within 48 hours</div>
        </div>
      </div>
    </div>
  );
}

// ─── EARNING PAGE ─────────────────────────────────────────────────────────────

export function EarningPage({ dark }) {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 5vw", overflowX: "hidden", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Badge>REVENUE GUIDE</Badge>
        <h1 style={{ fontSize: 48, fontWeight: 800, margin: "20px 0", lineHeight: 1.1 }}>How the 1% Earns on LuvlyFans</h1>
        <p style={{ fontSize: 18, maxWidth: 600, margin: "0 auto", opacity: 0.7 }}>Beyond subscriptions — discover the multiple revenue streams optimized for LuvlyFans creators.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
        {[
          { title: "Subscriptions", percent: "40%", icon: "🎟️", desc: "Your stable, recurring base. Automated renewals mean predictable monthly income." },
          { title: "Messaging & PPV", percent: "35%", icon: "💬", desc: "Selling exclusive content through our high-conversion messenger system." },
          { title: "Live Tips", percent: "15%", icon: "💸", desc: "Interact live and receive real-time tips during streaming or story cycles." },
          { title: "Referrals", percent: "10%", icon: "🤝", desc: "Earn 5% of our platform fee from every creator you bring to LuvlyFans — for life." }
        ].map(m => (
          <div key={m.title} style={{ padding: 40, borderRadius: 24, background: dark ? "#1a1a1a" : "#fff", boxShadow: "0 20px 40px rgba(0,0,0,0.05)", textAlign: "center", border: `2px solid ${dark ? "rgba(255,255,255,0.05)" : "transparent"}` }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>{m.icon}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>{m.title}</h3>
            <div style={{ color: "#7B51CC", fontWeight: 800, fontSize: 14, marginBottom: 16 }}>AVG {m.percent} OF INCOME</div>
            <p style={{ fontSize: 14, opacity: 0.6, lineHeight: 1.6 }}>{m.desc}</p>
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
        <button onClick={() => { setSelectedFeature(null); window.scrollTo(0, 0); }} style={{ margin: "24px 5vw", background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          ← Back to Features
        </button>

        {/* Hero */}
        <header style={{ padding: "80px 5vw", background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff", borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}` }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>FEATURE SPOTLIGHT</Badge>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "24px 0", lineHeight: 1.1 }}>Getting Seen: The Spotlight Feature</h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>One of the hardest parts of being a creator is getting seen. Spotlight was created to change that.</p>
          </div>
        </header>

        {/* Main Content */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}>
           <div style={{ fontSize: 17, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.8)" : "#333" }}>
              <p>You can be consistent, post regularly, and still feel like your content is only reaching the same small group of people. Growth often depends on moments of visibility, when new people come across your work and decide to explore further.</p>
              
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>What Spotlight Does</h2>
              <p>Spotlight allows creators to highlight a post so it can be seen by fans who are not currently following them.</p>
              
              {/* Mockup 1: Discovery Feed */}
              <div style={{ margin: "48px 0" }}>
                <img src="/assets/promotions/spotlight2.png" alt="Discovery Feed Mockup" style={{ width: "100%", borderRadius: 24, boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.1)" }} />
                <div style={{ fontSize: 13, opacity: 0.5, marginTop: 16, textAlign: "center", fontStyle: "italic" }}>
                  A high-fidelity screenshot of the LuvlyFans Discovery Feed highlighting how spotlighted posts are surfaced to new fans.
                </div>
              </div>

              <p>Instead of content only appearing to existing subscribers or followers, a spotlighted post becomes visible to a wider audience across the platform. It gives creators a way to step outside their immediate circle and reach people who may not have discovered them otherwise.</p>

              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>Why This Matters</h2>
              <p>Growth often starts with discovery. Most subscribers begin as people who come across a piece of content, pause for a moment, and decide to explore more. Without visibility, that first step never happens.</p>
              

              <div style={{ margin: "48px 0", padding: 40, background: "#7B51CC", borderRadius: 32, color: "#fff" }}>
                <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>From Visibility to Subscription</h3>
                <p>Spotlight is not just about being seen. It’s about what happens next. When someone sees your content and is interested, they may visit your profile, read your bio, look through your posts, and decide whether to subscribe.</p>
              </div>

              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>How to Use Spotlight</h2>
              <p>Getting started with Spotlight is simple and only takes a few taps.</p>
              <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
                {[
                  { s: "Step 1: Choose the Right Post", t: "Select a post that represents your style well. This is often the first thing new people will see, so it should feel like a clear introduction." },
                  { s: "Step 2: Open the Post Options", t: "Go to the post you want to spotlight. Look for the options menu or settings icon on the post." },
                  { s: "Step 3: Select 'Spotlight'", t: "Choose the Spotlight option. Once selected, your post will be made visible to a wider audience across the platform." },
                  { s: "Step 4: Confirm and Activate", t: "Confirm your selection. Your post is now live in Spotlight and can be seen by fans who are not currently following you." },
                  { s: "Step 5: Monitor Activity", t: "After spotlighting, check profile visits, watch for new subscribers, and review engagement to understand what works over time." }
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20 }}>
                     <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7B51CC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 14 }}>{i+1}</div>
                     <div>
                       <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{step.s}</div>
                       <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>{step.t}</p>
                     </div>
                  </div>
                ))}
              </div>

              {/* Mockup 2: Activation Button */}
              <div style={{ margin: "64px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <img src="/assets/promotions/spotlight3.png" alt="Spotlight Activation" style={{ width: "100%", borderRadius: 16, boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.08)" }} />
                  <img src="/assets/promotions/spotlight4.png" alt="Spotlight Confirmation" style={{ width: "100%", borderRadius: 16, boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.3)" : "0 10px 20px rgba(0,0,0,0.08)" }} />
                </div>
                <div style={{ fontSize: 13, opacity: 0.5, marginTop: 16, textAlign: "center", fontStyle: "italic" }}>
                  Close-up UI showing the Spotlight toggle within post settings and the final activation confirmation.
                </div>
              </div>

              <div style={{ marginTop: 64, padding: "48px", background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32, border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
                <Badge>TEAM TIP</Badge>
                <p style={{ margin: "16px 0 0", fontWeight: 700, fontSize: 22, lineHeight: 1.3 }}>Spotlight increases visibility, but your profile and content are what convert that visibility into subscribers.</p>
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
        <button onClick={() => { setSelectedFeature(null); window.scrollTo(0, 0); }} style={{ margin: "24px 5vw", background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          ← Back to Features
        </button>

        {/* Hero */}
        <header style={{ padding: "80px 5vw", background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff", borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}` }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>NEW FEATURE</Badge>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "24px 0", lineHeight: 1.1 }}>Introducing Stories on LuvlyFans</h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>Not every moment needs to be a full post. Sometimes it’s a quick update, a behind-the-scenes clip, or just a moment shared without overthinking.</p>
          </div>
        </header>

        {/* Hero Image */}
        <section style={{ maxWidth: 800, margin: "-40px auto 0", padding: "0 5vw", position: "relative", zIndex: 10 }}>
           <img src="/assets/promotions/Stories.png" alt="Stories on LuvlyFans" style={{ width: "100%", borderRadius: 24, boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.1)" }} />
        </section>

        {/* Main Content */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}>
           <div style={{ fontSize: 17, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.8)" : "#333" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 24px" }}>What Stories Are</h2>
              <p>Stories are short, temporary updates that creators can share throughout the day. They allow you to post content that feels more immediate, doesn’t need to be permanent, and gives fans a closer look at your day or process.</p>
              <p>Stories sit alongside your main content, not in place of it.</p>

              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>Why Stories Matter</h2>
              <p>Creating content can sometimes feel structured. Posts are planned, content is prepared, and expectations are set. Stories offer a more flexible way to share without that pressure.</p>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, margin: "40px 0" }}>
                {[
                  { t: "Stay Active", d: "Show up without needing a full post." },
                  { t: "Share Moments", d: "Share smaller, natural moments." },
                  { t: "Keep Engagement", d: "Keep fans connected between uploads." }
                ].map((item, i) => (
                  <div key={i} style={{ padding: 24, borderRadius: 20, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}` }}>
                    <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: "#7B51CC" }}>{item.t}</div>
                    <div style={{ fontSize: 14, opacity: 0.6 }}>{item.d}</div>
                  </div>
                ))}
              </div>

              <div style={{ margin: "48px 0", padding: 40, background: "#7B51CC", borderRadius: 32, color: "#fff" }}>
                <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>Start sharing your Stories on LuvlyFans</h3>
                <p>Think of Stories as a way to stay present between your main content. They make it easier to show up without overthinking every detail.</p>
              </div>

              <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>🧩 HOW-TO GUIDE: Using Stories</h2>
              <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
                {[
                  { s: "Step 1: Open Stories", t: "Go to the Stories section on your dashboard or homepage." },
                  { s: "Step 2: Create a Story", t: "Select 'Add Story' and upload your content (photo or short video)." },
                  { s: "Step 3: Post", t: "Confirm your upload. Your story will now be visible to your audience." },
                  { s: "Step 4: Stay Active", t: "Post multiple stories throughout the day whenever you have something quick to share." }
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20 }}>
                     <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7B51CC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 14 }}>{i+1}</div>
                     <div>
                       <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{step.s}</div>
                       <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>{step.t}</p>
                     </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div style={{ padding: 40, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32 }}>
                   <Badge color="#7B51CC">💡 FOR CREATORS</Badge>
                   <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>Don't Aim for Perfect</h3>
                   <p style={{ fontSize: 15, opacity: 0.7 }}>Stories feel better when they're natural. Overthinking them can make them harder to use. The goal is total presence, not performance.</p>
                </div>
                <div style={{ padding: 40, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32 }}>
                   <Badge color="#0ea5e9">👥 FOR FANS</Badge>
                   <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>Seeing More Through Stories</h3>
                   <p style={{ fontSize: 15, opacity: 0.7 }}>Experience creators beyond planned posts. Follow along with their day and enjoy content that feels natural and immediate.</p>
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
        <button onClick={() => { setSelectedFeature(null); window.scrollTo(0, 0); }} style={{ margin: "24px 5vw", background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          ← Back to Features
        </button>

        {/* Hero */}
        <header style={{ padding: "80px 5vw", background: dark ? "rgba(123,81,204,0.05)" : "#f9f6ff", borderBottom: `1px solid ${dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.08)"}` }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Badge>CREATOR TOOL</Badge>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "24px 0", lineHeight: 1.1 }}>Introducing Media Vault: Store, Organise, and Reuse Your Content</h1>
            <p style={{ fontSize: 18, opacity: 0.7, lineHeight: 1.6 }}>Creating content takes time. Uploading, organising, and reusing it shouldn't take just as long. Media Vault is where your content library lives — always organised, always ready.</p>
          </div>
        </header>

        {/* Hero Image */}
        <section style={{ maxWidth: 800, margin: "-40px auto 0", padding: "0 5vw", position: "relative", zIndex: 10 }}>
          <img src="/assets/promotions/spotlight_Image.png" alt="Media Vault" style={{ width: "100%", borderRadius: 24, boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.1)" }} />
        </section>

        {/* Main Content */}
        <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 5vw" }}>
          <div style={{ fontSize: 17, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.8)" : "#333" }}>

            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 24px" }}>What Media Vault Is</h2>
            <p>Media Vault is your personal content library inside LuvlyFans. It's the space where all your uploaded photos and videos live, ready to be used, reused, and repurposed without starting from scratch every time.</p>
            <p>Think of it like a well-organised hard drive for your page — except it's built directly into the platform, accessible whenever you need it.</p>

            <div style={{ margin: "48px 0", padding: 40, background: "#7B51CC", borderRadius: 32, color: "#fff" }}>
              <h3 style={{ color: "#fff", marginBottom: 16, fontWeight: 800 }}>One Place. Everything In It.</h3>
              <p>No more digging through old posts. No more re-uploading files you've already uploaded. Your media stays in one place so you can focus on what it's supposed to do — connect with your audience.</p>
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>Why This Matters</h2>
            <p>As your page grows, so does your content. Without structure, things start to pile up. What used to take a few minutes begins to take much longer, and that friction adds up over time.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, margin: "40px 0" }}>
              {[
                { t: "Files Get Lost", d: "Repeated uploads, scattered files, no clear system to find what you need." },
                { t: "Posting Takes Longer", d: "Every post becomes its own admin task when there's no organised library behind it." },
                { t: "Momentum Breaks", d: "Small inefficiencies compound. When posting is slow, consistency suffers." }
              ].map((item, i) => (
                <div key={i} style={{ padding: 24, borderRadius: 20, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}` }}>
                  <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: "#7B51CC" }}>{item.t}</div>
                  <div style={{ fontSize: 14, opacity: 0.6 }}>{item.d}</div>
                </div>
              ))}
            </div>
            <p>Media Vault removes that friction. Your content is always there, always accessible, and always ready to use.</p>

            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>How Creators Use It</h2>
            <p>Media Vault is designed around how creators actually work — not how platforms assume they do.</p>
            <div style={{ display: "grid", gap: 32, marginTop: 32 }}>
              {[
                { s: "Upload and Store in Advance", t: "Batch create your content and keep it in the Vault until you're ready to post. No pressure to post immediately after creating." },
                { s: "Reuse Across Posts", t: "A photo that worked well in one context can work in another. Pull from your Vault instead of re-uploading the same file." },
                { s: "Keep Everything Organised", t: "Everything you've uploaded is stored cleanly in one place. No searching through your feed to find something from three months ago." },
                { s: "Prepare Content Ahead of Time", t: "Build up a library before a busy period. When you're ready to post, your content is already waiting for you." }
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#7B51CC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 800, fontSize: 14 }}>{i+1}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{step.s}</div>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: 15 }}>{step.t}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 28, fontWeight: 800, margin: "48px 0 24px" }}>Before vs. After</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ padding: 32, borderRadius: 20, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}` }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em" }}>Without Media Vault</div>
                {["Re-upload the same file every time", "Search through old posts to find content", "Lose time on small repetitive tasks", "Disrupted workflow between sessions"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14, fontSize: 14, opacity: 0.7 }}>
                    <span style={{ color: "#ef4444", fontWeight: 800, flexShrink: 0 }}>✕</span> {t}
                  </div>
                ))}
              </div>
              <div style={{ padding: 32, borderRadius: 20, background: dark ? "rgba(123,81,204,0.06)" : "#f3f0ff", border: `1px solid ${dark ? "rgba(123,81,204,0.2)" : "rgba(123,81,204,0.15)"}` }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 20, color: "#7B51CC", textTransform: "uppercase", letterSpacing: "0.08em" }}>With Media Vault</div>
                {["Pick from your library in seconds", "Everything is already organised and ready", "Post without friction or interruption", "Build content batches and post on schedule"].map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14, fontSize: 14 }}>
                    <span style={{ color: "#7B51CC", fontWeight: 800, flexShrink: 0 }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div style={{ padding: 40, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32 }}>
                <Badge color="#7B51CC">💡 FOR CREATORS</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>Built for Batch Creators</h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>If you create content in batches, Media Vault is the missing piece. Upload everything in one session, then post from your library throughout the week without touching a file again.</p>
              </div>
              <div style={{ padding: 40, background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32 }}>
                <Badge color="#0ea5e9">📋 BUILD CONSISTENCY</Badge>
                <h3 style={{ margin: "16px 0", fontSize: 22, fontWeight: 800 }}>Consistency Needs Preparation</h3>
                <p style={{ fontSize: 15, opacity: 0.7 }}>Showing up regularly is easier when your content is already ready. Media Vault supports consistent posting by reducing the friction between having content and sharing it.</p>
              </div>
            </div>

            <div style={{ marginTop: 64, padding: "48px", background: dark ? "rgba(255,255,255,0.03)" : "#f8f8f8", borderRadius: 32, border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
              <Badge>FINAL THOUGHTS</Badge>
              <p style={{ margin: "16px 0 0", fontWeight: 700, fontSize: 22, lineHeight: 1.3 }}>As you build more content, organisation becomes just as important as creation. Media Vault gives you the structure to do both — without slowing either one down.</p>
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
          <h1 style={{ fontSize: 48, fontWeight: 800, marginTop: 16 }}>Creator Features</h1>
          <p style={{ fontSize: 18, opacity: 0.6, marginTop: 12 }}>Unlocking new ways to grow, engage, and monetize your influence.</p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
          {FEATURES.map(f => (
            <div 
              key={f.id}
              onClick={() => { if(f.id === 1 || f.id === 2 || f.id === 3) setSelectedFeature(f.id); window.scrollTo(0,0); }}
              style={{
                borderRadius: 20, overflow: "hidden", 
                background: dark ? "rgba(255,255,255,0.03)" : "#f9f9f9",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "transparent"}`,
                cursor: (f.id === 1 || f.id === 2 || f.id === 3) ? "pointer" : "default", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                if(f.id === 1 || f.id === 2 || f.id === 3) {
                  e.currentTarget.style.transform = "translateY(-12px)";
                  e.currentTarget.style.boxShadow = dark ? "0 40px 80px rgba(0,0,0,0.6)" : "0 30px 60px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ height: 240, overflow: "hidden" }}>
                <img src={f.thumbnail} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div style={{ padding: "28px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Badge color="#7B51CC">{f.type}</Badge>
                  <div style={{ fontSize: 12, fontWeight: 700, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>· {f.date}</div>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.25, color: dark ? "#fff" : "#111" }}>{f.title}</h3>
                <p style={{ fontSize: 15, opacity: 0.6, lineHeight: 1.6, marginBottom: 0 }}>{f.excerpt}</p>
                {(f.id === 1 || f.id === 2) ? (
                   <div style={{ marginTop: 20, color: "#7B51CC", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>Learn More →</div>
                ) : (
                  <div style={{ marginTop: 20, color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", fontWeight: 700, fontSize: 13 }}>Coming Soon</div>
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

export function FreeCreatorsPage({ dark }) {
  const data = FREE_CREATORS_DIGEST[0];
  const isMobile = useIsMobile();
  return (
    <div style={{ background: dark ? "#0a0a0a" : "#fff", color: dark ? "#fff" : "#111", overflowX: "hidden" }}>
      {/* Hero Section */}
      <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
        <img src={data.hero} alt="Creator Digest Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, filter: "brightness(0.7)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5vw", maxWidth: 800 }}>
          <Badge>MONTHLY DIGEST</Badge>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: "#fff", margin: "24px 0", letterSpacing: "-0.03em" }}>
            Free Creator Accounts to Follow in {data.month}
          </h1>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 5vw" }}>
        {/* Intro */}
        <section style={{ textAlign: "center", marginBottom: 120 }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 24, fontSize: 13, fontWeight: 800, textTransform: "uppercase", color: "#7B51CC" }}>
            <span>#Art</span> <span>#Featured</span> <span>#Lifestyle</span>
          </div>
          <p style={{ fontSize: 20, lineHeight: 1.6, maxWidth: 640, margin: "0 auto", opacity: 0.7 }}>
            Looking for new creators to follow this month? From comedy and travel to fitness and photography, these creators bring personality and originality to LuvlyFans.
          </p>
          <button style={{ marginTop: 40, background: "#7B51CC", color: "#fff", border: "none", padding: "16px 32px", borderRadius: 12, fontSize: 15, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginInline: "auto" }} onClick={() => window.open('https://luvlyfans.com/', '_blank')}>
            <Icon name="star" size={20} color="#fff" /> Find Top Creator Accounts
          </button>
        </section>

        {/* Find Top Creators Spotlight */}
        <div style={{ position: "relative", padding: isMobile ? "60px 24px" : "80px 40px", borderRadius: 40, background: dark ? "rgba(123,81,204,0.12)" : "#F8F5FF", border: `1px solid ${dark ? "rgba(123,81,204,0.25)" : "rgba(123,81,204,0.1)"}`, overflow: "hidden", marginBottom: 120 }}>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
            <Icon name="star" size={isMobile ? 48 : 56} color="#7B51CC" style={{ marginBottom: 24 }} />
            <h2 style={{ fontSize: isMobile ? 32 : 40, fontWeight: 800, marginBottom: 20, fontFamily: "'Sora', sans-serif" }}>Find Top Creator Accounts</h2>
            <p style={{ fontSize: 18, opacity: 0.7, marginBottom: 32, lineHeight: 1.6 }}>LuvlyFans is the home of growth-focused creators. See how the top 1% are building their legacy through authentic connection.</p>
            <CTAButton size="lg" onClick={() => window.open('https://luvlyfans.com/', '_blank')}>Explore the Platform</CTAButton>
          </div>
        </div>

        {/* Featured Creator List */}
        <section style={{ display: "flex", flexDirection: "column", gap: isMobile ? 80 : 140 }}>
          {data.featured.map((c, i) => (
            <div key={c.id} style={{ 
              display: "flex", gap: isMobile ? 32 : 60, alignItems: "center", 
              flexDirection: isMobile ? "column" : (i % 2 === 1 ? "row-reverse" : "row"), 
              flexWrap: "wrap" 
            }}>
              {/* Image Section */}
              <div style={{ flex: isMobile ? "1 1 100%" : "1 1 450px", position: "relative", width: "100%", overflow: "hidden", borderRadius: 24 }}>
                 <div style={{ position: "absolute", inset: -20, background: c.color, borderRadius: 24, opacity: 0.1, zIndex: -1 }} />
                 <div style={{ 
                   height: isMobile ? 400 : 540, borderRadius: 24, background: c.color, color: "#fff", 
                   display: "flex", flexDirection: "column", padding: isMobile ? 32 : 48, boxShadow: "0 40px 80px rgba(0,0,0,0.2)",
                   backgroundImage: `radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 70%)`
                 }}>
                    <h2 style={{ fontSize: "clamp(18px, 3.2vw, 30px)", fontWeight: 800, lineHeight: 1.2, flex: 1, margin: 0 }}>“{c.quote}”</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900 }}>{c.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{c.handle}</div>
                        <div style={{ fontSize: 12, opacity: 0.7 }}>on LuvlyFans</div>
                      </div>
                    </div>
                 </div>
                 {/* Secondary Visual (Floating image or mask) */}
                 {!isMobile && (
                   <div style={{ 
                     position: "absolute", bottom: -40, right: i % 2 === 0 ? -40 : "auto", left: i % 2 === 1 ? -40 : "auto", 
                     width: 280, height: 350, 
                     borderRadius: 24, border: "8px solid #fff", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", display: "flex", alignItems: "flex-end", padding: 20,
                     backgroundColor: dark ? "#111" : "#fff", overflow: "hidden"
                   }}>
                      <img 
                        src={c.image || "/assets/events/AVN2.jpeg"} 
                        alt={c.name} 
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                      <div style={{ position: "relative", zIndex: 2, background: "rgba(255,255,255,0.9)", padding: "10px 16px", borderRadius: 12, fontSize: 12, fontWeight: 700, backdropFilter: "blur(4px)", color: "#111" }}>{c.type}</div>
                   </div>
                 )}
              </div>

              {/* Text Section */}
              <div style={{ flex: isMobile ? "1 1 100%" : "1 1 400px" }}>
                <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 400, color: "#7B51CC", marginBottom: 12 }}>{i + 1}. {c.name} <span style={{ fontWeight: 800 }}>{c.handle}</span></div>
                <h3 style={{ fontSize: isMobile ? 22 : 24, fontWeight: 800, marginBottom: 20 }}>{c.type}</h3>
                <p style={{ fontSize: isMobile ? 16 : 17, lineHeight: 1.8, opacity: 0.8, marginBottom: 32 }}>{c.bio}</p>
                <div style={{ borderLeft: `4px solid ${c.color}`, paddingLeft: 24, margin: "32px 0", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", opacity: 0.9 }}>
                   {c.quote}
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <button 
                    onClick={() => window.open(c.profileUrl, '_blank')}
                    style={{ background: "transparent", border: `2px solid ${dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`, color: dark ? "#fff" : "#111", padding: "12px 24px", borderRadius: 12, fontWeight: 700, cursor: "pointer", flex: isMobile ? 1 : "initial" }}
                  >
                    Follow for free
                  </button>
                  <button 
                    onClick={() => window.open(c.profileUrl, '_blank')}
                    style={{ background: "none", border: "none", color: "#7B51CC", fontWeight: 700, cursor: "pointer", flex: isMobile ? 1 : "initial" }}
                  >
                    View Profile →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Digest Footer Redesign */}
        <section style={{ marginTop: isMobile ? 80 : 120, textAlign: "center", borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, paddingTop: 80 }}>
          {/* Subscribe Pill */}
          <div style={{ padding: "14px 28px", borderRadius: 16, background: dark ? "rgba(123,81,204,0.1)" : "rgba(123,81,204,0.05)", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ color: "#7B51CC" }}>
              <Logo size={isMobile ? 16 : 20} />
            </div>
            <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 800, color: "#7B51CC" }}>Subscribe to these Free LuvlyFans Accounts!</span>
          </div>

          <div style={{ display: "block", marginBottom: 80 }}>
            <button style={{ 
              background: "#0ea5e9", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 99, 
              fontSize: 16, fontWeight: 800, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 10px 25px rgba(14,165,233,0.3)", transition: "transform 0.2s"
            }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
              <Icon name="share-rectangle" size={20} color="#fff" /> Share
            </button>
          </div>

          {/* Related Posts */}
          <div style={{ textAlign: "left", maxWidth: 1200, margin: "0 auto" }}>
            <h2 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 900, marginBottom: 40, fontFamily: "'Sora', sans-serif" }}>Related Posts</h2>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 32 : 24 }}>
              {ARTICLES.slice(0, 3).map(a => (
                <div key={a.id} onClick={() => onRead(a)} style={{ 
                  borderRadius: 20, overflow: "hidden", background: dark ? "rgba(255,255,255,0.02)" : "#f9f9f9", cursor: "pointer",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"}`, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "#7B51CC";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
                }}>
                  <div style={{ height: 220, position: "relative" }}>
                    <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2 }}>
                       <span style={{ fontSize: 11, fontWeight: 800, background: "#7B51CC", color: "#fff", padding: "4px 10px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.tag}</span>
                    </div>
                    <div style={{ width: "100%", height: "100%", background: `linear-gradient(45deg, ${a.gradient || "from-purple-500 to-indigo-600"})`, opacity: 0.1, position: "absolute", inset: 0 }} />
                    <img src={a.thumbnail || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500"} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "28px" }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.4, margin: 0, color: dark ? "#fff" : "#111" }}>{a.title}</h3>
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
