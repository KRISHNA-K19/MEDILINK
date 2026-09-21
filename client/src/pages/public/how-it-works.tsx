import React from 'react';
import { Navbar, Footer } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-medilink-navy font-heading">How MediLink Works</h1>
            <p className="text-base text-medilink-muted max-w-2xl mx-auto">
              MediLink is built on three core pillars: Medicine Discovery, Qualitative Availability, and Secure Prescription Handling.
            </p>
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-white rounded-2xl border border-medilink-border shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-medilink-teal flex items-center justify-center font-bold flex-shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-medilink-navy font-heading">1. Real-Time Medicine Discovery</h3>
                <p className="text-sm text-medilink-muted leading-relaxed">
                  Search across verified pharmacy inventories by brand name or generic chemical name. Filter by category, location, and prescription requirement.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-medilink-border shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-medilink-navy font-heading">2. Qualitative Availability Signals</h3>
                <p className="text-sm text-medilink-muted leading-relaxed">
                  Pharmacies manage qualitative stock indicators: <strong>AVAILABLE</strong>, <strong>LIMITED</strong>, or <strong>UNAVAILABLE</strong>. Exact numerical stock counts are never exposed to patients.
                </p>
              </div>
            </div>

            <div className="p-8 bg-white rounded-2xl border border-medilink-border shadow-sm flex items-start gap-6">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-medilink-navy font-heading">3. Secure Reservation & Prescription Review</h3>
                <p className="text-sm text-medilink-muted leading-relaxed">
                  For prescription-required medicines, upload your document in a private cloud storage bucket. Fulfilling pharmacies review the document before approving your reservation.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button size="lg" variant="primary" onClick={() => navigate('/patient/search')}>
              Start Medicine Search Now
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
