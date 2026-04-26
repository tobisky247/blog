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
              <div className="featured-grid">
                {featured.map((a) => (
                  <ArticleCard
                    key={a.id}
                    article={a}
                    dark={dark}
                    onRead={onRead}
                    featured
                  />
                ))}
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
                      <div className="trending-date">{a.date}</div>
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
