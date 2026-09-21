import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverable = false, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white border border-medilink-border rounded-xl p-5 shadow-sm transition-all',
        hoverable && 'hover:shadow-md hover:border-medilink-teal/40 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
  className,
}) => {
  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-medilink-muted uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-medilink-navy mt-1 font-heading">{value}</h3>
          {description && <p className="text-xs text-medilink-muted mt-1">{description}</p>}
          {trend && (
            <p className={cn('text-xs font-medium mt-2 flex items-center gap-1', trendUp ? 'text-emerald-600' : 'text-red-600')}>
              <span>{trendUp ? '↑' : '↓'}</span>
              <span>{trend}</span>
            </p>
          )}
        </div>
        {icon && <div className="p-2.5 bg-medilink-surface text-medilink-teal rounded-lg border border-medilink-border">{icon}</div>}
      </div>
    </Card>
  );
};
