import React, { useState, useEffect } from "react";
import "../article.css";
import { Badge, ArticleCard, CTAButton, Icon } from "../components";
import { useScrollProgress } from "../hooks";
import { ARTICLES } from "../data";

// Import individual article components
import SustainableMonthlyIncome from "../articles/sustainable-monthly-income";
import PricingStrategy from "../articles/pricing-strategy";
import GetSubscribers from "../articles/get-subscribers";
import BuildingConsistentMonthlyIncome from "../articles/building-consistent-monthly-income";
import ContentIdeasThatSell from "../articles/content-ideas-that-sell";
import PromoteYourProfile from "../articles/promote-your-profile";
import BuildYourFanbase from "../articles/build-your-fanbase";
import CreatorHabits from "../articles/creator-habits";
import LuvlyfansStandard from "../articles/luvlyfans-standard";
import SetupFirstImpressions from "../articles/setup-first-impressions";
import ContentDirection from "../articles/content-direction";
import First30Days from "../articles/first-30-days";
import PricingContent from "../articles/pricing-content";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return isMobile;
}

export function ArticlePage({ article, dark, onBack, onRead }) {
  const isMobile = useIsMobile();
  const progress = useScrollProgress();
  const others = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);
  const catColors = {
    "Make Money": "#7B51CC",
    Growth: "#8b5cf6",
    Guides: "#0ea5e9",
  };
  const color = catColors[article.category] || "#7B51CC";

  // Map article slugs to their components
  const ARTICLE_COMPONENTS = {
    "sustainable-monthly-income": SustainableMonthlyIncome,
    "pricing-strategy": PricingStrategy,
    "get-subscribers": GetSubscribers,
    "building-consistent-monthly-income": BuildingConsistentMonthlyIncome,
    "content-ideas-that-sell": ContentIdeasThatSell,
    "promote-your-profile": PromoteYourProfile,
    "build-your-fanbase": BuildYourFanbase,
    "creator-habits": CreatorHabits,
    "luvlyfans-standard": LuvlyfansStandard,
    "setup-first-impressions": SetupFirstImpressions,
    "content-direction": ContentDirection,
    "first-30-days": First30Days,
    "pricing-content": PricingContent,
  };

  const ArticleContent = ARTICLE_COMPONENTS[article.slug];

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      {/* Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${progress * 100}%`,
          height: 3,
          background: "linear-gradient(90deg, #7B51CC, #8b5cf6)",
          zIndex: 1000,
          transition: "width 0.1s",
        }}
      />

      {/* Hero */}
      <div style={{ padding: "48px 5vw 0", maxWidth: 1100, margin: "0 auto" }}>
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
            fontSize: 13,
            fontWeight: 600,
            padding: "0 0 24px",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← Back to Blog
        </button>
      </div>

      <article
        style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw 80px" }}
      >
        <div
          style={{
            marginBottom: 32,
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Badge color={color}>{article.category}</Badge>
          {article.trending && (
            <Badge color="#f59e0b">
              <Icon
                name="fire"
                size={12}
                color="#fff"
                style={{ marginRight: 4 }}
              />{" "}
              Trending
            </Badge>
          )}
          <span
            style={{
              fontSize: 12,
              color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            }}
          >
            {article.readTime} read · {article.date}
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 20px",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            lineHeight: 1.15,
            fontFamily: "'Lora', Georgia, serif",
            color: dark ? "#fff" : "#0a0a0a",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            margin: "0 0 28px",
            fontSize: 18,
            color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
            lineHeight: 1.7,
          }}
        >
          {article.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "20px 24px",
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
            borderRadius: 14,
            border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 16,
                color: dark ? "#fff" : "#0f0f0f",
              }}
            >
              By {article.author}
            </div>
            <div
              style={{
                fontSize: 13,
                color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
              }}
            >
              {article.authorRole} · {article.readTime} read
            </div>
          </div>
        </div>

        {/* Hero Image / Banner */}
        <div
          style={{
            height: isMobile ? 240 : 400,
            borderRadius: 18,
            background: `linear-gradient(135deg, ${article.gradient
              .replace("from-", "")
              .replace(" to-", ", ")
              .split(",")
              .map((c) => {
                const map = {
                  "rose-500": "#7B51CC",
                  "pink-600": "#db2777",
                  "amber-500": "#f59e0b",
                  "orange-500": "#f97316",
                  "violet-500": "#8b5cf6",
                  "purple-600": "#9333ea",
                  "cyan-500": "#06b6d4",
                  "blue-600": "#2563eb",
                  "emerald-500": "#10b981",
                  "teal-600": "#0d9488",
                  "fuchsia-500": "#d946ef",
                  "rose-600": "#613db7",
                };
                return map[c.trim()] || "#7B51CC";
              })
              .join(", ")})`,
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {article.thumbnail ? (
            <img
              loading="eager"
              fetchPriority="high"
              src={article.thumbnail}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontSize: 48, marginBottom: 8 }}>
                <Icon name="chart-line" size={48} color="#fff" />
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.9 }}>
                Visual guide coming soon
              </div>
            </div>
          )}
        </div>

        {/* Article body */}
        <div
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: dark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.72)",
          }}
        >
          {ArticleContent ? (
            <ArticleContent />
          ) : (
            <>
              <p>
                This is a placeholder for the full article content. In a
                production environment, this would be fetched from a CMS based
                on the slug: <strong>{article.slug}</strong>.
              </p>
              <p>
                LuvlyFans is dedicated to providing creators with the best tools
                and educational resources to grow their digital business.
              </p>
            </>
          )}
        </div>

        {/* Inline CTA */}
        <div
          style={{
            margin: "40px 0",
            padding: "32px",
            background: dark
              ? "rgba(123,81,204,0.08)"
              : "rgba(123,81,204,0.05)",
            border: "1.5px solid rgba(123,81,204,0.2)",
            borderRadius: 18,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#7B51CC",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Ready to Apply This?
          </div>
          <h3
            style={{
              margin: "0 0 10px",
              fontSize: 22,
              fontWeight: 800,
              color: dark ? "#fff" : "#0f0f0f",
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            Start Your LuvlyFans Page Today
          </h3>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 14,
              color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
            }}
          >
            Join thousands of creators earning on the platform built for growth.
            Setup takes under 10 minutes.
          </p>
          <CTAButton
            size="lg"
            onClick={() => window.open("https://luvlyfans.com/", "_blank")}
          >
            Create a Free Account
          </CTAButton>
        </div>

        {/* Related */}
        <div style={{ marginTop: 60 }}>
          <h3
            style={{
              margin: "0 0 20px",
              fontSize: 20,
              fontWeight: 800,
              color: dark ? "#fff" : "#0f0f0f",
              fontFamily: "'Lora', Georgia, serif",
            }}
          >
            Keep Reading
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {others.map((a) => (
              <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
