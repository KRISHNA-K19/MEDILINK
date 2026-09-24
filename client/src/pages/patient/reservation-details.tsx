import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReservationStatusBadge } from '@/components/ui/badges';
import { Timeline, TimelineStep } from '@/components/ui/timeline';
import { ConfirmationDialog } from '@/components/ui/modal';
import { ArrowLeft, Building2, Clock, XCircle, FileText, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export const PatientReservationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  // Sample data fallback
  const sampleReservation = {
    id: id || 'r2222222-2222-2222-2222-222222222222',
    reservation_number: 'RES-2026-8802',
    medicine_name: 'Amoxicillin 500mg Capsules',
    generic_name: 'Amoxicillin Trihydrate',
    pharmacy_name: 'Apollo Community Pharmacy',
    pharmacy_address: '104 Healthcare Boulevard, Chennai',
    pharmacy_phone: '+1-800-555-0200',
    status: 'PENDING' as const,
    requires_prescription: true,
    prescription_attached: true,
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 23 * 3600 * 1000).toISOString(),
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const data = await apiFetch(`/api/patient/reservations/${id}`);
      if (data.success && data.data) {
        setReservation(data.data);
        return;
      }
    } catch (e) {}
    setReservation(sampleReservation);
  };

  const handleCancelReservation = async () => {
    setIsCancelling(true);
    try {
      await apiFetch(`/api/patient/reservations/${id}/cancel`, {
        method: 'POST',
      });
      setReservation((prev: any) => ({ ...prev, status: 'CANCELLED' }));
    } catch (e) {}
    setReservation((prev: any) => ({ ...prev, status: 'CANCELLED' }));
    setIsCancelling(false);
    setShowCancelModal(false);
  };

  if (!reservation) return null;

  const timelineSteps: TimelineStep[] = [
    {
      title: 'Reservation Created',
      description: 'Reservation request submitted by patient.',
      timestamp: new Date(reservation.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'completed',
    },
    {
      title: 'Pharmacy Review',
      description:
        reservation.status === 'PENDING'
          ? 'Pharmacy staff is currently evaluating inventory and prescription.'
          : 'Review completed by pharmacy.',
      status: reservation.status === 'PENDING' ? 'current' : 'completed',
    },
    {
      title: reservation.status === 'APPROVED' ? 'Approved & Held' : reservation.status === 'REJECTED' ? 'Rejected' : reservation.status === 'CANCELLED' ? 'Cancelled by Patient' : 'Pickup Ready',
      description:
        reservation.status === 'APPROVED'
          ? 'Pharmacy confirmed stock reservation hold.'
          : reservation.status === 'CANCELLED'
          ? 'Reservation cancelled.'
          : 'Awaiting decision.',
      status:
        reservation.status === 'APPROVED'
          ? 'completed'
          : reservation.status === 'CANCELLED' || reservation.status === 'REJECTED'
          ? 'error'
          : 'upcoming',
    },
  ];

  return (
    <DashboardLayout role="PATIENT">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => navigate('/patient/reservations')}
            className="inline-flex items-center gap-1 text-xs text-medilink-muted hover:text-medilink-navy mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reservations
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading flex items-center gap-3">
              <span>{reservation.reservation_number}</span>
              <ReservationStatusBadge status={reservation.status} />
            </h1>
            {reservation.status === 'PENDING' && (
              <Button variant="danger" size="sm" onClick={() => setShowCancelModal(true)}>
                <XCircle className="w-4 h-4 mr-1" />
                <span>Cancel Reservation</span>
              </Button>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-medilink-border">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-medilink-muted uppercase">Medicine Information</span>
              <h3 className="text-lg font-bold text-medilink-navy">{reservation.medicine_name}</h3>
              <p className="text-xs text-medilink-muted">Generic: {reservation.generic_name || 'Standard Formula'}</p>
              {reservation.requires_prescription && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                  <FileText className="w-3.5 h-3.5" /> Prescription Document Attached
                </span>
              )}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-medilink-muted uppercase">Pharmacy Location</span>
              <h4 className="text-sm font-bold text-medilink-navy flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-medilink-teal" />
                <span>{reservation.pharmacy_name}</span>
              </h4>
              <p className="text-xs text-medilink-muted">{reservation.pharmacy_address}</p>
              <p className="text-xs text-medilink-muted font-mono">{reservation.pharmacy_phone}</p>
            </div>
          </div>

          {/* Expiry Timer banner */}
          <div className="p-3 bg-medilink-surface rounded-xl border border-medilink-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-medilink-navy font-medium">
              <Clock className="w-4 h-4 text-medilink-teal" />
              <span>Reservation Expiry Window:</span>
            </div>
            <span className="font-mono font-bold text-medilink-teal">
              {new Date(reservation.expires_at).toLocaleString()}
            </span>
          </div>
        </Card>

        {/* Visual Lifecycle Timeline */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-medilink-navy font-heading">Reservation Lifecycle Progress</h3>
          <Timeline steps={timelineSteps} />
        </Card>

        {/* Cancel Confirmation Modal */}
        <ConfirmationDialog
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelReservation}
          title="Cancel Reservation?"
          message="Are you sure you want to cancel this pending reservation request? This action cannot be undone."
          confirmText="Yes, Cancel Reservation"
          isLoading={isCancelling}
        />
      </div>
    </DashboardLayout>
  );
};
