import React from 'react';
import { cn } from '@/lib/utils';
import { FolderSearch, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-medilink-border', className)}>
      <div className="w-12 h-12 rounded-full bg-medilink-surface text-medilink-teal flex items-center justify-center mb-3 border border-medilink-border">
        {icon || <FolderSearch className="w-6 h-6" />}
      </div>
      <h3 className="text-base font-bold text-medilink-navy font-heading">{title}</h3>
      <p className="text-xs text-medilink-muted mt-1 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" className="mt-4" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while fetching data. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center bg-red-50/50 rounded-xl border border-red-200', className)}>
      <div className="w-10 h-10 rounded-full bg-red-100 text-medilink-danger flex items-center justify-center mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-bold text-medilink-navy font-heading">{title}</h3>
      <p className="text-xs text-medilink-muted mt-1 max-w-sm">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          <span>Retry</span>
        </Button>
      )}
    </div>
  );
};

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('animate-pulse bg-slate-200 rounded', className)} />;
};

export const LoadingState: React.FC<{ message?: string; className?: string }> = ({
  message = 'Loading data...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center', className)}>
      <div className="w-8 h-8 border-3 border-medilink-teal border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-xs font-medium text-medilink-muted">{message}</p>
    </div>
  );
};
