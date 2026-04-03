import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ARTICLES = [
  {
    id: 1, slug: "make-10k-first-month",
    category: "Make Money", tag: "make-money",
    title: "How to Make Your First $10,000 as a Creator — In Under 30 Days",
    excerpt: "The exact playbook 200+ LuvlyFans creators used to hit 5 figures fast. No fluff, no gatekeeping.",
    readTime: "8 min", author: "Ava Chen", authorRole: "Top Creator · $40K/mo",
    authorAvatar: "AC", date: "Mar 22, 2026", featured: true, trending: true,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: 2, slug: "pricing-strategies",
    category: "Make Money", tag: "make-money",
    title: "The Pricing Strategy That 3x'd My Subscription Revenue",
    excerpt: "Stop guessing. Here's the data-backed approach to pricing your tiers, PPV, and bundles.",
    readTime: "6 min", author: "Marcus Reid", authorRole: "Creator Coach",
    authorAvatar: "MR", date: "Mar 20, 2026", featured: true, trending: false,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 3, slug: "get-1000-subscribers",
    category: "Growth", tag: "growth",
    title: "Get Your First 1,000 Subscribers Without Buying Ads",
    excerpt: "Organic growth tactics that actually work in 2026. Funnels, hooks, and the content formats dominating right now.",
    readTime: "10 min", author: "Zoe Park", authorRole: "Growth Strategist",
    authorAvatar: "ZP", date: "Mar 18, 2026", featured: false, trending: true,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: 4, slug: "onlyfans-vs-luvlyfans",
    category: "Guides", tag: "guides",
    title: "OnlyFans vs LuvlyFans: The Honest Comparison Every Creator Needs",
    excerpt: "Platform fees, payout speed, discovery tools, creator support. We break it all down.",
    readTime: "7 min", author: "LuvlyFans Team", authorRole: "Platform",
    authorAvatar: "LF", date: "Mar 15, 2026", featured: true, trending: true,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 5, slug: "content-ideas-that-sell",
    category: "Guides", tag: "guides",
    title: "50 Content Ideas That Actually Convert to Paid Subscribers",
    excerpt: "Steal these ideas. Proven formats that keep fans engaged and wallets open.",
    readTime: "12 min", author: "Ava Chen", authorRole: "Top Creator · $40K/mo",
    authorAvatar: "AC", date: "Mar 12, 2026", featured: false, trending: false,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 6, slug: "creator-case-study-luna",
    category: "Case Studies", tag: "case-studies",
    title: "Case Study: How Luna Made $85K in 6 Months From Zero",
    excerpt: "A brutally honest look at the content calendar, promotion strategy, and mindset that fueled her rise.",
    readTime: "15 min", author: "Marcus Reid", authorRole: "Creator Coach",
    authorAvatar: "MR", date: "Mar 8, 2026", featured: false, trending: true,
    gradient: "from-fuchsia-500 to-rose-600",
  },
];

const CATEGORIES = ["All", "Make Money", "Growth", "Guides", "Case Studies"];

const HUB_MODULES = [
  {
    level: "Beginner", icon: "🌱", color: "from-emerald-400 to-teal-500",
    guides: [
      { title: "Setting Up Your Page for Maximum First Impressions", time: "5 min" },
      { title: "Choosing Your Niche & Content Angle", time: "8 min" },
      { title: "Your First 30 Days: The Exact Roadmap", time: "12 min" },
      { title: "Pricing 101: What to Charge When Starting Out", time: "6 min" },
    ]
  },
  {
    level: "Intermediate", icon: "🚀", color: "from-violet-400 to-purple-600",
    guides: [
      { title: "Building a Content Calendar That Keeps Fans Addicted", time: "10 min" },
      { title: "Cross-Platform Promotion Mastery", time: "9 min" },
      { title: "PPV Strategy: The Art of the Upsell", time: "7 min" },
      { title: "Retention Tactics: Keep Subs for 6+ Months", time: "11 min" },
    ]
  },
  {
    level: "Advanced", icon: "💎", color: "from-amber-400 to-orange-600",
    guides: [
      { title: "Building a $10K/mo Income Stack", time: "15 min" },
      { title: "Team & Agency: Scaling Without Burning Out", time: "13 min" },
      { title: "Brand Deals & Sponsorships for Creators", time: "10 min" },
      { title: "Tax & Legal: Protecting Your Creator Business", time: "8 min" },
    ]
  },
];

