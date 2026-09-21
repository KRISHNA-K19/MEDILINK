import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, StatCard } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, CheckCircle2, XCircle, Clock, Pill } from 'lucide-react';

export const PharmacyReportsPage: React.FC = () => {
  const reservationTrendData = [
    { name: 'Mon', approved: 12, rejected: 1, pending: 3 },
    { name: 'Tue', approved: 18, rejected: 2, pending: 4 },
    { name: 'Wed', approved: 15, rejected: 0, pending: 2 },
    { name: 'Thu', approved: 22, rejected: 3, pending: 5 },
    { name: 'Fri', approved: 28, rejected: 1, pending: 6 },
    { name: 'Sat', approved: 35, rejected: 4, pending: 8 },
    { name: 'Sun', approved: 20, rejected: 2, pending: 3 },
  ];

  const stockDistribution = [
    { name: 'Available', value: 65, color: '#16A34A' },
    { name: 'Limited', value: 25, color: '#D97706' },
    { name: 'Unavailable', value: 10, color: '#BA1A1A' },
  ];

  return (
    <DashboardLayout role="PHARMACY">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Pharmacy Operational Analytics</h1>
          <p className="text-xs text-medilink-muted">Reservation trends, qualitative availability distribution, and fulfillment metrics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <StatCard title="Total Reservations" value={166} trend="+14% this week" trendUp icon={<BarChart3 className="w-5 h-5 text-medilink-teal" />} />
          <StatCard title="Approved Holds" value={150} icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />} />
          <StatCard title="Rejections" value={13} icon={<XCircle className="w-5 h-5 text-red-600" />} />
          <StatCard title="Active Pending" value={3} icon={<Clock className="w-5 h-5 text-amber-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reservation Trends Chart */}
          <Card className="lg:col-span-8 space-y-4">
            <h3 className="text-base font-bold text-medilink-navy font-heading">Weekly Reservation Volume</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reservationTrendData}>
                  <XAxis dataKey="name" stroke="#43474D" fontSize={11} />
                  <YAxis stroke="#43474D" fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="approved" fill="#006A61" radius={[4, 4, 0, 0]} name="Approved" />
                  <Bar dataKey="rejected" fill="#BA1A1A" radius={[4, 4, 0, 0]} name="Rejected" />
                  <Bar dataKey="pending" fill="#D97706" radius={[4, 4, 0, 0]} name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Stock Distribution Pie */}
          <Card className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-medilink-navy font-heading">Qualitative Stock Signals</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stockDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4}>
                    {stockDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 text-xs">
              {stockDistribution.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-medilink-navy font-medium">{item.name}</span>
                  </span>
                  <span className="font-bold text-medilink-navy">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
