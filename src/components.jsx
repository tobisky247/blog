import React, { useState, useEffect } from "react";
import { useInView } from "./hooks";

import logoDark from "./assets/logo/Luvlyfans logo dark.svg";
import logoLight from "./assets/logo/Luvlyfans logo light.png";

function useIsMobile(width = 800) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < width);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < width);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  return isMobile;
}

export function Logo({ dark }) {
  return (
    <img
      src={dark ? logoDark : logoLight}
      alt="LuvlyFans"
      style={{ height: 32, width: "auto", display: "block" }}
    />
  );
}

export function Icon({ name, size = 20, color = "currentColor", style = {} }) {
  // For SVGs with spaces in filename, encode the URL properly
  const encodedName = encodeURIComponent(name);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: `url(/assets/svg/${encodedName}.svg)`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(/assets/svg/${encodedName}.svg)`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        display: "inline-block",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

export function Badge({ children, color = "#7B51CC", textColor, style = {} }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: color + "18",
        color: textColor || color,
        border: `1px solid ${color}30`,
        borderRadius: 99,
        padding: "3px 12px",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        backdropFilter: "blur(12px)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function CTAButton({
  children,
  size = "md",
  onClick,
  style = {},
  block = false,
}) {
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile(600);
  const pad =
    size === "lg" ? "14px 32px" : size === "sm" ? "8px 18px" : "11px 24px";
  const fs = size === "lg" ? 16 : size === "sm" ? 13 : 14;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#613db7" : "#7B51CC",
        color: "#fff",
        border: "none",
        borderRadius: 99,
        padding: pad,
        fontSize: fs,
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: "0.01em",
        transition: "all 0.18s ease",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hov ? "0 8px 24px #7B51CC40" : "0 4px 14px #7B51CC30",
        width: block ? "100%" : "auto",
        minHeight: 44,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.05)"
          : "transparent",
        color: dark ? "#fff" : "#0f0f0f",
        border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}`,
        borderRadius: 10,
        padding: "11px 24px",
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.18s ease",
        minHeight: 44,
      }}
    >
      {children}
    </button>
  );
}

