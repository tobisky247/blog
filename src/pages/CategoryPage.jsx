import React from "react";
import "../home.css";
import { ArticleCard, Badge } from "../components";
import { ARTICLES } from "../data";

export function CategoryPage({ category, onRead, dark }) {
  // Filter articles by category
  const categoryArticles = ARTICLES.filter(
    (article) => article.category === category,
  );

  // Category metadata
  const categoryInfo = {
    "Make Money": {
      title: "Make Money as a Creator on LuvlyFans",
      description:
        "Learn proven strategies to build sustainable income streams, optimize your pricing, and maximize your earnings as a creator.",
    },
    Growth: {
      title: "Grow Your Audience and Fanbase",
      description:
        "Discover tactics to grow your audience, increase engagement, and build a loyal fanbase that sticks around.",
    },
    Guides: {
      title: "Creator Guides and Best Practices",
      description:
        "Step-by-step guides and practical tips to help you master every aspect of your creator journey.",
    },
  };

  const info = categoryInfo[category] || categoryInfo["Guides"];

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      {/* Hero Section */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 5vw 60px",
        }}
      >
        {/* Back to Blog */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#7B51CC",
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: 32,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          <img
            src="/assets/svg/arrow-left.svg"
            alt="Back"
            style={{
              width: 16,
              height: 16,
              filter:
                "brightness(0) saturate(100%) invert(43%) sepia(72%) saturate(2026%) hue-rotate(247deg) brightness(89%) contrast(89%)",
            }}
          />
          Back to Blog
        </a>

        {/* Category Header */}
        <div style={{ marginBottom: 48 }}>
          <h1
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              marginBottom: 16,
            }}
          >
            {info.title}
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
              maxWidth: 700,
              lineHeight: 1.6,
            }}
          >
            {info.description}
          </p>
        </div>

        {/* Article Count */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            paddingBottom: 24,
            borderBottom: dark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Badge variant="purple">{categoryArticles.length} Articles</Badge>
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {categoryArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onRead(article)}
            />
          ))}
        </div>

        {/* Empty State */}
        {categoryArticles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <p
              style={{
                fontSize: 18,
                color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
              }}
            >
              No articles found in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
