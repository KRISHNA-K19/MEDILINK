import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatCard, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerificationBadge, ReservationStatusBadge } from '@/components/ui/badges';
import { Users, Building2, BookmarkCheck, ShieldCheck, Activity, ArrowRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalUsers: 48,
    activeUsers: 46,
    suspendedUsers: 2,
    totalPharmacies: 12,
    verifiedPharmacies: 10,
    pendingPharmacies: 2,
    totalReservations: 128,
    pendingReservations: 4,
    approvedReservations: 110,
    rejectedReservations: 8,
    expiredReservations: 6,
  });

  const chartData = [
    { name: 'Mon', reservations: 18, approvals: 16 },
    { name: 'Tue', reservations: 24, approvals: 22 },
    { name: 'Wed', reservations: 20, approvals: 19 },
    { name: 'Thu', reservations: 30, approvals: 28 },
    { name: 'Fri', reservations: 35, approvals: 32 },
    { name: 'Sat', reservations: 42, approvals: 40 },
    { name: 'Sun', reservations: 28, approvals: 25 },
  ];

  const pendingPharmacies = [
    {
      id: 'c3333333-3333-3333-3333-333333333333',
      pharmacy_name: 'CareFirst Express Pharmacy',
      license_number: 'PH-LIC-2026-003',
      city: 'Mumbai',
      submitted: 'Today, 11:30 AM',
      verification_status: 'PENDING' as const,
    },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Platform Operations Console</h1>
          <p className="text-xs text-medilink-muted">Administrative oversight, pharmacy licensing audits, and system metrics</p>
        </div>

        {/* System Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Users" value={metrics.totalUsers} description={`${metrics.activeUsers} Active • ${metrics.suspendedUsers} Suspended`} icon={<Users className="w-5 h-5 text-medilink-teal" />} />
          <StatCard title="Verified Pharmacies" value={metrics.verifiedPharmacies} description={`${metrics.pendingPharmacies} Applications Pending`} icon={<Building2 className="w-5 h-5 text-medilink-teal" />} />
          <StatCard title="Total Reservations" value={metrics.totalReservations} description={`${metrics.approvedReservations} Approved Holds`} icon={<BookmarkCheck className="w-5 h-5 text-emerald-600" />} />
          <StatCard title="Pending Review" value={metrics.pendingReservations} description="Requires action" icon={<Clock className="w-5 h-5 text-amber-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-medilink-navy font-heading">System Reservation Growth</h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#43474D" fontSize={11} />
                  <YAxis stroke="#43474D" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="reservations" fill="#0F2942" radius={[4, 4, 0, 0]} name="Reservations" />
                  <Bar dataKey="approvals" fill="#006A61" radius={[4, 4, 0, 0]} name="Approved Holds" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pending Pharmacy Approvals Queue */}
          <Card className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b border-medilink-border pb-3">
              <h3 className="text-base font-bold text-medilink-navy font-heading">Pending Pharmacy Licensing</h3>
              <Button variant="outline" size="sm" onClick={() => navigate('/admin/pharmacies')}>
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {pendingPharmacies.map((item) => (
                <div key={item.id} className="p-3.5 bg-medilink-surface rounded-xl border border-medilink-border space-y-2 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-medilink-navy">{item.pharmacy_name}</h4>
                      <p className="text-medilink-muted font-mono">License: {item.license_number}</p>
                    </div>
                    <VerificationBadge status={item.verification_status} />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-medilink-muted">{item.city} &bull; {item.submitted}</span>
                    <Button variant="secondary" size="sm" onClick={() => navigate('/admin/pharmacies')}>
                      Audit License
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
