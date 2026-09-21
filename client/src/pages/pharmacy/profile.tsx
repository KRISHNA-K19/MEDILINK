import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerificationBadge } from '@/components/ui/badges';
import { Building2, CheckCircle2 } from 'lucide-react';

export const PharmacyProfilePage: React.FC = () => {
  const [pharmacyName, setPharmacyName] = useState('Apollo Community Pharmacy');
  const [licenseNumber] = useState('PH-LIC-2026-001');
  const [address, setAddress] = useState('104 Healthcare Boulevard');
  const [city, setCity] = useState('Chennai');
  const [phone, setPhone] = useState('+1-800-555-0200');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout role="PHARMACY">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Pharmacy Profile</h1>
            <p className="text-xs text-medilink-muted">Public location details and license verification information</p>
          </div>
          <VerificationBadge status="VERIFIED" />
        </div>

        <Card className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Pharmacy Legal Name" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} required />
            <Input label="Government License Number (Locked)" value={licenseNumber} disabled helperText="License number verified by Admin." />
            <Input label="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <Input label="Operating Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pharmacy profile details updated.</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary">
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
