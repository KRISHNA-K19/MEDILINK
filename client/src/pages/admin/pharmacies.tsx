import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerificationBadge } from '@/components/ui/badges';
import { Modal } from '@/components/ui/modal';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, FileText, AlertCircle } from 'lucide-react';

export const AdminPharmaciesPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPharmacy, setSelectedPharmacy] = useState<any | null>(null);
  const [actionType, setActionType] = useState<'VERIFY' | 'REJECT' | 'REVOKE' | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const samplePharmacies = [
    {
      id: 'a1111111-1111-1111-1111-111111111111',
      pharmacy_name: 'Apollo Community Pharmacy',
      license_number: 'PH-LIC-2026-001',
      address: '104 Healthcare Boulevard',
      city: 'Chennai',
      state: 'TN',
      postal_code: '600001',
      phone: '+1-800-555-0200',
      email: 'apollo@demo.medilink.local',
      verification_status: 'VERIFIED' as const,
      created_at: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'b2222222-2222-2222-2222-222222222222',
      pharmacy_name: 'MedPlus Wellness Pharmacy',
      license_number: 'PH-LIC-2026-002',
      address: '55 Park Street, Sector 4',
      city: 'Bengaluru',
      state: 'KA',
      postal_code: '560001',
      phone: '+1-800-555-0300',
      email: 'medplus@demo.medilink.local',
      verification_status: 'VERIFIED' as const,
      created_at: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'c3333333-3333-3333-3333-333333333333',
      pharmacy_name: 'CareFirst Express Pharmacy',
      license_number: 'PH-LIC-2026-003',
      address: '12 Station Road',
      city: 'Mumbai',
      state: 'MH',
      postal_code: '400001',
      phone: '+1-800-555-0400',
      email: 'carefirst@demo.medilink.local',
      verification_status: 'PENDING' as const,
      created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
  ];

  useEffect(() => {
    fetchPharmacies();
  }, [filter]);

  const fetchPharmacies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/pharmacies?status=${filter}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setPharmacies(data.data);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {}

    let filtered = [...samplePharmacies];
    if (filter !== 'ALL') filtered = filtered.filter((p) => p.verification_status === filter);
    setPharmacies(filtered);
    setIsLoading(false);
  };

  const openActionModal = (pharmacy: any, type: 'VERIFY' | 'REJECT' | 'REVOKE') => {
    setSelectedPharmacy(pharmacy);
    setActionType(type);
    setActionNotes('');
  };

  const handleExecuteStateTransition = async () => {
    if (!selectedPharmacy || !actionType) return;
    setIsProcessing(true);

    const targetEndpoint = actionType.toLowerCase(); // verify, reject, revoke
    try {
      await fetch(`/api/admin/pharmacies/${selectedPharmacy.id}/${targetEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('medilink_token') || ''}`,
        },
        body: JSON.stringify({ notes: actionNotes }),
      });
    } catch (e) {}

    const newStatus = actionType === 'VERIFY' ? 'VERIFIED' : actionType === 'REJECT' ? 'REJECTED' : 'REVOKED';
    setPharmacies((prev) =>
      prev.map((p) => (p.id === selectedPharmacy.id ? { ...p, verification_status: newStatus } : p))
    );

    setIsProcessing(false);
    setActionType(null);
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Pharmacy Verification Audit</h1>
          <p className="text-xs text-medilink-muted">Review license credentials and manage verification states</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-medilink-border rounded-xl shadow-xs">
          {['ALL', 'PENDING', 'VERIFIED', 'REJECTED', 'REVOKED'].map((st) => (
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

        {/* Pharmacy Cards */}
        <div className="space-y-4">
          {pharmacies.map((item) => (
            <Card key={item.id} className="p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-medilink-border pb-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-medilink-navy font-heading">{item.pharmacy_name}</h3>
                    <VerificationBadge status={item.verification_status} />
                  </div>
                  <p className="text-xs text-medilink-muted font-mono mt-0.5">License Ref: {item.license_number}</p>
                </div>

                <div className="flex items-center gap-2">
                  {item.verification_status === 'PENDING' && (
                    <>
                      <Button variant="danger" size="sm" onClick={() => openActionModal(item, 'REJECT')}>
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Reject
                      </Button>
                      <Button variant="success" size="sm" onClick={() => openActionModal(item, 'VERIFY')}>
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        Verify License
                      </Button>
                    </>
                  )}

                  {item.verification_status === 'VERIFIED' && (
                    <Button variant="danger" size="sm" onClick={() => openActionModal(item, 'REVOKED' as any)}>
                      <ShieldAlert className="w-3.5 h-3.5 mr-1" />
                      Revoke License
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-medilink-muted">
                <div>
                  <span className="font-semibold text-medilink-navy block">Street Address:</span>
                  <span>{item.address}, {item.city}, {item.state} {item.postal_code}</span>
                </div>
                <div>
                  <span className="font-semibold text-medilink-navy block">Contact Phone:</span>
                  <span className="font-mono">{item.phone}</span>
                </div>
                <div>
                  <span className="font-semibold text-medilink-navy block">Registered Email:</span>
                  <span>{item.email}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Confirmation Modal */}
        <Modal
          isOpen={Boolean(actionType)}
          onClose={() => setActionType(null)}
          title={`Confirm License State Action: ${actionType}`}
        >
          <div className="space-y-4 text-xs">
            <p className="text-medilink-muted">
              You are executing a state machine transition on <strong>{selectedPharmacy?.pharmacy_name}</strong>.
            </p>

            <div className="space-y-1.5">
              <label className="block font-semibold uppercase text-medilink-navy">Audit Notes & Justification</label>
              <textarea
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                placeholder="Enter audit verification notes..."
                className="w-full h-24 p-3 bg-white border border-medilink-border rounded-lg text-xs text-medilink-text focus:ring-2 focus:ring-medilink-teal"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-medilink-border">
              <Button variant="outline" onClick={() => setActionType(null)}>
                Cancel
              </Button>
              <Button
                variant={actionType === 'VERIFY' ? 'success' : 'danger'}
                onClick={handleExecuteStateTransition}
                isLoading={isProcessing}
              >
                Confirm {actionType}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};