export function ArticleCard({ article, dark, onRead, featured = false }) {
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile(600);
  const catColors = {
    "Make Money": "#059669",
    Growth: "#D946EF",
    Guides: "#0284C7",
  };
  const color = catColors[article.category] || "#7B51CC";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onRead(article)}
      style={{
        background: dark ? "rgba(255,255,255,0.04)" : "#fff",
        border: `1px solid ${hov ? color + "50" : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov
          ? `0 16px 40px ${color}20`
          : dark
            ? "none"
            : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Card gradient header */}
      <div
        style={{
          height: isMobile ? 180 : featured ? 280 : 220,
          background: article.thumbnail
            ? dark
              ? "#1a1a2e"
              : "#e8e8e8"
            : `linear-gradient(135deg, ${article.gradient
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
          display: "flex",
          alignItems: "flex-end",
          padding: "14px 18px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <div style={{ position: "absolute", top: 12, left: 16, zIndex: 2 }}>
          <Badge color="#fff">{article.category}</Badge>
        </div>
        {article.trending && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(8px)",
              borderRadius: 99,
              padding: "3px 10px",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            🔥
          </div>
        )}
        {article.thumbnail && (
          <>
            <img
              src={article.thumbnail}
              alt=""
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
              src={article.thumbnail}
              alt={article.title}
              loading="eager"
              fetchpriority="high"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 40%)",
                zIndex: 1,
              }}
            />
          </>
        )}
      </div>
      <div style={{ padding: isMobile ? "16px" : "18px 20px 20px" }}>
        <h3
          style={{
            margin: "0 0 8px",
            fontSize: isMobile ? 16 : featured ? 18 : 15,
            fontWeight: 700,
            lineHeight: 1.35,
            color: dark ? "#fff" : "#0f0f0f",
            fontFamily: "'Lora', Georgia, serif",
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 13,
            color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.excerpt}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
              }}
            >
              {article.readTime} read
            </div>
          </div>
          <div
            style={{
              color: color,
              fontSize: 18,
              transition: "transform 0.15s",
              transform: hov ? "translateX(4px)" : "none",
            }}
          >
            →
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmailCapture({ dark }) {
  const [ref, inView] = useInView();
  const isMobile = useIsMobile(800);

  // Custom avatars for the side bubbles - expanded to 8 total
  const avatars = [
    {
      src: "/assets/creators/Ellie_bee.png",
      size: isMobile ? 60 : 100,
      top: "8%",
      left: "4%",
      delay: "0s",
    },
    {
      src: "/assets/creators/quietly-vae.png",
      size: isMobile ? 70 : 110,
      top: "35%",
      left: "-2%",
      delay: "0.2s",
    },
    {
      src: "/assets/creators/KrookedOrchid.png",
      size: isMobile ? 50 : 85,
      bottom: "12%",
      left: "7%",
      delay: "0.4s",
    },
    {
      src: "/assets/creators/Andibunni.png",
      size: isMobile ? 65 : 120,
      top: "30%",
      right: "-1%",
      delay: "0.6s",
    },
    {
      src: "/assets/creators/Zozo.png",
      size: isMobile ? 55 : 95,
      bottom: "6%",
      right: "6%",
      delay: "0.8s",
    },
    {
      src: "/assets/creators/Dollia Sakura.png",
      size: 60,
      top: "15%",
      right: "12%",
      delay: "1s",
    },
    {
      src: "/assets/creators/Loulalou.png",
      size: 70,
      bottom: "25%",
      right: "15%",
      delay: "1.2s",
    },
    {
      src: "/assets/creators/quietly-vae.png",
      size: 55,
      top: "12%",
      left: "18%",
      delay: "1.4s",
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: dark ? "rgba(123, 81, 204, 0.05)" : "#F8F5FF", // Soft LuvlyFans tint
        borderRadius: 32,
        padding: isMobile ? "80px 24px" : "120px 40px",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: isMobile ? 400 : 520,
        border: `1px solid ${dark ? "rgba(123, 81, 204, 0.15)" : "rgba(123, 81, 204, 0.08)"}`,
      }}
    >
      {/* Decorative Avatars */}
      {!isMobile &&
        avatars.map((av, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: av.top,
              left: av.left,
              right: av.right,
              bottom: av.bottom,
              width: av.size,
              height: av.size,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #fff",
              boxShadow: `0 12px 30px ${dark ? "rgba(0,0,0,0.3)" : "rgba(123, 81, 204, 0.15)"}`,
              animation: "float 6s ease-in-out infinite alternate",
              animationDelay: av.delay,
              zIndex: 1,
              transition: "transform 0.4s ease",
            }}
          >
            <img
              src={av.src}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="Creator"
            />
          </div>
        ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          25% { transform: translateY(-10px); }
          50% { transform: translateY(-8px); }
          75% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 10, maxWidth: 800 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 16px",
            borderRadius: 99,
            background: dark
              ? "rgba(123, 81, 204, 0.2)"
              : "rgba(123, 81, 204, 0.1)",
            fontSize: 12,
            fontWeight: 800,
            color: "#7B51CC",
            textTransform: "uppercase",
            marginBottom: 32,
            letterSpacing: "0.08em",
          }}
        >
          COMMUNITY
        </div>

        <h2
          style={{
            margin: "0 0 24px",
            fontSize: isMobile ? 32 : 56,
            fontWeight: 800,
            color: dark ? "#fff" : "#2D2926",
            fontFamily: "'Lora', Georgia, serif",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Ready to start your journey?
          <br />
          Experience LuvlyFans.
        </h2>

        <p
          style={{
            margin: "0 0 40px",
            color: dark ? "rgba(255, 255, 255, 0.6)" : "rgba(45, 41, 38, 0.7)",
            fontSize: isMobile ? 16 : 20,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            fontWeight: 500,
          }}
        >
          Join the community of creators who live, earn, and dream better. No
          limits, just potential.
        </p>

        <button
          onClick={() => window.open("https://luvlyfans.com", "_blank")}
          style={{
            background: "#7B51CC", // Brand Purple
            color: "#fff",
            border: "none",
            borderRadius: 99,
            padding: "18px 48px",
            fontSize: 18,
            fontWeight: 800,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 10px 30px rgba(123, 81, 204, 0.3)",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.background = "#613db7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#7B51CC";
          }}
        >
          Join LuvlyFans
        </button>
      </div>
    </div>
  );
}

