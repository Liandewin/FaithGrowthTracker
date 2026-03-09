export function WelcomeHeaderSkeleton() {
    return (
        <div>
            <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04) 25%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 75%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }
      `}</style>
            <div className="skeleton" style={{ height: 44, width: 380, marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 16, width: 240 }} />
        </div>
    )
}