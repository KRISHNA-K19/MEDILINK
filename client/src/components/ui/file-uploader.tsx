import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, FileText, CheckCircle2, X, ShieldCheck, ShieldAlert, Loader2, UserCheck, Stethoscope, Calendar, Pill } from 'lucide-react';
import { processAndVerifyPrescription, ExtractedPrescriptionData } from '@/lib/prescriptionOcr';

export interface FileUploaderProps {
  onFileSelect: (file: File | null, extractedData?: ExtractedPrescriptionData | null) => void;
  accept?: string;
  maxSizeMB?: number;
  error?: string;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  accept = '.pdf,.jpg,.jpeg,.png,.webp',
  maxSizeMB = 10,
  error,
  className,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedPrescriptionData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setValidationError(null);
    setExtractedData(null);

    // Validate size (10 MB limit)
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setValidationError(`File size exceeds maximum limit of ${maxSizeMB} MB.`);
      return;
    }

    // Validate extension
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const allowedExts = accept.split(',').map((e) => e.trim().toLowerCase());
    if (!allowedExts.includes(ext)) {
      setValidationError(`File type ${ext} is not supported. Please upload PDF, PNG, JPEG, or WEBP.`);
      return;
    }

    setSelectedFile(file);
    setIsScanning(true);

    try {
      const ocrResult = await processAndVerifyPrescription(file);
      setIsScanning(false);
      setExtractedData(ocrResult);

      if (!ocrResult.isValidPrescription) {
        setValidationError(ocrResult.verificationMessage);
        onFileSelect(null, null);
      } else {
        onFileSelect(file, ocrResult);
      }
    } catch {
      setIsScanning(false);
      setValidationError('Failed to inspect prescription document. Please ensure file is legible.');
      onFileSelect(null, null);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setValidationError(null);
    setExtractedData(null);
    onFileSelect(null, null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      <label className="block text-xs font-semibold text-medilink-text uppercase tracking-wider">
        Medical Prescription Upload & Security Inspection <span className="text-medilink-danger">*</span>
      </label>

      {!selectedFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center p-6 border-2 border-dashed border-medilink-border rounded-xl bg-medilink-surface hover:bg-teal-50/50 hover:border-medilink-teal transition-all cursor-pointer text-center',
            (error || validationError) && 'border-medilink-danger bg-red-50/20'
          )}
        >
          <div className="w-10 h-10 rounded-full bg-white text-medilink-teal flex items-center justify-center shadow-sm mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-medilink-navy">Click or drag prescription file to upload</p>
          <p className="text-xs text-medilink-muted mt-1">Accepted: PDF, JPEG, PNG, WEBP (Max {maxSizeMB} MB)</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            accept={accept}
            className="hidden"
          />
        </div>
      ) : isScanning ? (
        <div className="p-5 bg-sky-50/60 border border-sky-200 rounded-xl space-y-2 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-medilink-teal mx-auto" />
          <p className="text-xs font-bold text-medilink-navy">Inspecting Prescription with Medical AI Engine...</p>
          <p className="text-[11px] text-medilink-muted">Verifying Rx authenticity, extracting doctor credentials, and checking dosage validity.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-medilink-navy truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs text-medilink-muted">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Security Inspected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded-lg text-medilink-muted hover:text-medilink-danger hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Extracted Medical Summary Card */}
          {extractedData && extractedData.isValidPrescription && (
            <div className="p-4 bg-white border border-medilink-border rounded-xl space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-medilink-border pb-2">
                <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Prescription Verification Passed</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  AUTHENTIC RX
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-start gap-2 text-medilink-navy">
                  <Stethoscope className="w-3.5 h-3.5 text-medilink-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] text-medilink-muted">Prescribing Doctor</span>
                    <span>{extractedData.doctorName}</span>
                    <p className="text-[10px] font-mono text-slate-500">{extractedData.doctorLicense}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-medilink-navy">
                  <UserCheck className="w-3.5 h-3.5 text-medilink-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] text-medilink-muted">Patient Name</span>
                    <span>{extractedData.patientName}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-medilink-navy sm:col-span-2">
                  <Pill className="w-3.5 h-3.5 text-medilink-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] text-medilink-muted">Extracted Dosage & Medication</span>
                    <span className="font-medium text-emerald-900">{extractedData.medicationName}</span>
                    <p className="text-[11px] text-slate-600 mt-0.5">{extractedData.dosageInstructions}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {(validationError || error) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-medilink-danger flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{validationError || error}</span>
        </div>
      )}
    </div>
  );
};
