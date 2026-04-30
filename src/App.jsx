import { useState, useEffect, useCallback } from "react";
import {
  Nav,
  HomePage,
  ArticlePage,
  HubPage,
  ComparePage,
  Footer,
  GettingStartedPage,
  EarningPage,
  FeaturesPage,
  EventsPage,
  FreeCreatorsPage,
  MissionPage,
  ContactPage,
  CreatorCornerPage,
} from "./pages";
import { StickyBar } from "./components";
import { ARTICLES } from "./data";

// Map page keys to URL paths
const PAGE_TO_PATH = {
  home: "/",
  hub: "/hub",
  compare: "/compare",
  "getting-started": "/getting-started",
  earning: "/earning",
  features: "/features",
  events: "/events",
  "free-creators": "/free-creators",
  mission: "/mission",
  contact: "/contact",
  "creator-corner": "/creator-corner",
};

// Reverse: URL path to page key
const PATH_TO_PAGE = {};
Object.entries(PAGE_TO_PATH).forEach(([page, path]) => {
  PATH_TO_PAGE[path] = page;
});

// Parse the current URL to determine initial page/article
function parseURL() {
  const path = window.location.pathname;

  // Check for article routes: /article/<slug>
  if (path.startsWith("/article/")) {
    const slug = path.replace("/article/", "");
    const article = ARTICLES.find((a) => a.slug === slug);
    if (article) {
      return { page: "article", article };
    }
    return { page: "home", article: null };
  }

  // Check known pages
  const page = PATH_TO_PAGE[path];
  if (page) {
    return { page, article: null };
  }

  // Default to home
  return { page: "home", article: null };
}

export default function App() {
  const initial = parseURL();
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState(initial.page);
  const [article, setArticle] = useState(initial.article);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Push URL when navigating to a page
  const handleNav = useCallback((p) => {
    setPage(p);
    setArticle(null);
    setSelectedFeature(null);
    setSelectedEvent(null);
    window.scrollTo(0, 0);

    const path = PAGE_TO_PATH[p] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ page: p }, "", path);
    }
  }, []);

  // Push URL when reading an article
  const handleRead = useCallback((a) => {
    setArticle(a);
    setPage("article");
    window.scrollTo(0, 0);

    const path = `/article/${a.slug}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ page: "article", slug: a.slug }, "", path);
    }
  }, []);

  const handleBack = useCallback(() => {
    handleNav("home");
  }, [handleNav]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const { page: p, article: a } = parseURL();
      setPage(p);
      setArticle(a);
      setSelectedFeature(null);
      setSelectedEvent(null);
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light",
    );
    document.body.style.background = dark ? "#090909" : "#f8f8f6";
  }, [dark]);

  return (
    <div
      style={{
        minHeight: "100vh",
        color: dark ? "#fff" : "#0f0f0f",
        background: dark ? "#090909" : "#f8f8f6",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Nav dark={dark} setDark={setDark} page={page} setPage={handleNav} />

      {page === "home" && (
        <HomePage dark={dark} onRead={handleRead} setPage={handleNav} />
      )}
      {page === "article" && article && (
        <ArticlePage
          article={article}
          dark={dark}
          onBack={handleBack}
          onRead={handleRead}
        />
      )}
      {page === "hub" && (
        <HubPage dark={dark} onRead={handleRead} setPage={handleNav} />
      )}
      {page === "compare" && <ComparePage dark={dark} setPage={handleNav} />}
      {page === "getting-started" && <GettingStartedPage dark={dark} />}
      {page === "earning" && <EarningPage dark={dark} />}
      {page === "features" && (
        <FeaturesPage
          dark={dark}
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />
      )}
      {page === "events" && (
        <EventsPage
          dark={dark}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      )}
      {page === "creator-corner" && (
        <CreatorCornerPage dark={dark} setPage={handleNav} />
      )}
      {page === "free-creators" && <FreeCreatorsPage dark={dark} onRead={handleRead} />}
      {page === "mission" && <MissionPage dark={dark} />}
      {page === "contact" && <ContactPage dark={dark} />}

      <Footer dark={dark} setPage={handleNav} />
      <StickyBar dark={dark} onNavigate={handleNav} />
    </div>
  );
}
