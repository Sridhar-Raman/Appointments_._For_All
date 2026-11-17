import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { homeFor, useAuth } from '../../context/AuthContext';
import Icon from '../Icon';
import Logo, { BRAND } from '../Logo';
import { useLogoutConfirm } from '../LogoutConfirm';
import useScrolled from './useScrolled';

// Every public page is a section of the home screen; the menu scrolls to it and follows the scroll position.
const LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
];

const scrollToSection = (id, smooth = true) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'home') window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    else el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
};

/** The section whose top has most recently passed a line a little below the sticky header. */
const useActiveSection = () => {
    const [active, setActive] = useState(LINKS[0].id);
    useEffect(() => {
        const update = () => {
            const line = window.innerHeight * 0.35;
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            let current = LINKS[0].id;
            for (const { id } of LINKS) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            }
            setActive(atBottom ? LINKS[LINKS.length - 1].id : current);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
    }, []);
    return active;
};

const SiteLayout = () => {
    const { user } = useAuth();
    const askLogout = useLogoutConfirm();
    const { pathname, hash } = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const scrolled = useScrolled();
    const active = useActiveSection();

    // Close the mobile menu on navigation and scroll each page to the top.
    useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
    // Arriving with a #section (a bookmark or the old /about, /gallery, /faq addresses) scrolls straight to it.
    useEffect(() => { if (hash) requestAnimationFrame(() => scrollToSection(hash.slice(1), false)); }, [hash, pathname]);

    const go = (id) => (event) => {
        event.preventDefault();
        setOpen(false);
        if (pathname !== '/') return navigate(`/#${id}`);
        window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
        scrollToSection(id);
    };

    return (<div className="site theme-brand">
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <Logo tone="chip" size={42} />
        <button type="button" className="site-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
        <nav className={`site-nav${open ? ' open' : ''}`} aria-label="Primary">
          <div className="site-links">
            {LINKS.map((link) => <a key={link.id} href={`/#${link.id}`} className={pathname === '/' && active === link.id ? 'active' : undefined} aria-current={pathname === '/' && active === link.id ? 'true' : undefined} onClick={go(link.id)}>{link.label}</a>)}
          </div>
          <div className="site-cta">
            {user ? (<>
              <Link to={homeFor(user)} className="pill-btn">Dashboard</Link>
              <button type="button" className="pill-btn pill-ghost" onClick={askLogout}><Icon name="log-out" size={15} />Log out</button>
            </>) : (<>
              <Link to="/login" className="text-link">Log in</Link>
              <Link to="/signup" className="pill-btn">Sign up</Link>
            </>)}
          </div>
        </nav>
      </header>

      <main className="site-main"><Outlet /></main>

      <footer className="site-footer">
        <div className="site-footer-grid">
          <div>
            <Logo tone="dark" size={46} slogan />
            <p>Online appointment booking for people who value their time, and for the teams who look after them.</p>
          </div>
          <div>
            <h4>Explore</h4>
            {LINKS.map((link) => <a key={link.id} href={`/#${link.id}`} onClick={go(link.id)}>{link.label}</a>)}
          </div>
          <div>
            <h4>Account</h4>
            {user ? (<>
              <Link to={homeFor(user)}>Dashboard</Link>
              <button type="button" className="footer-link" onClick={askLogout}>Log out</button>
            </>) : (<>
              <Link to="/signup">Create an account</Link>
              <Link to="/login">Log in</Link>
            </>)}
          </div>
        </div>
        <div className="site-footer-bar">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
      </footer>
    </div>);
};

export default SiteLayout;
