import { useState, useEffect } from "react";
import { Nav, HomePage, ArticlePage, HubPage, ComparePage, Footer, GettingStartedPage, EarningPage, FeaturesPage, EventsPage, FreeCreatorsPage, MissionPage, ContactPage } from "./pages";
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

  const handleRead = (a) => { setArticle(a); setPage("article"); window.scrollTo(0, 0); };
  const handleBack = () => { handleNav("home"); };

  useEffect(() => {
    document.body.style.background = dark ? "#090909" : "#f8f8f6";
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Sora', system-ui, sans-serif";
  }, [dark]);

  return (
    <div style={{ minHeight: "100vh", color: dark ? "#fff" : "#0f0f0f", background: dark ? "#090909" : "#f8f8f6", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Sora', system-ui, sans-serif; }
        ::placeholder { color: rgba(255,255,255,0.35); }
        blockquote { border-left: 3px solid #7B51CC; padding-left: 20px; margin: 28px 0; font-style: italic; opacity: 0.8; }
        h2 { font-family: 'Sora', sans-serif; font-size: 26px; margin: 36px 0 16px; color: inherit; font-weight: 700; }
        strong { color: inherit; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(123,81,204,0.3); border-radius: 3px; }
      `}</style>

      <Nav dark={dark} setDark={setDark} page={page} setPage={handleNav} />

      {page === "home" && <HomePage dark={dark} onRead={handleRead} setPage={handleNav} />}
      {page === "article" && article && <ArticlePage article={article} dark={dark} onBack={handleBack} onRead={handleRead} />}
      {page === "hub" && <HubPage dark={dark} onRead={handleRead} setPage={handleNav} />}
      {page === "compare" && <ComparePage dark={dark} setPage={handleNav} />}
      {page === "getting-started" && <GettingStartedPage dark={dark} />}
      {page === "earning" && <EarningPage dark={dark} />}
      {page === "features" && <FeaturesPage dark={dark} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} />}
      {page === "events" && <EventsPage dark={dark} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />}
      {page === "free-creators" && <FreeCreatorsPage dark={dark} />}
      {page === "mission" && <MissionPage dark={dark} />}
      {page === "contact" && <ContactPage dark={dark} />}

      <Footer dark={dark} setPage={handleNav} />
      <StickyBar dark={dark} onNavigate={handleNav} />
    </div>
  );
}
