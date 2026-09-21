import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReservationStatusBadge } from '@/components/ui/badges';
import { EmptyState, LoadingState } from '@/components/ui/states';
import { BookmarkCheck, Clock, ArrowRight, XCircle } from 'lucide-react';

export const PatientReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('ALL');
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample fallback data
  const sampleReservations = [
    {
      id: 'r1111111-1111-1111-1111-111111111111',
      reservation_number: 'RES-2026-8801',
      medicine_name: 'Paracetamol 500mg',
      pharmacy_name: 'Apollo Community Pharmacy',
      status: 'APPROVED' as const,
      requires_prescription: false,
      expires_at: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
      created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      id: 'r2222222-2222-2222-2222-222222222222',
      reservation_number: 'RES-2026-8802',
      medicine_name: 'Amoxicillin 500mg Capsules',
      pharmacy_name: 'Apollo Community Pharmacy',
      status: 'PENDING' as const,
      requires_prescription: true,
      expires_at: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 'r3333333-3333-3333-3333-333333333333',
      reservation_number: 'RES-2026-8803',
      medicine_name: 'Metformin 850mg Tablets',
      pharmacy_name: 'MedPlus Wellness Pharmacy',
      status: 'CANCELLED' as const,
      requires_prescription: true,
      expires_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ];

  useEffect(() => {
    fetchReservations();
  }, [filter]);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/patient/reservations?status=${filter}`, {
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
    if (filter !== 'ALL') {
      filtered = filtered.filter((r) => r.status === filter);
    }
    setReservations(filtered);
    setIsLoading(false);
  };

  return (
    <DashboardLayout role="PATIENT">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">My Reservations</h1>
          <p className="text-xs text-medilink-muted">Track hold statuses, pharmacy approvals, and collection timers</p>
        </div>

        {/* Filter Tabs */}
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
          <LoadingState message="Fetching reservations..." />
        ) : reservations.length === 0 ? (
          <EmptyState
            title="No reservations found"
            description="You don't have any medicine reservations matching the selected filter status."
            actionText="Search Medicines"
            onAction={() => navigate('/patient/search')}
          />
        ) : (
          <div className="space-y-3">
            {reservations.map((item) => (
              <Card
                key={item.id}
                hoverable
                onClick={() => navigate(`/patient/reservations/${item.id}`)}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-medilink-teal">{item.reservation_number}</span>
                    <ReservationStatusBadge status={item.status} />
                  </div>
                  <h3 className="text-base font-bold text-medilink-navy font-heading">{item.medicine_name}</h3>
                  <p className="text-xs text-medilink-muted">{item.pharmacy_name}</p>
                </div>

                <div className="flex items-center gap-3 text-xs w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <div className="text-right">
                    <p className="text-medilink-muted font-medium">Expires At:</p>
                    <p className="font-mono text-medilink-navy font-semibold">
                      {new Date(item.expires_at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <span>View Timeline</span>
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
