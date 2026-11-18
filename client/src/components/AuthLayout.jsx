import { Link, Outlet } from 'react-router-dom';
import TopBar from './site/TopBar';

// Signed-out visitors get the landing page's look: same floating nav card, with the home sections one click away.
const LINKS = [
    { to: '/', label: 'Home', end: true },
    { to: '/#gallery', label: 'Gallery' },
    { to: '/#about', label: 'About' },
    { to: '/#faq', label: 'FAQ' },
];

/** Purely decorative backdrop for the sign-in pages: gradient glows, a dot grid and drifting line icons. */
const AuthBackdrop = () => (
  <div className="auth-bg" aria-hidden="true">
    <span className="auth-glow g1" /><span className="auth-glow g2" /><span className="auth-glow g3" />

    <svg className="auth-deco deco-calendar" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="22" width="92" height="84" rx="10" />
      <path d="M14 46H106M38 12v20M82 12v20" />
      <path d="M30 60h14v12H30zM53 60h14v12H53zM76 60h14v12H76zM30 82h14v12H30zM53 82h14v12H53z" strokeWidth="3.5" />
    </svg>

    <svg className="auth-deco deco-clock" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="60" r="46" />
      <path d="M60 30v30l20 12" />
    </svg>

    <svg className="auth-deco deco-check" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="60" r="46" />
      <path d="m38 62 16 16 30-34" />
    </svg>

    <svg className="auth-deco deco-calendar-sm" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="22" width="92" height="84" rx="10" />
      <path d="M14 46H106M38 12v20M82 12v20" />
    </svg>
  </div>
);

const AuthLayout = () => (
  <div className="site theme-brand app-shell">
    <TopBar logoTo="/" links={LINKS}>
      <Link to="/login" className="text-link">Log in</Link>
      <Link to="/signup" className="pill-btn">Sign up</Link>
    </TopBar>
    <main className="content auth-content">
      <AuthBackdrop />
      <Outlet />
    </main>
  </div>
);

export default AuthLayout;
