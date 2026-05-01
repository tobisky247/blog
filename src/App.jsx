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
  CategoryPage,
} from "./pages";
import { StickyBar } from "./components";
import { ARTICLES, FEATURES, EVENTS } from "./data";

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
  "creator-voices": "/creator-voices",
  "category-make-money": "/category/make-money",
  "category-growth": "/category/growth",
  "category-guides": "/category/guides",
};

// Reverse: URL path to page key
const PATH_TO_PAGE = {};
Object.entries(PAGE_TO_PATH).forEach(([page, path]) => {
  PATH_TO_PAGE[path] = page;
});

// Parse the current URL to determine initial page/article/feature/event
function parseURL() {
  const path = window.location.pathname;

  if (path.startsWith("/article/")) {
    const slug = path.replace("/article/", "");
    const article = ARTICLES.find((a) => a.slug === slug);
    return {
      page: article ? "article" : "home",
      article: article || null,
      feature: null,
      event: null,
      category: null,
    };
  }

  if (path.startsWith("/category/")) {
    const categorySlug = path.replace("/category/", "");
    const categoryMap = {
      "make-money": "Make Money",
      growth: "Growth",
      guides: "Guides",
    };
    const category = categoryMap[categorySlug];
    return {
      page: category ? "category" : "home",
      article: null,
      feature: null,
      event: null,
      category,
    };
  }

  if (path.startsWith("/features/")) {
    const slug = path.replace("/features/", "");
    const feature = FEATURES.find((f) => f.slug === slug);
    return {
      page: "features",
      article: null,
      feature: feature ? feature.id : null,
      event: null,
      category: null,
    };
  }

  if (path.startsWith("/events/")) {
    const slug = path.replace("/events/", "");
    const eventObj = EVENTS.find((e) => e.slug === slug);
    return {
      page: "events",
      article: null,
      feature: null,
      event: eventObj ? eventObj.id : null,
      category: null,
    };
  }

  if (path.startsWith("/creator-voices/")) {
    return {
      page: "creator-voices",
      article: null,
      feature: null,
      event: null,
      category: null,
    };
  }

  const page = PATH_TO_PAGE[path];
  if (page) {
    return { page, article: null, feature: null, event: null, category: null };
  }

  return {
    page: "home",
    article: null,
    feature: null,
    event: null,
    category: null,
  };
}

export default function App() {
  const initial = parseURL();
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState(initial.page);
  const [article, setArticle] = useState(initial.article);
  const [selectedFeature, setSelectedFeature] = useState(initial.feature);
  const [selectedEvent, setSelectedEvent] = useState(initial.event);
  const [category, setCategory] = useState(initial.category);

  // Push URL when navigating to a page
  const handleNav = useCallback((p) => {
    setPage(p);
    setArticle(null);
    setSelectedFeature(null);
    setSelectedEvent(null);
    setCategory(null);
    window.scrollTo(0, 0);

    const path = PAGE_TO_PATH[p] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState({ page: p }, "", path);
    }
  }, []);

  // Navigate to category page
  const handleCategoryNav = useCallback((categoryName) => {
    setPage("category");
    setCategory(categoryName);
    setArticle(null);
    setSelectedFeature(null);
    setSelectedEvent(null);
    window.scrollTo(0, 0);

    const categorySlug = categoryName.toLowerCase().replace(/ /g, "-");
    const path = `/category/${categorySlug}`;
    if (window.location.pathname !== path) {
      window.history.pushState(
        { page: "category", category: categoryName },
        "",
        path,
      );
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

  const handleSelectFeature = useCallback((id) => {
    setSelectedFeature(id);
    const feature = FEATURES.find((f) => f.id === id);
    if (feature) {
      window.history.pushState(
        { page: "features", featureId: id },
        "",
        `/features/${feature.slug}`,
      );
    } else {
      window.history.pushState({ page: "features" }, "", `/features`);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleSelectEvent = useCallback((id) => {
    setSelectedEvent(id);
    const eventObj = EVENTS.find((e) => e.id === id);
    if (eventObj) {
      window.history.pushState(
        { page: "events", eventId: id },
        "",
        `/events/${eventObj.slug}`,
      );
    } else {
      window.history.pushState({ page: "events" }, "", `/events`);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleBack = useCallback(() => {
    handleNav("home");
  }, [handleNav]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      const {
        page: p,
        article: a,
        feature: f,
        event: e,
        category: c,
      } = parseURL();
      setPage(p);
      setArticle(a);
      setSelectedFeature(f);
      setSelectedEvent(e);
      setCategory(c);
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
      <Nav
        dark={dark}
        setDark={setDark}
        page={page}
        setPage={handleNav}
        onCategoryNav={handleCategoryNav}
      />

      {page === "home" && (
        <HomePage dark={dark} onRead={handleRead} setPage={handleNav} />
      )}
      {page === "category" && category && (
        <CategoryPage category={category} onRead={handleRead} dark={dark} />
      )}
      {page === "article" && article && (
        <ArticlePage
          article={article}
          dark={dark}
          onBack={handleBack}
          onRead={handleRead}
          onCategoryNav={handleCategoryNav}
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
          setSelectedFeature={handleSelectFeature}
        />
      )}
      {page === "events" && (
        <EventsPage
          dark={dark}
          selectedEvent={selectedEvent}
          setSelectedEvent={handleSelectEvent}
        />
      )}
      {page === "creator-voices" && (
        <CreatorCornerPage dark={dark} setPage={handleNav} />
      )}
      {page === "free-creators" && (
        <FreeCreatorsPage dark={dark} onRead={handleRead} />
      )}
      {page === "mission" && <MissionPage dark={dark} />}
      {page === "contact" && <ContactPage dark={dark} />}

      <Footer dark={dark} setPage={handleNav} />
      <StickyBar dark={dark} onNavigate={handleNav} />
    </div>
  );
}
