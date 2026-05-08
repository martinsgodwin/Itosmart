export default function Footer() {
  return (
    <footer className="ito-footer">
      {/* Links — hidden on smallest screens */}
      <div className="ito-footer-left ito-hide-mobile">
        <span className="ito-footer-link">Privacy</span>
        <span className="ito-footer-link">Terms</span>
        <span className="ito-footer-link">Docs</span>
      </div>

      <div className="ito-footer-status">
        <div className="ito-status-dot" aria-hidden="true" />
        <span className="ito-hide-mobile">All systems normal</span>
        <span className="ito-show-mobile">Online</span>
      </div>

      <div className="ito-model-tag" aria-label="AI model in use">
        <span className="ito-hide-mobile">Gemini 2.0 Flash</span>
        <span className="ito-show-mobile">Gemini</span>
      </div>
    </footer>
  );
}