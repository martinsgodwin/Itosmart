export default function Footer() {
  return (
    <footer className="ito-footer">
      <div className="ito-footer-left">
        <span className="ito-footer-link">Privacy</span>
        <span className="ito-footer-link">Terms</span>
        <span className="ito-footer-link">Docs</span>
      </div>

      <div className="ito-footer-status">
        <div className="ito-status-dot" aria-hidden="true" />
        All systems normal
      </div>

      <div className="ito-model-tag" aria-label="AI model in use">
        Gemini 2.0 Flash
      </div>
    </footer>
  );
}