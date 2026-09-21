import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Activity, ShieldCheck, UserCheck, Sliders, FileCheck } from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  const activityLogs = [
    {
      id: 'act-1',
      actor: 'MediLink System Admin',
      action: 'PHARMACY_VERIFIED',
      entity: 'Apollo Community Pharmacy',
      timestamp: 'Today, 2:30 PM',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'act-2',
      actor: 'System Admin',
      action: 'EXPIRY_CONFIG_UPDATED',
      entity: 'Reservation Expiry (24 Hours)',
      timestamp: 'Yesterday, 4:15 PM',
      icon: <Sliders className="w-4 h-4 text-medilink-teal" />,
    },
    {
      id: 'act-3',
      actor: 'System Admin',
      action: 'USER_REINSTATED',
      entity: 'Sarah Jenkins (Patient)',
      timestamp: '2 days ago',
      icon: <UserCheck className="w-4 h-4 text-sky-600" />,
    },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">System Audit Activity Log</h1>
          <p className="text-xs text-medilink-muted">Real-time audit trail of administrative actions and platform state changes</p>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="divide-y divide-slate-100">
            {activityLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                <div className="p-2 rounded-lg bg-medilink-surface border border-medilink-border flex-shrink-0">
                  {log.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-medilink-teal">{log.action}</span>
                    <span className="text-[11px] text-medilink-muted font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-xs font-bold text-medilink-navy">{log.entity}</p>
                  <p className="text-[11px] text-medilink-muted">Executed by {log.actor}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
