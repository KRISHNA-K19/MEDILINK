import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { UploadCloud, FileText, CheckCircle2, X } from 'lucide-react';
import { Button } from './button';

export interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
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
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setValidationError(null);

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
    onFileSelect(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setValidationError(null);
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      <label className="block text-xs font-semibold text-medilink-text uppercase tracking-wider">
        Prescription Document Upload <span className="text-medilink-danger">*</span>
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
      ) : (
        <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-medilink-navy truncate max-w-xs">{selectedFile.name}</p>
              <p className="text-xs text-medilink-muted">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Ready for upload
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
      )}

      {(validationError || error) && (
        <p className="text-xs text-medilink-danger font-medium">{validationError || error}</p>
      )}
    </div>
  );
};
