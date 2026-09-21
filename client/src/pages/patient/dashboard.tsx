import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatCard, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
import { ReservationStatusBadge, AvailabilityBadge } from '@/components/ui/badges';
import { Search, BookmarkCheck, Bell, User, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    activeReservations: 1,
    completedReservations: 4,
    unreadNotifications: 1,
  });

  useEffect(() => {
    const cachedUser = localStorage.getItem('medilink_user');
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {}
    }
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/patient/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/patient/search');
    }
  };

  const sampleRecentReservations = [
    {
      id: 'r1111111-1111-1111-1111-111111111111',
      number: 'RES-2026-8801',
      medicine: 'Paracetamol 500mg',
      pharmacy: 'Apollo Community Pharmacy',
      status: 'APPROVED' as const,
      date: 'Today, 2:15 PM',
      expiresIn: '18 hours remaining',
    },
    {
      id: 'r2222222-2222-2222-2222-222222222222',
      number: 'RES-2026-8802',
      medicine: 'Amoxicillin 500mg',
      pharmacy: 'Apollo Community Pharmacy',
      status: 'PENDING' as const,
      date: 'Today, 4:30 PM',
      expiresIn: 'Awaiting pharmacy review',
    },
  ];

  return (
    <DashboardLayout role="PATIENT" userName={user?.full_name || 'Sarah Jenkins'} unreadNotifications={stats.unreadNotifications}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-medilink-navy to-medilink-darkblue text-white rounded-2xl p-6 shadow-md border border-medilink-darkblue flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/50 text-teal-300 text-xs font-semibold border border-teal-700/50">
              <span>Patient Portal Active</span>
            </div>
            <h1 className="text-2xl font-bold font-heading">Welcome back, {user?.full_name || 'Sarah'}!</h1>
            <p className="text-xs text-slate-300">Find medicines at verified pharmacies, check availability, and track reservations.</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/patient/search')}>
            <Search className="w-4 h-4 mr-2" />
            <span>Search Medicine</span>
          </Button>
        </div>

        {/* Quick Search Card */}
        <Card className="p-4 bg-white border-medilink-border shadow-xs">
          <p className="text-xs font-semibold text-medilink-navy uppercase tracking-wider mb-2">Instant Medicine Search</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
        </Card>

        {/* Stat Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Active Reservations"
            value={stats.activeReservations}
            description="Items currently held or under review"
            icon={<BookmarkCheck className="w-5 h-5 text-medilink-teal" />}
          />
          <StatCard
            title="Completed Pickups"
            value={stats.completedReservations}
            description="Successfully collected reservations"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          />
          <StatCard
            title="Unread Alerts"
            value={stats.unreadNotifications}
            description="Status updates & expiry notices"
            icon={<Bell className="w-5 h-5 text-amber-600" />}
          />
        </div>

        {/* Recent Reservations Table / Cards */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-medilink-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-medilink-navy font-heading">Recent Reservations</h3>
              <p className="text-xs text-medilink-muted">Track hold duration and pickup progress</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/patient/reservations')}>
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {sampleRecentReservations.map((res) => (
              <div
                key={res.id}
                onClick={() => navigate(`/patient/reservations/${res.id}`)}
                className="p-4 bg-medilink-surface hover:bg-white rounded-xl border border-medilink-border hover:border-medilink-teal/40 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-medilink-teal">{res.number}</span>
                    <ReservationStatusBadge status={res.status} />
                  </div>
                  <h4 className="text-sm font-bold text-medilink-navy font-heading">{res.medicine}</h4>
                  <p className="text-xs text-medilink-muted">{res.pharmacy} &bull; {res.date}</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-medilink-muted font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-medilink-teal" />
                    <span>{res.expiresIn}</span>
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