export function StickyBar({ dark, onNavigate }) {
  const [show, setShow] = useState(false);
  const isMobile = useIsMobile(600);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? 12 : 24,
        left: "50%",
        transform: `translateX(-50%) translateY(${show ? "0" : "100px"})`,
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        zIndex: 1000,
        background: dark ? "rgba(15,15,15,0.95)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderRadius: 99,
        border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        padding: isMobile ? "8px 12px" : "10px 14px 10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: isMobile ? "90%" : "auto",
        justifyContent: "center",
      }}
    >
      {!isMobile && (
        <span
          style={{
            color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Ready to earn?
        </span>
      )}
      <CTAButton
        size="sm"
        onClick={() => window.open("https://luvlyfans.com/", "_blank")}
        block={isMobile}
      >
        Start Your Page
      </CTAButton>
    </div>
  );
}

export function ShareButton({ title, text, url, dark, style = {} }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useIsMobile(800);

  const handleShare = () => {
    // Always show our custom menu (desktop and mobile)
    setShowMenu(!showMenu);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text || title || "")}&url=${encodeURIComponent(url || window.location.href)}`;
    window.open(tweetUrl, "_blank", "width=550,height=420");
    setShowMenu(false);
  };

  const shareToFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url || window.location.href)}`;
    window.open(fbUrl, "_blank", "width=550,height=420");
    setShowMenu(false);
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url || window.location.href)}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420");
    setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) {
      const handleClick = (e) => {
        if (!e.target.closest(".share-menu")) {
          setShowMenu(false);
        }
      };
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showMenu]);

  return (
    <div style={{ position: "relative", ...style }} className="share-menu">
      <button
        onClick={handleShare}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
          color: dark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)",
          padding: "10px 18px",
          borderRadius: 99,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = dark
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.06)";
          e.currentTarget.style.borderColor = dark
            ? "rgba(255,255,255,0.2)"
            : "rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.04)";
          e.currentTarget.style.borderColor = dark
            ? "rgba(255,255,255,0.12)"
            : "rgba(0,0,0,0.08)";
        }}
      >
        <Icon name="share" size={16} color={dark ? "#fff" : "#0f0f0f"} />
        <span>Share</span>
      </button>

      {/* Share Menu */}
      {showMenu && (
        <div
          style={{
            position: isMobile ? "fixed" : "absolute",
            top: isMobile ? "auto" : "calc(100% + 8px)",
            bottom: isMobile ? "80px" : "auto",
            left: isMobile ? "50%" : "auto",
            right: isMobile ? "auto" : 0,
            transform: isMobile ? "translateX(-50%)" : "none",
            background: dark ? "#1a1a1a" : "#fff",
            border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
            borderRadius: 20,
            padding: 10,
            minWidth: 280,
            width: isMobile ? "calc(100vw - 40px)" : "auto",
            maxWidth: isMobile ? 400 : 320,
            boxShadow: dark
              ? "0 12px 40px rgba(0,0,0,0.5)"
              : "0 8px 32px rgba(0,0,0,0.12)",
            zIndex: 1000,
          }}
        >
          <button
            onClick={shareToTwitter}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              background: "none",
              border: "none",
              color: dark ? "#fff" : "#0f0f0f",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              borderRadius: 10,
              textAlign: "left",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            <Icon name="x" size={20} color={dark ? "#fff" : "#0f0f0f"} />
            <span>Share on X</span>
          </button>
          <button
            onClick={shareToFacebook}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              background: "none",
              border: "none",
              color: dark ? "#fff" : "#0f0f0f",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              borderRadius: 10,
              textAlign: "left",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            <Icon
              name="facebook 01"
              size={20}
              color={dark ? "#fff" : "#0f0f0f"}
            />
            <span>Share on Facebook</span>
          </button>
          <button
            onClick={shareToLinkedIn}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              background: "none",
              border: "none",
              color: dark ? "#fff" : "#0f0f0f",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              borderRadius: 10,
              textAlign: "left",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            <Icon name="linkedln" size={20} color={dark ? "#fff" : "#0f0f0f"} />
            <span>Share on LinkedIn</span>
          </button>
          <div
            style={{
              height: 1,
              background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
              margin: "6px 8px",
            }}
          />
          <button
            onClick={copyLink}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 14px",
              background: "none",
              border: "none",
              color: copied ? "#7B51CC" : dark ? "#fff" : "#0f0f0f",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              borderRadius: 10,
              textAlign: "left",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            <Icon
              name={copied ? "check-circle" : "link"}
              size={20}
              color={copied ? "#7B51CC" : dark ? "#fff" : "#0f0f0f"}
            />
            <span>{copied ? "Link copied!" : "Copy link"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
