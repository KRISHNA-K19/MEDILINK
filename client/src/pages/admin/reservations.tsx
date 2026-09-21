import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { ReservationStatusBadge } from '@/components/ui/badges';
import { BookmarkCheck, FileText, Lock } from 'lucide-react';

export const AdminReservationsPage: React.FC = () => {
  const sampleAuditReservations = [
    {
      id: 'r1111111-1111-1111-1111-111111111111',
      reservation_number: 'RES-2026-8801',
      patient_id: '55555555-5555-5555-5555-555555555555',
      pharmacy_id: 'a1111111-1111-1111-1111-111111111111',
      medicine_name: 'Paracetamol 500mg',
      status: 'APPROVED' as const,
      prescription_attached: false,
      created_at: '2026-09-21T12:00:00Z',
    },
    {
      id: 'r2222222-2222-2222-2222-222222222222',
      reservation_number: 'RES-2026-8802',
      patient_id: '55555555-5555-5555-5555-555555555555',
      pharmacy_id: 'a1111111-1111-1111-1111-111111111111',
      medicine_name: 'Amoxicillin 500mg Capsules',
      status: 'PENDING' as const,
      prescription_attached: true,
      created_at: '2026-09-21T13:30:00Z',
    },
  ];

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">System Reservation Metadata Audit</h1>
          <p className="text-xs text-medilink-muted">Inspect platform-wide reservation records while preserving patient prescription file privacy</p>
        </div>

        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3 text-xs text-medilink-teal font-medium">
          <Lock className="w-4 h-4 flex-shrink-0" />
          <span>
            Privacy Compliance Guard: Administrative audit views display reservation metadata only. Raw prescription document downloads are restricted to fulfilling pharmacies.
          </span>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-medilink-surface border-b border-medilink-border text-medilink-navy font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Reservation Ref</th>
                  <th className="p-4">Medicine Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Prescription Metadata</th>
                  <th className="p-4">Created Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sampleAuditReservations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-medilink-teal">{item.reservation_number}</td>
                    <td className="p-4 font-bold text-medilink-navy">{item.medicine_name}</td>
                    <td className="p-4">
                      <ReservationStatusBadge status={item.status} />
                    </td>
                    <td className="p-4">
                      {item.prescription_attached ? (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1 w-max">
                          <FileText className="w-3.5 h-3.5" /> prescription_attached: true
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">prescription_attached: false</span>
                      )}
                    </td>
                    <td className="p-4 text-medilink-muted font-mono">{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
