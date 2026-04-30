import React, { useState } from "react";
import { Badge, CTAButton, ArticleCard } from "../components";

const CREATOR_ARTICLES = [
  {
    id: 1,
    slug: "trinity-infinity",
    title: "In Conversation with Trinity Infinity: Finding Her Own Path and Building Connection Over Numbers",
    author: "Trinity Infinity",
    date: "April 30, 2026",
    excerpt: "Every creator builds differently. In this feature, we spoke with Trinity Infinity about how she got started, what's worked for her, and what she's learned along the way.",
    thumbnail: "/assets/creators/trinity1.jpeg",
  }
];

export function CreatorCornerPage({ dark, setPage }) {
  const [selectedArticle, setSelectedArticle] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith("/creator-corner/")) {
      const slug = path.split("/creator-corner/")[1];
      const found = CREATOR_ARTICLES.find(a => a.slug === slug);
      return found ? found.id : null;
    }
    return null;
  });

  const isMobile = window.innerWidth < 800;

  React.useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      if (path.startsWith("/creator-corner/")) {
        const slug = path.split("/creator-corner/")[1];
        const found = CREATOR_ARTICLES.find(a => a.slug === slug);
        setSelectedArticle(found ? found.id : null);
      } else if (path === "/creator-corner") {
        setSelectedArticle(null);
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const handleSelectArticle = (id) => {
    setSelectedArticle(id);
    const article = CREATOR_ARTICLES.find(a => a.id === id);
    if (article) {
      window.history.pushState({ page: "creator-corner", articleId: id }, "", `/creator-corner/${article.slug}`);
    } else {
      window.history.pushState({ page: "creator-corner" }, "", `/creator-corner`);
    }
    window.scrollTo(0, 0);
  };

  if (selectedArticle === 1) {
    return (
      <div style={{ paddingBottom: isMobile ? 60 : 100 }}>
        <button
          onClick={() => {
            handleSelectArticle(null);
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
          ← Back to Creator Voices
        </button>

        {/* Hero Text */}
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
              background: `url("/assets/creators/trinity1.jpeg") center/cover no-repeat`,
              filter: "blur(40px) brightness(0.7)",
            }}
          />
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
            <Badge>CREATOR VOICES</Badge>
            <h1
              style={{
                fontSize: "clamp(24px, 5vw, 48px)",
                fontWeight: 800,
                margin: "24px 0",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              In Conversation with <span style={{ color: "#7B51CC" }}>Trinity Infinity</span>: Finding Her Own Path and Building Connection Over Numbers
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
              Published April 30, 2026 • By Trinity Infinity
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
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/assets/creators/trinity1.jpeg"
              alt="Trinity"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(20px)",
                opacity: 0.6,
                transform: "scale(1.1)",
                zIndex: 0,
              }}
            />
            <img
              src="/assets/creators/trinity1.jpeg"
              alt="Trinity"
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

        {/* Article Content */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 5vw", fontSize: 18, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.85)" : "#333" }}>
          
          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24 }}>Introduction</h2>
          <p style={{ marginBottom: 20 }}>Every creator builds differently.</p>
          <p style={{ marginBottom: 40 }}>In this Creator Voices feature, we spoke with Trinity Infinity about how she got started, what’s worked for her, and what she’s learned along the way.</p>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Getting Started</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>How did you get started as a creator?</h3>
          <p style={{ marginBottom: 20 }}>I started dabbling in fetish modelling and camming after a coworker introduced me to FetLife while I was working at a Halloween store. I stopped for a while and tried to have a “normal” job, but eventually I came back to it.</p>
          <p style={{ marginBottom: 40 }}>I started doing phone-based content full time while using my own photos. That naturally led to callers wanting to see more, which turned into custom photos, videos, and eventually camming again.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>Did you choose a specific niche? If so, why?</h3>
          <p style={{ marginBottom: 40 }}>No, I’ve never been someone who sticks to just one thing. I like exploring different fantasies, fetishes, and kinks. It keeps things interesting for me and for the people watching.</p>

          {/* First Inline Image Spread */}
          <div style={{ margin: "60px 0", borderRadius: 24, overflow: "hidden", position: "relative", background: dark ? "#111" : "#f5f5f5" }}>
            <div style={{
              position: "absolute", inset: 0, backgroundImage: `url("/assets/creators/trinity.png")`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px)", opacity: 0.5
            }} />
            <img src="/assets/creators/trinity.png" alt="Trinity Content" style={{ width: "100%", position: "relative", zIndex: 1, maxHeight: 600, objectFit: "contain" }} />
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Early Challenges</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What was the hardest part when you started?</h3>
          <p style={{ marginBottom: 20 }}>Honestly, managing money.</p>
          <p style={{ marginBottom: 40 }}>When you start earning properly, it’s easy to get caught up in spending on things you don’t really need. But I had debt, no car, and a living situation I needed to change, so saving became my main focus.</p>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Your Approach</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What do you focus on when building your page?</h3>
          <p style={{ marginBottom: 20 }}>I focus on being myself. I like to have fun, experiment, and show different sides of my personality.</p>
          <p style={{ marginBottom: 40 }}>I’m kinky and playful, but I’m also a stoner and a bit of a nerd. Having different interests means there’s something for different types of people.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>How do you stay consistent?</h3>
          <p style={{ marginBottom: 20 }}>I won’t lie, consistency is something I struggle with.</p>
          <p style={{ marginBottom: 40 }}>I like to say I’m “consistently inconsistent”. I’m always working on multiple things at once, so it can be hard deciding where to put my time.</p>

          {/* Second Inline Image Spread */}
          <div style={{ margin: "60px 0", borderRadius: 24, overflow: "hidden", position: "relative", background: dark ? "#111" : "#f5f5f5" }}>
            <div style={{
              position: "absolute", inset: 0, backgroundImage: `url("/assets/creators/trinity3.jpeg")`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(20px)", opacity: 0.5
            }} />
            <img src="/assets/creators/trinity3.jpeg" alt="Trinity Lifestyle" style={{ width: "100%", position: "relative", zIndex: 1, maxHeight: 600, objectFit: "contain" }} />
          </div>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Growth</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>How do you grow your fan base?</h3>
          <p style={{ marginBottom: 20 }}>I focus more on building one-on-one connections rather than trying to have a huge following.</p>
          <p style={{ marginBottom: 40 }}>I also prefer platforms that have strong internal traffic instead of relying too much on social media.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What’s working for you right now?</h3>
          <p style={{ marginBottom: 20 }}>Taking things at my own pace.</p>
          <p style={{ marginBottom: 40 }}>Sometimes I’m really productive and motivated, other times I need to slow down. Finding that balance is what’s working for me right now.</p>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Retention</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>How do you keep your fans loyal and engaged?</h3>
          <p style={{ marginBottom: 20 }}>I build a relationship with them.</p>
          <p style={{ marginBottom: 40 }}>I talk to them, let them talk to me, and create a space where they feel comfortable. Some people connect more deeply, especially if I understand what they’re into and how they think.</p>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Reflection</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What has been your biggest highlight so far?</h3>
          <p style={{ marginBottom: 20 }}>Being nominated for AVN awards, twice, for Favorite Female Indie Creator.</p>
          <p style={{ marginBottom: 40 }}>It means a lot, especially as someone who doesn’t have a massive following.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What would you do differently if you started today?</h3>
          <p style={{ marginBottom: 20 }}>I would set up the business side properly from the start.</p>
          <p style={{ marginBottom: 40 }}>Things like having an accountant and setting up an LLC would have saved me a lot of stress and time.</p>

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24, marginTop: 60 }}>Advice</h2>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#7B51CC", marginBottom: 12 }}>What advice would you give to new creators?</h3>
          <p style={{ marginBottom: 20 }}>This is a marathon, not a sprint.</p>
          <p style={{ marginBottom: 20 }}>It takes time to build something, and it’s not easy. You need patience, consistency, and a willingness to work through the slow periods.</p>
          <p style={{ marginBottom: 40 }}>Also, find a support system, take care of yourself, and don’t forget to enjoy it. There are a lot of good days in this space.</p>

          <hr style={{ border: 0, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, margin: "60px 0" }} />

          <h2 style={{ fontSize: 32, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 24 }}>About the Creator</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 24, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", padding: 32, borderRadius: 24 }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url("/assets/creators/trinity1.jpeg")`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(10px)", transform: "scale(1.2)" }} />
              <img src="/assets/creators/trinity1.jpeg" alt="Trinity" style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }} />
            </div>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: dark ? "#fff" : "#111", marginBottom: 8 }}>Trinity Infinity</h3>
              <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 16, lineHeight: 1.5 }}>
                A creator focused on connection, creativity, and exploring different sides of content and personality.
              </p>
              <a href="https://luvlyfans.com/TrinityInfinity" target="_blank" rel="noreferrer" style={{ color: "#7B51CC", fontWeight: 700, textDecoration: "none", fontSize: 15 }}>
                👉 Follow Trinity Infinity on LuvlyFans
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
        <Badge>CREATOR VOICES</Badge>
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

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))", gap: 32 }}>
        {CREATOR_ARTICLES.map((article) => (
          <div
            key={article.id}
            onClick={() => {
              handleSelectArticle(article.id);
            }}
            style={{
              cursor: "pointer",
              background: dark ? "rgba(255,255,255,0.03)" : "#fff",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              transition: "transform 0.3s, box-shadow 0.3s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = dark ? "0 30px 60px rgba(0,0,0,0.5)" : "0 30px 60px rgba(0,0,0,0.1)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ height: 240, position: "relative", overflow: "hidden" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("${article.thumbnail}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  opacity: 0.6,
                  transform: "scale(1.1)",
                }}
              />
              <img
                src={article.thumbnail}
                alt={article.title}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  zIndex: 1,
                }}
              />
            </div>
            <div style={{ padding: 32 }}>
              <Badge color="#7B51CC">CREATOR VOICES</Badge>
              <h3 style={{ fontSize: 24, fontWeight: 800, margin: "16px 0", lineHeight: 1.3 }}>{article.title}</h3>
              <p style={{ opacity: 0.7, fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>{article.excerpt}</p>
              <div style={{ color: "#7B51CC", fontWeight: 700, fontSize: 14 }}>Read Full Article →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
