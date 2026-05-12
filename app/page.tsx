"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
import ChatInput from "./components/ChatInput";

type Message = { role: "user" | "ai"; content: string };

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      setTimeout(() => {
        messageListRef.current?.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 0);
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(newMessages);

    // Add default AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "This is a default response. I'm ready to be customized!" },
      ]);
    }, 500);
  };

  const handleNewChat = () => {
    setMessages([]); 
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const suggestions = ["Write some code", "Summarize a doc", "Brainstorm ideas", "Explain a concept"];

  return (
    <div className="ito-root">
      <Header onMenuToggle={() => setIsSidebarOpen((v) => !v)} isSidebarOpen={isSidebarOpen} />
      <div className="ito-body">
        {/* Pass handleNewChat to Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          onNewChat={handleNewChat} 
        />
        
        <main className="ito-main">
          <div className="ito-chat-wrapper">
            {messages.length === 0 ? (
              /* EMPTY STATE */
              <div className="ito-main" style={{ padding: "0", height: "100%" }}>
                <div className="ito-empty-icon">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </motion.svg>
                </div>
                <h1 className="ito-empty-title">What can I help you with?</h1>
                <p className="ito-empty-sub">
                  The day you stop learning, you start dying. I'm here to help you grow.
                </p>
              </div>
            ) : (
              /* MESSAGE LIST */
              <div className="ito-message-list" ref={messageListRef}>
                {messages.map((msg, i) => (
                  <div key={i} className={`ito-msg ito-msg-${msg.role}`}>
                    <div className="ito-avatar" style={{ width: "28px", height: "28px", fontSize: "10px" }}>
                      {msg.role === "user" ? "U" : "AI"}
                    </div>
                    <div className="ito-msg-bubble">{msg.content}</div>
                  </div>
                ))}
              </div>
            )}

            {/* SHARED INPUT (with suggestions inside) */}
            <ChatInput onSend={handleSendMessage} suggestions={suggestions} hasMessages={messages.length > 0} />
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}