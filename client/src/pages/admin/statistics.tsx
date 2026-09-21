import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, StatCard } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, Building2, BookmarkCheck } from 'lucide-react';

export const AdminStatisticsPage: React.FC = () => {
  const roleDistribution = [
    { name: 'Patients', value: 36, color: '#006A61' },
    { name: 'Pharmacies', value: 10, color: '#0F2942' },
    { name: 'Admins', value: 2, color: '#D97706' },
  ];

  const reservationStatusDist = [
    { name: 'Approved', value: 110, color: '#16A34A' },
    { name: 'Pending', value: 4, color: '#D97706' },
    { name: 'Rejected', value: 8, color: '#BA1A1A' },
    { name: 'Expired', value: 6, color: '#43474D' },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Platform System Statistics</h1>
          <p className="text-xs text-medilink-muted">Aggregate analytics on network growth, active role ratios, and fulfillment rates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard title="Total Platform Accounts" value={48} icon={<Users className="w-5 h-5 text-medilink-teal" />} />
          <StatCard title="Verified Pharmacies" value={10} icon={<Building2 className="w-5 h-5 text-medilink-teal" />} />
          <StatCard title="Total Reservations" value={128} icon={<BookmarkCheck className="w-5 h-5 text-emerald-600" />} />
          <StatCard title="Fulfillment Rate" value="93.2%" icon={<BarChart3 className="w-5 h-5 text-medilink-teal" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-medilink-navy font-heading">User Account Role Ratios</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={roleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4}>
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="space-y-4">
            <h3 className="text-base font-bold text-medilink-navy font-heading">Reservation Lifecycle Distribution</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={reservationStatusDist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4}>
                    {reservationStatusDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
