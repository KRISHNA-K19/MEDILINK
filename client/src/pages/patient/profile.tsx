import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, CheckCircle2 } from 'lucide-react';

export const PatientProfilePage: React.FC = () => {
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [email] = useState('patient@demo.medilink.local');
  const [phone, setPhone] = useState('+1-800-555-0500');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout role="PATIENT">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Patient Profile</h1>
          <p className="text-xs text-medilink-muted">Manage personal information and contact details</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <Input label="Email Address (Locked)" value={email} disabled helperText="Email address cannot be changed." />
            <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile updated successfully.</span>
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
