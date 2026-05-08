"use client";
import React from "react";
import { useState } from "react";

const navItems = [
  { icon: "chat", label: "Chat", badge: null },
  { icon: "history", label: "History", badge: "12" },
  { icon: "folder", label: "Projects", badge: null },
  { icon: "bulb", label: "Prompts", badge: null },
];

const toolItems = [
  { icon: "chart", label: "Analytics" },
  { icon: "api", label: "API Keys" },
  { icon: "plug", label: "Integrations" },
];

function ChatIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function HistoryIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.1" /></svg>;
}
function FolderIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
}
function BulbIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>;
}
function ChartIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
}
function ApiIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
}
function PlugIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 7l-8 8" /><path d="M15 7h3v3" /><path d="M9 17H6v-3" /><path d="m5 3 4 4" /><path d="m19 21-4-4" /></svg>;
}
function PlusIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
}
function ChevronRightIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>;
}
function ChevronLeftIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>;
}

const iconMap: Record<string, React.ReactElement> = {
  chat: <ChatIcon />,
  history: <HistoryIcon />,
  folder: <FolderIcon />,
  bulb: <BulbIcon />,
  chart: <ChartIcon />,
  api: <ApiIcon />,
  plug: <PlugIcon />,
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("Chat");

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    // Auto-close on mobile after selection
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Header row */}
      <div className="ito-sidebar-header">
        <button className="ito-new-chat">
          <PlusIcon />
          <span>New Chat</span>
        </button>
        {/* Collapse button — desktop only */}
        <button
          className="ito-close-btn ito-hide-mobile"
          onClick={() => setIsOpen(false)}
          aria-label="Collapse sidebar"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <p className="ito-section-label">Menu</p>

      {navItems.map((item) => (
        <div
          key={item.label}
          className={`ito-nav-item ${activeNav === item.label ? "active" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => handleNavClick(item.label)}
          onKeyDown={(e) => e.key === "Enter" && handleNavClick(item.label)}
        >
          {iconMap[item.icon]}
          {item.label}
          {item.badge && <span className="ito-nav-badge">{item.badge}</span>}
        </div>
      ))}

      <div className="ito-sidebar-divider" />

      <p className="ito-section-label">Tools</p>

      {toolItems.map((item) => (
        <div
          key={item.label}
          className="ito-nav-item"
          role="button"
          tabIndex={0}
          onClick={() => { if (window.innerWidth < 768) setIsOpen(false); }}
        >
          {iconMap[item.icon]}
          {item.label}
        </div>
      ))}

      <div className="ito-sidebar-footer">
        <div className="ito-plan-badge" role="button" tabIndex={0} aria-label="Current plan">
          <div className="ito-plan-dot" />
          <div className="ito-plan-text">
            <strong>Free Plan</strong>
            Upgrade for more
          </div>
          <span style={{ marginLeft: "auto", color: "#B0B0B0" }}>
            <ChevronRightIcon />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="ito-sidebar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar — slide-over on mobile, static on desktop */}
      <aside
        className={`ito-sidebar ${!isOpen ? "collapsed" : ""}`}
        aria-label="Navigation sidebar"
      >
        {isOpen ? (
          sidebarContent
        ) : (
          /* Collapsed state — desktop only icon rail */
          <div className="ito-sidebar-collapsed-rail">
            <button
              className="ito-new-chat-icon"
              aria-label="New chat"
              title="New Chat"
            >
              <PlusIcon />
            </button>
            {[...navItems, ...toolItems].map((item) => (
              <div
                key={item.label}
                className={`ito-nav-item ${activeNav === item.label ? "active" : ""}`}
                role="button"
                tabIndex={0}
                title={item.label}
                onClick={() => { setIsOpen(true); setActiveNav(item.label); }}
              >
                {iconMap[item.icon]}
              </div>
            ))}
            <button
              className="ito-open-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              <ChevronRightIcon />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}