import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReservationStatusBadge } from '@/components/ui/badges';
import { EmptyState, LoadingState } from '@/components/ui/states';
import { FileCheck, Clock, ArrowRight, FileText } from 'lucide-react';

export const PharmacyReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sampleReservations = [
    {
      id: 'r1111111-1111-1111-1111-111111111111',
      reservation_number: 'RES-2026-8801',
      patient_name: 'Sarah Jenkins',
      medicine_name: 'Paracetamol 500mg',
      status: 'APPROVED' as const,
      requires_prescription: false,
      created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 'r2222222-2222-2222-2222-222222222222',
      reservation_number: 'RES-2026-8802',
      patient_name: 'Sarah Jenkins',
      medicine_name: 'Amoxicillin 500mg Capsules',
      status: 'PENDING' as const,
      requires_prescription: true,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
  ];

  useEffect(() => {
    fetchReservations();
  }, [filter]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/pharmacy/reservations?status=${filter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setReservations(data.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {}

    let filtered = [...sampleReservations];
    if (filter !== 'ALL') filtered = filtered.filter((r) => r.status === filter);
    setReservations(filtered);
    setIsLoading(false);
  };

  return (
    <DashboardLayout role="PHARMACY">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Reservation Queue</h1>
          <p className="text-xs text-medilink-muted">Process pending patient medicine reservation requests</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-medilink-border rounded-xl shadow-xs">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'EXPIRED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === st
                  ? 'bg-medilink-navy text-white shadow-xs'
                  : 'text-medilink-muted hover:text-medilink-text hover:bg-slate-50'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Reservations List */}
        {isLoading ? (
          <LoadingState message="Fetching queue..." />
        ) : reservations.length === 0 ? (
          <EmptyState
            title="No reservation requests"
            description="There are currently no patient requests matching this status."
          />
        ) : (
          <div className="space-y-3">
            {reservations.map((item) => (
              <Card
                key={item.id}
                hoverable
                onClick={() => navigate(`/pharmacy/reservations/${item.id}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-medilink-teal">{item.reservation_number}</span>
                    <ReservationStatusBadge status={item.status} />
                  </div>
                  <h3 className="text-base font-bold text-medilink-navy font-heading">{item.medicine_name}</h3>
                  <p className="text-xs text-medilink-muted">Patient: {item.patient_name}</p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {item.requires_prescription && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Prescription Attached
                    </span>
                  )}
                  <Button variant="secondary" size="sm">
                    <span>Review Request</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
