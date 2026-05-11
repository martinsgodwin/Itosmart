"use client";
import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  suggestions: string[];
}

export default function ChatInput({ onSend, suggestions }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="ito-input-container">
      {/* Show suggestions above input if no text is typed */}
      {!text && (
        <div className="ito-quick-chips" style={{ marginBottom: "16px" }}>
          {suggestions.map((s) => (
            <button key={s} className="ito-chip" onClick={() => onSend(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="ito-input-wrapper">
        <textarea
          ref={textareaRef}
          rows={1}
          className="ito-textarea"
          placeholder="Message Itosmart..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <div className="ito-input-actions">
          <div className="ito-input-tools">
            <button className="ito-icon-btn" style={{ width: "28px", height: "28px", border: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.51a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>
          <button className="ito-send-btn" onClick={handleSend} disabled={!text.trim()}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}