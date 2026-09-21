import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, XCircle, Clock, ShieldCheck, ShieldAlert } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export interface AvailabilityBadgeProps {
  status: 'AVAILABLE' | 'LIMITED' | 'UNAVAILABLE';
  className?: string;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({ status, className }) => {
  switch (status) {
    case 'AVAILABLE':
      return (
        <Badge variant="success" className={cn('bg-[#E6F7EC] text-[#16A34A] border-emerald-300', className)}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Available</span>
        </Badge>
      );
    case 'LIMITED':
      return (
        <Badge variant="warning" className={cn('bg-[#FEF3C7] text-[#D97706] border-amber-300', className)}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Limited Stock</span>
        </Badge>
      );
    case 'UNAVAILABLE':
      return (
        <Badge variant="danger" className={cn('bg-[#FFDAD6] text-[#BA1A1A] border-red-300', className)}>
          <XCircle className="w-3.5 h-3.5" />
          <span>Unavailable</span>
        </Badge>
      );
  }
};

export interface ReservationStatusBadgeProps {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' | 'CANCELLED';
  className?: string;
}

export const ReservationStatusBadge: React.FC<ReservationStatusBadgeProps> = ({ status, className }) => {
  switch (status) {
    case 'PENDING':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>Pending Review</span>
        </Badge>
      );
    case 'APPROVED':
      return (
        <Badge variant="success" className={className}>
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Approved</span>
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge variant="danger" className={className}>
          <XCircle className="w-3.5 h-3.5" />
          <span>Rejected</span>
        </Badge>
      );
    case 'EXPIRED':
      return (
        <Badge variant="default" className={className}>
          <Clock className="w-3.5 h-3.5" />
          <span>Expired</span>
        </Badge>
      );
    case 'CANCELLED':
      return (
        <Badge variant="default" className={className}>
          <XCircle className="w-3.5 h-3.5" />
          <span>Cancelled</span>
        </Badge>
      );
  }
};

export interface VerificationBadgeProps {
  status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'REVOKED';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, className }) => {
  switch (status) {
    case 'VERIFIED':
      return (
        <Badge variant="success" className={cn('gap-1', className)}>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Pharmacy</span>
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="warning" className={className}>
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Verification</span>
        </Badge>
      );
    case 'REJECTED':
      return (
        <Badge variant="danger" className={className}>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Rejected</span>
        </Badge>
      );
    case 'REVOKED':
      return (
        <Badge variant="danger" className={className}>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Revoked</span>
        </Badge>
      );
  }
};
