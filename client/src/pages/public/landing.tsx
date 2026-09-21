import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/ui/search-bar';
import { AvailabilityBadge } from '@/components/ui/badges';
import {
  Search,
  ShieldCheck,
  Clock,
  Lock,
  Building2,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  FileLock,
  ChevronDown,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/patient/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/patient/search');
    }
  };

  const faqs = [
    {
      q: 'Does MediLink sell or deliver medicines directly?',
      a: 'No. MediLink is strictly a Medicine Discovery & Qualitative Reservation Platform. We do not sell medicines, process online payments, or offer home delivery. You collect reserved medicines directly from verified local pharmacies.',
    },
    {
      q: 'How does qualitative medicine availability work?',
      a: 'Pharmacies update their stock status as AVAILABLE, LIMITED, or UNAVAILABLE. MediLink never displays exact numerical stock quantities to patients to preserve operational inventory control while providing reliable availability signals.',
    },
    {
      q: 'How is my prescription document kept private?',
      a: 'Uploaded prescriptions are stored in private Supabase cloud storage buckets. Access is strictly granted via short-lived signed URLs exclusively to the patient who uploaded it and the verified pharmacy fulfilling the reservation. Administrative staff see audit metadata only.',
    },
    {
      q: 'How are pharmacies verified on MediLink?',
      a: 'Pharmacies register with their official government pharmacy license credentials. MediLink administrators rigorously review license documentation before approving verified status. Unverified pharmacies cannot display public inventory.',
    },
  ];

  return (
    <div className="min-h-screen bg-medilink-surface flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-medilink-surface to-teal-50/20 pt-16 pb-20 border-b border-medilink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-medilink-teal text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Local Pharmacy Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-medilink-navy font-heading tracking-tight leading-none">
                Find. Reserve. <br className="hidden sm:inline" />
                <span className="text-medilink-teal">Collect.</span>
              </h1>

              <p className="text-base sm:text-lg text-medilink-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover medicine availability at verified local pharmacies, reserve items in advance with secure prescription handling, and collect them without wasted travel.
              </p>

              {/* Hero Search Box */}
              <div className="p-2 bg-white rounded-2xl border border-medilink-border shadow-lg max-w-xl mx-auto lg:mx-0">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search Paracetamol, Amoxicillin, Metformin..."
                />
              </div>

              {/* Quick Search Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs text-medilink-muted">
                <span className="font-semibold text-medilink-navy">Popular Searches:</span>
                {['Paracetamol 500mg', 'Amoxicillin 500mg', 'Metformin 850mg', 'Cetirizine 10mg'].map((term) => (
                  <button
                    key={term}
                    onClick={() => navigate(`/patient/search?q=${encodeURIComponent(term)}`)}
                    className="px-2.5 py-1 rounded-md bg-white border border-medilink-border hover:border-medilink-teal text-medilink-text transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <Button size="lg" variant="primary" onClick={() => navigate('/patient/search')}>
                  <Search className="w-5 h-5 mr-2" />
                  <span>Find a Medicine Now</span>
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/for-pharmacies')}>
                  <Building2 className="w-5 h-5 mr-2 text-medilink-teal" />
                  <span>For Pharmacies</span>
                </Button>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-3xl p-6 border border-medilink-border shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-medilink-border pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-medilink-teal flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-medilink-navy">Apollo Community Pharmacy</h4>
                      <p className="text-xs text-medilink-muted">Chennai &bull; Verified Pharmacy</p>
                    </div>
                  </div>
                  <AvailabilityBadge status="AVAILABLE" />
                </div>

                <div className="p-4 bg-medilink-surface rounded-xl border border-medilink-border space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-medilink-navy">Paracetamol 500mg Tablets</span>
                    <span className="text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                      Prescription Not Required
                    </span>
                  </div>
                  <p className="text-xs text-medilink-muted">Qualitative Stock: Available for same-day reservation.</p>
                </div>

                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900 font-medium">
                  <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Reservation Hold Window: 24 Hours guaranteed upon approval</span>
                </div>

                <Button className="w-full" variant="secondary" onClick={() => navigate('/register')}>
                  <span>Create Account & Reserve</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How MediLink Works */}
      <section className="py-20 bg-white border-b border-medilink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-medilink-navy font-heading">How MediLink Works</h2>
          <p className="text-sm text-medilink-muted mt-2 max-w-xl mx-auto">
            A simple 4-step process linking patients directly with verified pharmacy stock.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {[
              { step: '01', title: 'Search Medicine', desc: 'Search required medicines by brand or generic name across local pharmacies.' },
              { step: '02', title: 'Check Availability', desc: 'View qualitative stock signals (AVAILABLE, LIMITED) at verified locations.' },
              { step: '03', title: 'Reserve Item', desc: 'Submit reservation requests with secure prescription upload when required.' },
              { step: '04', title: 'Collect In Person', desc: 'Receive real-time confirmation notifications and collect directly from the pharmacy.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-medilink-surface rounded-2xl border border-medilink-border text-left relative">
                <span className="text-3xl font-black text-medilink-teal/30 font-heading block mb-2">{item.step}</span>
                <h3 className="text-base font-bold text-medilink-navy font-heading">{item.title}</h3>
                <p className="text-xs text-medilink-muted mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prescription Privacy & Security */}
      <section className="py-20 bg-medilink-navy text-white border-b border-medilink-darkblue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medilink-darkblue text-teal-400 text-xs font-semibold border border-slate-700">
                <Lock className="w-4 h-4" />
                <span>Strict Health Privacy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading leading-tight">
                Your Prescriptions Stay Completely Private
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                MediLink utilizes private Supabase Cloud Storage. Prescription documents are never accessible via public URLs. Short-lived 15-minute signed access tokens are issued strictly to the uploading patient and the fulfilling pharmacy.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Private Cloud Bucket Storage with AES-256 Encryption',
                  'Access restricted strictly to fulfilling verified pharmacy',
                  'Admin staff see metadata only (no document access)',
                  'No public storage URLs or indexed links',
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-medilink-darkblue rounded-3xl border border-slate-700 space-y-4">
              <div className="flex items-center gap-3 text-teal-400 border-b border-slate-700 pb-4">
                <FileLock className="w-6 h-6" />
                <h4 className="text-base font-bold font-heading text-white">Prescription Privacy Protocol</h4>
              </div>
              <p className="text-xs text-slate-300">
                When a prescription is required for medicines like Amoxicillin or Metformin, our multi-step wizard validates document MIME type (PDF, PNG, JPEG, WEBP) and size (&lt;= 10MB) before securely dispatching it.
              </p>
              <div className="p-3 bg-slate-900/60 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800">
                STATUS: SIGNED_ACCESS_URL (Expires in 900s)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-16 bg-white border-b border-medilink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-extrabold text-medilink-navy font-heading">100%</h3>
            <p className="text-xs text-medilink-muted mt-1 uppercase tracking-wider font-semibold">Verified Pharmacies</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-medilink-teal font-heading">0%</h3>
            <p className="text-xs text-medilink-muted mt-1 uppercase tracking-wider font-semibold">Public Stock Exposure</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-medilink-navy font-heading">24h</h3>
            <p className="text-xs text-medilink-muted mt-1 uppercase tracking-wider font-semibold">Guaranteed Hold Window</p>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-medilink-teal font-heading">Instant</h3>
            <p className="text-xs text-medilink-muted mt-1 uppercase tracking-wider font-semibold">Status Notifications</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-medilink-surface border-b border-medilink-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-medilink-navy font-heading">Frequently Asked Questions</h2>
            <p className="text-xs text-medilink-muted mt-2">Clear answers regarding MediLink reservation policies and privacy.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-medilink-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-medilink-navy font-heading focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-medilink-muted leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-medilink-navy font-heading">
            Ready to Find & Reserve Your Medicines?
          </h2>
          <p className="text-sm text-medilink-muted max-w-xl mx-auto">
            Join MediLink today to discover availability at verified pharmacies near you.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" variant="primary" onClick={() => navigate('/register')}>
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
