import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Cross,
  LayoutDashboard,
  Search,
  BookmarkCheck,
  Bell,
  User,
  Settings,
  Store,
  Pill,
  FileCheck,
  BarChart3,
  Users,
  ShieldCheck,
  Activity,
  LogOut,
  Sliders,
} from 'lucide-react';
import { Button } from '../ui/button';

export interface DashboardLayoutProps {
  role: 'PATIENT' | 'PHARMACY' | 'ADMIN';
  userName?: string;
  userEmail?: string;
  unreadNotifications?: number;
  children: React.ReactNode;
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  role,
  userName = 'User',
  userEmail,
  unreadNotifications = 0,
  children,
  onLogout,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
    badge?: number;
  }

  const patientNav: NavItem[] = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Search Medicine', path: '/patient/search', icon: <Search className="w-4 h-4" /> },
    { label: 'My Reservations', path: '/patient/reservations', icon: <BookmarkCheck className="w-4 h-4" /> },
    { label: 'Notifications', path: '/patient/notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifications },
    { label: 'Profile', path: '/patient/profile', icon: <User className="w-4 h-4" /> },
  ];

  const pharmacyNav: NavItem[] = [
    { label: 'Overview', path: '/pharmacy/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Verification', path: '/pharmacy/verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Medicine Inventory', path: '/pharmacy/inventory', icon: <Pill className="w-4 h-4" /> },
    { label: 'Reservation Queue', path: '/pharmacy/reservations', icon: <FileCheck className="w-4 h-4" /> },
    { label: 'Analytics Reports', path: '/pharmacy/reports', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Notifications', path: '/pharmacy/notifications', icon: <Bell className="w-4 h-4" />, badge: unreadNotifications },
    { label: 'Pharmacy Profile', path: '/pharmacy/profile', icon: <Store className="w-4 h-4" /> },
  ];

  const adminNav: NavItem[] = [
    { label: 'Ops Console', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Pharmacy Approvals', path: '/admin/pharmacies', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'User Control', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Reservation Audit', path: '/admin/reservations', icon: <BookmarkCheck className="w-4 h-4" /> },
    { label: 'Activity Logs', path: '/admin/activity', icon: <Activity className="w-4 h-4" /> },
    { label: 'Platform Stats', path: '/admin/statistics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'System Settings', path: '/admin/settings', icon: <Sliders className="w-4 h-4" /> },
  ];

  const currentNav = role === 'PATIENT' ? patientNav : role === 'PHARMACY' ? pharmacyNav : adminNav;

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-medilink-navy text-white flex-shrink-0 border-r border-medilink-darkblue flex flex-col">
        {/* Brand Header */}
        <div className="p-5 border-b border-medilink-darkblue flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-medilink-teal text-white flex items-center justify-center shadow-xs">
              <Cross className="w-4 h-4 rotate-45" />
            </div>
            <div>
              <span className="text-lg font-bold font-heading text-white tracking-tight">MediLink</span>
              <p className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">{role} PORTAL</p>
            </div>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="p-4 mx-3 my-3 bg-medilink-darkblue rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-medilink-teal text-white flex items-center justify-center font-bold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{userName}</p>
            <p className="text-[10px] text-slate-400 truncate">{userEmail || `${role.toLowerCase()}@medilink.local`}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {currentNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all',
                  isActive
                    ? 'bg-medilink-teal text-white font-bold shadow-sm'
                    : 'text-slate-300 hover:bg-medilink-darkblue hover:text-white'
                )}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-medilink-darkblue">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-medilink-border px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-xs text-medilink-muted">
            <span className="font-semibold uppercase tracking-wider text-medilink-teal">{role}</span>
            <span>/</span>
            <span className="font-bold text-medilink-navy">
              {currentNav.find((n) => n.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="relative text-xs"
              onClick={() => navigate(`/${role.toLowerCase()}/notifications`)}
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Notifications</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-medilink-danger text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
        </header>

        {/* Viewport Content */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
