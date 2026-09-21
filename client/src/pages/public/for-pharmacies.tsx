import React from 'react';
import { Navbar, Footer } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, FileCheck, Users } from 'lucide-react';

export const ForPharmaciesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-medilink-teal text-xs font-bold uppercase tracking-wider border border-teal-200">
              <Building2 className="w-4 h-4" />
              <span>Pharmacy Partner Network</span>
            </div>
            <h1 className="text-4xl font-extrabold text-medilink-navy font-heading">Partner With MediLink</h1>
            <p className="text-base text-medilink-muted max-w-2xl mx-auto">
              Connect your verified pharmacy with local patients looking for essential medicines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-medilink-border space-y-3">
              <ShieldCheck className="w-8 h-8 text-medilink-teal" />
              <h3 className="text-lg font-bold text-medilink-navy font-heading">Verified Badge</h3>
              <p className="text-xs text-medilink-muted leading-relaxed">
                Build trust with patients through administrative license verification.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-medilink-border space-y-3">
              <FileCheck className="w-8 h-8 text-medilink-teal" />
              <h3 className="text-lg font-bold text-medilink-navy font-heading">Prescription Review</h3>
              <p className="text-xs text-medilink-muted leading-relaxed">
                Securely inspect uploaded patient prescriptions before approving pickup requests.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-medilink-border space-y-3">
              <Users className="w-8 h-8 text-medilink-teal" />
              <h3 className="text-lg font-bold text-medilink-navy font-heading">Reduce Foot Traffic Waste</h3>
              <p className="text-xs text-medilink-muted leading-relaxed">
                Receive organized reservations in advance to optimize operational counter fulfillment.
              </p>
            </div>
          </div>

          <div className="p-8 bg-medilink-navy text-white rounded-3xl text-center space-y-6">
            <h2 className="text-2xl font-bold font-heading">Ready to Register Your Pharmacy?</h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Complete registration with your official license credentials to initiate admin verification.
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/register?role=PHARMACY')}>
              Register As Pharmacy Partner
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
