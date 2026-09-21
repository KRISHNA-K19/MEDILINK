import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-medilink-text uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'w-full px-3.5 py-2.5 bg-white border border-medilink-border rounded-lg text-sm text-medilink-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-medilink-teal focus:border-transparent transition-all shadow-sm',
            error && 'border-medilink-danger focus:ring-medilink-danger',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-medilink-danger font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-medilink-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