const COMPARISON = {
  platforms: ["LuvlyFans", "OnlyFans", "Fansly", "LoyalFans"],
  rows: [
    { feature: "Platform Fee", values: ["10%", "20%", "20%", "15%"] },
    { feature: "Payout Speed", values: ["24–48 hrs", "7–21 days", "7 days", "7 days"] },
    { feature: "Creator Discovery", values: ["✓ Built-in", "✗ None", "Limited", "Limited"] },
    { feature: "Analytics Dashboard", values: ["Advanced", "Basic", "Basic", "Basic"] },
    { feature: "Referral Program", values: ["5% lifetime", "5% (1yr)", "✗", "5% (1yr)"] },
    { feature: "Direct Messaging", values: ["✓", "✓", "✓", "✓"] },
    { feature: "Live Streaming", values: ["✓", "✓", "✗", "✓"] },
    { feature: "Creator Support", values: ["Dedicated", "Email only", "Email only", "Email only"] },
    { feature: "Content Diversity", values: ["All niches", "All niches", "All niches", "Limited"] },
  ]
};

const STATS = [
  { value: "200K+", label: "Active Creators" },
  { value: "$48M+", label: "Paid to Creators" },
  { value: "90%", label: "Creator Retention" },
  { value: "4.9★", label: "Creator Rating" },
];

// ─── UTILITIES ───────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Logo({ dark }) {
  return (
    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px" }}>
      <span style={{ color: "#f43f5e" }}>Luvly</span>
      <span style={{ color: dark ? "#fff" : "#0f0f0f" }}>Fans</span>
      <span style={{ color: "#f43f5e", fontSize: 8, verticalAlign: "super", marginLeft: 1 }}>BLOG</span>
    </span>
  );
}

function Badge({ children, color = "#f43f5e" }) {
  return (
    <span style={{
      display: "inline-block", background: color + "18", color: color,
      border: `1px solid ${color}30`, borderRadius: 99, padding: "2px 10px",
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase"
    }}>{children}</span>
  );
}

function CTAButton({ children, size = "md", onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  const pad = size === "lg" ? "14px 32px" : size === "sm" ? "8px 18px" : "11px 24px";
  const fs = size === "lg" ? 16 : size === "sm" ? 13 : 14;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#e11d48" : "#f43f5e",
        color: "#fff", border: "none", borderRadius: 10, padding: pad,
        fontSize: fs, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em",
        transition: "all 0.18s ease", transform: hov ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hov ? "0 8px 24px #f43f5e40" : "0 4px 14px #f43f5e30",
        ...style
      }}
    >{children} →</button>
  );
}

function GhostButton({ children, onClick, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent",
        color: dark ? "#fff" : "#0f0f0f", border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
        borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600,
        cursor: "pointer", transition: "all 0.18s ease"
      }}
    >{children}</button>
  );
}

function ArticleCard({ article, dark, onRead, featured = false }) {
  const [hov, setHov] = useState(false);
  const catColors = { "Make Money": "#f43f5e", "Growth": "#8b5cf6", "Guides": "#0ea5e9", "Case Studies": "#f59e0b" };
  const color = catColors[article.category] || "#f43f5e";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onRead(article)}
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        border: `1px solid ${hov ? color + "50" : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)")}`,
        borderRadius: 16, overflow: "hidden", cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? `0 16px 40px ${color}20` : dark ? "none" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Card gradient header */}
      <div style={{
        height: featured ? 140 : 100,
        background: `linear-gradient(135deg, ${article.gradient.replace("from-", "").replace(" to-", ", ").split(",").map(c => {
          const map = { "rose-500": "#f43f5e", "pink-600": "#db2777", "amber-500": "#f59e0b", "orange-500": "#f97316", "violet-500": "#8b5cf6", "purple-600": "#9333ea", "cyan-500": "#06b6d4", "blue-600": "#2563eb", "emerald-500": "#10b981", "teal-600": "#0d9488", "fuchsia-500": "#d946ef", "rose-600": "#e11d48" }; return map[c.trim()] || "#f43f5e";
        }).join(", ")})`,
        display: "flex", alignItems: "flex-end", padding: "14px 18px",
        position: "relative"
      }}>
        <div style={{ position: "absolute", top: 12, left: 16 }}>
          <Badge color="#fff">{article.category}</Badge>
        </div>
        {article.trending && (
          <div style={{ position: "absolute", top: 12, right: 16, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", borderRadius: 99, padding: "3px 10px", color: "#fff", fontSize: 11, fontWeight: 700 }}>🔥 Trending</div>
        )}
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: featured ? 18 : 15, fontWeight: 700, lineHeight: 1.35, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>{article.title}</h3>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)", lineHeight: 1.6 }}>{article.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, #f43f5e, #8b5cf6)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800 }}>{article.authorAvatar}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: dark ? "rgba(255,255,255,0.8)" : "#0f0f0f" }}>{article.author}</div>
              <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{article.readTime} read · {article.date}</div>
            </div>
          </div>
          <div style={{ color: color, fontSize: 18, transition: "transform 0.15s", transform: hov ? "translateX(4px)" : "none" }}>→</div>
        </div>
      </div>
    </div>
  );
}

