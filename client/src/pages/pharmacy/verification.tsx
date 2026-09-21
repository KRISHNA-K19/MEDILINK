import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { VerificationBadge } from '@/components/ui/badges';
import { ShieldCheck, Clock, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const PharmacyVerificationPage: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'PENDING' | 'VERIFIED' | 'REJECTED' | 'REVOKED'>('VERIFIED');
  const [pharmacyName] = useState('Apollo Community Pharmacy');
  const [licenseNumber] = useState('PH-LIC-2026-001');

  return (
    <DashboardLayout role="PHARMACY">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Pharmacy Verification Status</h1>
          <p className="text-xs text-medilink-muted">Government pharmacy license verification state and administrative access authorization</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-medilink-border pb-4">
            <div>
              <h3 className="text-lg font-bold text-medilink-navy font-heading">{pharmacyName}</h3>
              <p className="text-xs text-medilink-muted font-mono mt-0.5">License: {licenseNumber}</p>
            </div>
            <VerificationBadge status={verificationStatus} />
          </div>

          {verificationStatus === 'VERIFIED' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Verification Approved & Active</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Your pharmacy license documentation has been verified by MediLink administrators. Your medicine qualitative availability is currently live and discoverable on the public patient network.
              </p>
            </div>
          )}

          {verificationStatus === 'PENDING' && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                <span>Application Under Administrative Review</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your registration application and government license ({licenseNumber}) are being audited. Public inventory management will be unlocked immediately upon administrative verification.
              </p>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-medilink-navy uppercase tracking-wider">Verification Requirements Checklist</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-medilink-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Government Pharmacy Retail License Verification</span>
              </div>
              <div className="flex items-center gap-2.5 text-medilink-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Physical Store Address & Operating Phone Line</span>
              </div>
              <div className="flex items-center gap-2.5 text-medilink-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lead Pharmacist Credential Audit</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
