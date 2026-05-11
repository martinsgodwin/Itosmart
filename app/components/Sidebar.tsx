"use client";
import React from "react";
import { useState } from "react";

// Navigation configuration
const navItems = [
  { icon: "chat", label: "Chat", badge: null },
  { icon: "history", label: "History", badge: "12" },
  { icon: "folder", label: "Projects", badge: null },
  { icon: "bulb", label: "Prompts", badge: null },
];

// ─── SVG ICON COMPONENTS ───
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
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNewChat: () => void; // Prop to handle resetting the chat state
}

export default function Sidebar({ isOpen, setIsOpen, onNewChat }: SidebarProps) {
  const [activeNav, setActiveNav] = useState("Chat");

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    // Auto-close sidebar on mobile devices after a selection is made
    if (window.innerWidth < 768) setIsOpen(false);
  };

  const handleNewChatClick = () => {
    onNewChat(); // Clear current messages
    setActiveNav("Chat"); // Default back to Chat tab
  };

  const sidebarContent = (
    <>
      {/* Header row with New Chat button */}
      <div className="ito-sidebar-header">
        <button className="ito-new-chat" onClick={handleNewChatClick}>
          <PlusIcon />
          <span>New Chat</span>
        </button>
        {/* Collapse button — visible on desktop only */}
        <button
          className="ito-close-btn ito-hide-mobile"
          onClick={() => setIsOpen(false)}
          aria-label="Collapse sidebar"
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <p className="ito-section-label">Menu</p>

      {/* Navigation items list */}
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

      {/* Sidebar footer with plan info */}
      <div className="ito-sidebar-footer">
        <div className="ito-plan-badge" role="button" tabIndex={0} aria-label="Current plan">
          <div className="ito-plan-dot" />
          <div className="ito-plan-text">
            <strong>Free Plan</strong>
            Upgrade for more
          </div>
          <span style={{ marginLeft: "auto", color: "var(--muted)" }}>
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

      {/* Main Sidebar container */}
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
              onClick={handleNewChatClick}
            >
              <PlusIcon />
            </button>
            
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`ito-nav-item ${activeNav === item.label ? "active" : ""}`}
                role="button"
                tabIndex={0}
                title={item.label}
                onClick={() => { 
                  setIsOpen(true); // Expand sidebar when clicking an icon
                  setActiveNav(item.label); 
                }}
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