function EmailCapture({ dark }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      background: "linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4)",
      borderRadius: 24, padding: "48px 40px", textAlign: "center",
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.6s ease", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 12 }}>FREE CREATOR PLAYBOOK</div>
        <h2 style={{ margin: "0 0 12px", fontSize: 32, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2 }}>The $10K Blueprint — Free</h2>
        <p style={{ margin: "0 0 28px", color: "rgba(255,255,255,0.8)", fontSize: 15, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Join 12,000+ creators getting our weekly strategies, case studies, and insider growth tactics. No spam. Unsubscribe anytime.
        </p>
        {done ? (
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "16px 32px", color: "#fff", fontWeight: 700, fontSize: 16, display: "inline-block" }}>✓ You're in! Check your inbox.</div>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{ flex: 1, minWidth: 220, padding: "13px 18px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 14, outline: "none", backdropFilter: "blur(8px)" }}
            />
            <button onClick={() => setDone(true)} style={{ background: "#fff", color: "#f43f5e", border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>Get it Free →</button>
          </div>
        )}
        <div style={{ marginTop: 16, color: "rgba(255,255,255,0.55)", fontSize: 12 }}>★★★★★ 4.9 rating · Trusted by 12,000+ creators</div>
      </div>
    </div>
  );
}

function StickyBar({ dark, onNavigate }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: `translateX(-50%) translateY(${show ? "0" : "100px"})`,
      transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)", zIndex: 1000,
      background: dark ? "rgba(15,15,15,0.95)" : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(20px)", borderRadius: 99,
      border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
      boxShadow: "0 8px 40px rgba(0,0,0,0.25)", padding: "10px 14px 10px 20px",
      display: "flex", alignItems: "center", gap: 16
    }}>
      <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)", fontSize: 13, fontWeight: 600 }}>Ready to earn?</span>
      <CTAButton size="sm" onClick={() => onNavigate("home")}>Start Your Page</CTAButton>
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ dark, setDark, page, setPage }) {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const h = () => setScroll(window.scrollY > 10);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Blog", p: "home" }, { label: "Creator Hub", p: "hub" },
    { label: "Comparisons", p: "compare" }, { label: "Case Studies", p: "home" }
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 900,
      background: scroll ? (dark ? "rgba(10,10,10,0.95)" : "rgba(255,255,255,0.95)") : "transparent",
      backdropFilter: scroll ? "blur(20px)" : "none",
      borderBottom: scroll ? `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` : "1px solid transparent",
      transition: "all 0.3s ease",
      padding: "0 5vw"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <Logo dark={dark} />
        </button>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {links.map(l => (
            <button key={l.p + l.label} onClick={() => setPage(l.p)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8,
              color: page === l.p && l.label !== "Case Studies" ? "#f43f5e" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)"),
              fontSize: 14, fontWeight: 600, transition: "color 0.15s"
            }}>{l.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setDark(!dark)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: dark ? "#fbbf24" : "#6b7280", padding: "6px 10px" }}>{dark ? "☀️" : "🌙"}</button>
          <CTAButton size="sm" onClick={() => setPage("home")}>Start Earning</CTAButton>
        </div>
      </div>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ dark, onRead, setPage }) {
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

  const catColors = { "Make Money": "#f43f5e", "Growth": "#8b5cf6", "Guides": "#0ea5e9", "Case Studies": "#f59e0b" };

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} style={{ padding: "80px 5vw 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 60% 0%, rgba(244,63,94,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.08) 0%, transparent 50%)" : "radial-gradient(ellipse at 60% 0%, rgba(244,63,94,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div style={{ opacity: heroInView ? 1 : 0, transform: heroInView ? "translateY(0)" : "translateY(40px)", transition: "all 0.7s ease" }}>
            <div style={{ marginBottom: 20 }}>
              <Badge>🔥 Creator Education Platform</Badge>
            </div>
            <h1 style={{ margin: "0 0 20px", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 800, lineHeight: 1.1, fontFamily: "'Playfair Display', Georgia, serif", color: dark ? "#fff" : "#0a0a0a" }}>
              Grow. Monetize.{" "}
              <span style={{ background: "linear-gradient(135deg, #f43f5e, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Win.</span>
            </h1>
            <p style={{ margin: "0 0 32px", fontSize: 18, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7, maxWidth: 480 }}>
              The only creator education hub built by people who've actually made it. Strategies, case studies, and playbooks to help you earn more — faster.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <CTAButton size="lg" onClick={() => setPage("hub")}>Explore the Creator Hub</CTAButton>
              <GhostButton dark={dark} onClick={() => {}}>Read Case Studies</GhostButton>
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 24 }}>
              {STATS.map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#f43f5e", fontFamily: "'Playfair Display', Georgia, serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Hero visual */}
          <div style={{ opacity: heroInView ? 1 : 0, transition: "all 0.9s ease 0.2s", display: "flex", flexDirection: "column", gap: 14 }}>
            {featured.slice(0, 2).map((a, i) => (
              <div key={a.id} onClick={() => onRead(a)} style={{
                background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
                borderRadius: 16, padding: "20px 22px", cursor: "pointer", transform: i === 1 ? "translateX(30px)" : "none",
                boxShadow: dark ? "none" : "0 4px 20px rgba(0,0,0,0.08)", transition: "all 0.2s"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: catColors[a.category] }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: catColors[a.category], textTransform: "uppercase", letterSpacing: "0.06em" }}>{a.category}</span>
                  <span style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", marginLeft: "auto" }}>{a.readTime}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", lineHeight: 1.4, fontFamily: "'Playfair Display', Georgia, serif" }}>{a.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw" }}>

        {/* Search + Filters */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", fontSize: 16 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." style={{
              width: "100%", boxSizing: "border-box", padding: "11px 14px 11px 42px",
              background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              border: `1.5px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, borderRadius: 12,
              color: dark ? "#fff" : "#0f0f0f", fontSize: 14, outline: "none"
            }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: "9px 18px", borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: cat === c ? "#f43f5e" : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
                color: cat === c ? "#fff" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"),
                border: `1.5px solid ${cat === c ? "#f43f5e" : (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}`,
                transition: "all 0.18s"
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {cat === "All" && !search && (
          <>
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>Featured Articles</h2>
              <div style={{ flex: 1, height: 1, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 60 }}>
              {featured.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} featured />)}
            </div>

            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>🔥 Trending Now</h2>
              <div style={{ flex: 1, height: 1, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 60 }}>
              {trending.map((a, i) => (
                <div key={a.id} onClick={() => onRead(a)} style={{
                  background: dark ? "rgba(255,255,255,0.03)" : "#fff",
                  border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: 14, padding: "18px 22px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 20, transition: "all 0.18s"
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", minWidth: 40, fontFamily: "monospace" }}>0{i + 1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 4 }}><Badge color={catColors[a.category]}>{a.category}</Badge></div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>{a.title}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}>{a.readTime} read</div>
                    <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Filtered grid */}
        {(cat !== "All" || search) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 60 }}>
            {filtered.length ? filtered.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} />) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontSize: 15 }}>No articles found. Try a different search.</div>
            )}
          </div>
        )}

        {/* Email Capture */}
        <div style={{ marginBottom: 80 }}>
          <EmailCapture dark={dark} />
        </div>
      </div>
    </div>
  );
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────

function ArticlePage({ article, dark, onBack, onRead }) {
  const progress = useScrollProgress();
  const others = ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
  const catColors = { "Make Money": "#f43f5e", "Growth": "#8b5cf6", "Guides": "#0ea5e9", "Case Studies": "#f59e0b" };
  const color = catColors[article.category] || "#f43f5e";

  const body = `
    <p>The creator economy is booming — and the creators winning aren't just the ones with the most followers. They're the ones with the best <strong>strategy</strong>.</p>
    <h2>Why Most Creators Plateau</h2>
    <p>After analyzing 500+ creator accounts, we identified a consistent pattern: most creators hit an earnings ceiling not because they lack talent, but because they lack <em>systems</em>. They create reactively instead of strategically.</p>
    <p>The fix? A three-layer approach we call the <strong>Monetization Stack</strong>.</p>
    <h2>Layer 1: The Foundation (Weeks 1–2)</h2>
    <p>Before anything else, you need to nail your positioning. This means understanding exactly who your ideal subscriber is, what keeps them up at night, and what they'd pay to solve that problem.</p>
    <blockquote>Most creators skip the positioning step and wonder why their conversion rates are terrible. Don't skip it.</blockquote>
    <h2>Layer 2: The Growth Engine (Weeks 3–6)</h2>
    <p>With your foundation in place, it's time to build your funnel. The best-performing creators on LuvlyFans use a consistent content cadence across platforms — free content as the hook, premium content as the reward.</p>
    <p>The formula that works: <strong>3 free posts per week → 1 paid preview → 1 PPV push</strong>. Simple, but almost nobody does it consistently.</p>
    <h2>Layer 3: The Revenue Multipliers</h2>
    <p>Once you're at $1K/month, you have leverage. This is where you add tip menus, custom requests, and a VIP tier. These three additions alone add an average of 34% revenue lift for LuvlyFans creators.</p>
    <p>The key is not to overwhelm subscribers. Present one upsell at a time, always tied to something they already love about your content.</p>
    <h2>The 30-Day Timeline</h2>
    <p>Here's the exact breakdown our top creators follow in their first month...</p>
  `;

  return (
    <div>
      {/* Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, width: `${progress * 100}%`, height: 3, background: "linear-gradient(90deg, #f43f5e, #8b5cf6)", zIndex: 1000, transition: "width 0.1s" }} />

      {/* Hero */}
      <div style={{ padding: "48px 5vw 0", maxWidth: 1200, margin: "0 auto" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", fontSize: 13, fontWeight: 600, padding: "0 0 24px", display: "flex", alignItems: "center", gap: 6 }}>← Back to Blog</button>
      </div>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "0 5vw 80px" }}>
        <div style={{ marginBottom: 20, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Badge color={color}>{article.category}</Badge>
          {article.trending && <Badge color="#f59e0b">🔥 Trending</Badge>}
          <span style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>{article.readTime} read · {article.date}</span>
        </div>

        <h1 style={{ margin: "0 0 20px", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.15, fontFamily: "'Playfair Display', Georgia, serif", color: dark ? "#fff" : "#0a0a0a" }}>{article.title}</h1>

        <p style={{ margin: "0 0 28px", fontSize: 18, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7 }}>{article.excerpt}</p>

        {/* Author block */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderRadius: 14, border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #f43f5e, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800, flexShrink: 0 }}>{article.authorAvatar}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: dark ? "#fff" : "#0f0f0f" }}>{article.author}</div>
            <div style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)" }}>{article.authorRole}</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <CTAButton size="sm" onClick={() => {}}>Follow</CTAButton>
          </div>
        </div>

        {/* Hero gradient banner */}
        <div style={{ height: 220, borderRadius: 18, background: `linear-gradient(135deg, ${article.gradient.replace("from-", "").replace(" to-", ", ").split(",").map(c => { const map = { "rose-500": "#f43f5e", "pink-600": "#db2777", "amber-500": "#f59e0b", "orange-500": "#f97316", "violet-500": "#8b5cf6", "purple-600": "#9333ea", "cyan-500": "#06b6d4", "blue-600": "#2563eb", "emerald-500": "#10b981", "teal-600": "#0d9488", "fuchsia-500": "#d946ef", "rose-600": "#e11d48" }; return map[c.trim()] || "#f43f5e"; }).join(", ")})`, marginBottom: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📈</div>
            <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.9 }}>Visual guide coming soon</div>
          </div>
        </div>

        {/* Article body */}
        <div
          dangerouslySetInnerHTML={{ __html: body }}
          style={{ fontSize: 17, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.72)" }}
        />

        {/* Inline CTA */}
        <div style={{ margin: "40px 0", padding: "32px", background: dark ? "rgba(244,63,94,0.08)" : "rgba(244,63,94,0.05)", border: "1.5px solid rgba(244,63,94,0.2)", borderRadius: 18, textAlign: "center" }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#f43f5e", textTransform: "uppercase", marginBottom: 8 }}>Ready to Apply This?</div>
          <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>Start Your LuvlyFans Page Today</h3>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>Join 200,000+ creators earning on the platform built for growth. Setup takes under 10 minutes.</p>
          <CTAButton size="lg" onClick={() => {}}>Create My Page — It's Free</CTAButton>
        </div>

        {/* Related */}
        <div style={{ marginTop: 60 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>Keep Reading</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {others.map(a => <ArticleCard key={a.id} article={a} dark={dark} onRead={onRead} />)}
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── CREATOR HUB ─────────────────────────────────────────────────────────────

function HubPage({ dark, onRead, setPage }) {
  const [activeModule, setActiveModule] = useState(0);
  const [hubRef, inView] = useInView(0.05);
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "72px 5vw 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% -10%, rgba(139,92,246,0.15), transparent 60%)" : "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.07), transparent 60%)" }} />
        <div style={{ position: "relative" }}>
          <Badge color="#8b5cf6">🎓 Creator Academy</Badge>
          <h1 style={{ margin: "16px 0 16px", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.1, color: dark ? "#fff" : "#0a0a0a" }}>
            Your Complete Creator{" "}
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Playbook</span>
          </h1>
          <p style={{ margin: "0 auto 36px", maxWidth: 560, fontSize: 18, color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)", lineHeight: 1.7 }}>
            From your first subscriber to your first $10K month. Structured paths, actionable guides, and strategies that actually work.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton size="lg" onClick={() => setPage && setPage("home")}>Start Learning Free</CTAButton>
            <GhostButton dark={dark} onClick={() => {}}>View All Guides</GhostButton>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw 80px" }}>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 64 }}>
          {[["50+", "Free Guides"], ["12K+", "Enrolled Creators"], ["4.9★", "Avg Rating"], ["$48M", "Creator Earnings"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", padding: "24px 16px", background: dark ? "rgba(255,255,255,0.03)" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#8b5cf6", fontFamily: "'Playfair Display', Georgia, serif" }}>{v}</div>
              <div style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Module tabs */}
        <div style={{ marginBottom: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {HUB_MODULES.map((m, i) => (
            <button key={m.level} onClick={() => setActiveModule(i)} style={{
              padding: "10px 22px", borderRadius: 99, fontSize: 14, fontWeight: 700, cursor: "pointer",
              background: activeModule === i ? `linear-gradient(135deg, ${m.color.replace("from-", "").replace(" to-", ", ").split(",").map(c => { const map = { "emerald-400": "#34d399", "teal-500": "#14b8a6", "violet-400": "#a78bfa", "purple-600": "#9333ea", "amber-400": "#fbbf24", "orange-600": "#ea580c" }; return map[c.trim()] || "#8b5cf6"; }).join(", ")})` : (dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"),
              color: activeModule === i ? "#fff" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"),
              border: "1.5px solid transparent", transition: "all 0.2s"
            }}>{m.icon} {m.level}</button>
          ))}
        </div>

        {/* Module content */}
        {HUB_MODULES.map((m, i) => i !== activeModule ? null : (
          <div key={m.level}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>{m.icon} {m.level} Playbooks</h2>
              <p style={{ margin: 0, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", fontSize: 14 }}>Curated guides for your current stage</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 48 }}>
              {m.guides.map((g, j) => {
                const [hov, setHov] = useState(false);
                return (
                  <div key={g.title} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => onRead(ARTICLES[j % ARTICLES.length])} style={{
                    padding: "24px", borderRadius: 14, cursor: "pointer",
                    background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                    border: `1.5px solid ${hov ? "#8b5cf6" : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`,
                    transform: hov ? "translateY(-3px)" : "none", transition: "all 0.2s",
                    boxShadow: hov ? "0 10px 30px rgba(139,92,246,0.15)" : "none"
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${m.color.replace("from-", "").replace(" to-", ", ").split(",").map(c => { const map = { "emerald-400": "#34d399", "teal-500": "#14b8a6", "violet-400": "#a78bfa", "purple-600": "#9333ea", "amber-400": "#fbbf24", "orange-600": "#ea580c" }; return map[c.trim()] || "#8b5cf6"; }).join(", ")})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 14 }}>{["📖", "🎯", "💡", "🔑"][j % 4]}</div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f", lineHeight: 1.4, fontFamily: "'Playfair Display', Georgia, serif" }}>{g.title}</h3>
                    <div style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>📚 {g.time} read · Free</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Testimonials */}
        <div style={{ marginBottom: 60 }}>
          <h2 style={{ margin: "0 0 24px", fontSize: 26, fontWeight: 800, color: dark ? "#fff" : "#0f0f0f", fontFamily: "'Playfair Display', Georgia, serif" }}>What Creators Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { name: "Luna V.", earned: "$85K in 6mo", text: "The pricing playbook alone changed everything. I stopped undervaluing myself immediately.", rating: 5 },
              { name: "Alex M.", earned: "$22K in 3mo", text: "No other platform actually teaches you HOW to grow. LuvlyFans Hub is genuinely unmatched.", rating: 5 },
              { name: "Kira S.", earned: "$11K first month", text: "I was skeptical but the case studies gave me a blueprint to follow. Results speak for themselves.", rating: 5 },
            ].map(t => (
              <div key={t.name} style={{ padding: "24px", background: dark ? "rgba(255,255,255,0.04)" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, borderRadius: 16 }}>
                <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 12 }}>{"★".repeat(t.rating)}</div>
                <p style={{ margin: "0 0 16px", fontSize: 14, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: dark ? "#fff" : "#0f0f0f" }}>{t.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e" }}>{t.earned}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <EmailCapture dark={dark} />
      </div>
    </div>
  );
}

// ─── COMPARISON PAGE ──────────────────────────────────────────────────────────

function ComparePage({ dark, setPage }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div>
      <section style={{ padding: "72px 5vw 60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: dark ? "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.1), transparent 60%)" : "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.05), transparent 60%)" }} />
        <div style={{ position: "relative" }}>
          <Badge color="#06b6d4">Platform Comparison</Badge>
          <h1 style={{ margin: "16px 0 16px", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.1, color: dark ? "#fff" : "#0a0a0a" }}>
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
          background: "linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)",
          borderRadius: 20, padding: "32px 40px", marginBottom: 48, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
          opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.96)", transition: "all 0.5s ease"
        }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Best Overall for Creators in 2026</div>
            <h2 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display', Georgia, serif" }}>LuvlyFans — Lowest Fees, Fastest Payouts, Best Discovery</h2>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Based on platform fees, payout speed, growth tools, and creator support ratings.</div>
          </div>
          <CTAButton size="lg" style={{ background: "#fff", color: "#f43f5e", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} onClick={() => {}}>Start Free →</CTAButton>
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`, marginBottom: 48 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)" }}>
                <th style={{ padding: "16px 20px", textAlign: "left", fontSize: 13, fontWeight: 700, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Feature</th>
                {COMPARISON.platforms.map((p, i) => (
                  <th key={p} style={{ padding: "16px 20px", textAlign: "center", fontSize: 14, fontWeight: 800, color: i === 0 ? "#f43f5e" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)"), background: i === 0 ? "rgba(244,63,94,0.06)" : "transparent" }}>{p} {i === 0 && "✓"}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, ri) => (
                <tr key={row.feature} style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`, background: ri % 2 === 0 ? "transparent" : (dark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.01)") }}>
                  <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)" }}>{row.feature}</td>
                  {row.values.map((v, i) => (
                    <td key={i} style={{ padding: "14px 20px", textAlign: "center", fontSize: 13, fontWeight: i === 0 ? 800 : 500, color: i === 0 ? "#f43f5e" : (dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)"), background: i === 0 ? "rgba(244,63,94,0.04)" : "transparent" }}>{v}</td>
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
              platform: "LuvlyFans", color: "#f43f5e", isUs: true,
              pros: ["10% platform fee (industry lowest)", "24–48 hr payouts", "Built-in creator discovery", "Dedicated creator support team", "Advanced analytics dashboard", "5% lifetime referral commission"],
              cons: ["Newer platform (less brand recognition)", "Growing subscriber base"]
            },
            {
              platform: "OnlyFans", color: "#00aff0", isUs: false,
              pros: ["Largest subscriber base", "Established brand trust", "Large creator community"],
              cons: ["20% platform fee", "7–21 day payout delays", "No organic discovery tools", "Limited analytics", "Email-only support", "Payout holds for new creators"]
            }
          ].map(({ platform, color, isUs, pros, cons }) => (
            <div key={platform} style={{ padding: "28px", borderRadius: 18, border: `2px solid ${isUs ? color + "40" : (dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)")}`, background: isUs ? (dark ? "rgba(244,63,94,0.05)" : "rgba(244,63,94,0.03)") : (dark ? "rgba(255,255,255,0.02)" : "#fff") }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ fontWeight: 800, fontSize: 18, color, fontFamily: "'Playfair Display', Georgia, serif" }}>{platform}</div>
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
          <h2 style={{ margin: "0 0 12px", fontSize: 30, fontWeight: 800, fontFamily: "'Playfair Display', Georgia, serif", color: dark ? "#fff" : "#0f0f0f" }}>Keep More of What You Earn</h2>
          <p style={{ margin: "0 0 28px", fontSize: 15, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>At 10% vs 20% fees, a creator making $5,000/month saves $500 every single month on LuvlyFans. That's $6,000/year back in your pocket.</p>
          <CTAButton size="lg" onClick={() => {}}>Start Earning on LuvlyFans — Free</CTAButton>
          <div style={{ marginTop: 16, fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)" }}>No setup fees · No monthly fees · First payout within 48 hours</div>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ dark, setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`, padding: "48px 5vw 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
          <div>
            <Logo dark={dark} />
            <p style={{ marginTop: 14, fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", lineHeight: 1.7, maxWidth: 280 }}>The creator education hub for the next generation of independent earners. Learn, grow, and monetize — smarter.</p>
          </div>
          {[
            { title: "Learn", links: ["Creator Hub", "Guides", "Case Studies", "Playbooks"] },
            { title: "Platform", links: ["How it Works", "Pricing", "Comparisons", "Testimonials"] },
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

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [article, setArticle] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNav = (p) => { setPage(p); setArticle(null); window.scrollTo(0, 0); };
  const handleRead = (a) => { setArticle(a); setPage("article"); window.scrollTo(0, 0); };
  const handleBack = () => { setPage("home"); setArticle(null); window.scrollTo(0, 0); };

  useEffect(() => {
    document.body.style.background = dark ? "#090909" : "#f8f8f6";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'DM Sans', system-ui, sans-serif";
  }, [dark]);

  return (
    <div style={{ minHeight: "100vh", color: dark ? "#fff" : "#0f0f0f", background: dark ? "#090909" : "#f8f8f6", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(255,255,255,0.35); }
        blockquote { border-left: 3px solid #f43f5e; padding-left: 20px; margin: 28px 0; font-style: italic; opacity: 0.8; }
        h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; margin: 36px 0 16px; color: inherit; }
        strong { color: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(244,63,94,0.3); border-radius: 3px; }
      `}</style>

      <Nav dark={dark} setDark={setDark} page={page} setPage={(p) => { setPage(p); setArticle(null); window.scrollTo(0, 0); }} />

      {page === "home" && <HomePage dark={dark} onRead={handleRead} setPage={setPage} />}
      {page === "article" && article && <ArticlePage article={article} dark={dark} onBack={handleBack} onRead={handleRead} />}
      {page === "hub" && <HubPage dark={dark} onRead={handleRead} setPage={setPage} />}
      {page === "compare" && <ComparePage dark={dark} setPage={setPage} />}

      <Footer dark={dark} setPage={setPage} />
      <StickyBar dark={dark} onNavigate={setPage} />
    </div>
  );
}
