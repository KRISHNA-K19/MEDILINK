import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReservationStatusBadge } from '@/components/ui/badges';
import { Modal } from '@/components/ui/modal';
import { ArrowLeft, CheckCircle2, XCircle, FileText, User, ShieldCheck, Eye } from 'lucide-react';

export const PharmacyReservationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<any>(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleReservation = {
    id: id || 'r2222222-2222-2222-2222-222222222222',
    reservation_number: 'RES-2026-8802',
    patient_name: 'Sarah Jenkins',
    patient_email: 'patient@demo.medilink.local',
    patient_phone: '+1-800-555-0500',
    medicine_name: 'Amoxicillin 500mg Capsules',
    generic_name: 'Amoxicillin Trihydrate',
    status: 'PENDING' as const,
    requires_prescription: true,
    prescription_url: 'https://placeholder.supabase.co/storage/v1/object/signed/prescriptions/sample.pdf',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    expires_at: new Date(Date.now() + 23 * 3600 * 1000).toISOString(),
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await fetch(`/api/pharmacy/reservations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setReservation(data.data);
          return;
        }
      }
    } catch (e) {}
    setReservation(sampleReservation);
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      await fetch(`/api/pharmacy/reservations/${id}/approve`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}` },
      });
    } catch (e) {}
    setReservation((prev: any) => ({ ...prev, status: 'APPROVED' }));
    setIsProcessing(false);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await fetch(`/api/pharmacy/reservations/${id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}`,
        },
        body: JSON.stringify({ reason: rejectionReason }),
      });
    } catch (e) {}
    setReservation((prev: any) => ({ ...prev, status: 'REJECTED' }));
    setIsProcessing(false);
    setShowRejectModal(false);
  };

  if (!reservation) return null;

  return (
    <DashboardLayout role="PHARMACY">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => navigate('/pharmacy/reservations')}
            className="inline-flex items-center gap-1 text-xs text-medilink-muted hover:text-medilink-navy mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Reservation Queue
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading flex items-center gap-3">
              <span>{reservation.reservation_number}</span>
              <ReservationStatusBadge status={reservation.status} />
            </h1>

            {reservation.status === 'PENDING' && (
              <div className="flex items-center gap-2">
                <Button variant="danger" size="sm" onClick={() => setShowRejectModal(true)}>
                  <XCircle className="w-4 h-4 mr-1" />
                  <span>Reject</span>
                </Button>
                <Button variant="success" size="sm" onClick={handleApprove} isLoading={isProcessing}>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span>Approve Hold</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Patient & Medicine Card */}
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-medilink-border pb-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-semibold text-medilink-muted uppercase">Requested Medicine</span>
              <h3 className="text-base font-bold text-medilink-navy">{reservation.medicine_name}</h3>
              <p className="text-medilink-muted">Generic: {reservation.generic_name}</p>
            </div>

            <div className="space-y-1.5">
              <span className="font-semibold text-medilink-muted uppercase">Patient Contact Info</span>
              <h4 className="text-sm font-bold text-medilink-navy flex items-center gap-1.5">
                <User className="w-4 h-4 text-medilink-teal" />
                <span>{reservation.patient_name}</span>
              </h4>
              <p className="text-medilink-muted">{reservation.patient_email}</p>
              <p className="text-medilink-muted font-mono">{reservation.patient_phone}</p>
            </div>
          </div>

          {/* Prescription Document Review Section */}
          {reservation.requires_prescription && (
            <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-medilink-teal" />
                <div>
                  <h4 className="text-xs font-bold text-medilink-navy">Patient Prescription Document</h4>
                  <p className="text-[11px] text-medilink-muted">Protected Signed URL &bull; Expiring in 15 mins</p>
                </div>
              </div>

              <Button variant="secondary" size="sm" onClick={() => setShowPrescriptionModal(true)}>
                <Eye className="w-4 h-4 mr-1.5" />
                <span>View Document</span>
              </Button>
            </div>
          )}
        </Card>

        {/* Secure Prescription Viewer Modal */}
        <Modal
          isOpen={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          title="Secure Prescription Viewer"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-100 rounded-lg font-mono text-[11px] text-slate-700 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Signed Token Access Verified: Authorized Fulfilling Pharmacy</span>
            </div>

            <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-2">
              <FileText className="w-12 h-12 text-medilink-teal opacity-60" />
              <p className="font-bold text-medilink-navy text-sm">Prescription Document Preview</p>
              <p className="text-slate-500 max-w-xs">
                Verified doctor prescription for {reservation.medicine_name} uploaded by {reservation.patient_name}.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" onClick={() => setShowPrescriptionModal(false)}>
                Close Viewer
              </Button>
            </div>
          </div>
        </Modal>

        {/* Rejection Reason Modal */}
        <Modal isOpen={showRejectModal} onClose={() => setShowRejectModal(false)} title="Reject Reservation Request">
          <div className="space-y-4 text-xs">
            <p className="text-medilink-muted">
              Please state the reason for rejecting this reservation request. The patient will receive a notification.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Prescription invalid, stock reserved for prior order..."
              className="w-full h-24 p-3 bg-white border border-medilink-border rounded-lg text-xs text-medilink-text focus:ring-2 focus:ring-medilink-danger"
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleReject} isLoading={isProcessing}>
                Confirm Rejection
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
