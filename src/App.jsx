import { useState, useEffect } from "react";
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
} from "./pages";
import { StickyBar } from "./components";

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [article, setArticle] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleNav = (p) => {
    setPage(p);
    setArticle(null);
    setSelectedFeature(null);
    setSelectedEvent(null);
    window.scrollTo(0, 0);
  };

  const handleRead = (a) => {
    setArticle(a);
    setPage("article");
    window.scrollTo(0, 0);
  };
  const handleBack = () => {
    handleNav("home");
  };

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
      {page === "free-creators" && <FreeCreatorsPage dark={dark} />}
      {page === "mission" && <MissionPage dark={dark} />}
      {page === "contact" && <ContactPage dark={dark} />}

      <Footer dark={dark} setPage={handleNav} />
      <StickyBar dark={dark} onNavigate={handleNav} />
    </div>
  );
}
