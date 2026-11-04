import { adminNavbarStyles as s } from '../assets/dummyStyles.jsx';
import { useAuth } from '../auth/useAuth.js';
import {
  LayoutDashboard,
  UsersRound,
  CalendarCheck,
  CalendarOff,
  BadgeDollarSign,
  Bell,
  BriefcaseBusiness,
  LogOut,
  X,
  Menu,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'Employee', icon: UsersRound, href: '/employees' },
  { label: 'Attendance', icon: CalendarCheck, href: '/attendance' },
  { label: 'Leave', icon: CalendarOff, href: '/leaves' },
  { label: 'Payroll', icon: BadgeDollarSign, href: '/payroll' },
  { label: 'Announcements', icon: Bell, href: '/announcements' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('touchstart', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('touchstart', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // handleLogout
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header ref={menuRef} className={s.header}>
      <div className={s.headerGlow}></div>
      <div className={s.headerLine}></div>

      <nav className={s.nav}>
        <a href="/" className={s.logoLink}>
          <span className={s.logoIconWrapper}>
            <BriefcaseBusiness className={s.logoIcon} />
          </span>
          <span className={s.logoTextWrapper}>
            <span className={s.logoText}>EMS Admin</span>
            <span className={s.logoSubtext}>Employee System</span>
          </span>
        </a>

        <div className={s.desktopNavWrapper}>
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = isActive(href);

            return (
              <Link
                key={label}
                to={href}
                className={s.getDesktopNavLinkClass(active)}
              >
                <Icon className={s.getDesktopIconClass(active)} />
                <span>{label}</span>
                {active && <span className={s.activeDotDesktop} />}
              </Link>
            );
          })}
        </div>

        <div className={s.actionWrapper}>
          <button
            type="button"
            onClick={handleLogout}
            className={s.logoutDesktop}
          >
            <LogOut className={s.logoutIcon} />
            <span>Logout</span>
          </button>

          <button
            type="button"
            className={s.menuToggle}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className={s.menuIcon} />
            ) : (
              <Menu className={s.menuIcon} />
            )}
          </button>
        </div>
      </nav>

      <div className={s.getMobileMenuClass(menuOpen)}>
        <div className={s.mobileMenuGrid}>
          {navItems.map(({ label, icon: Icon, href }) => {
            const active = isActive(href);

            return (
              <Link
                key={label}
                to={href}
                className={s.getMobileNavLinkClass(active)}
              >
                <Icon className={s.getMobileIconClass(active)} />
                <span>{label}</span>
                {active && <span className={s.activeDotDesktop} />}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className={s.logoutMobile}
          >
            <LogOut className={s.logoutIcon} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
