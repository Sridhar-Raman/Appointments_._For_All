import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';
import { useLogoutConfirm } from './LogoutConfirm';
import TopBar from './site/TopBar';

// One menu for everybody; `roles` limits an entry to those roles. Users (account management) is admin-only.
const NAV = [
    { to: '/app', label: 'Dashboard', end: true },
    { to: '/app/calendar', label: 'Calendar' },
    { to: '/app/appointment-types', label: 'Appointment Types' },
    { to: '/app/my-appointments', label: 'My Appointments', roles: ['client'] },
    { to: '/app/book', label: 'Book', roles: ['client'] },
    { to: '/app/users', label: 'Users', roles: ['admin'] },
    { to: '/app/profile', label: 'Profile' },
];

/** Signed-in screens use the landing page's look: inset gradient canvas with the floating nav card on top. */
const Layout = () => {
    const { user } = useAuth();
    const askLogout = useLogoutConfirm();
    return (<div className="site theme-brand app-shell">
      <TopBar logoTo="/app" links={NAV.filter((item) => !item.roles || item.roles.includes(user.role))}>
        <span className="app-user">
          <span className="avatar">{user.name.slice(0, 1)}</span>
          <span className="app-user-text"><b>{user.name}</b><small>{user.role}</small></span>
        </span>
        <button type="button" className="pill-btn pill-ghost" onClick={askLogout}><Icon name="log-out" size={15} />Log out</button>
      </TopBar>
      <main className="content"><div className="page"><Outlet /></div></main>
    </div>);
};

export default Layout;
