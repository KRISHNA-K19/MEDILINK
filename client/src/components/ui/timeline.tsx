import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export interface TimelineStep {
  title: string;
  description?: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className }) => {
  return (
    <div className={cn('space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-medilink-border', className)}>
      {steps.map((step, idx) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        const isError = step.status === 'error';

        return (
          <div key={idx} className="relative flex items-start gap-4">
            <div
              className={cn(
                'relative z-10 flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors',
                isCompleted && 'bg-emerald-500 text-white shadow-sm',
                isCurrent && 'bg-medilink-teal text-white ring-4 ring-teal-100 shadow-sm',
                isError && 'bg-medilink-danger text-white shadow-sm',
                !isCompleted && !isCurrent && !isError && 'bg-white border-2 border-medilink-border text-medilink-muted'
              )}
            >
              {isCompleted && <CheckCircle2 className="w-4 h-4" />}
              {isCurrent && <Clock className="w-4 h-4 animate-pulse" />}
              {isError && <XCircle className="w-4 h-4" />}
              {!isCompleted && !isCurrent && !isError && (idx + 1)}
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex items-center justify-between">
                <h4 className={cn('text-sm font-semibold font-heading', isCurrent ? 'text-medilink-teal font-bold' : 'text-medilink-navy')}>
                  {step.title}
                </h4>
                {step.timestamp && (
                  <span className="text-xs text-medilink-muted font-mono">{step.timestamp}</span>
                )}
              </div>
              {step.description && (
                <p className="text-xs text-medilink-muted mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
