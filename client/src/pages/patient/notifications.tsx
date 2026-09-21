import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, Clock, CheckCheck } from 'lucide-react';

export const PatientNotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Reservation Approved!',
      message: 'Apollo Community Pharmacy approved your reservation RES-2026-8801 for Paracetamol 500mg.',
      is_read: false,
      timestamp: 'Today, 2:15 PM',
    },
    {
      id: 'n2',
      title: 'Reservation Submitted',
      message: 'Your reservation request RES-2026-8802 was sent to Apollo Community Pharmacy for review.',
      is_read: true,
      timestamp: 'Today, 1:45 PM',
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <DashboardLayout role="PATIENT" unreadNotifications={notifications.filter((n) => !n.is_read).length}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Notifications</h1>
            <p className="text-xs text-medilink-muted">Stay informed on reservation statuses and pharmacy approvals</p>
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4 mr-1" />
            <span>Mark All As Read</span>
          </Button>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-4 flex items-start gap-3 transition-colors ${!n.is_read ? 'bg-teal-50/40 font-medium' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${!n.is_read ? 'bg-medilink-teal text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-medilink-navy">{n.title}</h4>
                    <span className="text-[11px] text-medilink-muted font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-medilink-muted leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
