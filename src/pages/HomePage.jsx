import React, { useState } from "react";
import "../home.css";
import {
  Badge,
  ArticleCard,
  CTAButton,
  EmailCapture,
  Icon,
} from "../components";
import { useInView } from "../hooks";
import { ARTICLES, CATEGORIES } from "../data";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

export function HomePage({ dark, onRead, setPage }) {
  const isMobile = useIsMobile();
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [heroRef, heroInView] = useInView(0.05);
  const [featuredRef, featuredInView] = useInView(0.1);

  const filtered = ARTICLES.filter((a) => {
    const matchCat = cat === "All" || a.category === cat;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const featured = ARTICLES.filter((a) => a.featured);
  const trending = ARTICLES.filter((a) => a.trending);
  const catColors = {
    "Make Money": "#059669",
    Growth: "#D946EF",
    Guides: "#0284C7",
  };

  const heroBg = dark
    ? "radial-gradient(ellipse at 60% 0%, rgba(123,81,204,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 50%)"
    : "radial-gradient(ellipse at 60% 0%, rgba(123,81,204,0.07) 0%, transparent 60%)";

  const dateLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="page-wrap">
      {/* ── Hero ── */}
      <section ref={heroRef} className="hero-section">
        <div className="hero-bg-gradient" style={{ background: heroBg }} />
        <div className="hero-container">
          <div
            className="hero-animate"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <h1 className="hero-title">
              Grow. <span className="gradient-text">Monetize.</span> Win.
            </h1>
            <p className="hero-subtitle">
              Real strategies, proven playbooks, insights, and tactics designed
              to help you grow faster and make more on LuvlyFans.
            </p>
            <div className="hero-cta-row">
              <CTAButton size="lg" onClick={() => setPage("hub")}>
                Explore the Creator Hub
              </CTAButton>
            </div>

            {/* Asymmetrical featured grid */}
            <div className="hero-grid">
              {/* Left column - Single large card */}
              <div className="hero-col">
                {/* Card 1 — Free Accounts (Full height) */}
                <div
                  className="hero-card hero-card-large hero-card-full"
                  onClick={() => setPage("free-creators")}
                >
                  <img
                    loading="eager"
                    fetchPriority="high"
                    src="/assets/homepage/Free accounts.png"
                    alt="Free LuvlyFans Accounts"
                  />
                  <div className="hero-overlay">
                    <h className="hero-card-title">
                      Free LuvlyFans Accounts to Follow in {dateLabel}
                    </h>
                  </div>
                </div>
              </div>

              {/* Right column - Two stacked cards */}
              <div className="hero-right-col">
                {/* Card 2 — LuvlyFans Standard */}
                <div
                  className="hero-card hero-card-right sm"
                  onClick={() => {
                    const a = ARTICLES.find(
                      (a) => a.slug === "luvlyfans-standard",
                    );
                    if (a) {
                      onRead(a);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  <img
                    loading="eager"
                    fetchPriority="high"
                    src="/assets/promotions/spotlight_Image.png"
                    alt="The LuvlyFans Standard"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <div className="hero-overlay-dark" />
                  <div className="hero-card-bottom-content">
                    <h4 className="hero-card-bottom-title">
                      Why the Top 1% are Switching to LuvlyFans.
                    </h4>
                    {/*<div className="hero-card-cta-row">
                      <span className="hero-card-cta-label">Read More</span>
                      <div className="hero-card-cta-line" />
                    </div>*/}
                  </div>
                </div>

                {/* Card 3 — Creator Habits */}
                <div
                  className="hero-card hero-card-right sm"
                  onClick={() => {
                    const a = ARTICLES.find((a) => a.slug === "creator-habits");
                    if (a) {
                      onRead(a);
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  <img
                    loading="eager"
                    fetchPriority="high"
                    src="/assets/homepage/hero-26.png"
                    alt="Creator Habits"
                  />
                  <div className="hero-overlay-dark" />
                  <div className="hero-card-bottom-content">
                    <h4 className="hero-card-bottom-title">
                      5 Habits That Separate Creators Who Earn From Those Who
                      Don't
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured mini-cards */}
            <div
              className="mini-cards-grid"
              style={{ opacity: heroInView ? 1 : 0 }}
            >
              {featured.slice(0, 2).map((a) => (
                <div key={a.id} className="mini-card" onClick={() => onRead(a)}>
                  <div className="mini-card-meta">
                    <div
                      className="mini-card-dot"
                      style={{ background: catColors[a.category] }}
                    />
                    <span
                      className="mini-card-cat"
                      style={{ color: catColors[a.category] }}
                    >
                      {a.category}
                    </span>
                    <span className="mini-card-read">{a.readTime}</span>
                  </div>
                  <div className="mini-card-title">{a.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Creator Voices CTA ── */}
      <section
        style={{
          padding: isMobile ? "60px 5vw" : "80px 5vw",
          background: dark
            ? "linear-gradient(135deg, rgba(123,81,204,0.08) 0%, rgba(139,92,246,0.05) 100%)"
            : "linear-gradient(135deg, rgba(123,81,204,0.05) 0%, rgba(139,92,246,0.03) 100%)",
          borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 60,
            alignItems: "center",
          }}
        >
          {/* Text Content */}
          <div>
            <Badge color="#7B51CC" style={{ marginBottom: 16 }}>
              CREATOR VOICES
            </Badge>
            <h2
              style={{
                fontSize: isMobile ? 28 : 38,
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 16,
                color: dark ? "#fff" : "#0f0f0f",
              }}
            >
              Real Creators.{" "}
              <span className="gradient-text">Real Stories.</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? 15 : 17,
                lineHeight: 1.6,
                color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                marginBottom: 24,
              }}
            >
              Go behind the scenes with top creators on LuvlyFans. Hear their
              journeys, challenges, wins, and honest advice on what it really
              takes to grow and succeed.
            </p>
            <CTAButton onClick={() => setPage("creator-voices")}>
              Explore Creator Voices
            </CTAButton>
          </div>

          {/* Image Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
          >
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 20,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                animation: "subtle-bounce 3s ease-in-out infinite",
                animationDelay: "0s",
              }}
            >
              <img
                src="/assets/creators/trinity1.jpeg"
                alt="Trinity Infinity"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 20,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                marginTop: isMobile ? 0 : 40,
                animation: "subtle-bounce 3s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            >
              <img
                src="/assets/creators/Quietlyvae.avn1.jpeg"
                alt="Creator Spotlight"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 20,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                marginTop: isMobile ? 0 : -40,
                animation: "subtle-bounce 3s ease-in-out infinite",
                animationDelay: "1s",
              }}
            >
              <img
                src="/assets/creators/Ellie_bee.png"
                alt="Creator Feature"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: "1",
                borderRadius: 20,
                overflow: "hidden",
                background: dark ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                animation: "subtle-bounce 3s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            >
              <img
                src="/assets/creators/Loulalou.png"
                alt="Creator Interview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ── */}
      <div className="articles-section">
        <div className="articles-container">
          {/* Section header */}
          <div className="section-header">
            <h2 className="section-title">
              {cat === "All" ? "Featured Articles" : `${cat} Articles`}
            </h2>
            <div className="section-divider" />
          </div>

          {/* Category filters */}
          <div className="cat-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`cat-btn${cat === c ? " active" : ""}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {cat === "All" && !search && (
            <>
              <div
                ref={featuredRef}
                className="featured-grid"
                style={{
                  opacity: featuredInView ? 1 : 0,
                  transform: featuredInView
                    ? "translateY(0)"
                    : "translateY(40px)",
                  transition: "opacity 0.7s ease, transform 0.7s ease",
                }}
              >
                {featured.map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      opacity: featuredInView ? 1 : 0,
                      transform: featuredInView
                        ? "translateY(0)"
                        : "translateY(40px)",
                      transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                    }}
                  >
                    <ArticleCard
                      article={a}
                      dark={dark}
                      onRead={onRead}
                      featured
                    />
                  </div>
                ))}
              </div>

              {/* ── Get Featured Section ── */}
              <div
                style={{
                  margin: isMobile ? "60px -5vw" : "80px 0",
                  padding: isMobile ? "60px 5vw" : "80px 60px",
                  background: dark
                    ? "linear-gradient(135deg, rgba(123,81,204,0.12) 0%, rgba(139,92,246,0.08) 100%)"
                    : "linear-gradient(135deg, rgba(123,81,204,0.08) 0%, rgba(139,92,246,0.05) 100%)",
                  borderRadius: isMobile ? 0 : 32,
                  border: isMobile
                    ? "none"
                    : `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(123,81,204,0.15)"}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Floating Social Icons */}
                {!isMobile && (
                  <>
                    {/* Instagram - Top Right */}
                    <div
                      style={{
                        position: "absolute",
                        top: 60,
                        right: 80,
                        width: 140,
                        height: 140,
                        animation:
                          "float 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                        animationDelay: "0s",
                      }}
                    >
                      <img
                        src="/assets/instagram.png"
                        alt="Instagram"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* TikTok - Top Left */}
                    <div
                      style={{
                        position: "absolute",
                        top: 80,
                        left: 60,
                        width: 130,
                        height: 130,
                        animation:
                          "float 7s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                        animationDelay: "1.5s",
                      }}
                    >
                      <img
                        src="/assets/tiktok icon.png"
                        alt="TikTok"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* Reddit - Bottom Left */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 60,
                        left: 100,
                        width: 135,
                        height: 135,
                        animation:
                          "float 8.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                        animationDelay: "3s",
                      }}
                    >
                      <img
                        src="/assets/reddit.png"
                        alt="Reddit"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    {/* Twitter/X - Bottom Right */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 80,
                        right: 60,
                        width: 130,
                        height: 130,
                        animation:
                          "float 7.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                        animationDelay: "4.5s",
                      }}
                    >
                      <img
                        src="/assets/x- icon.png"
                        alt="X/Twitter"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </>
                )}

                {/* Background decoration */}
                <div
                  style={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 300,
                    height: 300,
                    background:
                      "radial-gradient(circle, rgba(123,81,204,0.2) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -80,
                    left: -80,
                    width: 250,
                    height: 250,
                    background:
                      "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    maxWidth: 800,
                    margin: "0 auto",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Icon/Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7B51CC, #8b5cf6)",
                      marginBottom: 24,
                      boxShadow: "0 8px 24px rgba(123,81,204,0.3)",
                    }}
                  >
                    <Icon name="star" size={28} color="#fff" />
                  </div>

                  <h2
                    style={{
                      fontSize: isMobile ? 32 : 42,
                      fontWeight: 900,
                      marginBottom: 16,
                      color: dark ? "#fff" : "#0f0f0f",
                      lineHeight: 1.2,
                    }}
                  >
                    Get Featured on Our Socials
                  </h2>

                  <p
                    style={{
                      fontSize: isMobile ? 16 : 19,
                      lineHeight: 1.7,
                      color: dark
                        ? "rgba(255,255,255,0.75)"
                        : "rgba(0,0,0,0.7)",
                      marginBottom: 32,
                      maxWidth: 600,
                      margin: "0 auto 32px",
                    }}
                  >
                    Submit your content and get promoted across LuvlyFans'
                    social platforms. Reach thousands of potential fans and grow
                    your audience.
                  </p>

                  {/* Features */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                      gap: 20,
                      marginBottom: 40,
                    }}
                  >
                    <div
                      style={{
                        padding: 20,
                        background: dark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.6)",
                        borderRadius: 16,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(123,81,204,0.1)"}`,
                      }}
                    >
                      <Icon
                        name="users 01"
                        size={24}
                        color="#7B51CC"
                        style={{ marginBottom: 12 }}
                      />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          marginBottom: 6,
                          color: dark ? "#fff" : "#0f0f0f",
                        }}
                      >
                        Wide Reach
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: dark
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        Get seen by thousands across all platforms
                      </div>
                    </div>

                    <div
                      style={{
                        padding: 20,
                        background: dark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.6)",
                        borderRadius: 16,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(123,81,204,0.1)"}`,
                      }}
                    >
                      <Icon
                        name="diamond"
                        size={24}
                        color="#7B51CC"
                        style={{ marginBottom: 12 }}
                      />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          marginBottom: 6,
                          color: dark ? "#fff" : "#0f0f0f",
                        }}
                      >
                        100% Free
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: dark
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        Exclusive promotion for LuvlyFans creators
                      </div>
                    </div>

                    <div
                      style={{
                        padding: 20,
                        background: dark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(255,255,255,0.6)",
                        borderRadius: 16,
                        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(123,81,204,0.1)"}`,
                      }}
                    >
                      <Icon
                        name="chart-arrow-up"
                        size={24}
                        color="#7B51CC"
                        style={{ marginBottom: 12 }}
                      />
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          marginBottom: 6,
                          color: dark ? "#fff" : "#0f0f0f",
                        }}
                      >
                        Grow Faster
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: dark
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        Build your fanbase with official promotion
                      </div>
                    </div>
                  </div>

                  <CTAButton
                    size="lg"
                    onClick={() =>
                      window.open(
                        "https://get-featured.luvlyfans.com/",
                        "_blank",
                      )
                    }
                  >
                    Submit Your Content
                  </CTAButton>
                </div>
              </div>

              <div className="trending-header">
                <Icon name="fire" size={24} color="#7B51CC" />
                <h2 className="section-title">Trending Now</h2>
                <div className="section-divider" />
              </div>

              <div className="trending-list">
                {trending.map((a, i) => (
                  <div
                    key={a.id}
                    className="trending-row"
                    onClick={() => onRead(a)}
                  >
                    <div className="trending-number">0{i + 1}</div>
                    <div className="trending-info">
                      <div className="trending-cat-row">
                        <Badge color={catColors[a.category]}>
                          {a.category}
                        </Badge>
                      </div>
                      <div className="trending-title">{a.title}</div>
                    </div>
                    <div className="trending-meta">
                      <div className="trending-read-time">
                        {a.readTime} read
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {(cat !== "All" || search) && (
            <div className="filtered-grid">
              {filtered.length ? (
                filtered.map((a) => (
                  <ArticleCard
                    key={a.id}
                    article={a}
                    dark={dark}
                    onRead={onRead}
                    featured
                  />
                ))
              ) : (
                <div className="no-results">
                  No articles found. Try a different search.
                </div>
              )}
            </div>
          )}

          <div className="email-capture-row">
            <EmailCapture dark={dark} />
          </div>
        </div>
      </div>
    </div>
  );
}
