import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../Icon';
import Logo from '../Logo';
import useScrolled from './useScrolled';

/**
 * The landing page's floating nav card, used by every other screen (signed-in app, log in, sign up):
 * logo on the left, `links` in the middle and whatever is passed as children (user, buttons) on the right.
 */
const TopBar = ({ logoTo = '/', links, children }) => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const scrolled = useScrolled();
    useEffect(() => setOpen(false), [pathname]);

    return (<header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <Logo to={logoTo} tone="chip" size={42} />
      <button type="button" className="site-burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Icon name={open ? 'x' : 'menu'} size={22} />
      </button>
      <nav className={`site-nav${open ? ' open' : ''}`} aria-label="Primary">
        <div className="site-links">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end}>{link.label}</NavLink>)}
        </div>
        <div className="site-cta">{children}</div>
      </nav>
    </header>);
};

export default TopBar;
