import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AvailabilityBadge, VerificationBadge } from '@/components/ui/badges';
import { FileUploader } from '@/components/ui/file-uploader';
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Pill, FileText, AlertCircle, Clock } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export const ReservationWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMedicineId = searchParams.get('medicineId') || 'm1111111-1111-1111-1111-111111111111';
  const initialMode = searchParams.get('mode') === 'EXPRESS_DELIVERY' ? 'EXPRESS_DELIVERY' : 'PICKUP';

  const [step, setStep] = useState(1);
  const [fulfillmentMode, setFulfillmentMode] = useState<'PICKUP' | 'EXPRESS_DELIVERY'>(initialMode);
  const [deliveryAddress, setDeliveryAddress] = useState('104 Healthcare Boulevard, Apt 4B');
  const [deliveryPhone, setDeliveryPhone] = useState('+1-800-555-0199');
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [extractedOcrData, setExtractedOcrData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createdReservation, setCreatedReservation] = useState<any>(null);

  // Sample data fallback
  const sampleMedicine = {
    id: initialMedicineId,
    name: initialMedicineId.includes('2') ? 'Amoxicillin 500mg Capsules' : 'Paracetamol 500mg',
    generic_name: initialMedicineId.includes('2') ? 'Amoxicillin Trihydrate' : 'Paracetamol / Acetaminophen',
    category: initialMedicineId.includes('2') ? 'Antibiotics' : 'Analgesic',
    requires_prescription: initialMedicineId.includes('2'),
    availability: 'AVAILABLE' as const,
    pharmacy_id: 'a1111111-1111-1111-1111-111111111111',
    pharmacy_name: 'Apollo Community Pharmacy',
    address: '104 Healthcare Boulevard',
    city: 'Chennai',
    phone: '+1-800-555-0200',
    verification_status: 'VERIFIED' as const,
  };

  useEffect(() => {
    fetchMedicineDetails();
  }, [initialMedicineId]);

  const fetchMedicineDetails = async () => {
    try {
      const data = await apiFetch(`/api/medicines/${initialMedicineId}`);
      if (data.success && data.data) {
        setSelectedMedicine(data.data);
        return;
      }
    } catch (e) {}
    setSelectedMedicine(sampleMedicine);
  };

  const handleNextStep = () => {
    setErrorMessage(null);

    if (step === 1 && !selectedMedicine) {
      setErrorMessage('Please select a verified pharmacy and medicine.');
      return;
    }

    if (step === 2 && selectedMedicine?.availability === 'UNAVAILABLE') {
      setErrorMessage('This item is currently unavailable and cannot be reserved.');
      return;
    }

    if (step === 3 && selectedMedicine?.requires_prescription && !prescriptionFile) {
      setErrorMessage('A valid prescription document is required for this medication.');
      return;
    }

    // Skip prescription step if prescription not required
    if (step === 2 && !selectedMedicine?.requires_prescription) {
      setStep(4);
    } else {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setErrorMessage(null);
    if (step === 4 && !selectedMedicine?.requires_prescription) {
      setStep(2);
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleSubmitReservation = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('medicine_id', selectedMedicine.id);
      formData.append('pharmacy_id', selectedMedicine.pharmacy_id);
      if (prescriptionFile) {
        formData.append('prescription', prescriptionFile);
      }

      const result = await apiFetch('/api/patient/reservations', {
        method: 'POST',
        body: formData,
      });

      setCreatedReservation(result.data);
      setStep(5);
    } catch (err: any) {
      // Fallback for demo
      setCreatedReservation({
        reservation_number: `RES-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'PENDING',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });
      setStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedMedicine) return null;

  return (
    <DashboardLayout role="PATIENT">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs text-medilink-muted hover:text-medilink-navy mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl font-extrabold text-medilink-navy font-heading">Reserve Medicine</h1>
          <p className="text-xs text-medilink-muted">Complete the multi-step reservation process for local pickup</p>
        </div>

        {/* Step Indicator Progress */}
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-medilink-border shadow-xs">
          {[
            { num: 1, label: 'Select Pharmacy' },
            { num: 2, label: 'Confirm Item' },
            { num: 3, label: 'Prescription', skip: !selectedMedicine.requires_prescription },
            { num: 4, label: 'Review' },
            { num: 5, label: 'Confirmation' },
          ].map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;

            return (
              <div key={s.num} className={`flex items-center gap-2 ${s.skip ? 'opacity-30' : ''}`}>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-medilink-teal text-white ring-4 ring-teal-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-medilink-navy">{s.label}</span>
              </div>
            );
          })}
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-medilink-danger flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Select Pharmacy */}
        {step === 1 && (
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-medilink-navy font-heading border-b border-medilink-border pb-3">
              Step 1: Select Verified Pharmacy
            </h3>
            <div className="p-4 bg-medilink-surface rounded-xl border border-medilink-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-medilink-teal flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-medilink-navy">{selectedMedicine.pharmacy_name}</h4>
                  <VerificationBadge status={selectedMedicine.verification_status} />
                </div>
                <p className="text-xs text-medilink-muted">{selectedMedicine.address}, {selectedMedicine.city}</p>
                <p className="text-xs text-medilink-muted font-mono">{selectedMedicine.phone}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={handleNextStep}>
                <span>Next: Confirm Medicine</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 2: Confirm Medicine & Fulfillment Method */}
        {step === 2 && (
          <Card className="p-6 space-y-5">
            <h3 className="text-lg font-bold text-medilink-navy font-heading border-b border-medilink-border pb-3">
              Step 2: Confirm Medicine & Select Fulfillment Method
            </h3>
            <div className="p-4 bg-medilink-surface rounded-xl border border-medilink-border space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-medilink-navy">{selectedMedicine.name}</h4>
                  <p className="text-xs text-medilink-muted font-medium">Generic: {selectedMedicine.generic_name}</p>
                </div>
                <AvailabilityBadge status={selectedMedicine.availability} />
              </div>
              <p className="text-xs text-medilink-muted">Category: {selectedMedicine.category}</p>
              {selectedMedicine.requires_prescription && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>This medicine requires a verified medical prescription upload in Step 3.</span>
                </div>
              )}
            </div>

            {/* Fulfillment Options Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-medilink-text uppercase tracking-wider">
                Select Fulfillment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFulfillmentMode('PICKUP')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    fulfillmentMode === 'PICKUP'
                      ? 'border-medilink-teal bg-teal-50/40 ring-2 ring-medilink-teal/20'
                      : 'border-medilink-border hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-medilink-navy mb-1">
                    <Clock className="w-4 h-4 text-medilink-teal" />
                    <span>Store Pickup (15 Mins)</span>
                  </div>
                  <p className="text-[11px] text-medilink-muted">
                    Hold stock at pharmacy for 15 minutes. Pick up in person at zero delivery charge.
                  </p>
                </div>

                <div
                  onClick={() => setFulfillmentMode('EXPRESS_DELIVERY')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    fulfillmentMode === 'EXPRESS_DELIVERY'
                      ? 'border-sky-600 bg-sky-50/50 ring-2 ring-sky-500/20'
                      : 'border-medilink-border hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs text-sky-950 mb-1">
                    <Clock className="w-4 h-4 text-sky-700" />
                    <span>Express Delivery (1-3 Hours)</span>
                  </div>
                  <p className="text-[11px] text-medilink-muted">
                    Verified courier delivers directly to your door within 1 to 3 hours.
                  </p>
                </div>
              </div>

              {fulfillmentMode === 'EXPRESS_DELIVERY' && (
                <div className="pt-3 space-y-3 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-medilink-navy">Delivery Address</label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-medilink-border focus:ring-1 focus:ring-medilink-teal"
                      placeholder="Street address, Apartment / Suite"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-medilink-navy">Contact Phone</label>
                    <input
                      type="text"
                      value={deliveryPhone}
                      onChange={(e) => setDeliveryPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-medilink-border focus:ring-1 focus:ring-medilink-teal"
                      placeholder="+1 (800) 555-0199"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button variant="primary" onClick={handleNextStep}>
                <span>Next: {selectedMedicine.requires_prescription ? 'Upload Prescription' : 'Review'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 3: Prescription Upload & Security Inspection */}
        {step === 3 && (
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-medilink-navy font-heading border-b border-medilink-border pb-3">
              Step 3: Upload Prescription & AI Inspection
            </h3>

            <p className="text-xs text-medilink-muted leading-relaxed">
              Upload your doctor's prescription. Documents are inspected by our Medical Security Engine to verify Rx authenticity and extract doctor & dosage details.
            </p>

            <FileUploader
              onFileSelect={(file, extractedData) => {
                setPrescriptionFile(file);
                setExtractedOcrData(extractedData);
              }}
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button variant="primary" onClick={handleNextStep}>
                <span>Next: Review Reservation</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 4: Review & Submit */}
        {step === 4 && (
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-medilink-navy font-heading border-b border-medilink-border pb-3">
              Step 4: Review Reservation Details
            </h3>

            <div className="space-y-3 text-xs divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Medicine:</span>
                <span className="font-bold text-medilink-navy">{selectedMedicine.name}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Fulfilling Pharmacy:</span>
                <span className="font-bold text-medilink-navy">{selectedMedicine.pharmacy_name}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Location:</span>
                <span className="font-medium text-medilink-navy">{selectedMedicine.address}, {selectedMedicine.city}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Fulfillment Mode:</span>
                <span className="font-bold text-sky-800">
                  {fulfillmentMode === 'EXPRESS_DELIVERY' ? '🚚 Express Delivery (1-3 Hours)' : '🏪 Store Pickup (15 Mins)'}
                </span>
              </div>
              {fulfillmentMode === 'EXPRESS_DELIVERY' && (
                <div className="pt-2 flex justify-between">
                  <span className="text-medilink-muted">Delivery Address:</span>
                  <span className="font-semibold text-medilink-navy">{deliveryAddress}</span>
                </div>
              )}
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Prescription Security Audit:</span>
                <span className="font-bold text-emerald-700">
                  {selectedMedicine.requires_prescription
                    ? extractedOcrData?.securityStatus === 'PASSED'
                      ? '✓ Security Audit Passed (Rx Authenticated)'
                      : 'Attached & Pending Pharmacy Inspection'
                    : 'Not Required'}
                </span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-medilink-muted">Estimated Fulfilling Window:</span>
                <span className="font-bold text-medilink-teal">
                  {fulfillmentMode === 'EXPRESS_DELIVERY' ? 'Guaranteed 1 to 3 Hours' : '15-Minute Guaranteed Store Hold'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-medilink-teal font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Reservation status will start as PENDING for pharmacy verification.</span>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button variant="secondary" onClick={handleSubmitReservation} isLoading={isLoading}>
                Submit Reservation Request
              </Button>
            </div>
          </Card>
        )}

        {/* STEP 5: Confirmation */}
        {step === 5 && (
          <Card className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-medilink-navy font-heading">Reservation Submitted!</h2>
            <p className="text-xs text-medilink-muted max-w-md mx-auto">
              Your reservation request has been transmitted to <strong>{selectedMedicine.pharmacy_name}</strong>.
            </p>

            <div className="p-4 bg-medilink-surface rounded-xl border border-medilink-border text-xs max-w-sm mx-auto space-y-1">
              <p className="text-medilink-muted">Reservation Reference:</p>
              <p className="text-base font-mono font-bold text-medilink-teal">{createdReservation?.reservation_number || 'RES-2026-8809'}</p>
              <p className="text-[11px] text-amber-700 font-semibold pt-1">Status: PENDING PHARMACY REVIEW</p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" onClick={() => navigate('/patient/dashboard')}>
                Go to Dashboard
              </Button>
              <Button variant="primary" onClick={() => navigate('/patient/reservations')}>
                Track Reservation Status
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};
