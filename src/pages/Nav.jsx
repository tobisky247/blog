import React, { useState, useEffect } from "react";
import "../nav.css";
import { CTAButton, Logo, Icon } from "../components";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { label: "Blog", p: "home" },
    {
      label: "Creator Hub",
      p: "hub",
      sub: [
        { label: "Creator Hub", p: "hub", icon: "chart-arrow-up" },
        {
          label: "Free Creators accounts",
          p: "free-creators",
          icon: "diamond",
        },
      ],
    },
    {
      label: "How-to-guides",
      sub: [
        { label: "Getting started", p: "getting-started" },
        { label: "Earning on Luvlyfans", p: "earning" },
        { label: "Features", p: "features" },
      ],
    },
    { label: "Events", p: "events" },
  ];

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background:
            scroll || menuOpen
              ? dark
                ? "rgba(10,10,10,0.98)"
                : "rgba(255,255,255,0.98)"
              : "transparent",
          backdropFilter: scroll || menuOpen ? "blur(20px)" : "none",
          borderBottom:
            scroll || menuOpen
              ? `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`
              : "1px solid transparent",
          transition: "all 0.3s ease",
          padding: "0 5vw",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <button
            onClick={() => {
              setPage("home");
              setMenuOpen(false);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              zIndex: 1001,
            }}
          >
            <Logo dark={dark} />
          </button>

          {/* Desktop Nav */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  onMouseEnter={() =>
                    link.sub &&
                    (link.label === "Creator Hub"
                      ? setHubOpen(true)
                      : setGuidesOpen(true))
                  }
                  onMouseLeave={() =>
                    link.sub &&
                    (link.label === "Creator Hub"
                      ? setHubOpen(false)
                      : setGuidesOpen(false))
                  }
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={() => !link.sub && setPage(link.p)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 14px",
                      borderRadius: 8,
                      color:
                        page === link.p
                          ? "#7B51CC"
                          : dark
                            ? "rgba(255,255,255,0.7)"
                            : "rgba(0,0,0,0.65)",
                      fontSize: 14,
                      fontWeight: 600,
                      transition: "color 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {link.label}{" "}
                    {link.sub && (
                      <span
                        style={{
                          fontSize: 10,
                          transform: (
                            link.label === "Creator Hub" ? hubOpen : guidesOpen
                          )
                            ? "rotate(180deg)"
                            : "none",
                          transition: "transform 0.2s",
                        }}
                      >
                        ▼
                      </span>
                    )}
                  </button>

                  {link.sub && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: 240,
                        background: dark ? "rgba(18,18,18,0.98)" : "#fff",
                        border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
                        borderRadius: 20,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                        opacity: (
                          link.label === "Creator Hub" ? hubOpen : guidesOpen
                        )
                          ? 1
                          : 0,
                        transform: (
                          link.label === "Creator Hub" ? hubOpen : guidesOpen
                        )
                          ? "translateY(5px)"
                          : "translateY(15px)",
                        visibility: (
                          link.label === "Creator Hub" ? hubOpen : guidesOpen
                        )
                          ? "visible"
                          : "hidden",
                        transition: "all 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
                        padding: "8px",
                        zIndex: 1001,
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {link.sub.map((s) => (
                        <button
                          key={s.p}
                          onClick={() => {
                            setPage(s.p);
                            setHubOpen(false);
                            setGuidesOpen(false);
                            window.scrollTo(0, 0);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            width: "100%",
                            textAlign: "left",
                            padding: "10px 14px",
                            borderRadius: 12,
                            fontSize: 13,
                            fontWeight: 600,
                            color: dark
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(0,0,0,0.75)",
                            background: "transparent",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            border: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = dark
                              ? "rgba(123,81,204,0.15)"
                              : "rgba(123,81,204,0.1)";
                            e.currentTarget.style.color = "#7B51CC";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = dark
                              ? "rgba(255,255,255,0.8)"
                              : "rgba(0,0,0,0.75)";
                          }}
                        >
                          {s.icon && (
                            <Icon name={s.icon} size={16} color="#7B51CC" />
                          )}
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              zIndex: 1001,
            }}
          >
            {/* Dark mode toggle — pill switch on desktop */}
            {!isMobile && (
              <button
                onClick={() => setDark(!dark)}
                title={dark ? "Switch to light mode" : "Switch to dark mode"}
                style={{
                  width: 52,
                  height: 28,
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                  background: dark ? "#7B51CC" : "#e5e7eb",
                  position: "relative",
                  transition: "background 0.3s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: dark ? 25 : 3,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                  }}
                >
                  {dark ? "🌙" : "☀️"}
                </div>
              </button>
            )}
            {!isMobile && (
              <CTAButton
                size="sm"
                onClick={() => window.open("https://luvlyfans.com/", "_blank")}
              >
                Start Earning
              </CTAButton>
            )}

            {/* Mobile Toggle */}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 5,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 2,
                    background: dark ? "#fff" : "#000",
                    transition: "all 0.3s",
                    transform: menuOpen
                      ? "rotate(45deg) translateY(5px)"
                      : "none",
                  }}
                />
                <div
                  style={{
                    width: 22,
                    height: 2,
                    background: dark ? "#fff" : "#000",
                    opacity: menuOpen ? 0 : 1,
                    transition: "all 0.3s",
                  }}
                />
                <div
                  style={{
                    width: 22,
                    height: 2,
                    background: dark ? "#fff" : "#000",
                    transition: "all 0.3s",
                    transform: menuOpen
                      ? "rotate(-45deg) translateY(-5px)"
                      : "none",
                  }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu — Full-Screen Backdrop + Drawer */}
        {isMobile && (
          <>
            {/* Backdrop: covers entire page behind the drawer */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                zIndex: 1999,
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? "all" : "none",
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Drawer */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                background: dark ? "#0a0a0a" : "#fff",
                zIndex: 2000,
                padding: "0 5vw 40px",
                transform: menuOpen ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Drawer Header — Logo, Toggle, Close */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 0 24px",
                  borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
                  marginBottom: 12,
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => {
                    setPage("home");
                    setMenuOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <Logo dark={dark} />
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* Dark mode pill toggle */}
                  <button
                    onClick={() => setDark(!dark)}
                    title={
                      dark ? "Switch to light mode" : "Switch to dark mode"
                    }
                    style={{
                      width: 52,
                      height: 28,
                      borderRadius: 99,
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                      background: dark ? "#7B51CC" : "#e5e7eb",
                      position: "relative",
                      transition: "background 0.3s",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 3,
                        left: dark ? 25 : 3,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "#fff",
                        transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                      }}
                    >
                      {dark ? "🌙" : "☀️"}
                    </div>
                  </button>
                  {/* Close button */}
                  <button
                    onClick={() => setMenuOpen(false)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: dark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      color: dark ? "#fff" : "#000",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>

              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.sub ? (
                    <div style={{ marginBottom: 20 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: "#7B51CC",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: 12,
                          paddingLeft: 12,
                        }}
                      >
                        {link.label}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 5,
                        }}
                      >
                        {link.sub.map((s) => (
                          <button
                            key={s.p}
                            onClick={() => {
                              setPage(s.p);
                              setMenuOpen(false);
                              window.scrollTo(0, 0);
                            }}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "14px 16px",
                              borderRadius: 16,
                              background: dark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.03)",
                              border: "none",
                              color: dark ? "#fff" : "#000",
                              fontSize: 15,
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              cursor: "pointer",
                            }}
                          >
                            {s.icon && (
                              <Icon name={s.icon} size={18} color="#7B51CC" />
                            )}
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setPage(link.p);
                        setMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "16px",
                        borderRadius: 16,
                        background:
                          page === link.p
                            ? dark
                              ? "rgba(123,81,204,0.15)"
                              : "rgba(123,81,204,0.05)"
                            : "transparent",
                        border: "none",
                        color:
                          page === link.p ? "#7B51CC" : dark ? "#fff" : "#000",
                        fontSize: 18,
                        fontWeight: 700,
                        marginBottom: 5,
                        cursor: "pointer",
                      }}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
              <div style={{ marginTop: "auto", paddingBottom: 40 }}>
                <CTAButton
                  block
                  onClick={() => {
                    window.open("https://luvlyfans.com/", "_blank");
                    setMenuOpen(false);
                  }}
                >
                  Start Earning Now
                </CTAButton>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
