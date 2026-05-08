"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function Home() {
  // Desktop: open by default. Mobile: closed by default.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ito-root">
      <Header onMenuToggle={() => setIsSidebarOpen((v) => !v)} isSidebarOpen={isSidebarOpen} />
      <div className="ito-body">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className="ito-main" aria-label="Main content area">
          <div className="ito-empty-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <h1 className="ito-empty-title">What can I help you with?</h1>
          <p className="ito-empty-sub">
            The day you stop learning, you start dying. But don't worry, I'm here to help you learn and grow.
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