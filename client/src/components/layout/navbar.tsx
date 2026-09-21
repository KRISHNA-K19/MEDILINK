import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Cross, ShieldCheck, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-medilink-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-medilink-navy text-medilink-tealLight flex items-center justify-center shadow-sm">
            <Cross className="w-5 h-5 rotate-45" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-medilink-navy font-heading tracking-tight">MediLink</span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-medilink-teal ml-2 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
              Verified Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-medilink-muted">
          <Link to="/" className="hover:text-medilink-navy transition-colors">
            Home
          </Link>
          <Link to="/how-it-works" className="hover:text-medilink-navy transition-colors">
            How It Works
          </Link>
          <Link to="/for-pharmacies" className="hover:text-medilink-navy transition-colors">
            For Pharmacies
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            <User className="w-4 h-4 mr-1" />
            <span>Sign In</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
            <span>Register</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-medilink-navy text-white pt-16 pb-12 border-t border-medilink-darkblue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-medilink-teal text-white flex items-center justify-center">
              <Cross className="w-4 h-4 rotate-45" />
            </div>
            <span className="text-xl font-bold font-heading text-white">MediLink</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Smart Medicine Discovery & Qualitative Reservation Platform connecting patients with verified local pharmacies.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Verified Pharmacy Network</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Patient Services</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/patient/search" className="hover:text-white transition-colors">Medicine Search</Link></li>
            <li><Link to="/patient/reserve" className="hover:text-white transition-colors">Reserve Medicine</Link></li>
            <li><Link to="/patient/reservations" className="hover:text-white transition-colors">Track Reservation</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">Prescription Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">For Pharmacies</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/for-pharmacies" className="hover:text-white transition-colors">Pharmacy Registration</Link></li>
            <li><Link to="/pharmacy/dashboard" className="hover:text-white transition-colors">Pharmacy Portal</Link></li>
            <li><Link to="/for-pharmacies" className="hover:text-white transition-colors">Verification Process</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Platform Oversight</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin Portal</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">Safety Standards</Link></li>
            <li><span className="text-slate-500">MediLink v1.0 Production</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; 2026 MediLink Platform. All rights reserved.</p>
        <p className="italic">"Find. Reserve. Collect." — Non-E-Commerce Qualitative Reservation System</p>
      </div>
    </footer>
  );
};
