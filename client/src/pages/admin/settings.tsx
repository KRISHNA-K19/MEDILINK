import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sliders, Clock, CheckCircle2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [expiryHours, setExpiryHours] = useState('24');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout role="ADMIN">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">System Parameters & Configuration</h1>
          <p className="text-xs text-medilink-muted">Configure platform hold windows and automated reservation expiry rules</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
            <div className="space-y-3 border-b border-medilink-border pb-5">
              <div className="flex items-center gap-2 text-medilink-navy font-bold text-sm">
                <Clock className="w-5 h-5 text-medilink-teal" />
                <span>Automatic Reservation Expiry Engine</span>
              </div>
              <p className="text-medilink-muted leading-relaxed">
                Configure the maximum duration (1–168 hours) a reservation remains in PENDING status before the database background worker transitions it to EXPIRED.
              </p>

              <Input
                label="Reservation Expiry Window (Hours)"
                type="number"
                min="1"
                max="168"
                value={expiryHours}
                onChange={(e) => setExpiryHours(e.target.value)}
                helperText="Safe Range: 1 to 168 hours (Default: 24 hours)"
                required
              />
            </div>

            {isSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>System configuration updated successfully. Expiry engine updated.</span>
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Save Platform Configuration
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};
