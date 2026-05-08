import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="ito-root">
      <Header />
      <div className="ito-body">
        <Sidebar />
        <main className="ito-main" aria-label="Main content area">
          <div className="ito-empty-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="ito-empty-title">What can I help you with?</h1>
          <p className="ito-empty-sub">
            Powered by Gemini. Ask anything — code, write, analyze, brainstorm.
          </p>
          <div className="ito-quick-chips" role="list" aria-label="Quick prompt suggestions">
            {["Write some code", "Summarize a doc", "Brainstorm ideas", "Explain a concept"].map((chip) => (
              <div key={chip} className="ito-chip" role="listitem">
                {chip}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}